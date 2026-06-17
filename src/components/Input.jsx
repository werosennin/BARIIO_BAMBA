import React from 'react';

/**
 * Barrio Bamba — Input (campo de texto con etiqueta).
 * Borde negro duro, etiqueta mono MAYÚSCULAS, soporte de error/hint y addons.
 */
export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
  id,
  required = false,
  disabled = false,
  error,                 // string → estado de error
  hint,                  // texto de ayuda
  prefix,                // p. ej. "$"
  suffix,                // p. ej. "MXN"
  style: styleProp,
  ...rest
}) {
  const fieldId = id || name || (label ? `bb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const invalid = !!error;
  const borderColor = invalid ? 'var(--danger-600)' : 'var(--ink-900)';

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
      <span style={{
        display: 'flex', alignItems: 'center',
        background: disabled ? 'var(--bone-200)' : 'var(--paper)',
        border: `var(--bw) solid ${borderColor}`,
        borderRadius: 'var(--r-sm)',
        opacity: disabled ? 0.6 : 1,
        transition: 'box-shadow var(--dur) var(--ease)',
      }}>
        {prefix && <span style={{ paddingLeft: '12px', display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', color: 'var(--ink-500)' }}>{prefix}</span>}
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onFocus={(e) => { e.currentTarget.parentElement.style.boxShadow = `inset 0 0 0 1px ${borderColor}`; }}
          onBlur={(e) => { e.currentTarget.parentElement.style.boxShadow = 'none'; }}
          style={{
            flex: 1, minWidth: 0,
            padding: '12px 14px',
            font: 'var(--type-body)', color: 'var(--ink-900)',
            background: 'transparent', border: 'none', outline: 'none',
            borderRadius: 'var(--r-sm)',
          }}
          {...rest}
        />
        {suffix && <span style={{ paddingRight: '12px', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--ink-500)' }}>{suffix}</span>}
      </span>
      {(error || hint) && (
        <span style={{
          font: 'var(--type-body-sm)', fontSize: 'var(--fs-2xs)',
          color: invalid ? 'var(--danger-600)' : 'var(--ink-500)',
        }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
