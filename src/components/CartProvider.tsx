'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '@/types/store';

type CartCtx = {
  items: CartItem[]; count:number; subtotal:number;
  add:(item:CartItem)=>void; remove:(variantId:string)=>void; setQty:(variantId:string,qty:number)=>void; clear:()=>void;
};
const Ctx = createContext<CartCtx | null>(null);
export function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems] = useState<CartItem[]>([]);
  const [ready,setReady] = useState(false);
  useEffect(()=>{ try { const raw=localStorage.getItem('duthur-cart'); if(raw) setItems(JSON.parse(raw)); } finally { setReady(true); } },[]);
  useEffect(()=>{ if(ready) localStorage.setItem('duthur-cart',JSON.stringify(items)); },[items,ready]);
  const value = useMemo<CartCtx>(()=>({
    items,
    count:items.reduce((a,b)=>a+b.quantity,0),
    subtotal:items.reduce((a,b)=>a+b.price*b.quantity,0),
    add(item){ setItems(prev=>{ const found=prev.find(x=>x.variantId===item.variantId); if(found) return prev.map(x=>x.variantId===item.variantId?{...x,quantity:Math.min(x.quantity+item.quantity,x.stock)}:x); return [...prev,item]; }); },
    remove(id){setItems(prev=>prev.filter(x=>x.variantId!==id));},
    setQty(id,qty){setItems(prev=>prev.map(x=>x.variantId===id?{...x,quantity:Math.max(1,Math.min(qty,x.stock))}:x));},
    clear(){setItems([]);}
  }),[items]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useCart(){ const c=useContext(Ctx); if(!c) throw new Error('CartProvider missing'); return c; }
