/* Barrio Bamba — conexión a Supabase (base de datos + almacenamiento de fotos).
   La clave `anon` es pública por diseño (va en el navegador); la seguridad la dan
   las reglas RLS en Supabase, no esconder la clave. */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vnaotrqdlkdpirjtzowa.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuYW90cnFkbGtkcGlyanR6b3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NzAxNjYsImV4cCI6MjA5NzI0NjE2Nn0.qTni5sC3oIYjUm1-p_L4CUVPtkgR2xCe5BpCxLs78qs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BUCKET = 'product-images';

/** Sube una imagen (Blob) al almacenamiento y devuelve su URL pública. */
export async function uploadProductImage(blob) {
  const path = `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
