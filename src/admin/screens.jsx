/* Barrio Bamba — Admin · pantallas (Tablero, Productos, Promociones, Precios) */
import React from 'react';
import { Button, IconButton, Input, Select, Switch, Badge, EmptyState } from '../components/index.js';
import { Ic } from '../icons.jsx';
import { MENU, money } from '../data/menu.js';
import { setProducts, setPromos, resetMenu } from '../data/store.js';
import { fileToDownscaledDataUrl } from '../lib/image.js';
import { AdminStatCard as StatCard, AdminDrawer as Drawer } from './shell.jsx';

const catName = (id) => (MENU.categories.find((c) => c.id === id) || {}).name || id;

/* =================== TABLERO =================== */
export function AdminDashboard({ data, onGo }) {
  const inactive = data.products.filter((p) => !p.active);
  const active = data.products.length - inactive.length;
  const promo = data.promos.find((p) => p.active);
  const activePromos = data.promos.filter((p) => p.active).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Platillos" value={data.products.length} sub={`${data.categories.length} categorías`} icon="utensils" />
        <StatCard label="Disponibles" value={`${active}/${data.products.length}`} sub={`${inactive.length} agotados`} icon="check" />
        <StatCard label="Promociones" value={data.promos.length} sub={`${activePromos} ${activePromos === 1 ? 'activa' : 'activas'}`} icon="tag" />
        <StatCard label="Promo de hoy" value={promo ? promo.day : '—'} sub={promo ? promo.name : 'Sin promo hoy'} icon="calendar" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, alignItems: 'start' }}>
        <Panel title="Requiere atención" action={<Button size="sm" variant="ghost" onClick={() => onGo('productos')} iconRight={<Ic n="arrow-right" size={14} />}>Ver productos</Button>}>
          {inactive.length === 0
            ? <EmptyState icon={<Ic n="check" size={24} />} title="Todo disponible" description="Ningún platillo está agotado ahora mismo." />
            : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {inactive.map((p, i) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: i ? 'var(--bw-hair) solid var(--border-hair)' : 'none' }}>
                    <Badge tone="soldout" size="sm">Agotado</Badge>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>{catName(p.cat)}</div>
                    </div>
                    <span className="bb-tnum" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-700)' }}>{money(p.price)}</span>
                  </div>
                ))}
              </div>
            )}
        </Panel>

        <Panel title="Hoy en el local">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InfoLine icon="clock" k="Horario" v={data.info.hours} />
            <InfoLine icon="beer" k="Regla" v={data.info.rule} />
            {promo && <InfoLine icon="tag" k="Promo" v={`${promo.name} — ${promo.detail}`} />}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, action, children }) {
  return (
    <section style={{ background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: 'var(--bw-hair) solid var(--ink-200)' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 'var(--ls-caps)', color: 'var(--ink-700)' }}>{title}</h3>
        {action}
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </section>
  );
}
function InfoLine({ icon, k, v }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <span style={{ width: 34, height: 34, flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'var(--bw-hair) solid var(--ink-900)', borderRadius: 'var(--r-sm)', color: 'var(--ink-900)' }}><Ic n={icon} size={16} /></span>
      <div>
        <div className="bb-eyebrow">{k}</div>
        <div style={{ font: 'var(--type-body-sm)', color: 'var(--ink-800)', marginTop: 3 }}>{v}</div>
      </div>
    </div>
  );
}

