/* Barrio Bamba — Cliente · pantallas de menú (Home, Categoría, Detalle) */
import React from 'react';
import { ProductCard, Button, Badge, Skeleton, EmptyState } from '../components/index.js';
import { Ic } from '../icons.jsx';
import { money } from '../data/menu.js';

function SectionTitle({ children, kicker }) {
  return (
    <div style={{ padding: '20px 14px 10px' }}>
      {kicker && <div className="bb-eyebrow" style={{ marginBottom: 4 }}>{kicker}</div>}
      <h2 style={{ fontSize: 26 }}>{children}</h2>
    </div>
  );
}

// ---- HOME ----
export function HomeScreen({ data, onOpenCategory, onOpenProduct }) {
  const promo = data.promos.find((p) => p.active) || data.promos[0];
  const featured = [data.products.find((p) => p.id === 't1'), data.products.find((p) => p.id === 'h4')].filter(Boolean);
  const countOf = (cat) => data.products.filter((p) => p.cat === cat).length;

  return (
    <div>
      {/* Promo del día */}
      <div style={{ padding: '16px 14px 4px' }}>
        <div onClick={() => onOpenCategory('tacos')} style={{
          position: 'relative', overflow: 'hidden', cursor: 'pointer',
          background: 'var(--ink-900)', color: 'var(--bone-50)',
          border: 'var(--bw) solid var(--ink-900)', borderRadius: 'var(--r-sm)',
          boxShadow: 'var(--shadow-stamp)', padding: '18px 18px 20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span className="bb-eyebrow" style={{ color: 'var(--salsa-500)' }}>Promo del día · {promo.day}</span>
            <Badge tone="accent" size="sm">{promo.to}</Badge>
          </div>
          <h2 style={{ fontSize: 38, color: 'var(--bone-50)', lineHeight: 1.04 }}>{promo.name}</h2>
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--bone-300)', marginTop: 14, maxWidth: '32ch' }}>{promo.detail}</p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>
            Ver tacos <Ic n="arrow-right" size={15} />
          </span>
        </div>
      </div>

      {/* Categorías rápidas */}
      <SectionTitle kicker="El menú">Categorías</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px' }}>
        {data.categories.map((c) => (
          <button key={c.id} onClick={() => onOpenCategory(c.id)} style={{
            textAlign: 'left', cursor: 'pointer', padding: '14px',
            background: 'var(--paper)', border: 'var(--bw) solid var(--ink-900)',
            borderRadius: 'var(--r-sm)', boxShadow: 'var(--shadow-press)',
            display: 'flex', flexDirection: 'column', gap: 6, minHeight: 72, justifyContent: 'space-between',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--ink-900)' }}>{c.name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>{countOf(c.id)} platillos</span>
          </button>
        ))}
      </div>

      {/* Destacados */}
      <SectionTitle kicker="Recomendado">Antójate</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '0 14px 8px' }}>
        {featured.map((p) => (
          <ProductCard key={p.id} layout="card" name={p.name} description={p.desc} price={p.price}
            image={p.image} badge={p.badge} badgeTone={p.badgeTone} onClick={() => onOpenProduct(p)} />
        ))}
      </div>

      <FooterInfo data={data} />
    </div>
  );
}

