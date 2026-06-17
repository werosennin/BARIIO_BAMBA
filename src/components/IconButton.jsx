import React from 'react';

/** Barrio Bamba — IconButton. Botón cuadrado de sólo icono (cabecera, carrito, stepper). */
export function IconButton({
  children,            // un icono
  label,               // aria-label (obligatorio para accesibilidad)
  variant = 'outline', // 'solid' | 'outline' | 'ghost'
  size = 'md',         // 'sm' | 'md' | 'lg'
  disabled = false,
  onClick,
  style: styleProp,
  ...rest
}) {
  const dims = { sm: 34, md: 42, lg: 50 };
  const palettes = {
    solid:   { bg: 'var(--ink-900)', fg: 'var(--bone-50)', bd: 'var(--ink-900)' },
    outline: { bg: 'var(--paper)',   fg: 'var(--ink-900)', bd: 'var(--ink-900)' },
    ghost:   { bg: 'transparent',    fg: 'var(--ink-900)', bd: 'transparent' },
  };
  const p = palettes[variant] || palettes.outline;
  const d = dims[size];

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: d, height: d,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: p.fg, background: p.bg,
        border: `var(--bw) solid ${p.bd}`,
        borderRadius: 'var(--r-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur) var(--ease), transform var(--dur-fast) var(--ease)',
        WebkitTapHighlightColor: 'transparent',
        ...styleProp,
      }}
      onMouseEnter={(e) => { if (!disabled && variant === 'ghost') e.currentTarget.style.background = 'var(--bone-200)'; }}
      onMouseLeave={(e) => { if (variant === 'ghost') e.currentTarget.style.background = 'transparent'; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.92)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
