/* Barrio Bamba — Cliente · shell y helpers compartidos */
import React from 'react';
import { Logo } from '../components/index.js';
import { Ic } from '../icons.jsx';

// Barra de navegador (refuerza que es un sitio web vía QR)
export function BrowserChrome() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
      padding: '8px 14px', background: 'var(--bone-200)',
      borderBottom: 'var(--bw-hair) solid var(--ink-300)',
      fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)',
    }}>
      <Ic n="lock" size={12} />
      <span style={{ letterSpacing: '0.02em' }}>barriobamba.mx</span>
    </div>
  );
}

// Cabecera de la app (menú digital — sin carrito)
export function AppHeader({ onBack, title, onMenu }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 14px', minHeight: 58,
      background: 'var(--ink-900)', color: 'var(--bone-50)',
    }}>
      {onBack ? (
        <button onClick={onBack} aria-label="Volver" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, color: 'var(--bone-50)', background: 'transparent',
          border: 'var(--bw-hair) solid var(--line-on-ink)', borderRadius: 'var(--r-sm)', cursor: 'pointer',
        }}><Ic n="arrow-left" /></button>
      ) : (
        <button onClick={onMenu} aria-label="Menú" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 38, height: 38, color: 'var(--bone-50)', background: 'transparent',
          border: 'var(--bw-hair) solid var(--line-on-ink)', borderRadius: 'var(--r-sm)', cursor: 'pointer',
        }}><Ic n="menu" /></button>
      )}

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {title ? (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, textTransform: 'uppercase', letterSpacing: 'var(--ls-display)' }}>{title}</span>
        ) : (
          <Logo size={30} invert />
        )}
      </div>

      {/* Espaciador para mantener el logo centrado */}
      <div style={{ width: 38, flex: '0 0 auto' }} />
    </header>
  );
}

// Riel de categorías (scroll horizontal)
export function CategoryRail({ categories, active, onPick }) {
  return (
    <div style={{
      position: 'sticky', top: 58, zIndex: 18,
      display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 14px',
      background: 'var(--surface-page)', borderBottom: 'var(--bw-hair) solid var(--ink-200)',
      WebkitOverflowScrolling: 'touch',
    }}>
      {categories.map((c) => {
        const on = c.id === active;
        return (
          <button key={c.id} onClick={() => onPick(c.id)} style={{
            flex: '0 0 auto', padding: '8px 14px', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
            textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', whiteSpace: 'nowrap',
            color: on ? 'var(--bone-50)' : 'var(--ink-900)',
            background: on ? 'var(--ink-900)' : 'var(--paper)',
            border: 'var(--bw) solid var(--ink-900)', borderRadius: 999,
            boxShadow: on ? 'none' : 'var(--shadow-press)',
          }}>{c.name}</button>
        );
      })}
    </div>
  );
}

// Aviso de regla de negocio / horario
export function RuleBar({ icon = 'info', children, tone = 'ink' }) {
  const dark = tone === 'ink';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
      background: dark ? 'var(--ink-900)' : 'var(--bone-200)',
      color: dark ? 'var(--bone-100)' : 'var(--ink-700)',
      fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.4,
      letterSpacing: 'var(--ls-mono)', textTransform: 'uppercase',
    }}>
      <Ic n={icon} size={15} style={{ color: dark ? 'var(--salsa-500)' : 'var(--ink-500)' }} />
      <span>{children}</span>
    </div>
  );
}
