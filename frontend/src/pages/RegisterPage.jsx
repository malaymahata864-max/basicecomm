import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [errs, setErrs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((s) => s.auth);

  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name = 'Name is required';
    if (!form.email.trim())      e.email = 'Email is required';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrs(v); return; }
    const res = await dispatch(registerUser({ name: form.name, email: form.email, password: form.password }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Account created! Welcome 🎉');
      navigate('/');
    }
  };

  const fields = [
    { key: 'name',     type: 'text',                         label: 'Full Name',       placeholder: 'John Doe' },
    { key: 'email',    type: 'email',                        label: 'Email address',   placeholder: 'you@example.com' },
    { key: 'password', type: showPw ? 'text' : 'password',  label: 'Password',        placeholder: 'Minimum 6 characters', toggle: true },
    { key: 'confirm',  type: showPw ? 'text' : 'password',  label: 'Confirm Password',placeholder: 'Repeat your password' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0a0b10' }}>
      {/* Decorative panel */}
      <div style={{ display: 'none', flex: 1, position: 'relative', background: '#0d0f1a', alignItems: 'center', justifyContent: 'center' }} className="auth-decor">
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '20rem', height: '20rem', background: 'radial-gradient(circle, rgba(244,63,94,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '15%', width: '16rem', height: '16rem', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }} className="animate-float">✨</div>
          <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.75rem', lineHeight: 1.2, marginBottom: '1rem' }}>Join thousands of<br /><span className="gradient-text">happy shoppers.</span></h2>
          <p style={{ color: '#475569', fontSize: '0.9375rem', maxWidth: '20rem', margin: '0 auto' }}>Create your account and start discovering premium products today.</p>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '22rem' }} className="animate-fadeIn">
          <Link to="/" style={{ display: 'inline-flex', textDecoration: 'none', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900 }} className="gradient-text">LUXEMART</span>
          </Link>

          <h1 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.375rem' }}>Create account</h1>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '2rem' }}>Fill in the details to get started</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {fields.map(({ key, type, label, placeholder, toggle }) => (
              <div key={key}>
                <label style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.375rem' }}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <input type={type} value={form[key]}
                    onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrs(er => ({ ...er, [key]: '' })); }}
                    placeholder={placeholder} className="input-base"
                    style={toggle ? { paddingRight: '3rem' } : {}} />
                  {toggle && (
                    <button type="button" onClick={() => setShowPw(s => !s)}
                      style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>
                      {showPw ? '🙈' : '👁️'}
                    </button>
                  )}
                </div>
                {errs[key] && <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errs[key]}</p>}
              </div>
            ))}

            {error && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.75rem', color: '#f87171', fontSize: '0.8125rem' }}>
                {error}
              </div>
            )}

            <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '0.25rem' }}>
              Create Account
            </Button>
          </form>

          <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
              onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`@media (min-width: 900px) { .auth-decor { display: flex !important; } }`}</style>
    </div>
  );
};

export default RegisterPage;
