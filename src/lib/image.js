/* Barrio Bamba — utilidad de imagen.
   Convierte un archivo elegido por el usuario en un data-URL reducido (redimensionado
   y comprimido a JPEG) para que las fotos pesen poco y quepan en el almacenamiento. */
export function fileToDownscaledDataUrl(file, maxDim = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('No se pudo decodificar la imagen.'));
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > maxDim || h > maxDim) {
          if (w >= h) { h = Math.round((h * maxDim) / w); w = maxDim; }
          else { w = Math.round((w * maxDim) / h); h = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
