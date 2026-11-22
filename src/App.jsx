import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InicioPage } from './pages/InicioPage';
import { LoginPage } from './pages/LoginPage';
import { CatalogoPage } from './pages/CatalogoPage';
import { CarritoPage } from './pages/CarritoPage';
import { CompraPage } from './pages/CompraPage';
import { TiposFloresPage } from './pages/TiposFloresPage';
import { ContactoPage } from './pages/ContactoPage';
import { AdminUsuariosPage } from './pages/AdminUsuariosPage';
import { AdminComprasPage } from './pages/AdminComprasPage';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/tipos" element={<TiposFloresPage />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/compra" element={<CompraPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
        <Route path="/admin/compras" element={<AdminComprasPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;