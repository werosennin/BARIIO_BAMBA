/* Barrio Bamba — utilidad de imagen.
   Redimensiona y comprime una imagen elegida por el usuario antes de subirla,
   para que pese poco (carga rápida para los clientes). */

function drawToCanvas(file, maxDim) {
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
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/** Devuelve un Blob JPEG redimensionado (para subir a la nube). */
export async function fileToDownscaledBlob(file, maxDim = 1200, quality = 0.82) {
  const canvas = await drawToCanvas(file, maxDim);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo convertir la imagen.'))),
      'image/jpeg',
      quality,
    );
  });
}
