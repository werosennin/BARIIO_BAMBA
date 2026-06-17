/* Barrio Bamba — Admin · app (autenticación real con Supabase + navegación) */
import React from 'react';
import { Button } from '../components/index.js';
import { Ic } from '../icons.jsx';
import { useMenu, refreshMenu } from '../data/store.js';
import { supabase } from '../data/supabase.js';
import { AdminLogin, AdminLayout } from './shell.jsx';
import { AdminDashboard, AdminProductos, AdminPromociones, AdminPrecios } from './screens.jsx';

export function AdminApp() {
  const data = useMenu();
  const [session, setSession] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [nav, setNav] = React.useState('tablero');

  React.useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => { if (mounted) { setSession(data.session); setReady(true); } });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) refreshMenu(); // al iniciar sesión, trae lo último de la nube
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--surface-page)', fontFamily: 'var(--font-mono)', color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', fontSize: 12 }}>
        Cargando…
      </div>
    );
  }
  if (!session) return <AdminLogin />;

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
    <AdminLayout active={nav} onNav={setNav} onLogout={() => supabase.auth.signOut()} title={titles[nav]} action={actions[nav]}>
      {screen}
    </AdminLayout>
  );
}
