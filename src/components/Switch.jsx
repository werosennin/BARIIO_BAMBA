import React from 'react';

/**
 * Barrio Bamba — Switch (activar/desactivar).
 * Interruptor con borde negro; ON = relleno tinta. Para "platillo
 * disponible/agotado", "promo activa", etc.
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',          // 'sm' | 'md'
  style: styleProp,
  ...rest
}) {
  const W = size === 'sm' ? 38 : 46;
  const H = size === 'sm' ? 22 : 26;
  const K = H - 8;
  const control = (
    <span
      role="switch"
      aria-checked={checked}
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onChange && onChange(!checked)}
      onKeyDown={(e) => { if (!disabled && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); onChange && onChange(!checked); } }}
      style={{
        position: 'relative', display: 'inline-block', width: W, height: H,
        background: checked ? 'var(--ink-900)' : 'var(--bone-200)',
        border: 'var(--bw) solid var(--ink-900)', borderRadius: 999,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur) var(--ease)', flex: '0 0 auto',
        ...styleProp,
      }}
      {...rest}
    >
      <span style={{
        position: 'absolute', top: 2.5, left: checked ? W - K - 4.5 : 2.5,
        width: K, height: K, borderRadius: 999,
        background: checked ? 'var(--bone-50)' : 'var(--ink-900)',
        transition: 'left var(--dur) var(--ease), background var(--dur) var(--ease)',
      }} />
    </span>
  );
  if (!label) return control;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {control}
      <span style={{ font: 'var(--type-body-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--ink-900)' }}>{label}</span>
    </label>
  );
}
