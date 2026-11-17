import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InicioPage } from './pages/InicioPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogo" element={<h2 style={{ textAlign: 'center', padding: '80px' }}>Página de Catálogo en construcción</h2>} />
        <Route path="/tipos" element={<h2 style={{ textAlign: 'center', padding: '80px' }}>Página de Tipos de Flores en construcción</h2>} />
        <Route path="/carrito" element={<h2 style={{ textAlign: 'center', padding: '80px' }}>Página de Carrito en construcción</h2>} />
        <Route path="/contacto" element={<h2 style={{ textAlign: 'center', padding: '80px' }}>Página de Contacto en construcción</h2>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;