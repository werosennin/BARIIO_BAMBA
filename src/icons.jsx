/* Barrio Bamba — iconografía (Lucide vía lucide-react).
   Iconos de línea, trazo ~2px. Reemplaza el patrón `<i data-lucide="…">`
   de los prototipos por componentes React tree-shakeables. */
import {
  Lock, ArrowLeft, ArrowRight, Menu, ShoppingBag, Clock, Beer, Info,
  WifiOff, RefreshCw, Utensils, Search, X, Check, Calendar, Bike,
  LayoutDashboard, Tag, DollarSign, LogOut, MapPin, Navigation,
  Plus, Minus, GripVertical, Pencil, Trash2, SearchX, ImagePlus, ExternalLink,
} from 'lucide-react';

const MAP = {
  'lock': Lock,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'menu': Menu,
  'shopping-bag': ShoppingBag,
  'bag': ShoppingBag,
  'clock': Clock,
  'beer': Beer,
  'info': Info,
  'wifi-off': WifiOff,
  'refresh-cw': RefreshCw,
  'utensils': Utensils,
  'search': Search,
  'search-x': SearchX,
  'x': X,
  'check': Check,
  'calendar': Calendar,
  'bike': Bike,
  'layout-dashboard': LayoutDashboard,
  'tag': Tag,
  'dollar-sign': DollarSign,
  'log-out': LogOut,
  'map-pin': MapPin,
  'navigation': Navigation,
  'plus': Plus,
  'minus': Minus,
  'grip-vertical': GripVertical,
  'pencil': Pencil,
  'trash-2': Trash2,
  'image-plus': ImagePlus,
  'external-link': ExternalLink,
};

/** Icono Lucide por nombre kebab-case. `<Ic n="shopping-bag" size={20} />` */
export function Ic({ n, size = 20, style, ...rest }) {
  const C = MAP[n] || Info;
  return <C size={size} strokeWidth={2} style={{ display: 'inline-block', flex: '0 0 auto', ...style }} {...rest} />;
}
