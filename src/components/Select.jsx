import React from 'react';

/**
 * Barrio Bamba — Select (lista desplegable nativa, estilizada).
 * Mismo lenguaje que Input: borde negro, etiqueta mono, chevron a la derecha.
 */
export function Select({
  label,
  value,
  onChange,
  options = [],          // [{value, label}] o [string]
  placeholder,           // opción deshabilitada inicial
  name,
  id,
  required = false,
  disabled = false,
  error,
  hint,
  style: styleProp,
  ...rest
}) {
  const fieldId = id || name || (label ? `bb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const invalid = !!error;
  const borderColor = invalid ? 'var(--danger-600)' : 'var(--ink-900)';
  const norm = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));

  return (
    <label htmlFor={fieldId} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...styleProp }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-3xs)',
          textTransform: 'uppercase', letterSpacing: 'var(--ls-caps)', color: 'var(--ink-700)',
        }}>
          {label}{required && <span style={{ color: 'var(--salsa-500)' }}> *</span>}
        </span>
      )}
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{
            appearance: 'none', WebkitAppearance: 'none',
            width: '100%',
            padding: '12px 40px 12px 14px',
            font: 'var(--type-body)', color: value ? 'var(--ink-900)' : 'var(--ink-400)',
            background: disabled ? 'var(--bone-200)' : 'var(--paper)',
            border: `var(--bw) solid ${borderColor}`,
            borderRadius: 'var(--r-sm)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            outline: 'none',
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {norm.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span aria-hidden="true" style={{
          position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: 'var(--ink-700)', fontSize: '12px',
          fontFamily: 'var(--font-mono)',
        }}>▾</span>
      </span>
      {(error || hint) && (
        <span style={{ fontSize: 'var(--fs-2xs)', fontFamily: 'var(--font-body)', color: invalid ? 'var(--danger-600)' : 'var(--ink-500)' }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
