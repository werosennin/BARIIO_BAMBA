/* Barrio Bamba — genera el QR del menú y una tarjeta imprimible on-brand.
   Uso: node scripts/gen-qr.mjs "https://barrio-bamba.netlify.app/" */
import QRCode from 'qrcode';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.argv[2] || 'https://barrio-bamba.netlify.app/';
const PRETTY = URL.replace(/^https?:\/\//, '').replace(/\/$/, '');
const outDir = path.resolve('public', 'qr');
fs.mkdirSync(outDir, { recursive: true });

const color = { dark: '#111111', light: '#ffffff' };
const qrOpts = { errorCorrectionLevel: 'Q', margin: 2, color };

// QR vectorial (SVG) y en imagen (PNG de alta resolución)
const qrSvg = await QRCode.toString(URL, { ...qrOpts, type: 'svg' });
fs.writeFileSync(path.join(outDir, 'barrio-bamba-qr.svg'), qrSvg);
await QRCode.toFile(path.join(outDir, 'barrio-bamba-qr.png'), URL, { ...qrOpts, width: 1000 });

// Tarjeta imprimible (abrir en navegador → Imprimir / Guardar PDF)
const card = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Barrio Bamba — QR de mesa</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  :root{ --ink:#111111; --bone:#F4EFE8; --paper:#ffffff; --muted:#6b6660; }
  *{ box-sizing:border-box; margin:0; }
  body{ background:var(--bone); color:var(--ink); font-family:'Archivo',system-ui,sans-serif; min-height:100vh; display:flex; flex-direction:column; align-items:center; gap:18px; padding:28px; }
  .card{ width:420px; max-width:100%; background:var(--bone); border:2.5px solid var(--ink); border-radius:6px; box-shadow:6px 6px 0 var(--ink); padding:30px 28px 26px; text-align:center; }
  .wordmark{ font-family:'Anton',sans-serif; font-size:46px; line-height:.95; letter-spacing:-.01em; text-transform:uppercase; }
  .eyebrow{ font-family:'Space Mono',monospace; font-weight:700; font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-top:8px; }
  .headline{ font-family:'Anton',sans-serif; font-size:30px; line-height:1; text-transform:uppercase; letter-spacing:-.01em; margin-top:20px; }
  .qr{ background:var(--paper); border:2.5px solid var(--ink); border-radius:6px; box-shadow:4px 4px 0 var(--ink); padding:14px; margin:18px auto 0; width:max-content; }
  .qr svg{ width:240px; height:240px; display:block; }
  .url{ font-family:'Space Mono',monospace; font-weight:700; font-size:13px; letter-spacing:.04em; margin-top:16px; word-break:break-all; }
  .meta{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); margin-top:10px; }
  .tag{ font-size:13px; color:#2a2a2a; margin-top:14px; }
  .print-btn{ font-family:'Space Mono',monospace; font-weight:700; text-transform:uppercase; letter-spacing:.08em; font-size:12px; padding:12px 20px; background:var(--ink); color:var(--bone); border:2px solid var(--ink); border-radius:4px; box-shadow:3px 3px 0 var(--ink); cursor:pointer; }
  @media print {
    @page{ margin:14mm; }
    body{ background:#fff; padding:0; min-height:auto; }
    .print-btn{ display:none; }
    .card{ box-shadow:none; border-width:2px; }
    .qr{ box-shadow:none; }
  }
</style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">Imprimir / Guardar PDF</button>
  <div class="card">
    <div class="wordmark">Barrio Bamba</div>
    <div class="eyebrow">Restaurante</div>
    <div class="headline">Escanea para ver el menú</div>
    <div class="qr">${qrSvg}</div>
    <div class="url">${PRETTY}</div>
    <div class="meta">Martes a sábado · 2:30–10:45 pm</div>
    <div class="tag">Pídelo con todo, como debe ser.</div>
  </div>
</body>
</html>`;
fs.writeFileSync(path.join(outDir, 'tarjeta-mesa.html'), card);

console.log('QR generado para:', URL);
console.log('Archivos creados en:', outDir);
