import React from 'react';

/**
 * Barrio Bamba — Tag / Chip mono.
 * Etiqueta corta tipo "ticket": categorías, filtros, metadatos. MAYÚSCULAS mono.
 */
export function Tag({
  children,
  variant = 'default', // 'default' | 'solid' | 'outline'
  active = false,
  size = 'md',         // 'sm' | 'md'
  onClick,
  style: styleProp,
  ...rest
}) {
  const isInteractive = !!onClick;
  const pad = size === 'sm' ? '4px 8px' : '6px 12px';
  const fs = size === 'sm' ? 'var(--fs-3xs)' : 'var(--fs-2xs)';

  const looks = {
    default: { bg: 'var(--bone-200)', fg: 'var(--ink-700)', bd: 'transparent' },
    outline: { bg: 'transparent',     fg: 'var(--ink-900)', bd: 'var(--ink-900)' },
    solid:   { bg: 'var(--ink-900)',  fg: 'var(--bone-50)', bd: 'var(--ink-900)' },
  };
  let look = looks[variant] || looks.default;
  if (active) look = looks.solid;

  return (
    <span
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: pad,
        fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)',
        fontSize: fs, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)',
        lineHeight: 1, whiteSpace: 'nowrap',
        color: look.fg, background: look.bg,
        border: `var(--bw-hair) solid ${look.bd}`,
        borderRadius: 'var(--r-pill)',
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
        ...styleProp,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
