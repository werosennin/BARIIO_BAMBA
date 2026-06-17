/* Barrio Bamba — router + conmutador de superficies (cliente móvil / escritorio / admin) */
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ClienteApp } from './cliente/ClienteApp.jsx';
import { ClienteDesktop } from './cliente/ClienteDesktop.jsx';
import { AdminApp } from './admin/AdminApp.jsx';

const LINKS = [
  { to: '/', label: 'Cliente', end: true },
  { to: '/desktop', label: 'Escritorio', end: false },
  { to: '/admin', label: 'Admin', end: false },
];

// Conmutador flotante para revisar las tres superficies. Quítalo en producción
// (cada superficie se sirve por separado: cliente en la raíz, panel en /admin).
function SurfaceSwitcher() {
  return (
    <nav style={{
      position: 'fixed', top: 12, right: 12, zIndex: 100,
      display: 'flex', gap: 4, padding: 4,
      background: 'var(--ink-900)', borderRadius: 999, boxShadow: 'var(--shadow-pop)',
    }}>
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} style={({ isActive }) => ({
          padding: '6px 12px', borderRadius: 999, textDecoration: 'none',
          fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5,
          textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)',
          color: isActive ? 'var(--ink-900)' : 'var(--bone-200)',
          background: isActive ? 'var(--bone-50)' : 'transparent',
        })}>{l.label}</NavLink>
      ))}
    </nav>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SurfaceSwitcher />
      <Routes>
        <Route path="/" element={<ClienteApp />} />
        <Route path="/desktop" element={<ClienteDesktop />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="*" element={<ClienteApp />} />
      </Routes>
    </HashRouter>
  );
}
