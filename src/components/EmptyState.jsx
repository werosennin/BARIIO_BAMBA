import React from 'react';

/**
 * Barrio Bamba — EmptyState.
 * Estado vacío honesto y con personalidad (carrito vacío, sin resultados,
 * sin productos en el panel). Acepta un icono, título, texto y una acción.
 */
export function EmptyState({
  icon = null,           // ReactNode (icono)
  title,
  description,
  action = null,         // ReactNode (un <Button/>)
  variant = 'default',   // 'default' | 'error'
  style: styleProp,
  ...rest
}) {
  const isError = variant === 'error';
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        gap: 'var(--sp-4)', padding: 'var(--sp-10) var(--sp-6)',
        ...styleProp,
      }}
      {...rest}
    >
      {icon && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 64, height: 64,
          border: `var(--bw) solid ${isError ? 'var(--danger-600)' : 'var(--ink-900)'}`,
          borderRadius: 'var(--r-sm)',
          color: isError ? 'var(--danger-600)' : 'var(--ink-900)',
          background: 'var(--paper)',
          boxShadow: 'var(--shadow-stamp)',
        }}>
          {icon}
        </span>
      )}
      <h3 style={{ fontSize: 'var(--fs-2xl)', color: isError ? 'var(--danger-600)' : 'var(--ink-900)' }}>{title}</h3>
      {description && (
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', maxWidth: '32ch' }}>{description}</p>
      )}
      {action && <div style={{ marginTop: 'var(--sp-2)' }}>{action}</div>}
    </div>
  );
}
