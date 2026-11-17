import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TiposFloresPage.css';

const TIPOS_FLORES = [
  {
    id: 'rosas',
    nombre: 'Rosas',
    descripcion: 'Clásicas, románticas y elegantes. Perfectas para cualquier ocasión especial.',
    variantes: [
      { nombreColor: 'Rojo', clase: 'rojo', imagen: '/img-tipos-flores/Rosa-roja.jpg' },
      { nombreColor: 'Rosado', clase: 'rosado', imagen: '/img-tipos-flores/Rosa-pink.jpg' },
      { nombreColor: 'Blanco', clase: 'blanco', imagen: '/img-tipos-flores/Rosa-blanca.jpg' },
      { nombreColor: 'Amarillo', clase: 'amarillo', imagen: '/img-tipos-flores/Rosa-amarilla.jpg' },
      { nombreColor: 'Azul Rey', clase: 'azul-rey', imagen: '/img-tipos-flores/Rosa-azul-rey.jpg' },
      { nombreColor: 'Azul Cian', clase: 'azul-cian', imagen: '/img-tipos-flores/Rosa-azul-cian.jpg' },
      { nombreColor: 'Azul Claro', clase: 'azul-claro', imagen: '/img-tipos-flores/Rosa-azul-claro.jpg' },
      { nombreColor: 'Morado', clase: 'morado', imagen: '/img-tipos-flores/Rosa-morada.jpg' },
      { nombreColor: 'Lila', clase: 'lila', imagen: '/img-tipos-flores/Rosa-lila.jpg' },
      { nombreColor: 'Dorado', clase: 'dorado', imagen: '/img-tipos-flores/Rosa-dorada.jpg' },
      { nombreColor: 'Fucsia', clase: 'fucsia', imagen: '/img-tipos-flores/Rosa-fucsia.jpg' },
      { nombreColor: 'Negro', clase: 'negro', imagen: '/img-tipos-flores/Rosa-negra.jpg' },
    ]
  },
  {
    id: 'tulipanes',
    nombre: 'Tulipanes',
    descripcion: 'Flores delicadas y modernas que transmiten elegancia y suavidad.',
    variantes: [
      { nombreColor: 'Rojo', clase: 'rojo', imagen: '/img-tipos-flores/Tulipan-rojo.jpg' },
      { nombreColor: 'Rosado', clase: 'rosado', imagen: '/img-tipos-flores/Tulipan-pink.jpg' },
      { nombreColor: 'Blanco', clase: 'blanco', imagen: '/img-tipos-flores/Tulipan-blanco.jpg' },
      { nombreColor: 'Amarillo', clase: 'amarillo', imagen: '/img-tipos-flores/Tulipan-amarillo.jpg' },
      { nombreColor: 'Azul Rey', clase: 'azul-rey', imagen: '/img-tipos-flores/Tulipan-azul-rey.jpg' },
      { nombreColor: 'Azul Cian', clase: 'azul-cian', imagen: '/img-tipos-flores/Tulipan-azul-cian.jpg' },
      { nombreColor: 'Azul Claro', clase: 'azul-claro', imagen: '/img-tipos-flores/Tulipan-azul-claro.jpg' },
      { nombreColor: 'Morado', clase: 'morado', imagen: '/img-tipos-flores/Tulipan-morado.jpg' },
      { nombreColor: 'Lila', clase: 'lila', imagen: '/img-tipos-flores/Tulipan-lila.jpg' },
      { nombreColor: 'Dorado', clase: 'dorado', imagen: '/img-tipos-flores/Tulipan-dorado.jpg' },
      { nombreColor: 'Fucsia', clase: 'fucsia', imagen: '/img-tipos-flores/Tulipan-fucsia.jpg' },
      { nombreColor: 'Negro', clase: 'negro', imagen: '/img-tipos-flores/Tulipan-negro.jpg' },
    ]
  },
  {
    id: 'girasoles',
    nombre: 'Girasoles',
    descripcion: 'Llenos de energía y alegría, ideales para transmitir felicidad.',
    variantes: [
      { nombreColor: 'Amarillo', clase: 'amarillo', imagen: '/img-tipos-flores/Girasol-amarillo.png' },
      { nombreColor: 'Rojo', clase: 'rojo', imagen: '/img-tipos-flores/Girasol-rojo.jpg' },
      { nombreColor: 'Rosado', clase: 'rosado', imagen: '/img-tipos-flores/Girasol-pink.jpg' },
      { nombreColor: 'Blanco', clase: 'blanco', imagen: '/img-tipos-flores/Girasol-blanco.jpg' },
      { nombreColor: 'Azul Rey', clase: 'azul-rey', imagen: '/img-tipos-flores/Girasol-azul-rey.jpg' },
      { nombreColor: 'Azul Cian', clase: 'azul-cian', imagen: '/img-tipos-flores/Girasol-azul-cian.jpg' },
      { nombreColor: 'Azul Claro', clase: 'azul-claro', imagen: '/img-tipos-flores/Girasol-azul-claro.jpg' },
      { nombreColor: 'Morado', clase: 'morado', imagen: '/img-tipos-flores/Girasol-morado.jpg' },
      { nombreColor: 'Lila', clase: 'lila', imagen: '/img-tipos-flores/Girasol-lila.jpg' },
      { nombreColor: 'Dorado', clase: 'dorado', imagen: '/img-tipos-flores/Girasol-dorado.png' },
      { nombreColor: 'Fucsia', clase: 'fucsia', imagen: '/img-tipos-flores/Girasol-fucsia.jpg' },
      { nombreColor: 'Negro', clase: 'negro', imagen: '/img-tipos-flores/Girasol-negro.jpg' },
    ]
  }
];

