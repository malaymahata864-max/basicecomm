import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineShoppingBag,
  HiOutlineHome,
  HiOutlineArrowTrendingUp,
  HiOutlineCloudArrowUp,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import { logoutUser } from '../store/slices/authSlice';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out', { style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' } });
    navigate('/');
  };

  const actions = [
    {
      icon: <HiOutlineClipboardDocumentList className="text-3xl text-violet-400" />,
      title: user?.role === 'admin' ? 'All Orders' : 'My Orders',
      desc: user?.role === 'admin' ? 'View all customer orders' : 'View your order history',
      to: '/orders',
      color: 'from-violet-600/10 to-purple-600/5 border-violet-500/20 hover:border-violet-500/40',
    },
    {
      icon: <HiOutlineShoppingBag className="text-3xl text-rose-400" />,
      title: 'Shopping Cart',
      desc: 'View items in your cart',
      to: '/cart',
      color: 'from-rose-600/10 to-pink-600/5 border-rose-500/20 hover:border-rose-500/40',
    },
    {
      icon: <HiOutlineHome className="text-3xl text-amber-400" />,
      title: 'Browse Products',
      desc: 'Discover new arrivals',
      to: '/shop',
      color: 'from-amber-600/10 to-orange-600/5 border-amber-500/20 hover:border-amber-500/40',
    },
    ...(user?.role === 'admin'
      ? [
          {
            icon: <HiOutlineArrowTrendingUp className="text-3xl text-emerald-400" />,
            title: 'Analytics',
            desc: 'Track store performance',
            to: '/admin/analytics',
            color: 'from-emerald-600/10 to-teal-600/5 border-emerald-500/20 hover:border-emerald-500/40',
          },
          {
            icon: <HiOutlineCloudArrowUp className="text-3xl text-cyan-400" />,
            title: 'Upload Product',
            desc: 'Add a new product listing',
            to: '/admin/products/new',
            color: 'from-cyan-600/10 to-blue-600/5 border-cyan-500/20 hover:border-cyan-500/40',
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fadeIn">
      {/* Profile card */}
      <div className="bg-[#12141f] border border-[#2a2e42] rounded-3xl p-8 text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-4xl font-black mx-auto mb-5 ring-4 ring-violet-500/20">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{user?.name}</h1>
        <p className="text-slate-400 text-sm mb-4">{user?.email}</p>
        <div className="flex items-center justify-center gap-3">
          <Badge variant={user?.role === 'admin' ? 'warning' : 'primary'}>
            {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
          </Badge>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {actions.map(({ icon, title, desc, to, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`p-5 bg-linear-to-br ${color} border rounded-2xl text-left card-hover transition-all group`}
          >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <p className="text-white font-semibold text-sm mb-1">{title}</p>
            <p className="text-slate-500 text-xs">{desc}</p>
          </button>
        ))}
      </div>

      {/* Account info */}
      <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold text-sm mb-4">Account Information</h2>
        <div className="space-y-3">
          {[
            ['Name', user?.name],
            ['Email', user?.email],
            ['Account Type', user?.role === 'admin' ? 'Administrator' : 'Standard User'],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-sm py-2 border-b border-[#2a2e42] last:border-0">
              <span className="text-slate-500">{label}</span>
              <span className="text-slate-200 font-medium capitalize">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <Button variant="danger" fullWidth onClick={handleLogout}>
        <HiOutlineArrowRightOnRectangle className="text-base" />
        Sign Out
      </Button>
    </div>
  );
};

export default ProfilePage;
