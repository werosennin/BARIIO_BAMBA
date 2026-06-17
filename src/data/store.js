/* Barrio Bamba — almacén del menú en la NUBE (Supabase).
   El menú (productos + promociones) vive en una fila JSON de la tabla `menu`.
   Los clientes lo leen (lectura pública); el admin lo guarda (requiere login).
   Así las fotos y cambios se ven desde cualquier dispositivo. */
import React from 'react';
import { MENU as DEFAULT_MENU } from './menu.js';
import { supabase } from './supabase.js';

const clone = (o) => JSON.parse(JSON.stringify(o));

// Estado inicial: el menú por defecto (para que la UI nunca esté vacía mientras carga).
let state = clone(DEFAULT_MENU);
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

// Carga el menú guardado desde la nube y reemplaza el estado.
async function fetchMenu() {
  try {
    const { data, error } = await supabase.from('menu').select('data').eq('id', 1).maybeSingle();
    if (error) { console.warn('Menú (nube): ', error.message); return; }
    if (data && data.data) {
      const saved = data.data;
      state = {
        categories: DEFAULT_MENU.categories,
        info: DEFAULT_MENU.info,
        products: Array.isArray(saved.products) ? saved.products : state.products,
        promos: Array.isArray(saved.promos) ? saved.promos : state.promos,
      };
      emit();
    }
  } catch (e) {
    console.warn('Menú (nube) no disponible, usando valores por defecto.');
  }
}
fetchMenu();

// Guarda el menú completo en la nube (sólo funciona con sesión de admin).
async function persist() {
  try {
    const { error } = await supabase
      .from('menu')
      .upsert({ id: 1, data: { products: state.products, promos: state.promos }, updated_at: new Date().toISOString() });
    if (error) {
      alert('No se pudo guardar en la nube: ' + error.message + '\n(¿Iniciaste sesión como admin?)');
    }
  } catch (e) {
    alert('No se pudo guardar en la nube. Revisa tu conexión.');
  }
}

export function getMenu() { return state; }
export function refreshMenu() { return fetchMenu(); }

export function setProducts(products) { state = { ...state, products }; emit(); persist(); }
export function setPromos(promos) { state = { ...state, promos }; emit(); persist(); }
export function resetMenu() { state = clone(DEFAULT_MENU); emit(); persist(); }

/** Hook de React: re-renderiza cuando cambia el menú (local o al llegar de la nube). */
export function useMenu() {
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    const fn = () => force();
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, []);
  return state;
}
