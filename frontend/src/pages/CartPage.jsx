import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineTrash, HiOutlineShoppingBag, HiOutlineArrowRight } from 'react-icons/hi2';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import toast from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleRemove = (productId, name) => {
    dispatch(removeFromCart(productId));
    toast.success(`${name} removed`, { style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' } });
  };

  if (!items.length) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <EmptyState
        icon={<HiOutlineShoppingBag />}
        title="Your cart is empty"
        description="Looks like you haven't added anything yet."
        actionLabel="Start Shopping"
        onAction={() => navigate('/shop')}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <h1 className="text-2xl font-bold text-white mb-8">
        Shopping Cart <span className="text-slate-500 text-base font-normal">({items.length} item{items.length !== 1 ? 's' : ''})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="flex gap-4 p-4 bg-[#12141f] border border-[#2a2e42] rounded-2xl hover:border-violet-500/20 transition-all"
            >
              {/* Image */}
              <Link to={`/product/${product._id}`} className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#1a1d2e]">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HiOutlineShoppingBag className="text-2xl text-violet-500/40" />
                    </div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product._id}`} className="text-white text-sm font-semibold hover:text-violet-400 transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <p className="text-slate-500 text-xs capitalize mt-0.5">{product.category}</p>
                <p className="text-violet-400 font-bold mt-1">₹{product.price?.toLocaleString('en-IN')}</p>
              </div>

              {/* Quantity + Remove */}
              <div className="flex flex-col items-end justify-between gap-3">
                <button
                  onClick={() => handleRemove(product._id, product.name)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                  aria-label="Remove item"
                >
                  <HiOutlineTrash className="text-lg" />
                </button>

                <div className="flex items-center gap-1 bg-[#1a1d2e] border border-[#2a2e42] rounded-lg p-0.5">
                  <button
                    onClick={() => dispatch(updateQuantity({ productId: product._id, quantity: quantity - 1 }))}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-white text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ productId: product._id, quantity: quantity + 1 }))}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <p className="text-white text-sm font-bold">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 sticky top-24">
            <h2 className="text-white font-bold text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-white font-medium">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              <div className="border-t border-[#2a2e42] pt-3 flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-xl font-black gradient-text">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Button onClick={() => navigate('/checkout')} fullWidth size="lg">
              Checkout <HiOutlineArrowRight />
            </Button>
            <Button onClick={() => navigate('/shop')} variant="ghost" fullWidth className="mt-3">
              Continue Shopping
            </Button>

            {/* COD note */}
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 text-center">
              🚚 Cash on Delivery available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
