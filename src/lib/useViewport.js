/* Barrio Bamba — detector de tamaño de pantalla (para layouts responsivos).
   Como la app usa estilos en línea, usamos el ancho de la ventana en JS en vez
   de media queries de CSS. */
import React from 'react';

export function useViewport() {
  const get = () => (typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [width, setWidth] = React.useState(get);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return {
    width,
    isMobile: width < 768,   // teléfonos
    isNarrow: width < 1024,  // teléfonos + tablets chicas
  };
}
