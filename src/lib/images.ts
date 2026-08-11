export function imageUrl(path?: string | null) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wawdioszidwmorxwtfoi.supabase.co';
  return `${base}/storage/v1/object/public/product-images/${path}`;
}
