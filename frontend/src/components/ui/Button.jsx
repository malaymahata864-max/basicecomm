const sizeMap = {
  sm: { padding: '0.4rem 0.875rem', fontSize: '0.8125rem', borderRadius: '0.625rem' },
  md: { padding: '0.625rem 1.25rem', fontSize: '0.875rem',  borderRadius: '0.75rem'  },
  lg: { padding: '0.875rem 1.75rem', fontSize: '0.9375rem', borderRadius: '0.875rem' },
};

const variantMap = {
  primary:   { background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', border: 'none' },
  secondary: { background: 'transparent', color: '#a78bfa', border: '1.5px solid rgba(124,58,237,0.5)' },
  danger:    { background: '#ef4444', color: '#fff', border: 'none' },
  ghost:     { background: 'transparent', color: '#94a3b8', border: '1px solid #1e2235' },
};

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  children,
  className = '',
  style: extraStyle = {},
  ...rest
}) => {
  const vStyle = variantMap[variant] || variantMap.primary;
  const sStyle = sizeMap[size] || sizeMap.md;
  const dis = disabled || isLoading;

  return (
    <button
      disabled={dis}
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: 'inherit',
        fontWeight: 600,
        cursor: dis ? 'not-allowed' : 'pointer',
        opacity: dis ? 0.55 : 1,
        transition: 'opacity 0.2s, transform 0.15s, box-shadow 0.2s',
        width: fullWidth ? '100%' : 'auto',
        whiteSpace: 'nowrap',
        ...vStyle,
        ...sStyle,
        ...extraStyle,
      }}
      onMouseEnter={e => { if (!dis) e.currentTarget.style.opacity = '0.88'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = dis ? '0.55' : '1'; }}
      onMouseDown={e => { if (!dis) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      className={className}
    >
      {isLoading ? (
        <>
          <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} className="animate-spin-slow" />
          Loading…
        </>
      ) : children}
    </button>
  );
};

export default Button;
