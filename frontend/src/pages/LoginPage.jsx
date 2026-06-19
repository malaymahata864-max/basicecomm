import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((s) => s.auth);
  const from = location.state?.from?.pathname || '/';

  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0b10' }}>
      {/* Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '22rem' }} className="animate-fadeIn">
          <Link to="/" style={{ display: 'inline-flex', textDecoration: 'none', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900 }} className="gradient-text">LUXEMART</span>
          </Link>

          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.375rem' }}>Welcome back</h1>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '2rem' }}>Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.375rem' }}>Email address</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required placeholder="you@example.com" className="input-base" />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.375rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required placeholder="Your password" className="input-base" style={{ paddingRight: '3rem' }} />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.75rem', color: '#f87171', fontSize: '0.8125rem' }}>
                {error}
              </div>
            )}

            <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '0.25rem' }}>
              Sign In
            </Button>
          </form>

          <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
              onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}>
              Create one
            </Link>
          </p>

          {/* Demo */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#12141f', border: '1px solid #1e2235', borderRadius: '0.875rem' }}>
            <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>Demo credentials</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>📧 user1@example.com</p>
            <p style={{ color: '#94a3b8', fontSize: '0.8125rem', marginTop: '0.25rem' }}>🔑 User@123</p>
          </div>
        </div>
      </div>

      {/* Decorative panel */}
      <div style={{ display: 'none', flex: 1, position: 'relative', background: '#0d0f1a', alignItems: 'center', justifyContent: 'center' }} className="auth-decor">
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '20rem', height: '20rem', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: '16rem', height: '16rem', background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }} className="animate-float">🛍️</div>
          <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1.2, marginBottom: '1rem' }}>Shop the best,<br /><span className="gradient-text">Live the best.</span></h2>
          <p style={{ color: '#475569', fontSize: '0.9375rem', maxWidth: '20rem', margin: '0 auto' }}>Premium products, unbeatable prices, delivered to your doorstep.</p>
        </div>
      </div>

      <style>{`@media (min-width: 900px) { .auth-decor { display: flex !important; } }`}</style>
    </div>
  );
};

export default LoginPage;
