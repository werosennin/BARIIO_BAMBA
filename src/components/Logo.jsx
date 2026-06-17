import React from 'react';
import logoSrc from '../assets/logo.png';

/* Logo oficial de Barrio Bamba (lettering cursivo + calavera low-poly con corona).
   `variant="full"` usa el PNG oficial (tinta sobre transparente); `invert` lo vuelve
   claro vía filtro CSS para fondos oscuros. `variant="mark"` rinde una calavera
   geométrica compacta (favicon / esquinas).
   Se importa como módulo para que el build lo incruste en el HTML (file://). */
const LOGO_SRC = logoSrc;

export function Logo({
  variant = 'full',     // 'full' (lockup completo) | 'mark' (calavera compacta)
  size = 40,
  invert = false,       // versión clara (sobre fondo negro)
  color = 'var(--ink-900)',
  title = 'Barrio Bamba',
  style: styleProp,
  ...rest
}) {
  if (variant === 'mark') {
    const fill = invert ? 'var(--bone-50)' : color;
    return (
      <svg width={size} height={size * (230 / 240)} viewBox="0 0 240 230" fill="none" role="img" aria-label={title} style={{ display: 'block', flex: '0 0 auto', ...styleProp }} {...rest}>
        <path d="M86,58 L86,40 L104,50 L120,28 L136,50 L154,40 L154,58 Z" fill={fill} />
        <circle cx="86" cy="40" r="4.5" fill={fill} />
        <circle cx="120" cy="28" r="5" fill={fill} />
        <circle cx="154" cy="40" r="4.5" fill={fill} />
        <path fillRule="evenodd" fill={fill} d="M92,60 L148,60 L170,80 L176,120 L158,150 L150,176 L134,196 L120,202 L106,196 L90,176 L82,150 L64,120 L70,80 Z M100,100 L112,112 L100,124 L88,112 Z M140,100 L152,112 L140,124 L128,112 Z M120,150 L112,134 L128,134 Z M108,178 L112,178 L112,196 L108,196 Z M118,180 L122,180 L122,200 L118,200 Z M128,178 L132,178 L132,196 L128,196 Z" />
      </svg>
    );
  }
  return (
    <img src={LOGO_SRC} alt={title} style={{ height: size, width: 'auto', display: 'block', filter: invert ? 'invert(1)' : 'none', ...styleProp }} {...rest} />
  );
}
