'use client';
import Image from 'next/image'; import { useMemo, useState } from 'react';
import type { Locale, Product } from '@/types/store'; import { dict, getText } from '@/lib/i18n'; import { imageUrl } from '@/lib/images'; import { useCart } from './CartProvider';
export function ProductDetail({product,locale}:{product:Product;locale:Locale}){
 const t=dict[locale], images=[...(product.product_images||[])].sort((a,b)=>a.position-b.position), variants=[...(product.product_variants||[])].sort((a,b)=>a.position-b.position); const [image,setImage]=useState(0); const [variantId,setVariantId]=useState(variants.find(v=>v.stock_quantity>0)?.id||variants[0]?.id); const [qty,setQty]=useState(1); const cart=useCart(); const variant=useMemo(()=>variants.find(v=>v.id===variantId),[variants,variantId]);
 const add=()=>{ if(!variant||variant.stock_quantity<1)return; cart.add({variantId:variant.id,productId:product.id,slug:product.slug,title:getText(product,'title',locale),image:imageUrl(images[0]?.storage_path),optionValues:variant.option_values,price:Number(variant.price),quantity:qty,stock:variant.stock_quantity}); };
 return <main className="product-detail">
   <section className="gallery"><div className="main-image">{images[image]&&<Image src={imageUrl(images[image].storage_path)} alt={getText(product,'title',locale)} fill priority sizes="(max-width:900px) 100vw, 65vw"/>}</div>{images.length>1&&<div className="thumbs">{images.map((im,i)=><button key={im.id} className={i===image?'active':''} onClick={()=>setImage(i)}><Image src={imageUrl(im.storage_path)} alt="" fill sizes="80px"/></button>)}</div>}</section>
   <section className="product-info"><h1>{getText(product,'title',locale)}</h1><div className="price">{Number(variant?.price||product.base_price).toFixed(2)} TRY {product.compare_at_price&&<del>{Number(product.compare_at_price).toFixed(2)} TRY</del>}</div><p>{getText(product,'description',locale)}</p>
   <label>{t.selectSize}</label><div className="variant-grid">{variants.map(v=><button key={v.id} disabled={!v.active||v.stock_quantity<=0} className={variantId===v.id?'active':''} onClick={()=>{setVariantId(v.id);setQty(1)}}>{v.option_values.Size||Object.values(v.option_values).join(' / ')}</button>)}</div>
   <div className="buy-row"><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span>{qty}</span><button onClick={()=>setQty(Math.min(variant?.stock_quantity||1,qty+1))}>+</button></div><button className="primary" disabled={!variant||variant.stock_quantity<1} onClick={add}>{t.addToCart}</button></div>
   {product.size_chart?.length>0&&<details open><summary>{t.sizeChart}</summary><div className="table-wrap"><table><thead><tr><th>Size</th><th>Length</th><th>Chest</th><th>Sleeve</th></tr></thead><tbody>{product.size_chart.map(r=><tr key={r.size}><td>{r.size}</td><td>{r.length} cm</td><td>{r.chest} cm</td><td>{r.sleeve} cm</td></tr>)}</tbody></table></div></details>}
   {getText(product,'material_fit',locale)&&<details><summary>{t.materialFit}</summary><p>{getText(product,'material_fit',locale)}</p></details>}
   </section>
 </main>;
}
