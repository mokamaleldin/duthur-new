const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

let payload = '';
for (let i = 0; ; i++) {
  const file = `payload${i}.txt`;
  if (!fs.existsSync(file)) break;
  payload += fs.readFileSync(file, 'utf8');
}

if (!payload) throw new Error('DUTHUR source payload is missing');
const data = JSON.parse(zlib.inflateSync(Buffer.from(payload, 'base64')).toString('utf8'));
for (const [file, content] of Object.entries(data)) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

if (!fs.existsSync('.env.local')) {
  fs.writeFileSync('.env.local', [
    'NEXT_PUBLIC_SUPABASE_URL=https://wawdioszidwmorxwtfoi.supabase.co',
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_yOF1boKnQWkRfZcMgHa1Wg_INFmw55F',
    ''
  ].join('\n'));
}

console.log(`DUTHUR source restored: ${Object.keys(data).length} files`);