/* =================== PRODUCTOS =================== */
export function AdminProductos({ data }) {
  const [q, setQ] = React.useState('');
  const [editing, setEditing] = React.useState(null);
  const rows = data.products;
  const filtered = rows.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const toggle = (id) => setProducts(rows.map((p) => p.id === id ? { ...p, active: !p.active } : p));
  const save = (next) => {
    const exists = rows.some((p) => p.id === next.id);
    setProducts(exists ? rows.map((p) => p.id === next.id ? next : p) : [...rows, next]);
    setEditing(null);
  };
  const reset = () => { if (window.confirm('¿Restablecer el menú a su versión original? Se perderán tus cambios y fotos guardados.')) resetMenu(); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 280 }}><Input placeholder="Buscar platillo…" value={q} onChange={(e) => setQ(e.target.value)} prefix={<Ic n="search" size={15} />} /></div>
        <Button variant="ghost" style={{ marginLeft: 'auto' }} onClick={reset}>Restablecer</Button>
        <Button iconLeft={<Ic n="plus" size={16} />} onClick={() => setEditing({ id: 'new', name: '', cat: 'tacos', price: '', desc: '', active: true })}>Crear producto</Button>
      </div>

      <div style={{ background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp)', overflow: 'hidden' }}>
        <Th cols="28px 1fr 130px 90px 110px" labels={['', 'Producto', 'Categoría', 'Precio', 'Estado']} extra="64px" />
        {filtered.length === 0
          ? <div style={{ padding: 12 }}><EmptyState icon={<Ic n="search-x" size={24} />} title="Sin resultados" description={`No hay platillos para "${q}".`} /></div>
          : filtered.map((p, i) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 130px 90px 110px 64px', alignItems: 'center', gap: 12, padding: '12px 18px', borderTop: i ? 'var(--bw-hair) solid var(--border-hair)' : 'none', opacity: p.active ? 1 : 0.6 }}>
              <span style={{ color: 'var(--ink-300)', cursor: 'grab' }} title="Reordenar"><Ic n="grip-vertical" size={16} /></span>
              <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                {p.image && <img src={p.image} alt="" style={{ width: 36, height: 36, flex: '0 0 auto', objectFit: 'cover', border: 'var(--bw-hair) solid var(--ink-300)', borderRadius: 'var(--r-xs)' }} />}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{p.name || '—'}</div>
                  <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-faint)', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.desc}</div>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>{catName(p.cat)}</span>
              <span className="bb-tnum" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-900)' }}>{money(p.price || 0)}</span>
              <Switch size="sm" checked={p.active} onChange={() => toggle(p.id)} />
              <IconButton size="sm" variant="outline" label="Editar" onClick={() => setEditing({ ...p })}><Ic n="pencil" size={15} /></IconButton>
            </div>
          ))}
      </div>

      <ProductDrawer editing={editing} onClose={() => setEditing(null)} onSave={save} onDelete={(id) => { setProducts(rows.filter((p) => p.id !== id)); setEditing(null); }} data={data} />
    </div>
  );
}

function Th({ cols, labels, extra }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cols + ' ' + (extra || ''), gap: 12, padding: '11px 18px', background: 'var(--bone-200)', borderBottom: 'var(--bw) solid var(--ink-900)' }}>
      {labels.map((l, i) => <span key={i} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', color: 'var(--ink-500)' }}>{l}</span>)}
    </div>
  );
}

function ProductDrawer({ editing, onClose, onSave, onDelete, data }) {
  const [f, setF] = React.useState(editing || {});
  const fileRef = React.useRef(null);
  React.useEffect(() => { setF(editing || {}); }, [editing]);
  if (!editing) return null;
  const isNew = editing.id === 'new';
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  // Sube una imagen desde el almacenamiento del dispositivo (galería, archivos, etc.)
  const onPickFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Elige un archivo de imagen (JPG, PNG, WEBP, etc.).'); return; }
    if (file.size > 25 * 1024 * 1024) { alert('La imagen es muy pesada (máx. 25 MB).'); return; }
    try {
      const dataUrl = await fileToDownscaledDataUrl(file, 1000, 0.82);
      setF((s) => ({ ...s, image: dataUrl }));
    } catch (err) {
      alert('No se pudo procesar la imagen. Intenta con otra.');
    }
    e.target.value = '';
  };
  const clearImage = (e) => { e.stopPropagation(); setF((s) => ({ ...s, image: null })); };
  return (
    <Drawer open={!!editing} title={isNew ? 'Nuevo producto' : 'Editar producto'} onClose={onClose}
      footer={<>
        {!isNew && <Button variant="outline" onClick={() => onDelete(editing.id)} iconLeft={<Ic n="trash-2" size={15} />}>Eliminar</Button>}
        <Button style={{ marginLeft: 'auto' }} onClick={() => onSave({ ...f, id: isNew ? 'p' + Date.now() : f.id, price: Number(f.price) || 0 })}>Guardar</Button>
      </>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Subir foto desde el almacenamiento del dispositivo */}
        <input ref={fileRef} type="file" accept="image/*" onChange={onPickFile} style={{ display: 'none' }} />
        <div
          onClick={() => fileRef.current && fileRef.current.click()}
          title="Subir foto desde tu dispositivo"
          style={{ position: 'relative', height: 150, border: 'var(--bw) dashed var(--ink-900)', borderRadius: 'var(--r-sm)', background: f.image ? `center/cover no-repeat url("${f.image}")` : 'var(--bone-200)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--ink-500)', cursor: 'pointer', overflow: 'hidden' }}
        >
          {f.image ? (
            <>
              <span style={{ position: 'absolute', left: 8, bottom: 8, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px', background: 'var(--ink-900)', color: 'var(--bone-50)', borderRadius: 'var(--r-xs)', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
                <Ic n="image-plus" size={12} /> Cambiar foto
              </span>
              <button type="button" onClick={clearImage} aria-label="Quitar foto" style={{ position: 'absolute', right: 8, top: 8, width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', cursor: 'pointer' }}>
                <Ic n="x" size={15} />
              </button>
            </>
          ) : (
            <>
              <Ic n="image-plus" size={26} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>Subir foto</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--ink-400)' }}>Desde tu dispositivo · JPG, PNG o WEBP</span>
            </>
          )}
        </div>
        <Input label="Nombre" value={f.name || ''} onChange={set('name')} placeholder="Nombre del platillo" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 14 }}>
          <Select label="Categoría" value={f.cat} onChange={set('cat')} options={data.categories.map((c) => ({ value: c.id, label: c.name }))} />
          <Input label="Precio" type="number" prefix="$" value={f.price ?? ''} onChange={set('price')} />
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 'var(--ls-caps)', color: 'var(--ink-700)' }}>Descripción</span>
          <textarea value={f.desc || ''} onChange={set('desc')} rows={3} style={{ font: 'var(--type-body)', padding: '12px 14px', background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', resize: 'vertical', outline: 'none' }} placeholder="Ingredientes, breve y apetitoso…" />
        </label>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bone-200)', borderRadius: 'var(--r-sm)' }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>Disponible</span>
          <Switch checked={f.active !== false} onChange={(v) => setF((s) => ({ ...s, active: v }))} />
        </div>
      </div>
    </Drawer>
  );
}