// Subcomponente individual para manejar el estado del color de cada flor
function TarjetaTipoFlor({ flor }) {
  const [varianteActual, setVarianteActual] = useState(flor.variantes[0]);
  const navigate = useNavigate();

  const handleSolicitarChat = () => {
    // Guardamos la selección para prellenar el formulario/chat de Contacto
    const mensajePredefinido = `Hola Nicore Flowers 🌸, me gustaría cotizar un ramo personalizado de ${flor.nombre} en color ${varianteActual.nombreColor}.`;
    localStorage.setItem('mensajePersonalizado', mensajePredefinido);
    navigate('/contacto');
  };

  return (
    <div className="card-flor">
      <div className="img-flor-container">
        <img
          src={varianteActual.imagen}
          className="img-flor"
          alt={`${flor.nombre} ${varianteActual.nombreColor}`}
        />
      </div>

      <div className="card-flor-body">
        <h3 className="flor-titulo">{flor.nombre}</h3>
        <p className="flor-desc">{flor.descripcion}</p>

        <span className="color-seleccionado-texto">
          Color: {varianteActual.nombreColor}
        </span>

        <div className="colores">
          {flor.variantes.map((variante) => (
            <span
              key={variante.nombreColor}
              title={variante.nombreColor}
              className={`color ${variante.clase} ${varianteActual.nombreColor === variante.nombreColor ? 'activo' : ''}`}
              onClick={() => setVarianteActual(variante)}
            />
          ))}
        </div>

        <button className="btn-solicitar-chat" onClick={handleSolicitarChat}>
          <i className="fa-regular fa-comment-dots"></i>
          Solicitar en el chat
        </button>
      </div>
    </div>
  );
}

export function TiposFloresPage() {
  return (
    <div className="tipos-flores-page">
      <div className="tipos-contenedor">
        <h1 className="titulo-principal">Tipos de Flores</h1>
        <p className="subtitulo">
          Explora nuestra variedad de flores y elige tus favoritas para crear el ramo perfecto.
        </p>

        <div className="grid-tipos-flores">
          {TIPOS_FLORES.map((flor) => (
            <TarjetaTipoFlor key={flor.id} flor={flor} />
          ))}
        </div>
      </div>
    </div>
  );
}