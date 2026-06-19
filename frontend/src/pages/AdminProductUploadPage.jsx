import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const initialForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  image: null,
};

const AdminProductUploadPage = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', form.name.trim());
      data.append('description', form.description.trim());
      data.append('price', String(form.price));
      data.append('category', form.category.trim());
      data.append('stock', String(form.stock));
      if (form.image) {
        data.append('image', form.image);
      }

      await api.post('/products', data);

      toast.success('Product uploaded successfully');
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Upload Product</h1>
        <p className="text-slate-400 text-sm mt-2">Create a new product listing as admin.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#12141f] border border-[#2a2e42] rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <div>
          <label className="block text-slate-300 text-sm mb-2">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input-base"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="input-base"
            placeholder="Enter product description"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm mb-2">Price</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="input-base"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-2">Stock</label>
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
              className="input-base"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="input-base"
            placeholder="Electronics, Clothing, etc."
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-2">Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-slate-300"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-linear-to-r from-cyan-600 to-blue-600 hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductUploadPage;
