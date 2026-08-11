'use client';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './CartProvider';
import type { Locale } from '@/types/store';
import { dict } from '@/lib/i18n';

export function Header({locale}:{locale:Locale}){
  const t=dict[locale]; const {count}=useCart(); const pathname=usePathname(); const router=useRouter(); const [open,setOpen]=useState(false);
  const nav=[['',t.home],['/products',t.products],['/your-size',t.size],['/about',t.about],['/contact',t.contact]];
  function switchLang(next:string){ const parts=pathname.split('/'); parts[1]=next; router.push(parts.join('/')||`/${next}`); }
  return <header className="site-header">
    <nav className={`nav-links ${open?'open':''}`}>
      {nav.map(([p,l])=><Link key={p} href={`/${locale}${p}`} onClick={()=>setOpen(false)}>{l}</Link>)}
    </nav>
    <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="menu">{open?<X/>:<Menu/>}</button>
    <Link href={`/${locale}`} className="logo" aria-label="DUTHUR">دُثُر</Link>
    <div className="nav-actions">
      <select aria-label="Language" value={locale} onChange={e=>switchLang(e.target.value)}>
        <option value="tr">TR</option><option value="en">EN</option><option value="ar">AR</option>
      </select>
      <Link className="cart-link" href={`/${locale}/cart`}><ShoppingBag size={21}/>{count>0&&<span>{count}</span>}</Link>
    </div>
  </header>;
}