function FooterInfo({ data }) {
  return (
    <div style={{ padding: '18px 14px 26px', marginTop: 8 }}>
      <div style={{ borderTop: 'var(--bw-hair) solid var(--ink-300)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Ic n="clock" size={16} style={{ color: 'var(--ink-500)', marginTop: 1 }} />
          <span style={{ font: 'var(--type-body-sm)', color: 'var(--ink-700)' }}>{data.info.hours}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Ic n="beer" size={16} style={{ color: 'var(--ink-500)', marginTop: 1 }} />
          <span style={{ font: 'var(--type-body-sm)', color: 'var(--ink-700)' }}>{data.info.rule}</span>
        </div>
      </div>
    </div>
  );
}

// ---- CATEGORÍA ----
export function CategoryScreen({ data, categoryId, loading, error, onRetry, onOpenProduct }) {
  const items = data.products.filter((p) => p.cat === categoryId);
  const hasAlcohol = items.some((p) => p.withFood);

  if (error) {
    return (
      <div style={{ padding: '12px 14px' }}>
        <EmptyState variant="error" icon={<Ic n="wifi-off" size={26} />} title="No cargó el menú"
          description="Revisa tu conexión e inténtalo de nuevo."
          action={<Button variant="outline" iconLeft={<Ic n="refresh-cw" size={15} />} onClick={onRetry}>Reintentar</Button>} />
      </div>
    );
  }

  return (
    <div style={{ padding: '14px 14px 24px' }}>
      {hasAlcohol && <div style={{ marginBottom: 12 }}><RuleBarLocal>Cerveza y bebidas sólo con alimentos</RuleBarLocal></div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {loading
          ? [0, 1, 2, 3].map((i) => <LoadingRow key={i} />)
          : items.length === 0
            ? <EmptyState icon={<Ic n="utensils" size={26} />} title="Sin platillos" description="Pronto habrá algo rico por aquí." />
            : items.map((p) => (
              <ProductCard key={p.id} name={p.name} description={p.desc} price={p.price}
                image={p.image} badge={p.badge} badgeTone={p.badgeTone} soldOut={!p.active}
                onClick={() => onOpenProduct(p)} />
            ))}
      </div>
    </div>
  );
}

function RuleBarLocal({ children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
      background: 'var(--bone-200)', border: 'var(--bw-hair) solid var(--ink-300)', borderRadius: 'var(--r-sm)',
      fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-600)',
      textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)',
    }}>
      <Ic n="beer" size={14} style={{ color: 'var(--ink-500)' }} />{children}
    </div>
  );
}

function LoadingRow() {
  return (
    <div style={{ display: 'flex', gap: 12, padding: 12, background: 'var(--paper)', border: 'var(--bw) solid var(--ink-200)', borderRadius: 'var(--r-sm)' }}>
      <Skeleton width={92} height={92} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton width="70%" height={15} block />
        <Skeleton width="100%" height={12} block />
        <Skeleton width="35%" height={18} block style={{ marginTop: 'auto' }} />
      </div>
    </div>
  );
}

// ---- DETALLE (vista de menú, sin pedido) ----
export function ProductScreen({ product }) {
  const soldOut = !product.active;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{
        height: 240, position: 'relative',
        background: product.image ? `center/cover url("${product.image}")` : 'repeating-linear-gradient(45deg, var(--bone-200) 0 10px, var(--bone-100) 10px 20px)',
        filter: soldOut ? 'grayscale(1) opacity(0.7)' : 'none',
        borderBottom: 'var(--bw) solid var(--ink-900)',
      }}>
        {!product.image && (
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: 'var(--ls-mono)' }}>Foto próximamente</span>
        )}
        {product.badge && !soldOut && <Badge tone={product.badgeTone || 'accent'} corner>{product.badge}</Badge>}
        {soldOut && <Badge tone="soldout" corner>Agotado</Badge>}
      </div>

      <div style={{ padding: '18px 16px 24px', flex: 1 }}>
        <h1 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 24, textTransform: 'none', letterSpacing: 0, color: 'var(--ink-900)', lineHeight: 1.15 }}>{product.name}</h1>
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', marginTop: 8 }}>{product.desc}</p>
        <div className="bb-tnum" style={{ font: 'var(--type-price)', fontSize: 30, color: soldOut ? 'var(--ink-400)' : 'var(--ink-900)', textDecoration: soldOut ? 'line-through' : 'none', marginTop: 16 }}>{money(product.price)}</div>
        {soldOut && <div style={{ marginTop: 10 }}><Badge tone="soldout">Agotado</Badge></div>}
        {product.withFood && (
          <div style={{ marginTop: 16 }}><RuleBarLocal>Sólo con alimentos (regla de la casa)</RuleBarLocal></div>
        )}
      </div>
    </div>
  );
}
