import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wawdioszidwmorxwtfoi.supabase.co'),
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_yOF1boKnQWkRfZcMgHa1Wg_INFmw55F'),
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookies) {
          cookies.forEach(({name,value}) => request.cookies.set(name,value));
          response = NextResponse.next({ request });
          cookies.forEach(({name,value,options}) => response.cookies.set(name,value,options));
        }
      }
    }
  );
  await supabase.auth.getUser();
  return response;
}
export const config = { matcher: ['/admin/:path*'] };
