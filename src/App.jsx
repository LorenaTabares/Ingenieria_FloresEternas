import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InicioPage } from './pages/InicioPage';
import { LoginPage } from './pages/LoginPage';
import { CatalogoPage } from './pages/CatalogoPage';
import { CarritoPage } from './pages/CarritoPage';
import { CompraPage } from './pages/CompraPage';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/compra" element={<CompraPage />} />
        <Route path="/tipos" element={<h2 style={{ textAlign: 'center', padding: '80px' }}>Página de Tipos de Flores en construcción</h2>} />
        <Route path="/contacto" element={<h2 style={{ textAlign: 'center', padding: '80px' }}>Página de Contacto en construcción</h2>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;