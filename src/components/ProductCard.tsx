import Image from 'next/image'; import Link from 'next/link';
import type { Locale, Product } from '@/types/store'; import { getText, dict } from '@/lib/i18n'; import { imageUrl } from '@/lib/images';
export function ProductCard({product,locale}:{product:Product;locale:Locale}){
 const img=[...(product.product_images||[])].sort((a,b)=>a.position-b.position)[0]; const variants=product.product_variants||[]; const sold=variants.length>0&&variants.every(v=>v.stock_quantity<=0||!v.active); const price=variants.find(v=>v.active)?.price||product.base_price;
 return <Link href={`/${locale}/products/${product.slug}`} className="product-card"><div className="product-image-wrap">{img&&<Image src={imageUrl(img.storage_path)} alt={getText(product,'title',locale)} fill sizes="(max-width:700px) 100vw, 33vw" className="product-card-image"/>}{sold&&<span className="badge">{dict[locale].soldOut}</span>}</div><div className="product-card-meta"><h3>{getText(product,'title',locale)}</h3><span>{Number(price).toFixed(2)} TL</span></div></Link>
}
