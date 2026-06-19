import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { fetchOrders } from '../store/slices/orderSlice';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { SkeletonCard } from '../components/ui/LoadingSkeleton';

const statusVariant = { Pending: 'warning', Shipped: 'info', Delivered: 'success' };

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, isLoading } = useSelector((s) => s.orders);
  const { user } = useSelector((s) => s.auth);
  const orderTitle = user?.role === 'admin' ? 'All Orders' : 'My Orders';

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  // Filter orders for current user (since GET /api/orders may return all for admin)
  const myOrders = orders.filter((o) => {
    if (!user) return false;
    const oUserId = typeof o.userId === 'object' ? o.userId?._id : o.userId;
    return oUserId === user._id || user.role === 'admin';
  });

  if (isLoading) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">{orderTitle}</h1>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-shimmer rounded-2xl" />
        ))}
      </div>
    </div>
  );

  if (!myOrders.length) return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">{orderTitle}</h1>
      <EmptyState
        icon={<HiOutlineShoppingBag />}
        title="No orders yet"
        description="Once you place an order, it'll appear here."
        actionLabel="Start Shopping"
        onAction={() => navigate('/shop')}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <h1 className="text-2xl font-bold text-white mb-8">
        {orderTitle}{' '}
        <span className="text-slate-500 text-base font-normal">({myOrders.length})</span>
      </h1>

      <div className="space-y-4">
        {myOrders.map((order, i) => (
          <div
            key={order._id}
            onClick={() => navigate(`/orders/${order._id}`)}
            className={`p-5 bg-[#12141f] border border-[#2a2e42] rounded-2xl cursor-pointer card-hover hover:border-violet-500/30 transition-all animate-fadeIn stagger-${Math.min(i + 1, 8)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-400 bg-[#1a1d2e] px-2 py-1 rounded-lg">
                    #{order._id?.slice(-8).toUpperCase()}
                  </span>
                  <Badge variant={statusVariant[order.status] || 'default'}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-slate-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-white">
                  ₹{order.totalAmount?.toLocaleString('en-IN')}
                </p>
                <p className="text-violet-400 text-xs mt-1">View Details →</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
