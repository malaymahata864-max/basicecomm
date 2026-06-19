import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineTruck, HiOutlineCheckCircle } from 'react-icons/hi2';
import { createOrder, clearOrderSuccess } from '../store/slices/orderSlice';
import { clearCart, selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { isLoading, orderSuccess, error } = useSelector((s) => s.orders);

  const [form, setForm] = useState({ fullName: '', street: '', city: '', postalCode: '', country: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!items.length) navigate('/cart');
  }, [items.length, navigate]);

  useEffect(() => {
    if (orderSuccess) {
      toast.success('Order placed successfully! 🎉', {
        style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' },
        duration: 4000,
      });
      dispatch(clearCart());
      dispatch(clearOrderSuccess());
      navigate('/orders');
    }
  }, [orderSuccess, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, { style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' } });
    }
  }, [error]);

  const validate = () => {
    const errs = {};
    Object.entries(form).forEach(([k, v]) => { if (!v.trim()) errs[k] = 'This field is required'; });
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    dispatch(createOrder({
      items: items.map((i) => ({ productId: i.product._id, qty: i.quantity, price: i.product.price })),
      totalAmount: total,
      address: form,
    }));
  };

  const inputClass = (field) =>
    `w-full bg-[#1a1d2e] border ${formErrors[field] ? 'border-red-500/60' : 'border-[#2a2e42]'} focus:border-violet-500/60 text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors`;

  const fields = [
    { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', span: 2 },
    { name: 'street', label: 'Street Address', placeholder: '123 Main Street', span: 2 },
    { name: 'city', label: 'City', placeholder: 'Mumbai' },
    { name: 'postalCode', label: 'Postal Code', placeholder: '400001' },
    { name: 'country', label: 'Country', placeholder: 'India', span: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2">
                <HiOutlineTruck className="text-violet-400 text-lg" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {fields.map(({ name, label, placeholder, span = 1 }) => (
                  <div key={name} className={span === 2 ? 'col-span-2' : 'col-span-1'}>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={form[name]}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [name]: e.target.value }));
                        setFormErrors((err) => ({ ...err, [name]: '' }));
                      }}
                      placeholder={placeholder}
                      className={inputClass(name)}
                    />
                    {formErrors[name] && (
                      <p className="text-red-400 text-xs mt-1">{formErrors[name]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-5">Payment Method</h2>
              <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <HiOutlineCheckCircle className="text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Cash on Delivery</p>
                  <p className="text-slate-500 text-xs mt-0.5">Pay when your order arrives at your doorstep</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 sticky top-24">
              <h2 className="text-white font-bold text-base mb-5">Order Summary</h2>

              {/* Items list */}
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product._id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1d2e]">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-violet-900/30" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-200 text-xs font-medium line-clamp-1">{product.name}</p>
                      <p className="text-slate-500 text-xs">Qty: {quantity}</p>
                    </div>
                    <p className="text-white text-xs font-semibold flex-shrink-0">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2a2e42] pt-4 space-y-2.5 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="flex justify-between font-bold pt-1 border-t border-[#2a2e42]">
                  <span className="text-white">Total</span>
                  <span className="text-lg gradient-text">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
