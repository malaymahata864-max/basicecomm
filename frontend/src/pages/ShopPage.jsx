import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductGrid from '../components/product/ProductGrid';

const CATEGORIES = ['electronics', 'clothing', 'home', 'books', 'sports', 'beauty', 'toys', 'food'];

const ShopPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useSelector((s) => s.products);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    setSearchParams(params, { replace: true });
  }, [search, category]);

  const filtered = useMemo(() => {
    let r = [...products];
    if (category) r = r.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    if (search)   r = r.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'asc')    r.sort((a, b) => a.price - b.price);
    if (sort === 'desc')   r.sort((a, b) => b.price - a.price);
    if (sort === 'rating') r.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
    return r;
  }, [products, category, search, sort]);

  const hasFilters = search || category || sort !== 'default';

  const clearAll = () => { setSearch(''); setCategory(''); setSort('default'); };

  const Filters = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search */}
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Search</h4>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products…" className="input-base" />
      </div>

      {/* Category */}
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Category</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {['all', ...CATEGORIES].map(cat => {
            const active = cat === 'all' ? !category : category === cat;
            return (
              <button key={cat} onClick={() => setCategory(cat === 'all' ? '' : (cat === category ? '' : cat))}
                style={{ textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: '0.625rem', border: active ? '1px solid rgba(124,58,237,0.4)' : '1px solid transparent', background: active ? 'rgba(124,58,237,0.12)' : 'transparent', color: active ? '#a78bfa' : '#64748b', fontSize: '0.875rem', fontWeight: active ? 600 : 400, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#cbd5e1'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; } }}>
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Sort By</h4>
        <select value={sort} onChange={e => setSort(e.target.value)} className="input-base">
          <option value="default">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {hasFilters && (
        <button onClick={clearAll}
          style={{ padding: '0.625rem', borderRadius: '0.75rem', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', background: 'transparent', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          ✕ Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em', marginBottom: '0.375rem' }}>All Products</h1>
        <p style={{ color: '#475569', fontSize: '0.9rem' }}>
          {isLoading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Active filter tags */}
      {hasFilters && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {search && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '9999px', color: '#a78bfa', fontSize: '0.8rem' }}>
              Search: {search}
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
            </span>
          )}
          {category && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '9999px', color: '#a78bfa', fontSize: '0.8rem', textTransform: 'capitalize' }}>
              {category}
              <button onClick={() => setCategory('')} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
            </span>
          )}
        </div>
      )}

      {/* Mobile filter button */}
      <div style={{ marginBottom: '1.25rem' }} className="mobile-filter-toggle">
        <button onClick={() => setFilterOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', background: '#12141f', border: '1px solid #1e2235', borderRadius: '0.75rem', color: '#94a3b8', fontSize: '0.875rem', cursor: 'pointer', transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#1e2235'}>
          ⚙ Filters {hasFilters && <span style={{ width: '8px', height: '8px', background: '#7c3aed', borderRadius: '50%', display: 'inline-block' }} />}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Desktop sidebar */}
        <aside style={{ width: '15rem', flexShrink: 0 }} className="desktop-sidebar">
          <div style={{ background: '#12141f', border: '1px solid #1e2235', borderRadius: '1.125rem', padding: '1.5rem', position: 'sticky', top: '80px' }}>
            <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9375rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚙ Filters
            </h3>
            <Filters />
          </div>
        </aside>

        {/* Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <ProductGrid products={filtered} isLoading={isLoading} emptyMessage="No products match your filters. Try adjusting or clearing them." />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <>
          <div onClick={() => setFilterOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 90 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', background: '#0e1018', borderRight: '1px solid #1e2235', zIndex: 95, overflowY: 'auto', padding: '1.5rem' }} className="animate-slideInLeft">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ color: '#f1f5f9', fontWeight: 700 }}>Filters</span>
              <button onClick={() => setFilterOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }}>×</button>
            </div>
            <Filters />
          </div>
        </>
      )}

      <style>{`
        @media (min-width: 768px) {
          .mobile-filter-toggle { display: none !important; }
          .desktop-sidebar { display: block !important; }
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
