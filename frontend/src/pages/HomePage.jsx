import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import ProductGrid from '../components/product/ProductGrid';

const categories = [
  { name: 'Electronics', emoji: '📱', from: '#1e3a5f', to: '#0f2040' },
  { name: 'Clothing',    emoji: '👗', from: '#5f1e3a', to: '#3a0f20' },
  { name: 'Home',        emoji: '🏠', from: '#5f3a1e', to: '#3a200f' },
  { name: 'Books',       emoji: '📚', from: '#5f4e1e', to: '#3a300f' },
  { name: 'Sports',      emoji: '⚽', from: '#1e5f3a', to: '#0f3a20' },
  { name: 'Beauty',      emoji: '💄', from: '#5f1e4e', to: '#3a0f2e' },
  { name: 'Toys',        emoji: '🎮', from: '#3a1e5f', to: '#200f3a' },
  { name: 'Food',        emoji: '🍎', from: '#3a5f1e', to: '#203a0f' },
];

const perks = [
  { emoji: '🚚', title: 'Free Delivery', desc: 'On all orders' },
  { emoji: '💳', title: 'Cash on Delivery', desc: 'Pay when it arrives' },
  { emoji: '↩️', title: 'Easy Returns', desc: '7-day return policy' },
  { emoji: '✨', title: 'Premium Quality', desc: 'Curated products' },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((s) => s.products);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div style={{ background: '#0a0b10' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-5rem', left: '20%', width: '28rem', height: '28rem', background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-5rem', right: '15%', width: '24rem', height: '24rem', background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 1.5rem', width: '100%', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 1 }} className="hero-grid">
          {/* Text */}
          <div className="animate-slideUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: '9999px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a78bfa', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Premium E-Commerce</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              <span style={{ color: '#f1f5f9', display: 'block' }}>Discover</span>
              <span className="gradient-text" style={{ display: 'block' }}>Premium Products</span>
              <span style={{ color: '#94a3b8', display: 'block' }}>You'll Love</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.7, maxWidth: '30rem', marginBottom: '2rem' }}>
              Shop from thousands of curated products across every category. Quality guaranteed, delivered to your door.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2.5rem' }}>
              <button onClick={() => navigate('/shop')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', fontWeight: 700, borderRadius: '0.875rem', border: 'none', cursor: 'pointer', fontSize: '0.9375rem', boxShadow: '0 8px 24px rgba(124,58,237,0.35)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.35)'; }}>
                Shop Now →
              </button>
              <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'transparent', color: '#94a3b8', fontWeight: 600, borderRadius: '0.875rem', border: '1px solid #1e2235', cursor: 'pointer', fontSize: '0.9375rem', transition: 'color 0.2s, border-color 0.2s, background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#3a3f5c'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = '#1e2235'; e.currentTarget.style.background = 'transparent'; }}>
                Browse Categories
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              {[['500+', 'Products'], ['10K+', 'Happy Customers'], ['4.9★', 'Rating']].map(([num, lbl]) => (
                <div key={lbl}>
                  <div className="gradient-text" style={{ fontSize: '1.625rem', fontWeight: 900 }}>{num}</div>
                  <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.125rem' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card — desktop only */}
          <div style={{ display: 'none', justifyContent: 'center' }} className="hero-card-col animate-float">
            <div style={{ position: 'relative', width: '20rem', height: '20rem' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>
                🛍️
              </div>
              <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', background: '#12141f', border: '1px solid #1e2235', borderRadius: '1rem', padding: '0.875rem 1.125rem', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }} className="animate-slideInRight">
                <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '0.125rem' }}>New Arrivals</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>Just dropped ✨</div>
              </div>
              <div style={{ position: 'absolute', bottom: '-1rem', left: '-1rem', background: '#12141f', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1rem', padding: '0.875rem 1.125rem', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                <div style={{ color: '#10b981', fontSize: '0.7rem', marginBottom: '0.125rem' }}>Free Shipping</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>On all orders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERKS BAR ────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid #1e2235', borderBottom: '1px solid #1e2235', background: '#0d0f1a' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.5rem' }} className="perks-grid">
            {perks.map(({ emoji, title, desc }, i) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem', borderRadius: '0.875rem' }} className={`animate-fadeIn stagger-${i + 1}`}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{emoji}</span>
                <div>
                  <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem' }}>{title}</p>
                  <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.125rem' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: '#7c3aed', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>HAND-PICKED FOR YOU</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' }}>Featured Products</h2>
            </div>
            <Link to="/shop" style={{ color: '#7c3aed', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.2s', flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
              onMouseLeave={e => e.currentTarget.style.color = '#7c3aed'}>
              View all →
            </Link>
          </div>
          <ProductGrid products={products.slice(0, 8)} isLoading={isLoading} />
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section id="categories" style={{ padding: '5rem 0', background: '#0d0f1a' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#7c3aed', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>EXPLORE</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Shop by Category</h2>
            <p style={{ color: '#475569', fontSize: '0.9375rem' }}>Find exactly what you're looking for</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }} className="cat-grid">
            {categories.map(({ name, emoji, from, to }, i) => (
              <Link key={name} to={`/shop?category=${name.toLowerCase()}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.75rem 1rem', borderRadius: '1.25rem', background: `linear-gradient(135deg, ${from}, ${to})`, border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s' }}
                className={`card-hover animate-fadeIn stagger-${i + 1}`}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
                <span style={{ fontSize: '2.25rem', lineHeight: 1 }}>{emoji}</span>
                <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem' }}>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '2rem', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))', border: '1px solid rgba(124,58,237,0.2)', padding: '3.5rem 2rem', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '-3rem', right: '-3rem', width: '16rem', height: '16rem', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-3rem', left: '-3rem', width: '16rem', height: '16rem', background: 'radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>EXCLUSIVE OFFER</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.2 }}>
                Get 20% off your <span className="gradient-text">first order</span>
              </h2>
              <p style={{ color: '#475569', fontSize: '0.9375rem', maxWidth: '28rem', margin: '0 auto 2rem' }}>
                Sign up and enjoy exclusive deals on premium products across all categories.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '28rem', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input type="email" placeholder="Enter your email…" className="input-base" style={{ flex: 1, minWidth: '0' }} />
                <button style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', fontWeight: 600, borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-card-col { display: flex !important; }
          .perks-grid { grid-template-columns: repeat(4,1fr) !important; }
          .cat-grid { grid-template-columns: repeat(4,1fr) !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
