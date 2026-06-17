import React from 'react';
import { IconButton } from './IconButton.jsx';

/**
 * Barrio Bamba — QtyStepper.
 * Control de cantidad para el carrito: − [n] +. Mono, borde negro.
 */
export function QtyStepper({
  value = 1,
  min = 0,
  max = 99,
  onChange,
  size = 'md',          // 'sm' | 'md'
  style: styleProp,
  ...rest
}) {
  const set = (n) => { const v = Math.max(min, Math.min(max, n)); if (v !== value) onChange && onChange(v); };
  const btn = size === 'sm' ? 'sm' : 'md';
  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', ...styleProp }}
      {...rest}
    >
      <IconButton label="Quitar uno" variant="outline" size={btn} disabled={value <= min} onClick={() => set(value - 1)}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 18, lineHeight: 1 }}>−</span>
      </IconButton>
      <span className="bb-tnum" style={{
        minWidth: size === 'sm' ? 24 : 30, textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-md)',
        color: 'var(--ink-900)',
      }}>{value}</span>
      <IconButton label="Agregar uno" variant="outline" size={btn} disabled={value >= max} onClick={() => set(value + 1)}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 18, lineHeight: 1 }}>＋</span>
      </IconButton>
    </div>
  );
}
