const variantStyles = {
  success: { background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' },
  warning: { background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' },
  danger:  { background: 'rgba(239,68,68,0.12)',  color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' },
  info:    { background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' },
  primary: { background: 'rgba(124,58,237,0.12)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.25)' },
  default: { background: 'rgba(71,85,105,0.2)',   color: '#94a3b8', border: '1px solid rgba(71,85,105,0.3)' },
};

const Badge = ({ variant = 'default', children, size = 'sm' }) => {
  const vStyle = variantStyles[variant] || variantStyles.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: size === 'md' ? '0.3rem 0.75rem' : '0.2rem 0.6rem',
      borderRadius: '9999px',
      fontSize: size === 'md' ? '0.8125rem' : '0.75rem',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      ...vStyle,
    }}>
      {children}
    </span>
  );
};

export default Badge;
