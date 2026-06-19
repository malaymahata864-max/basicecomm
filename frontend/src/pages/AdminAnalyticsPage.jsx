import { useEffect, useState } from 'react';
import api from '../api/axios';

const cardStyle = {
  background: '#12141f',
  border: '1px solid #2a2e42',
  borderRadius: '1rem',
  padding: '1.25rem',
};

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await api.get('/analytics');
        setAnalytics(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Analytics</h1>
        <p className="text-slate-400 text-sm mt-2">Overview of users, orders, products, and revenue.</p>
      </div>

      {isLoading && (
        <div style={cardStyle} className="text-slate-300">Loading analytics...</div>
      )}

      {error && (
        <div style={cardStyle} className="text-rose-300">{error}</div>
      )}

      {!isLoading && !error && analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: analytics.totalUsers ?? 0 },
            { label: 'Total Orders', value: analytics.totalOrders ?? 0 },
            { label: 'Total Products', value: analytics.totalProducts ?? 0 },
            { label: 'Total Revenue', value: `Rs. ${Number(analytics.totalRevenue ?? 0).toFixed(2)}` },
          ].map((item) => (
            <div key={item.label} style={cardStyle}>
              <p className="text-slate-400 text-xs uppercase tracking-wide">{item.label}</p>
              <p className="text-white text-2xl font-bold mt-3">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;