/* =================== PROMOCIONES =================== */
export function AdminPromociones({ data }) {
  const [creating, setCreating] = React.useState(false);
  const promos = data.promos;
  const toggle = (id) => setPromos(promos.map((p) => p.id === id ? { ...p, active: !p.active } : p));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex' }}>
        <Button style={{ marginLeft: 'auto' }} iconLeft={<Ic n="plus" size={16} />} onClick={() => setCreating(true)}>Crear promoción</Button>
      </div>
      {promos.length === 0
        ? <Wrap><EmptyState icon={<Ic n="tag" size={24} />} title="Sin promociones" description="Crea una promo por día (martes de tacos, miércoles de hamburguesas…)." action={<Button onClick={() => setCreating(true)}>Crear promoción</Button>} /></Wrap>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {promos.map((p) => (
              <div key={p.id} style={{ background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp)', padding: 18, opacity: p.active ? 1 : 0.7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <Badge tone={p.active ? 'success' : 'soldout'} dot={p.active}>{p.active ? 'Activa' : 'Programada'}</Badge>
                  <Switch size="sm" checked={p.active} onChange={() => toggle(p.id)} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 19, textTransform: 'none', letterSpacing: 0 }}>{p.name}</h3>
                <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 6 }}>{p.detail}</p>
                <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 12, borderTop: 'var(--bw-hair) solid var(--border-hair)' }}>
                  <Meta icon="calendar" v={p.from} />
                  <Meta icon="clock" v={p.to} />
                </div>
              </div>
            ))}
          </div>
        )}
      <PromoDrawer open={creating} onClose={() => setCreating(false)} onSave={(np) => { setPromos([...promos, np]); setCreating(false); }} />
    </div>
  );
}
function Wrap({ children }) { return <div style={{ background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp)' }}>{children}</div>; }
function Meta({ icon, v }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}><Ic n={icon} size={13} />{v}</span>;
}
function PromoDrawer({ open, onClose, onSave }) {
  const [f, setF] = React.useState({ name: '', detail: '', day: 'Martes', from: '', to: '', active: true });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  return (
    <Drawer open={open} title="Nueva promoción" onClose={onClose}
      footer={<Button style={{ marginLeft: 'auto' }} onClick={() => onSave({ ...f, id: 'pr' + Date.now(), from: f.from || 'Programada', to: f.to || '2:30–10:45 pm' })}>Guardar promo</Button>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Input label="Nombre" value={f.name} onChange={set('name')} placeholder="Martes de Tacos" />
        <Input label="Detalle" value={f.detail} onChange={set('detail')} placeholder="2x1 en todos los tacos" />
        <Select label="Día" value={f.day} onChange={set('day')} options={['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <Input label="Inicia" type="date" value={f.from} onChange={set('from')} />
          <Input label="Termina" type="date" value={f.to} onChange={set('to')} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bone-200)', borderRadius: 'var(--r-sm)' }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>Activar ahora</span>
          <Switch checked={f.active} onChange={(v) => setF((s) => ({ ...s, active: v }))} />
        </div>
      </div>
    </Drawer>
  );
}

/* =================== PRECIOS =================== */
export function AdminPrecios({ data }) {
  const [rows, setRows] = React.useState(() => data.products.map((p) => ({ id: p.id, name: p.name, cat: p.cat, base: p.price, price: p.price })));
  const [bulkCat, setBulkCat] = React.useState('all');
  const [pct, setPct] = React.useState('');
  const dirty = rows.filter((r) => r.price !== r.base);

  const setPrice = (id, v) => setRows((r) => r.map((x) => x.id === id ? { ...x, price: v === '' ? '' : Number(v) } : x));
  const applyPct = (sign) => {
    const f = Number(pct);
    if (!f) return;
    setRows((r) => r.map((x) => (bulkCat === 'all' || x.cat === bulkCat) ? { ...x, price: Math.round(x.price * (1 + sign * f / 100)) } : x));
  };
  const save = () => {
    setProducts(data.products.map((p) => {
      const r = rows.find((x) => x.id === p.id);
      return r ? { ...p, price: r.price } : p;
    }));
    setRows((r) => r.map((x) => ({ ...x, base: x.price })));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 72 }}>
      {/* Edición masiva */}
      <div style={{ background: 'var(--ink-900)', color: 'var(--bone-50)', borderRadius: 'var(--r-sm)', padding: '16px 18px', display: 'flex', alignItems: 'flex-end', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 200 }}>
          <div className="bb-eyebrow" style={{ color: 'var(--ink-300)', marginBottom: 6 }}>Aplicar a</div>
          <select value={bulkCat} onChange={(e) => setBulkCat(e.target.value)} style={{ appearance: 'none', width: '100%', padding: '10px 12px', font: 'var(--type-body)', background: 'var(--bone-50)', border: '1.5px solid var(--bone-50)', borderRadius: 'var(--r-sm)' }}>
            <option value="all">Todas las categorías</option>
            {data.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ width: 120 }}>
          <div className="bb-eyebrow" style={{ color: 'var(--ink-300)', marginBottom: 6 }}>Porcentaje</div>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bone-50)', borderRadius: 'var(--r-sm)', padding: '0 12px' }}>
            <input value={pct} onChange={(e) => setPct(e.target.value)} type="number" placeholder="10" style={{ width: '100%', padding: '10px 0', border: 'none', background: 'transparent', font: 'var(--type-body)', outline: 'none' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-500)' }}>%</span>
          </div>
        </div>
        <Button variant="outline" onClick={() => applyPct(1)} style={{ background: 'var(--bone-50)' }} iconLeft={<Ic n="plus" size={14} />}>Subir</Button>
        <Button variant="outline" onClick={() => applyPct(-1)} style={{ background: 'var(--bone-50)' }} iconLeft={<Ic n="minus" size={14} />}>Bajar</Button>
      </div>

      {/* Tabla editable */}
      <div style={{ background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-stamp)', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 130px 120px', gap: 12, padding: '11px 18px', background: 'var(--bone-200)', borderBottom: 'var(--bw) solid var(--ink-900)' }}>
          {['Producto', 'Categoría', 'Precio actual', 'Nuevo'].map((l) => <span key={l} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)', color: 'var(--ink-500)' }}>{l}</span>)}
        </div>
        {rows.map((r, i) => {
          const changed = r.price !== r.base;
          return (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 130px 120px', gap: 12, alignItems: 'center', padding: '9px 18px', borderTop: i ? 'var(--bw-hair) solid var(--border-hair)' : 'none', background: changed ? 'var(--salsa-100)' : 'transparent' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>{catName(r.cat)}</span>
              <span className="bb-tnum" style={{ fontFamily: 'var(--font-mono)', color: changed ? 'var(--ink-400)' : 'var(--ink-800)', textDecoration: changed ? 'line-through' : 'none' }}>{money(r.base)}</span>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--paper)', border: '1.5px solid var(--ink-900)', borderRadius: 'var(--r-sm)', padding: '0 10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ink-500)' }}>$</span>
                <input value={r.price} type="number" onChange={(e) => setPrice(r.id, e.target.value)} className="bb-tnum" style={{ width: '100%', padding: '8px 0 8px 6px', border: 'none', background: 'transparent', fontFamily: 'var(--font-mono)', fontWeight: 700, outline: 'none' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra guardar */}
      <div style={{ position: 'fixed', left: 236, right: 0, bottom: 0, padding: '14px 28px', background: 'var(--paper)', borderTop: 'var(--bw) solid var(--ink-900)', display: 'flex', alignItems: 'center', gap: 16, zIndex: 30 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: dirty.length ? 'var(--salsa-600)' : 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
          {dirty.length ? `${dirty.length} cambio${dirty.length > 1 ? 's' : ''} sin guardar` : 'Sin cambios'}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <Button variant="ghost" disabled={!dirty.length} onClick={() => setRows((r) => r.map((x) => ({ ...x, price: x.base })))}>Descartar</Button>
          <Button disabled={!dirty.length} onClick={save} iconLeft={<Ic n="check" size={15} />}>Guardar cambios</Button>
        </div>
      </div>
    </div>
  );
}
