/* Barrio Bamba — panel de Ubicación (dirección + mini-mapa de Google Maps).
   Reutilizable en el desplegable móvil y en el de escritorio. */
import React from 'react';
import { Ic } from '../icons.jsx';
import { MENU, mapsEmbedUrl, mapsLinkUrl } from '../data/menu.js';

export function LocationPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Ic n="map-pin" size={16} style={{ color: 'var(--salsa-500)' }} />
        <span className="bb-eyebrow" style={{ color: 'var(--ink-700)' }}>Ubicación</span>
      </div>

      <p style={{ font: 'var(--type-body-sm)', color: 'var(--ink-800)', lineHeight: 1.45 }}>
        {MENU.info.address}
      </p>

      {/* Mini-mapa de Google Maps */}
      <div style={{ border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-press)', lineHeight: 0 }}>
        <iframe
          title="Mapa de Barrio Bamba"
          src={mapsEmbedUrl}
          width="100%"
          height="150"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={mapsLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '11px 16px', textDecoration: 'none',
          background: 'var(--ink-900)', color: 'var(--bone-50)',
          border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)',
          boxShadow: 'var(--shadow-press)',
          fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12,
          textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)',
        }}
      >
        <Ic n="navigation" size={15} /> Cómo llegar
      </a>
    </div>
  );
}
