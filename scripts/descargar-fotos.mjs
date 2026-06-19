/* Barrio Bamba — descarga imágenes representativas (libres, de Wikimedia Commons)
   para cada platillo y las guarda en el Escritorio, nombradas por platillo.
   NO son fotos reales del local; son de relleno para revisar/usar como ejemplo. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { MENU } from '../src/data/menu.js';

const UA = 'BarrioBambaMenu/1.0 (contacto@barriobamba.mx)';
const outDir = path.join(os.homedir(), 'Desktop', 'Barrio Bamba - Fotos', 'ejemplos');
fs.mkdirSync(outDir, { recursive: true });

// Término de búsqueda (en inglés rinde mejor en Commons) por id de platillo
const TERMS = {
  l1: 'chicken sandwich', l2: 'turkey sandwich', l3: 'grilled chicken breast', l4: 'grilled chicken breast vegetables',
  t1: 'tacos', t2: 'carne asada tacos', t3: 'quesadilla',
  h1: 'hamburger', h2: 'bacon cheeseburger', h3: 'hawaiian hamburger pineapple', h4: 'double cheeseburger',
  pa1: 'spaghetti bolognese', pa2: 'creamy chicken pasta', pa3: 'shrimp pasta',
  a1: 'chilaquiles', a2: 'carne asada', a3: 'enchiladas verdes', a4: 'grilled salmon',
  s1: 'chicken nuggets', s2: 'fried chicken wings', s3: 'cheese fries bacon', s4: 'loaded french fries',
  s5: 'potato wedges', s6: 'french fries', s7: 'mozzarella sticks', s8: 'ham cheese quesadilla', s9: 'potato chips snack',
  f1: 'lemonade', f2: 'italian soda drink', f3: 'fruit smoothie', f4: 'mango drink glass', f5: 'coffee frappe', f6: 'michelada beer', f7: 'michelada',
  c1: 'hot chocolate', c2: 'cappuccino', c3: 'matcha latte',
  d1: 'nutella crepe', d2: 'strawberry nutella crepe', d3: 'cake slice',
  b1: 'soda can', b2: 'water bottle', b3: 'sangria drink',
};

const catName = (id) => (MENU.categories.find((c) => c.id === id) || {}).name || id;
const slug = (s) => s.replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findImage(term) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search` +
    `&gsrsearch=${encodeURIComponent(term + ' filetype:bitmap')}&gsrlimit=5&gsrnamespace=6` +
    `&prop=imageinfo&iiprop=url|mime&iiurlwidth=900`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('API ' + res.status);
  const data = await res.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  pages.sort((a, b) => (a.index || 0) - (b.index || 0));
  for (const p of pages) {
    const info = p.imageinfo && p.imageinfo[0];
    if (info && /image\/(jpeg|png)/.test(info.mime || '') && info.thumburl) return info.thumburl;
  }
  return null;
}

async function download(imgUrl, dest) {
  const res = await fetch(imgUrl, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('IMG ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

let ok = 0, fail = 0;
const failed = [];
for (const p of MENU.products) {
  const term = TERMS[p.id] || p.name;
  const fname = `${slug(catName(p.cat))} - ${slug(p.name)}.jpg`;
  const dest = path.join(outDir, fname);
  if (fs.existsSync(dest)) { console.log(`— ya existe  ${fname}`); ok++; continue; }
  try {
    const img = await findImage(term);
    if (!img) throw new Error('sin resultado');
    const bytes = await download(img, dest);
    ok++;
    console.log(`OK  ${fname}  (${Math.round(bytes / 1024)} KB)`);
  } catch (e) {
    fail++;
    failed.push(`${p.name} [${term}] — ${e.message}`);
    console.log(`X   ${p.name} — ${e.message}`);
  }
  await sleep(350); // cortesía con la API
}

console.log(`\nListas: ${ok}  ·  Fallaron: ${fail}`);
if (failed.length) console.log('Sin imagen:\n - ' + failed.join('\n - '));
console.log('Carpeta:', outDir);
