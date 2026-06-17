import React from 'react';

/**
 * Barrio Bamba — Skeleton.
 * Bloque de carga (estado "cargando") con pulso sutil. Compón varios para
 * armar la silueta de una tarjeta de producto o una fila del panel.
 */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = 'var(--r-xs)',
  block = false,
  style: styleProp,
  ...rest
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: block ? 'block' : 'inline-block',
        width, height,
        background: 'var(--bone-200)',
        border: 'var(--bw-hair) solid var(--bone-300)',
        borderRadius: radius,
        animation: 'bb-pulse 1.2s var(--ease) infinite',
        ...styleProp,
      }}
      {...rest}
    />
  );
}
