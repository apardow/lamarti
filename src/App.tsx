import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HistoriaPage from './pages/HistoriaPage';
import ActividadesPage from './pages/ActividadesPage';
import NoticiasPage from './pages/NoticiasPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen selection:bg-marti-orange selection:text-white">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historia" element={<HistoriaPage />} />
          <Route path="/actividades" element={<ActividadesPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
