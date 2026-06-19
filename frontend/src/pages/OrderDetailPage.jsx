import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineArrowLeft, HiOutlineMapPin, HiOutlineTrash } from 'react-icons/hi2';
import { fetchOrderById, deleteOrder, updateOrderStatus, clearSelectedOrder } from '../store/slices/orderSlice';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const statusVariant = { Pending: 'warning', Shipped: 'info', Delivered: 'success' };
const orderStatusOptions = ['Pending', 'Shipped', 'Delivered'];

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedOrder: order, isLoading, isUpdatingStatus } = useSelector((s) => s.orders);
  const { user } = useSelector((s) => s.auth);
  const [nextStatus, setNextStatus] = useState('');

  useEffect(() => {
    dispatch(fetchOrderById(id));
    return () => dispatch(clearSelectedOrder());
  }, [dispatch, id]);

  useEffect(() => {
    setNextStatus(order?.status || '');
  }, [order?.status]);

  const handleDelete = async () => {
    if (!window.confirm('Cancel this order?')) return;
    const res = await dispatch(deleteOrder(id));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Order cancelled', { style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' } });
      navigate('/orders');
    }
  };

  const handleStatusUpdate = async () => {
    if (!nextStatus || !order || nextStatus === order.status) return;
    const res = await dispatch(updateOrderStatus({ id: order._id, status: nextStatus }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Order status updated', { style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' } });
      return;
    }
    toast.error(res.payload || 'Failed to update order status');
  };

  if (isLoading || !order) return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-4">
        <div className="h-8 w-48 animate-shimmer rounded-xl" />
        <div className="h-64 animate-shimmer rounded-2xl" />
        <div className="h-48 animate-shimmer rounded-2xl" />
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Back */}
      <Link to="/orders" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
        <HiOutlineArrowLeft /> Back to Orders
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-bold text-white mb-2">Order Details</h1>
          <p className="text-xs font-mono text-slate-500 bg-[#1a1d2e] px-3 py-1.5 rounded-lg inline-block">
            #{order._id?.slice(-12).toUpperCase()}
          </p>
        </div>
        <div className="text-right">
          <Badge variant={statusVariant[order.status] || 'default'} size="md">
            {order.status}
          </Badge>
          <p className="text-slate-500 text-xs mt-2">
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 mb-5">
        <h2 className="text-white font-semibold text-sm mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {order.items?.map((item, i) => {
            const prod = item.productId;
            return (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-[#2a2e42] last:border-0 last:pb-0">
                <div className="w-12 h-12 rounded-xl bg-[#1a1d2e] border border-[#2a2e42] overflow-hidden shrink-0">
                  {prod?.imageUrl ? (
                    <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-violet-900/20" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium line-clamp-1">
                    {prod?.name || 'Product'}
                  </p>
                  <p className="text-slate-500 text-xs">Quantity: {item.qty}</p>
                </div>
                <p className="text-white text-sm font-bold shrink-0">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </p>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-5 pt-4 border-t border-[#2a2e42] space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Subtotal</span>
            <span className="text-white">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Shipping</span>
            <span className="text-emerald-400">Free</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-[#2a2e42]">
            <span className="text-white">Total</span>
            <span className="gradient-text text-lg">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 mb-5">
        <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <HiOutlineMapPin className="text-violet-400" />
          Shipping Address
        </h2>
        <div className="text-slate-400 text-sm space-y-0.5">
          <p className="text-white font-medium">{order.address?.fullName}</p>
          <p>{order.address?.street}</p>
          <p>{order.address?.city}, {order.address?.postalCode}</p>
          <p>{order.address?.country}</p>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold text-sm mb-3">Payment</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Method</span>
          <span className="text-emerald-400 font-medium">Cash on Delivery</span>
        </div>
      </div>

      {/* Admin Status Control */}
      {user?.role === 'admin' && (
        <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold text-sm mb-4">Update Order Status</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={nextStatus}
              onChange={(e) => setNextStatus(e.target.value)}
              className="input-base"
            >
              {orderStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Button
              onClick={handleStatusUpdate}
              isLoading={isUpdatingStatus}
              disabled={!nextStatus || nextStatus === order.status}
              variant="primary"
            >
              Update Status
            </Button>
          </div>
        </div>
      )}

      {/* Cancel */}
      {order.status === 'Pending' && (
        <Button variant="danger" fullWidth onClick={handleDelete}>
          <HiOutlineTrash /> Cancel Order
        </Button>
      )}
    </div>
  );
};

export default OrderDetailPage;
