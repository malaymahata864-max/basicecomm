import ProductCard from './ProductCard';
import EmptyState from '../ui/EmptyState';
import { SkeletonGrid } from '../ui/LoadingSkeleton';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ products = [], isLoading, emptyMessage }) => {
  const navigate = useNavigate();

  if (isLoading) return <SkeletonGrid count={8} />;

  if (!products.length) return (
    <EmptyState
      icon={<HiOutlineShoppingBag />}
      title="No products found"
      description={emptyMessage || 'Try a different search or category.'}
      actionLabel="Browse All"
      onAction={() => navigate('/shop')}
    />
  );

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.25rem' }} className="product-grid">
        {products.map((p, i) => (
          <div key={p._id} className={`animate-fadeIn stagger-${Math.min(i + 1, 8)}`}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 480px)  { .product-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width: 900px)  { .product-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (min-width: 1200px) { .product-grid { grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>
    </>
  );
};

export default ProductGrid;
