/* Barrio Bamba — Admin · shell (login, layout, helpers) */
import React from 'react';
import { Logo, Button, Input } from '../components/index.js';
import { Ic } from '../icons.jsx';

// ---- LOGIN ----
export function AdminLogin({ onLogin }) {
  const [u, setU] = React.useState('dueno');
  const [p, setP] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!p) { setErr('Escribe tu contraseña'); return; }
    onLogin();
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--surface-page)' }}>
      <form onSubmit={submit} style={{ width: 380, maxWidth: '100%', background: 'var(--paper)', border: 'var(--bw-bold) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp-lg)', padding: '34px 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <Logo size={56} />
        </div>
        <div className="bb-eyebrow" style={{ textAlign: 'center', marginBottom: 26 }}>Panel de administración</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Usuario" value={u} onChange={(e) => setU(e.target.value)} />
          <Input label="Contraseña" type="password" placeholder="••••••••" value={p} onChange={(e) => { setP(e.target.value); setErr(''); }} error={err} />
          <Button type="submit" block size="lg">Entrar</Button>
        </div>
        <p style={{ marginTop: 18, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>Demo · escribe cualquier contraseña</p>
      </form>
    </div>
  );
}

// ---- LAYOUT ----
export const NAV = [
  { id: 'tablero', label: 'Tablero', icon: 'layout-dashboard' },
  { id: 'productos', label: 'Productos', icon: 'utensils' },
  { id: 'promos', label: 'Promociones', icon: 'tag' },
  { id: 'precios', label: 'Precios', icon: 'dollar-sign' },
];

export function AdminLayout({ active, onNav, onLogout, title, action, children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--surface-page)' }}>
      {/* Sidebar */}
      <aside style={{ width: 236, flex: '0 0 236px', background: 'var(--ink-900)', color: 'var(--bone-100)', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '22px 20px', borderBottom: '1px solid var(--line-on-ink)' }}>
          <Logo size={30} invert />
        </div>
        <nav style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV.map((n) => {
            const on = n.id === active;
            return (
              <button key={n.id} onClick={() => onNav(n.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', cursor: 'pointer',
                background: on ? 'var(--bone-50)' : 'transparent', color: on ? 'var(--ink-900)' : 'var(--bone-200)',
                border: 'none', borderRadius: 'var(--r-sm)',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)',
              }}>
                <Ic n={n.icon} size={17} />{n.label}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 14, borderTop: '1px solid var(--line-on-ink)' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 13px', cursor: 'pointer', background: 'transparent', color: 'var(--ink-300)', border: '1px solid var(--line-on-ink)', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
            <Ic n="log-out" size={15} />Salir
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--paper)', borderBottom: 'var(--bw) solid var(--ink-900)', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <h1 style={{ fontSize: 28 }}>{title}</h1>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px', border: 'var(--bw-hair) solid var(--ok-600)', borderRadius: 999, color: 'var(--ok-600)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--ok-600)' }} />Abierto
            </span>
            {action}
            <span style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', background: 'var(--ink-900)', color: 'var(--bone-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16 }}>B</span>
          </div>
        </header>
        <main style={{ padding: 28, flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}

// ---- Tarjeta de stat ----
export function AdminStatCard({ label, value, sub, icon }) {
  return (
    <div style={{ background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp)', padding: '18px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="bb-eyebrow">{label}</span>
        <Ic n={icon} size={18} style={{ color: 'var(--ink-400)' }} />
      </div>
      <div className="bb-tnum" style={{ font: 'var(--type-display)', fontSize: 44, color: 'var(--ink-900)', marginTop: 10, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ---- Drawer lateral ----
export function AdminDrawer({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'var(--overlay)' }} />
      <div style={{ position: 'relative', width: 420, maxWidth: '92vw', height: '100%', background: 'var(--surface-page)', borderLeft: 'var(--bw-bold) solid var(--ink-900)', boxShadow: 'var(--shadow-pop)', display: 'flex', flexDirection: 'column', animation: 'bb-fade-up var(--dur) var(--ease)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: 'var(--bw) solid var(--ink-900)', background: 'var(--paper)' }}>
          <h2 style={{ fontSize: 24 }}>{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'var(--bw-hair) solid var(--ink-900)', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}><Ic n="x" size={18} /></button>
        </div>
        <div style={{ padding: 22, overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: 18, borderTop: 'var(--bw) solid var(--ink-900)', background: 'var(--paper)', display: 'flex', gap: 12 }}>{footer}</div>}
      </div>
    </div>
  );
}
