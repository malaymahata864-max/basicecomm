import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineShoppingBag, HiOutlineStar, HiOutlineArrowLeft, HiOutlineTag, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { fetchProductById, clearSelectedProduct, updateProductRating } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { SkeletonProductDetail } from '../components/ui/LoadingSkeleton';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedRating, setSelectedRating] = useState(5);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const { selectedProduct: product, products, isLoading, error } = useSelector((s) => s.products);
  const { isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  const averageRating = Number(product?.avgRating ?? 0);
  const reviewCount = product?.ratings?.length ?? 0;

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please log in to rate products.');
      navigate('/login');
      return;
    }

    try {
      setIsSubmittingRating(true);
      await dispatch(updateProductRating({ id, rating: selectedRating })).unwrap();
      toast.success('Rating updated successfully');
    } catch (err) {
      toast.error(err || 'Failed to update rating');
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity: qty }));
    toast.success(`Added ${qty} × ${product.name} to cart!`, {
      style: { background: '#12141f', color: '#f1f5f9', border: '1px solid #2a2e42' },
    });
  };

  const related = products
    .filter((p) => p.category === product?.category && p._id !== id)
    .slice(0, 4);

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SkeletonProductDetail />
    </div>
  );

  if (error || !product) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <p className="text-slate-400 text-lg mb-6">Product not found.</p>
      <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-violet-400 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-slate-300 truncate max-w-50">{product.name}</span>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="group relative rounded-3xl overflow-hidden bg-[#12141f] border border-[#2a2e42] aspect-square max-h-130">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-violet-900/20 to-purple-900/10">
              <HiOutlineShoppingBag className="text-8xl text-violet-500/30" />
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-red-500/80 px-6 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col py-2">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="primary">{product.category}</Badge>
            {product.stock > 0 ? (
              <Badge variant="success">● In Stock ({product.stock})</Badge>
            ) : (
              <Badge variant="danger">● Out of Stock</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white leading-tight mb-4">{product.name}</h1>

          <div className="mb-4">
            <StarRating rating={averageRating} numReviews={reviewCount} size="md" />
          </div>

          <div className="text-4xl font-black text-white mb-6">
            ₹{product.price?.toLocaleString('en-IN')}
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-8 border-t border-[#2a2e42] pt-6">
            {product.description}
          </p>

          <div className="mb-6 rounded-2xl border border-[#2a2e42] bg-[#12141f] p-5">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineStar className="text-violet-400 text-lg" />
              <h2 className="text-sm font-semibold text-white">Rate this product</h2>
            </div>

            {isAuthenticated ? (
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {[5, 4, 3, 2, 1].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedRating(value)}
                      className={`h-10 w-10 rounded-full border text-sm font-bold transition-all ${
                        selectedRating === value
                          ? 'border-violet-400 bg-violet-500/20 text-violet-300'
                          : 'border-[#2a2e42] bg-white/5 text-slate-400 hover:border-violet-500/50 hover:text-white'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-slate-400">{selectedRating} / 5</span>
                </div>

                <Button type="submit" size="sm" disabled={isSubmittingRating}>
                  {isSubmittingRating ? 'Updating…' : 'Update Rating'}
                </Button>
              </form>
            ) : (
              <p className="text-sm text-slate-400">
                Log in to leave a rating and update the product average.
              </p>
            )}
          </div>

          {/* Quantity + Add */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-[#1a1d2e] border border-[#2a2e42] rounded-xl p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-bold"
                >
                  −
                </button>
                <span className="w-10 text-center text-white font-semibold text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all font-bold"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAdd}
                className="flex-1"
                size="lg"
              >
                <HiOutlineShoppingBag className="text-base" />
                Add to Cart
              </Button>
            </div>
          )}

          {product.stock === 0 && (
            <div className="py-4 px-5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center mb-6">
              This product is currently out of stock
            </div>
          )}

          {/* Details table */}
          <div className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-5 space-y-3 mt-auto">
            {[
              ['Category', product.category],
              ['Stock', `${product.stock} units`],
              ['Rating', `${averageRating.toFixed(1)} / 5.0`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="text-slate-200 font-medium capitalize">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
