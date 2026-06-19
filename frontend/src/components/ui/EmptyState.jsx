const EmptyState = ({ icon, title, description, actionLabel, onAction }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem', textAlign: 'center' }}>
    <div style={{ fontSize: '4rem', marginBottom: '1.5rem', color: '#2a2e42' }} className="animate-float">
      {icon}
    </div>
    <h3 style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '24rem', marginBottom: '1.75rem', lineHeight: 1.65 }}>{description}</p>
    {actionLabel && onAction && (
      <button onClick={onAction}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', fontWeight: 600, borderRadius: '0.875rem', border: 'none', cursor: 'pointer', fontSize: '0.9rem', transition: 'opacity 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
