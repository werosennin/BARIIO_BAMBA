/* Barrio Bamba — almacén del menú con persistencia en el navegador (localStorage).
   Sin servidor: los cambios del panel (productos, precios, promos, fotos) se guardan
   en ESTE navegador/dispositivo y sobreviven a recargas. El cliente lee de aquí, así
   que las fotos subidas aparecen en el menú (en el mismo dispositivo). */
import React from 'react';
import { MENU as DEFAULT_MENU } from './menu.js';

const KEY = 'bb_menu_v1';
let quotaWarned = false;

const clone = (obj) => JSON.parse(JSON.stringify(obj));

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // categorías e info no se editan: siempre del default. products/promos: persistidos.
      return {
        categories: DEFAULT_MENU.categories,
        info: DEFAULT_MENU.info,
        products: Array.isArray(saved.products) ? saved.products : clone(DEFAULT_MENU.products),
        promos: Array.isArray(saved.promos) ? saved.promos : clone(DEFAULT_MENU.promos),
      };
    }
  } catch (e) { /* localStorage no disponible o dato corrupto → usar default */ }
  return clone(DEFAULT_MENU);
}

let state = load();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ products: state.products, promos: state.promos }));
  } catch (e) {
    if (!quotaWarned) {
      quotaWarned = true;
      alert('Se alcanzó el límite de almacenamiento del navegador. Las fotos más recientes podrían no conservarse al recargar. Para muchas fotos conviene conectar almacenamiento en la nube.');
    }
  }
}

const emit = () => listeners.forEach((l) => l());

export function getMenu() { return state; }

export function setProducts(products) { state = { ...state, products }; persist(); emit(); }
export function setPromos(promos) { state = { ...state, promos }; persist(); emit(); }

export function resetMenu() {
  state = clone(DEFAULT_MENU);
  try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  quotaWarned = false;
  emit();
}

/** Hook de React: re-renderiza cuando cambia el menú guardado. */
export function useMenu() {
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    const fn = () => force();
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, []);
  return state;
}
