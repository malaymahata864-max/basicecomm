import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-[80vh] flex items-center justify-center px-6">
    <div className="text-center animate-scaleIn">
      {/* Decorative blobs */}
      <div className="relative inline-block mb-8">
        <div className="absolute -top-8 -left-8 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <span className="relative text-[10rem] font-black gradient-text leading-none select-none">404</span>
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-violet-500/25 hover:-translate-y-0.5"
        >
          Go Home
        </Link>
        <Link
          to="/shop"
          className="px-8 py-3.5 border border-[#2a2e42] hover:border-violet-500/40 text-slate-300 hover:text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5"
        >
          Browse Products
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
