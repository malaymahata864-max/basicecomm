import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import StarRating from '../ui/StarRating';
import toast from 'react-hot-toast';

const catColors = {
  electronics: '#1e3a5f',
  clothing:    '#5f1e3a',
  home:        '#5f3a1e',
  books:       '#5f4e1e',
  sports:      '#1e5f3a',
  beauty:      '#5f1e4e',
  toys:        '#3a1e5f',
  food:        '#3a5f1e',
};
const catText = {
  electronics: '#60a5fa',
  clothing:    '#f472b6',
  home:        '#fb923c',
  books:       '#fbbf24',
  sports:      '#34d399',
  beauty:      '#f472b6',
  toys:        '#a78bfa',
  food:        '#a3e635',
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const averageRating = Number(product.avgRating ?? 0);
  const reviewCount = product.ratings?.length ?? 0;
  const { user } = useSelector((state) => state.auth);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`Added to cart!`);
  };

  const cat = product.category?.toLowerCase();
  const bg = catColors[cat] || '#1e2235';
  const fg = catText[cat] || '#94a3b8';

  return (
    <Link to={`/product/${product._id}`}
      style={{ display: 'block', textDecoration: 'none', background: '#12141f', border: '1px solid #1e2235', borderRadius: '1.125rem', overflow: 'hidden', transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s' }}
      className="card-hover"
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2235'; }}>

      {/* Image */}
      <div style={{ position: 'relative', height: '200px', background: '#0e1018', overflow: 'hidden' }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))' }}>
            <span style={{ fontSize: '3rem' }}>🛍️</span>
          </div>
        )}

        {/* Category badge */}
        <span style={{ position: 'absolute', top: '0.625rem', left: '0.625rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', background: bg, color: fg, fontSize: '0.6875rem', fontWeight: 600, textTransform: 'capitalize', letterSpacing: '0.02em' }}>
          {product.category}
        </span>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.8125rem', background: 'rgba(239,68,68,0.8)', padding: '0.375rem 0.875rem', borderRadius: '9999px' }}>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem' }}>
        {/* Name */}
        <h3 style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.45, marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.6rem' }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div style={{ marginBottom: '0.875rem' }}>
          <StarRating rating={averageRating} numReviews={reviewCount} size="sm" />
        </div>

        {/* Price + Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.01em' }}>
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={handleAdd} disabled={product.stock === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.5rem 0.875rem', borderRadius: '0.625rem', border: 'none', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              background: product.stock === 0 ? '#1e2235' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: product.stock === 0 ? '#475569' : '#fff',
              fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap',
              transition: 'opacity 0.2s, transform 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (product.stock > 0) e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            onMouseDown={e => { if (product.stock > 0) e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
            🛒 Add
          </button>
          {user && user.role === 'admin' && (
            <Link to={`/admin/products/${product._id}/edit`} onClick={(e)=>e.stopPropagation()} className="text-sm px-3 py-1 rounded-md bg-[#2a2e42] text-slate-200" style={{ textDecoration: 'none' }}>
              Edit
            </Link>
          )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
