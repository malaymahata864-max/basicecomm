import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AdminProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', stock: '', image: null });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data;
        setForm({ title: p.name || '', description: p.description || '', price: p.price || '', category: p.category || '', stock: p.stock || '', image: null });
      } catch (err) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') return setForm((s) => ({ ...s, image: files?.[0] || null }));
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', form.title.trim());
      data.append('description', form.description.trim());
      data.append('price', String(form.price));
      data.append('category', form.category.trim());
      data.append('stock', String(form.stock));
      if (form.image) data.append('image', form.image);

      await api.put(`/products/${id}`, data);
      toast.success('Product updated');
      navigate('/admin/analytics');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Edit Product</h1>
        <p className="text-slate-400 text-sm mt-2">Update product title, stock and image.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-slate-300 text-sm mb-2">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="input-base" />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input-base" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm mb-2">Price</label>
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} className="input-base" />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-2">Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className="input-base" />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Category</label>
          <input name="category" value={form.category} onChange={handleChange} className="input-base" />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Image (optional)</label>
          <input name="image" type="file" accept="image/*" onChange={handleChange} className="block w-full text-sm text-slate-300" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-linear-to-r from-cyan-600 to-blue-600 hover:opacity-90 disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductEditPage;
