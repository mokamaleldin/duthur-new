'use client';
import { createBrowserClient } from '@supabase/ssr';
export function createClient() {
  return createBrowserClient(
    (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wawdioszidwmorxwtfoi.supabase.co'),
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_yOF1boKnQWkRfZcMgHa1Wg_INFmw55F')
  );
}
