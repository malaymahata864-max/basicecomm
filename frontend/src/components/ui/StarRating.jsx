const sizeMap = { sm: '0.75rem', md: '0.875rem', lg: '1rem' };

const StarRating = ({ rating = 0, numReviews, size = 'sm' }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half   = !filled && i - 0.5 <= rating;
    stars.push(
      <span key={i} style={{ fontSize: sizeMap[size] || sizeMap.sm, color: filled || half ? '#f59e0b' : '#1e2235', lineHeight: 1 }}>
        {filled ? '★' : half ? '⯨' : '☆'}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      <div style={{ display: 'flex', gap: '1px' }}>{stars}</div>
      {numReviews !== undefined && (
        <span style={{ color: '#475569', fontSize: '0.75rem' }}>({numReviews})</span>
      )}
    </div>
  );
};

export default StarRating;
