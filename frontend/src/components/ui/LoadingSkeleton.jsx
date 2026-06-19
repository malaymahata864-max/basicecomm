const SkeletonBox = ({ style }) => (
  <div className="animate-shimmer" style={{ borderRadius: '0.75rem', ...style }} />
);

export const SkeletonCard = () => (
  <div style={{ background: '#12141f', border: '1px solid #1e2235', borderRadius: '1.125rem', overflow: 'hidden' }}>
    <SkeletonBox style={{ height: '200px', borderRadius: 0 }} />
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <SkeletonBox style={{ height: '14px', width: '100%' }} />
      <SkeletonBox style={{ height: '14px', width: '70%' }} />
      <SkeletonBox style={{ height: '12px', width: '50%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
        <SkeletonBox style={{ height: '20px', width: '70px' }} />
        <SkeletonBox style={{ height: '34px', width: '80px', borderRadius: '0.625rem' }} />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: '1.25rem' }} className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
    <style>{`
      @media (min-width: 480px)  { .product-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media (min-width: 900px)  { .product-grid { grid-template-columns: repeat(3,1fr) !important; } }
      @media (min-width: 1200px) { .product-grid { grid-template-columns: repeat(4,1fr) !important; } }
    `}</style>
  </>
);

export const SkeletonLine = ({ width = '100%' }) => (
  <SkeletonBox style={{ height: '14px', width }} />
);

export const SkeletonProductDetail = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="detail-grid">
    <SkeletonBox style={{ height: '400px' }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SkeletonBox style={{ height: '16px', width: '40%' }} />
      <SkeletonBox style={{ height: '28px', width: '90%' }} />
      <SkeletonBox style={{ height: '28px', width: '70%' }} />
      <SkeletonBox style={{ height: '14px', width: '55%' }} />
      <SkeletonBox style={{ height: '36px', width: '35%' }} />
      <SkeletonBox style={{ height: '14px', width: '100%' }} />
      <SkeletonBox style={{ height: '14px', width: '85%' }} />
      <SkeletonBox style={{ height: '48px', width: '100%', borderRadius: '0.875rem' }} />
    </div>
    <style>{`@media (min-width: 768px) { .detail-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
  </div>
);

export default SkeletonCard;
