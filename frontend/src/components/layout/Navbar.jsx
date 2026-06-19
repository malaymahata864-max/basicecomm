import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartItemCount);
  const ordersMenuLabel = user?.role === 'admin' ? 'All Orders' : 'My Orders';

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out successfully');
    navigate('/');
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '64px',
          background: 'rgba(10,11,16,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1e2235',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', height: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em' }} className="gradient-text">
              LUXEMART
            </span>
          </Link>

          {/* Search — desktop */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '28rem', margin: '0 auto', display: 'none' }} className="sm-search">
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: '#4a5175' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="input-base"
                style={{ paddingLeft: '2.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', borderRadius: '9999px' }}
              />
            </div>
          </form>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', flexShrink: 0 }}>

            {/* Cart */}
            <Link to="/cart" style={{ position: 'relative', padding: '0.5rem', color: '#94a3b8', borderRadius: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s, background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}>
              <svg style={{ width: '1.375rem', height: '1.375rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  minWidth: '18px', height: '18px', background: '#7c3aed',
                  color: '#fff', fontSize: '10px', fontWeight: 700,
                  borderRadius: '999px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', padding: '0 4px',
                }}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Desktop auth */}
            {isAuthenticated ? (
              <div style={{ position: 'relative', display: 'none' }} className="desktop-auth">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 0.75rem', borderRadius: '0.75rem',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#cbd5e1', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '12px', fontWeight: 700,
                  }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name}
                  </span>
                  <svg style={{ width: '14px', height: '14px', transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setUserMenuOpen(false)} />
                    <div style={{
                      position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                      width: '180px', background: '#12141f',
                      border: '1px solid #1e2235', borderRadius: '0.875rem',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 20,
                      overflow: 'hidden',
                    }} className="animate-scaleIn">
                      {[
                        { to: '/profile', label: 'My Profile' },
                        { to: '/orders', label: ordersMenuLabel },
                        ...(user?.role === 'admin'
                          ? [
                              { to: '/admin/analytics', label: 'Analytics' },
                              { to: '/admin/products/new', label: 'Upload Product' },
                            ]
                          : []),
                      ].map(item => (
                        <Link key={item.to} to={item.to} onClick={() => setUserMenuOpen(false)}
                          style={{ display: 'block', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#cbd5e1', textDecoration: 'none', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          {item.label}
                        </Link>
                      ))}
                      <div style={{ height: '1px', background: '#1e2235', margin: '0 0.75rem' }} />
                      <button onClick={handleLogout}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: 'none', gap: '0.5rem' }} className="desktop-auth">
                <Link to="/login" style={{
                  padding: '0.5rem 1rem', fontSize: '0.875rem', color: '#94a3b8',
                  textDecoration: 'none', borderRadius: '0.75rem', transition: 'background 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
                  Login
                </Link>
                <Link to="/register" style={{
                  padding: '0.5rem 1.125rem', fontSize: '0.875rem', fontWeight: 600,
                  color: '#fff', textDecoration: 'none', borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="mobile-menu-btn"
              style={{ padding: '0.5rem', color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {mobileOpen ? (
                <svg style={{ width: '1.375rem', height: '1.375rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg style={{ width: '1.375rem', height: '1.375rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Spacer ──────────────────────────────────────── */}
      <div style={{ height: '64px' }} />

      {/* ── Mobile Drawer ───────────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 90 }}
          />
          <div style={{
            position: 'fixed', top: '64px', right: 0, bottom: 0, width: '280px',
            background: '#0e1018', borderLeft: '1px solid #1e2235',
            zIndex: 95, overflowY: 'auto', padding: '1.25rem',
          }} className="animate-slideInRight">

            {/* Mobile search */}
            <form onSubmit={handleSearch} style={{ marginBottom: '1.25rem' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="input-base"
              />
            </form>

            {/* Links */}
            {[{ to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' }, { to: `/cart`, label: `Cart (${cartCount})` }].map(item => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                style={{ display: 'block', padding: '0.75rem 0.875rem', marginBottom: '0.25rem', borderRadius: '0.75rem', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {item.label}
              </Link>
            ))}

            <div style={{ height: '1px', background: '#1e2235', margin: '1rem 0' }} />

            {isAuthenticated ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', marginBottom: '0.75rem', background: '#12141f', borderRadius: '0.875rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                  </div>
                </div>
                {[
                  { to: '/profile', label: 'My Profile' },
                  { to: '/orders', label: ordersMenuLabel },
                  ...(user?.role === 'admin'
                    ? [
                        { to: '/admin/analytics', label: 'Analytics' },
                        { to: '/admin/products/new', label: 'Upload Product' },
                      ]
                    : []),
                ].map(item => (
                  <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                    style={{ display: 'block', padding: '0.75rem 0.875rem', marginBottom: '0.25rem', borderRadius: '0.75rem', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    {item.label}
                  </Link>
                ))}
                <button onClick={handleLogout}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 0.875rem', marginTop: '0.5rem', borderRadius: '0.75rem', color: '#f87171', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #1e2235', color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @media (min-width: 640px) {
          .sm-search { display: block !important; }
          .desktop-auth { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
