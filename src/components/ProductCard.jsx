import React from 'react';
import { Badge } from './Badge.jsx';
import { IconButton } from './IconButton.jsx';

/**
 * Barrio Bamba — ProductCard.
 * Tarjeta de platillo: foto, nombre, descripción corta, precio y "agregar".
 * Dos layouts: `row` (lista de menú, mobile) y `card` (destacado / grid).
 * Maneja el estado agotado/desactivado (foto en gris + sello + botón apagado).
 */
export function ProductCard({
  name,
  description,
  price,                 // número en MXN
  image,                 // url; si falta → placeholder "sin foto"
  badge,                 // texto de promo/nuevo (opcional)
  badgeTone = 'accent',
  soldOut = false,
  layout = 'row',        // 'row' | 'card'
  currency = '$',
  onAdd,
  onClick,
  style: styleProp,
  ...rest
}) {
  const isCard = layout === 'card';
  const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('es-MX') : n);

  const Photo = (
    <div style={{
      position: 'relative',
      flex: isCard ? undefined : '0 0 auto',
      width: isCard ? '100%' : 92,
      height: isCard ? 168 : 92,
      borderRadius: 'var(--r-sm)',
      overflow: 'hidden',
      border: 'var(--bw-hair) solid var(--ink-200)',
      background: image
        ? `center/cover no-repeat url("${image}")`
        : 'repeating-linear-gradient(45deg, var(--bone-200) 0 8px, var(--bone-100) 8px 16px)',
      filter: soldOut ? 'grayscale(1) opacity(0.65)' : 'none',
    }}>
      {!image && (
        <span style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-3xs)',
          letterSpacing: 'var(--ls-mono)', textTransform: 'uppercase', color: 'var(--ink-400)',
        }}>Sin foto</span>
      )}
      {badge && !soldOut && (
        <Badge tone={badgeTone} size="sm" corner>{badge}</Badge>
      )}
      {soldOut && <Badge tone="soldout" size="sm" corner>Agotado</Badge>}
    </div>
  );

  const Body = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
      <h4 style={{
        fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-md)',
        textTransform: 'none', letterSpacing: 0, lineHeight: 1.2,
        color: soldOut ? 'var(--ink-500)' : 'var(--ink-900)',
      }}>{name}</h4>
      {description && (
        <p style={{
          font: 'var(--type-body-sm)', color: 'var(--text-muted)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{description}</p>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '10px', marginTop: 'auto', paddingTop: '6px',
      }}>
        <span className="bb-tnum" style={{
          font: 'var(--type-price)',
          color: soldOut ? 'var(--ink-400)' : 'var(--ink-900)',
          textDecoration: soldOut ? 'line-through' : 'none',
        }}>{currency}{fmt(price)}</span>
        {/* El botón "agregar" solo aparece cuando se pasa onAdd (modo pedido). */}
        {onAdd && (
          <IconButton
            label={soldOut ? 'Agotado' : `Agregar ${name}`}
            variant={soldOut ? 'ghost' : 'solid'}
            size="sm"
            disabled={soldOut}
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 18, lineHeight: 1 }}>＋</span>
          </IconButton>
        )}
      </div>
    </div>
  );

  return (
    <article
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: isCard ? 'column' : 'row',
        gap: 'var(--sp-3)',
        padding: 'var(--sp-3)',
        background: 'var(--surface-card)',
        border: 'var(--bw) solid var(--ink-900)',
        borderRadius: 'var(--r-sm)',
        boxShadow: 'var(--shadow-stamp)',
        cursor: onClick ? 'pointer' : 'default',
        opacity: soldOut ? 0.92 : 1,
        ...styleProp,
      }}
      {...rest}
    >
      {Photo}
      {Body}
    </article>
  );
}
