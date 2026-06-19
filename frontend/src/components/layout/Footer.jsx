import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#0d0f1a', borderTop: '1px solid #1e2235', marginTop: 'auto' }}>
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
      <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: '1fr' }} className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🛍️</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.03em' }} className="gradient-text">LUXEMART</span>
          </div>
          <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '22rem' }}>
            Your premium destination for quality products. Shop smarter, live better.
          </p>
          <div style={{ display: 'flex', gap: '0.625rem', marginTop: '1.25rem' }}>
            {['GitHub', 'Twitter', 'Instagram'].map(s => (
              <a key={s} href="#" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.625rem', background: '#12141f', border: '1px solid #1e2235', color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.color = '#a78bfa'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e2235'; e.currentTarget.style.color = '#64748b'; }}
                aria-label={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Cart'], ['/orders', 'My Orders'], ['/profile', 'Profile']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Food'].map(cat => (
              <li key={cat}>
                <Link to={`/shop?category=${cat.toLowerCase()}`} style={{ color: '#475569', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
                  onMouseLeave={e => e.currentTarget.style.color = '#475569'}>
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {['📧 support@luxemart.com', '📞 +91 98765 43210', '🕐 Mon–Fri, 9AM–6PM IST'].map(item => (
              <p key={item} style={{ color: '#475569', fontSize: '0.875rem' }}>{item}</p>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: '#12141f', border: '1px solid #1e2235', borderRadius: '0.75rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Free Shipping</p>
            <p style={{ color: '#475569', fontSize: '0.75rem' }}>On all orders above ₹999</p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: '1px solid #1e2235' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.125rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <p style={{ color: '#334155', fontSize: '0.8125rem' }}>© {new Date().getFullYear()} LUXEMART. All rights reserved.</p>
        <p style={{ color: '#1e2235', fontSize: '0.8125rem' }}>Built with ❤️ in India</p>
      </div>
    </div>

    <style>{`
      @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1.25fr !important; } }
    `}</style>
  </footer>
);

export default Footer;
