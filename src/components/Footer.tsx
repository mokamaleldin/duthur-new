import Link from 'next/link';
import type { Locale } from '@/types/store';
export function Footer({locale}:{locale:Locale}){
  return <footer className="footer"><div><strong>DUTHUR — دُثُر</strong><p>Quiet Arab identity streetwear.</p></div><div className="footer-links">
    <Link href={`/${locale}/shipping-policy`}>Shipping</Link><Link href={`/${locale}/refund-policy`}>Refund</Link><Link href={`/${locale}/privacy-policy`}>Privacy</Link>
  </div><div>© {new Date().getFullYear()} DUTHUR</div></footer>
}
