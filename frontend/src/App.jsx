import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';

const App = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-[#0a0b10]">
      <Navbar />
      <main className="flex-1">
        <AppRouter />
      </main>
      <Footer />
    </div>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#12141f',
          color: '#f1f5f9',
          border: '1px solid #2a2e42',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
      }}
    />
  </BrowserRouter>
);

export default App;
