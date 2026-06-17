import React from 'react';

/**
 * Barrio Bamba — Badge.
 * Sello pequeño para estados y promos: "PROMO", "NUEVO", "AGOTADO", "ACTIVA".
 * tone controla el color; usa `corner` para pegarlo a la esquina de una tarjeta.
 */
export function Badge({
  children,
  tone = 'ink',        // 'ink' | 'accent' | 'outline' | 'soldout' | 'success'
  size = 'md',         // 'sm' | 'md'
  dot = false,         // punto de estado a la izquierda
  corner = false,      // posiciona absoluto arriba-izquierda (tarjeta relative)
  style: styleProp,
  ...rest
}) {
  const tones = {
    ink:     { bg: 'var(--ink-900)',   fg: 'var(--bone-50)',  bd: 'var(--ink-900)' },
    accent:  { bg: 'var(--salsa-500)', fg: 'var(--bone-50)',  bd: 'var(--salsa-500)' },
    outline: { bg: 'var(--paper)',     fg: 'var(--ink-900)',  bd: 'var(--ink-900)' },
    soldout: { bg: 'var(--soldout-fill)', fg: 'var(--soldout-fg)', bd: 'transparent' },
    success: { bg: 'var(--ok-100)',    fg: 'var(--ok-600)',   bd: 'transparent' },
  };
  const t = tones[tone] || tones.ink;
  const pad = size === 'sm' ? '3px 7px' : '5px 10px';
  const fs = size === 'sm' ? 'var(--fs-3xs)' : 'var(--fs-2xs)';

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        padding: pad,
        fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: fs,
        textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', lineHeight: 1,
        color: t.fg, background: t.bg,
        border: `var(--bw-hair) solid ${t.bd}`,
        borderRadius: 'var(--r-xs)',
        whiteSpace: 'nowrap',
        ...(corner ? { position: 'absolute', top: '10px', left: '10px', zIndex: 2, boxShadow: 'var(--shadow-press)' } : null),
        ...styleProp,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}
