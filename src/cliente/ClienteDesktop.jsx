/* Barrio Bamba — Cliente · vista escritorio (menú digital responsivo, sin pedidos ni reservaciones) */
import React from 'react';
import { Logo, ProductCard, Badge } from '../components/index.js';
import { Ic } from '../icons.jsx';
import { LocationPanel } from './Ubicacion.jsx';
import { useMenu } from '../data/store.js';
import { useViewport } from '../lib/useViewport.js';

/* Carrusel horizontal de promociones activas. Avanza solo cada 5s (se pausa al
   pasar el cursor) y se puede deslizar; los puntos de abajo navegan. */
function PromoCarousel({ promos, isMobile }) {
  const trackRef = React.useRef(null);
  const pausedRef = React.useRef(false);
  const [active, setActive] = React.useState(0);
  const many = promos.length > 1;

  React.useEffect(() => {
    if (!many) return undefined;
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const w = el.clientWidth || 1;
      const next = Math.round(el.scrollLeft / w) + 1;
      el.scrollTo({ left: (next >= promos.length ? 0 : next) * w, behavior: 'smooth' });
    }, 5000);
    return () => clearInterval(id);
  }, [many, promos.length]);

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / (el.clientWidth || 1)));
  };
  const goTo = (i) => { const el = trackRef.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' }); };

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div ref={trackRef} onScroll={onScroll} className="bb-hide-scroll" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', borderRadius: 'var(--r-sm)' }}>
        {promos.map((p) => (
          <div key={p.id} style={{ flex: '0 0 100%', minWidth: '100%', scrollSnapAlign: 'start', display: 'flex' }}>
            <div style={{ flex: 1, background: 'var(--ink-900)', color: 'var(--bone-50)', borderRadius: 'var(--r-sm)', border: 'var(--bw) solid var(--ink-900)', boxShadow: 'var(--shadow-stamp)', padding: isMobile ? '18px 18px 20px' : '24px 28px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 12 : 24 }}>
              <div>
                <span className="bb-eyebrow" style={{ color: 'var(--salsa-500)' }}>Promo · {p.day}</span>
                <h2 style={{ fontSize: isMobile ? 32 : 44, color: 'var(--bone-50)', lineHeight: 1.02, marginTop: 6 }}>{p.name}</h2>
                <p style={{ font: 'var(--type-body)', color: 'var(--bone-300)', marginTop: 12 }}>{p.detail}</p>
              </div>
              <Badge tone="accent">{p.to}</Badge>
            </div>
          </div>
        ))}
      </div>

      {many && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
          {promos.map((p, i) => (
            <button key={p.id} onClick={() => goTo(i)} aria-label={`Ver promoción ${i + 1}`} style={{
              width: i === active ? 24 : 10, height: 10, padding: 0, cursor: 'pointer',
              background: i === active ? 'var(--ink-900)' : 'transparent',
              border: '1.5px solid var(--ink-900)', borderRadius: 999,
              transition: 'width var(--dur) var(--ease), background var(--dur) var(--ease)',
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ClienteDesktop() {
  const data = useMenu();
  const { isMobile } = useViewport();
  const [cat, setCat] = React.useState('tacos');
  const [locOpen, setLocOpen] = React.useState(false);

  const category = data.categories.find((c) => c.id === cat);
  const items = data.products.filter((p) => p.cat === cat);
  const activePromos = data.promos.filter((p) => p.active);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--ink-900)', color: 'var(--bone-50)', borderBottom: '2.5px solid var(--ink-900)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '12px 16px' : '14px 28px', display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 24 }}>
          <Logo size={isMobile ? 28 : 34} invert />
          <nav style={{ marginLeft: isMobile ? 0 : 8, display: 'flex', gap: isMobile ? 14 : 22 }}>
            {['Menú', 'Ubicación'].map((n, i) => (
              <a key={n} href="#" onClick={(e) => { e.preventDefault(); if (n === 'Ubicación') setLocOpen((o) => !o); }} style={{ textDecoration: 'none', color: i === 0 ? 'var(--bone-50)' : 'var(--ink-300)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: isMobile ? 11 : 12, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>{n}</a>
            ))}
          </nav>
          {!isMobile && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--bone-300)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
                <Ic n="clock" size={14} style={{ color: 'var(--salsa-500)' }} /> Mar–Sáb · 2:30–10:45pm
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Promociones activas (carrusel horizontal) */}
      {activePromos.length > 0 && (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '16px 14px 0' : '24px 28px 0' }}>
          <PromoCarousel promos={activePromos} isMobile={isMobile} />
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '16px 14px' : '28px', display: isMobile ? 'block' : 'grid', gridTemplateColumns: isMobile ? undefined : '232px 1fr', gap: 28, alignItems: 'start' }}>
        {/* Categorías: barra horizontal en móvil, sidebar en escritorio */}
        {isMobile ? (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '2px 0 14px', WebkitOverflowScrolling: 'touch' }}>
            {data.categories.map((c) => {
              const on = c.id === cat;
              return (
                <button key={c.id} onClick={() => setCat(c.id)} style={{
                  flex: '0 0 auto', padding: '8px 14px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', whiteSpace: 'nowrap',
                  color: on ? 'var(--bone-50)' : 'var(--ink-900)', background: on ? 'var(--ink-900)' : 'var(--paper)',
                  border: 'var(--bw) solid var(--ink-900)', borderRadius: 999, boxShadow: on ? 'none' : 'var(--shadow-press)',
                }}>{c.name}</button>
              );
            })}
          </div>
        ) : (
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
        )}

        <main>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
            <h1 style={{ fontSize: isMobile ? 28 : 36 }}>{category.name}</h1>
            {items.some((p) => p.withFood) && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', textAlign: 'right' }}>
                <Ic n="beer" size={14} /> Sólo con alimentos
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? 150 : 232}px, 1fr))`, gap: isMobile ? 12 : 16 }}>
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

      {/* Desplegable de Ubicación */}
      {locOpen && (
        <>
          <div onClick={() => setLocOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'transparent' }} />
          <div style={{ position: 'fixed', top: 72, left: isMobile ? 14 : 28, right: isMobile ? 14 : 'auto', zIndex: 41, width: isMobile ? 'auto' : 340, maxWidth: 'calc(100vw - 28px)', background: 'var(--paper)', border: 'var(--bw-bold) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-pop)', overflow: 'hidden', animation: 'bb-fade-up var(--dur) var(--ease)' }}>
            <LocationPanel />
          </div>
        </>
      )}
    </div>
  );
}
