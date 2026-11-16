import './TarjetaProducto.css';

export function TarjetaProducto({ titulo, descripcion, precio, imagen, popular }) {
  return (
    <div className="tarjeta-producto">
      {popular && <span className="tarjeta-etiqueta">Popular</span>}

      <div className="tarjeta-caja-imagen">
        <img src={imagen} alt={titulo} className="tarjeta-imagen" />
      </div>

      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <p className="tarjeta-descripcion">{descripcion}</p>
        <p className="tarjeta-precio">Desde {precio}</p>
        <button className="tarjeta-boton">Lo quiero</button>
      </div>
    </div>
  );
}