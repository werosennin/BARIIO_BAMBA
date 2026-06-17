/* Barrio Bamba — Cliente · app (menú digital: navegación de consulta, sin pedidos ni reservaciones) */
import React from 'react';
import { BrowserChrome, AppHeader, CategoryRail } from './shell.jsx';
import { HomeScreen, CategoryScreen, ProductScreen } from './screens-menu.jsx';
import { LocationPanel } from './Ubicacion.jsx';
import { Ic } from '../icons.jsx';
import { useMenu } from '../data/store.js';

export function ClienteApp() {
  const data = useMenu();
  const [stack, setStack] = React.useState([{ name: 'home' }]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [forceError, setForceError] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const bodyRef = React.useRef(null);

  const view = stack[stack.length - 1];

  React.useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [stack.length, view.name]);

  const push = (v) => setStack((s) => [...s, v]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const home = () => setStack([{ name: 'home' }]);

  const openCategory = (id) => {
    push({ name: 'category', id });
    setError(false); setLoading(true);
    setTimeout(() => { setLoading(false); setError(forceError); }, 600);
  };
  const retry = () => {
    setError(false); setLoading(true);
    setForceError(false);
    setTimeout(() => { setLoading(false); setError(false); }, 700);
  };

  const titles = {};
  const showRail = view.name === 'category';
  const showBack = view.name !== 'home';

  let screen = null;
  if (view.name === 'home')
    screen = <HomeScreen data={data} onOpenCategory={openCategory} onOpenProduct={(p) => push({ name: 'product', p })} />;
  else if (view.name === 'category')
    screen = <CategoryScreen data={data} categoryId={view.id} loading={loading} error={error} onRetry={retry} onOpenProduct={(p) => push({ name: 'product', p })} />;
  else if (view.name === 'product')
    screen = <ProductScreen product={view.p} />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '22px 16px 90px', background: 'var(--surface-page)' }}>
      <div style={{
        position: 'relative',
        width: 402, maxWidth: '100%', height: 808, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        background: 'var(--surface-page)', border: 'var(--bw-bold) solid var(--ink-900)', borderRadius: 18,
        boxShadow: 'var(--shadow-pop)',
      }}>
        <BrowserChrome />
        <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 20 }}>
            <AppHeader onBack={showBack ? back : null} title={titles[view.name]} onMenu={() => setMenuOpen(true)} />
          </div>
          {showRail && <CategoryRail categories={data.categories} active={view.id} onPick={openCategory} />}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{screen}</div>
        </div>

        {/* Menú desplegable (Ubicación) */}
        {menuOpen && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 40 }}>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', inset: 0, background: 'var(--overlay)' }} />
            <div style={{ position: 'absolute', top: 66, left: 12, right: 12, background: 'var(--paper)', border: 'var(--bw-bold) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-pop)', overflow: 'hidden', animation: 'bb-fade-up var(--dur) var(--ease)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: 'var(--bw) solid var(--ink-900)', background: 'var(--ink-900)', color: 'var(--bone-50)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, textTransform: 'uppercase', letterSpacing: 'var(--ls-display)' }}>Menú</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Cerrar" style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'var(--bw-hair) solid var(--line-on-ink)', borderRadius: 'var(--r-sm)', cursor: 'pointer', color: 'var(--bone-50)' }}><Ic n="x" size={16} /></button>
              </div>
              <LocationPanel />
            </div>
          </div>
        )}
      </div>

      {/* Controles de demostración (estados de carga/error) */}
      <div style={{ position: 'fixed', left: '50%', bottom: 14, transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', background: 'var(--ink-900)', borderRadius: 999, boxShadow: 'var(--shadow-pop)', zIndex: 50 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--bone-300)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>Demo</span>
        <DemoBtn onClick={() => { setForceError(false); openCategory('tacos'); }}>Cargando→Tacos</DemoBtn>
        <DemoBtn onClick={() => { setForceError(true); openCategory('burgers'); }}>Error</DemoBtn>
        <DemoBtn onClick={home}>Inicio</DemoBtn>
      </div>
    </div>
  );
}

function DemoBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 10px', cursor: 'pointer', background: 'transparent',
      color: 'var(--bone-50)', border: '1px solid var(--line-on-ink)', borderRadius: 999,
      fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)',
    }}>{children}</button>
  );
}
