import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CompraPage.css';

export function CompraPage() {
  const [carrito, setCarrito] = useState([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(productosGuardados);
  }, []);

  const totalCompra = carrito.reduce((total, prod) => total + prod.precio, 0);

  const handleConfirmarCompra = (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      setMensaje({
        texto: "Tu carrito está vacío. No hay productos para procesar.",
        tipo: "error"
      });
      return;
    }

    setProcesando(true);

    // Simulamos el procesamiento del pago
    setTimeout(() => {
      // Limpia el carrito del localStorage porque ya se compraron los productos
      localStorage.removeItem('carrito');
      setCarrito([]);

      setMensaje({
        texto: `¡Compra procesada con éxito vía ${metodoPago.toUpperCase()}! Redirigiendo al catálogo...`,
        tipo: "exito"
      });

      setTimeout(() => {
        setProcesando(false);
        navigate('/catalogo');
      }, 2000);
    }, 800);
  };

  return (
    <div className="compra-page">
      <div className="pago-card">
        <h2 className="pago-titulo">Información de Pago</h2>

        {mensaje.texto && (
          <div className={`alerta-compra alerta-${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        {/* Resumen rápido del pedido */}
        {carrito.length > 0 && (
          <div className="resumen-pago">
            <div className="resumen-fila">
              <span>Productos seleccionados:</span>
              <strong>{carrito.length} {carrito.length === 1 ? 'artículo' : 'artículos'}</strong>
            </div>
            <div className="resumen-total">
              <span>Total a pagar:</span>
              <span>${totalCompra.toLocaleString()}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleConfirmarCompra}>
          <div className="form-grupo">
            <label htmlFor="metodoPago" className="form-label">
              Selecciona tu método de pago
            </label>
            <select
              className="custom-input"
              id="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              disabled={procesando}
              required
            >
              <option value="" disabled>Elige una opción...</option>
              <option value="nequi">Nequi / Daviplata</option>
              <option value="tarjeta">Tarjeta de Crédito/Débito</option>
              <option value="PSE">PSE / Transferencia</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-comprar-final"
            disabled={procesando}
          >
            {procesando ? "Procesando pago..." : "Confirmar Compra"}
          </button>
        </form>

        <div className="volver-contenedor">
          <Link to="/carrito" className="link-volver">← Volver al carrito</Link>
        </div>
      </div>
    </div>
  );
}