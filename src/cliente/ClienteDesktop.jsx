/* Barrio Bamba — Cliente · vista escritorio (menú digital responsivo, sin pedidos ni reservaciones) */
import React from 'react';
import { Logo, ProductCard, Badge } from '../components/index.js';
import { Ic } from '../icons.jsx';
import { LocationPanel } from './Ubicacion.jsx';
import { useMenu } from '../data/store.js';

export function ClienteDesktop() {
  const data = useMenu();
  const [cat, setCat] = React.useState('tacos');
  const [locOpen, setLocOpen] = React.useState(false);

  const category = data.categories.find((c) => c.id === cat);
  const items = data.products.filter((p) => p.cat === cat);
  const promo = data.promos.find((p) => p.active) || data.promos[0];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--ink-900)', color: 'var(--bone-50)', borderBottom: '2.5px solid var(--ink-900)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <Logo size={34} invert />
          <nav style={{ marginLeft: 8, display: 'flex', gap: 22 }}>
            {['Menú', 'Ubicación', 'Nosotros'].map((n, i) => (
              <a key={n} href="#" onClick={(e) => { e.preventDefault(); if (n === 'Ubicación') setLocOpen((o) => !o); }} style={{ textDecoration: 'none', color: i === 0 ? 'var(--bone-50)' : 'var(--ink-300)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>{n}</a>
            ))}
          </nav>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--bone-300)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
              <Ic n="clock" size={14} style={{ color: 'var(--salsa-500)' }} /> Mar–Sáb · 2:30–10:45pm
            </span>
          </div>
        </div>
      </header>

      {/* Desplegable de Ubicación */}
      {locOpen && (
        <>
          <div onClick={() => setLocOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'transparent' }} />
          <div style={{ position: 'fixed', top: 72, left: 28, zIndex: 41, width: 340, maxWidth: 'calc(100vw - 56px)', background: 'var(--paper)', border: 'var(--bw-bold) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-pop)', overflow: 'hidden', animation: 'bb-fade-up var(--dur) var(--ease)' }}>
            <LocationPanel />
          </div>
        </>
      )}

      {/* Promo banner */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 28px 0' }}>
        <div style={{ background: 'var(--ink-900)', color: 'var(--bone-50)', borderRadius: 'var(--r-sm)', border: 'var(--bw) solid var(--ink-900)', boxShadow: 'var(--shadow-stamp)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <span className="bb-eyebrow" style={{ color: 'var(--salsa-500)' }}>Promo del día · {promo.day}</span>
            <h2 style={{ fontSize: 44, color: 'var(--bone-50)', lineHeight: 1.02, marginTop: 6 }}>{promo.name}</h2>
            <p style={{ font: 'var(--type-body)', color: 'var(--bone-300)', marginTop: 12 }}>{promo.detail}</p>
          </div>
          <Badge tone="accent">{promo.to}</Badge>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px', display: 'grid', gridTemplateColumns: '232px 1fr', gap: 28, alignItems: 'start' }}>
        <aside style={{ position: 'sticky', top: 86 }}>
          <div className="bb-eyebrow" style={{ marginBottom: 12, paddingLeft: 4 }}>Categorías</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {data.categories.map((c) => {
              const on = c.id === cat;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={{
                  textAlign: 'left', padding: '11px 14px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: on ? 'var(--ink-900)' : 'transparent', color: on ? 'var(--bone-50)' : 'var(--ink-900)',
                  border: 'var(--bw) solid ' + (on ? 'var(--ink-900)' : 'transparent'),
                  borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14.5,
                }}>
                  {c.name}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.6 }}>{data.products.filter((p) => p.cat === c.id).length}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h1 style={{ fontSize: 36 }}>{category.name}</h1>
            {items.some((p) => p.withFood) && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
                <Ic n="beer" size={14} /> Sólo con alimentos
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(232px, 1fr))', gap: 16 }}>
            {items.map((p) => (
              <ProductCard key={p.id} layout="card" name={p.name} description={p.desc} price={p.price}
                image={p.image} badge={p.badge} badgeTone={p.badgeTone} soldOut={!p.active} />
            ))}
          </div>

          <div style={{ marginTop: 28, paddingTop: 20, borderTop: 'var(--bw-hair) solid var(--ink-300)', display: 'flex', gap: 22, flexWrap: 'wrap', color: 'var(--ink-700)' }}>
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', font: 'var(--type-body-sm)' }}><Ic n="clock" size={16} style={{ color: 'var(--ink-500)' }} />{data.info.hours}</span>
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', font: 'var(--type-body-sm)' }}><Ic n="beer" size={16} style={{ color: 'var(--ink-500)' }} />{data.info.rule}</span>
          </div>
        </main>
      </div>
    </div>
  );
}
