import React from 'react';

/**
 * Barrio Bamba — Button
 * Estética "sello": borde negro duro + sombra desplazada que se hunde al presionar.
 * Texto en mono MAYÚSCULAS (vibe ticket de cocina).
 */
export function Button({
  children,
  variant = 'solid',      // 'solid' | 'accent' | 'outline' | 'ghost'
  size = 'md',            // 'sm' | 'md' | 'lg'
  block = false,
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style: styleProp,
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 'var(--fs-3xs)', gap: '6px' },
    md: { padding: '12px 20px', fontSize: 'var(--fs-2xs)', gap: '8px' },
    lg: { padding: '16px 26px', fontSize: 'var(--fs-xs)', gap: '10px' },
  };

  const palettes = {
    solid:   { bg: 'var(--ink-900)',   fg: 'var(--bone-50)',  bd: 'var(--ink-900)', stamp: true },
    accent:  { bg: 'var(--salsa-500)', fg: 'var(--bone-50)',  bd: 'var(--ink-900)', stamp: true },
    outline: { bg: 'transparent',      fg: 'var(--ink-900)',  bd: 'var(--ink-900)', stamp: true },
    ghost:   { bg: 'transparent',      fg: 'var(--ink-900)',  bd: 'transparent',    stamp: false },
  };
  const p = palettes[variant] || palettes.solid;
  const off = disabled || loading;

  const base = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes[size].gap,
    padding: sizes[size].padding,
    fontFamily: 'var(--font-mono)',
    fontWeight: 'var(--fw-bold)',
    fontSize: sizes[size].fontSize,
    textTransform: 'uppercase',
    letterSpacing: 'var(--ls-caps)',
    lineHeight: 1,
    color: p.fg,
    background: p.bg,
    border: `var(--bw) solid ${p.bd}`,
    borderRadius: 'var(--r-sm)',
    boxShadow: p.stamp ? 'var(--shadow-stamp)' : 'none',
    cursor: off ? 'not-allowed' : 'pointer',
    opacity: off ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease), background var(--dur) var(--ease)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    ...styleProp,
  };

  const onDown = (e) => {
    if (off || !p.stamp) return;
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-press)';
  };
  const onUp = (e) => {
    if (off || !p.stamp) return;
    e.currentTarget.style.transform = 'translate(-1px, -1px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-stamp-lg)';
  };
  const onEnter = (e) => {
    if (off) return;
    if (p.stamp) {
      e.currentTarget.style.transform = 'translate(-1px, -1px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-stamp-lg)';
    } else {
      e.currentTarget.style.background = 'var(--bone-200)';
    }
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = p.stamp ? 'var(--shadow-stamp)' : 'none';
    if (!p.stamp) e.currentTarget.style.background = p.bg;
  };

  return (
    <button
      type={type}
      disabled={off}
      onClick={onClick}
      style={base}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {loading ? <Spinner /> : iconLeft}
      {children && <span>{children}</span>}
      {!loading && iconRight}
    </button>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: '1em', height: '1em',
        border: '2px solid currentColor',
        borderRightColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'bb-spin 0.7s linear infinite',
      }}
    />
  );
}
