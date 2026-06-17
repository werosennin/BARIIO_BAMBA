/* Barrio Bamba — Admin · app (auth + navegación) */
import React from 'react';
import { Button } from '../components/index.js';
import { Ic } from '../icons.jsx';
import { useMenu } from '../data/store.js';
import { AdminLogin, AdminLayout } from './shell.jsx';
import { AdminDashboard, AdminProductos, AdminPromociones, AdminPrecios } from './screens.jsx';

export function AdminApp() {
  const data = useMenu();
  const [authed, setAuthed] = React.useState(false);
  const [nav, setNav] = React.useState('tablero');

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const titles = { tablero: 'Tablero', productos: 'Productos', promos: 'Promociones', precios: 'Precios' };
  const actions = {
    tablero: <Button size="sm" variant="outline" iconLeft={<Ic n="external-link" size={14} />}>Ver sitio</Button>,
  };

  let screen = null;
  if (nav === 'tablero') screen = <AdminDashboard data={data} onGo={setNav} />;
  else if (nav === 'productos') screen = <AdminProductos data={data} />;
  else if (nav === 'promos') screen = <AdminPromociones data={data} />;
  else if (nav === 'precios') screen = <AdminPrecios data={data} />;

  return (
    <AdminLayout active={nav} onNav={setNav} onLogout={() => setAuthed(false)} title={titles[nav]} action={actions[nav]}>
      {screen}
    </AdminLayout>
  );
}
