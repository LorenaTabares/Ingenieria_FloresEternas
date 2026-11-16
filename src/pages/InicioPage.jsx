import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TarjetaProducto } from '../components/TarjetaProducto';
import { IMAGENES } from '../assets/imagenes';
import './InicioPage.css';

export function InicioPage() {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);
  const [indiceGaleria, setIndiceGaleria] = useState(0);

  const fotosInspiracion = [
    { src: IMAGENES.ramoFloresRosadasDoradas, alt: 'Ramo flores rosadas y doradas' },
    { src: IMAGENES.ramoFloresMoradasDoradas, alt: 'Ramo flores moradas y doradas' },
    { src: IMAGENES.ramoFloresAzulesBlancas, alt: 'Ramo flores azules y blancas' },
    { src: IMAGENES.corazonRosasRosadasMoradas, alt: 'Corazón de rosas' },
    { src: IMAGENES.ramoRosasLilasMoradas, alt: 'Ramo rosas lilas y moradas' }
  ];

  const anteriorFoto = () => {
    setIndiceGaleria((prev) => (prev === 0 ? fotosInspiracion.length - 1 : prev - 1));
  };

  const siguienteFoto = () => {
    setIndiceGaleria((prev) => (prev === fotosInspiracion.length - 1 ? 0 : prev + 1));
  };

  const fotosVisibles = [
    fotosInspiracion[indiceGaleria % fotosInspiracion.length],
    fotosInspiracion[(indiceGaleria + 1) % fotosInspiracion.length],
    fotosInspiracion[(indiceGaleria + 2) % fotosInspiracion.length],
  ];

  const preguntas = [
    {
      pregunta: '¿De qué materiales están hechas las flores?',
      respuesta: 'Están elaboradas a mano con cinta de satén de alta calidad y limpiapipas (chenille) moldeados pétalo por pétalo.'
    },
    {
      pregunta: '¿Cuánto tiempo duran estas flores?',
      respuesta: 'Al ser artesanales y no requerir agua ni luz solar directa, conservan su forma y color intactos durante años.'
    },
    {
      pregunta: '¿Puedo solicitar un diseño personalizado?',
      respuesta: '¡Sí! Puedes elegir los colores, el tipo de flor y la cantidad de tallos para tu ramo o detalle especial.'
    },
    {
      pregunta: '¿Cuál es el tiempo de entrega?',
      respuesta: 'Los diseños en stock se entregan en 24 a 48 horas. Los pedidos personalizados tardan de 3 a 5 días hábiles.'
    },
    {
      pregunta: '¿Realizan envíos a domicilio?',
      respuesta: 'Sí, realizamos envíos seguros a domicilio con empaque protector para que lleguen en perfecto estado.'
    }
  ];

  const togglePregunta = (indice) => {
    setPreguntaAbierta(preguntaAbierta === indice ? null : indice);
  };

  return (
    <main>
      {/* 1. SECCIÓN HERO */}
      <section className="inicio-hero">
        <div className="inicio-hero-contenedor">
          <div className="inicio-hero-texto">
            <span className="inicio-pildora">EL ARTE DE REGALAR RECUERDOS QUE NO CADUCAN</span>
            <h1 className="inicio-hero-titulo">Flores Eternas<br />Nicore</h1>
            <p className="inicio-hero-descripcion">
              Diseñamos símbolos de afecto eterno. Mediante el uso experto de cinta de seda y limpiapipas,
              moldeamos a mano cada pétalo para ofrecerte una pieza de artesanía única que ignora el paso del tiempo.
            </p>
            <Link to="/catalogo" className="inicio-boton-hero">Ver Catálogo</Link>
          </div>

          <div className="inicio-hero-circulo">
            <img
              src={IMAGENES.ramoFloresRosadasDoradas}
              alt="Ramo de flores eternas Nicore"
              className="inicio-hero-imagen"
            />
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN SOBRE NOSOTROS */}
      <div className="inicio-seccion-pantalla">
        <section className="inicio-tarjeta-blanca">
          <div className="inicio-sobre-grid">
            <div className="inicio-logo-grande">
              <img
                src={IMAGENES.nicoreLogo}
                alt="Nicore Flowers"
                className="inicio-img-logo-grande"
              />
            </div>

            <div>
              <h2 className="inicio-titulo-izq">Sobre Nosotros</h2>
              <p className="inicio-parrafo">
                En <strong>Flores Nicore</strong> inmortalizamos tus sentimientos con arte que nunca muere.
                Transformamos materiales como el chenille y telas de alta gama en obras maestras artesanales diseñadas para resistir el paso del tiempo.
              </p>
              <p className="inicio-parrafo">
                <strong>Cero mantenimiento:</strong> Olvida el agua; nuestras creaciones conservan su esplendor intacto para siempre.
              </p>
              <p className="inicio-parrafo">
                <strong>Exclusividad en cada pétalo:</strong> Cada pieza es única, fabricada a mano con devoción.
              </p>
              <p className="inicio-parrafo">
                No regales algo que se marchite; regala un recuerdo que dure toda la vida.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. SECCIÓN INSPIRACIÓN FLORAL */}
      <div className="inicio-seccion-pantalla">
        <section className="inicio-tarjeta-blanca">
          <h2 className="inicio-titulo-centrado">Inspiración Floral</h2>
          <p className="inicio-subtitulo-centrado">Momentos capturados para siempre en nuestras creaciones</p>

          <div className="inicio-carrusel-contenedor">
            <button onClick={anteriorFoto} className="inicio-boton-carrusel">‹</button>

            <div className="inicio-galeria-grid">
              {fotosVisibles.map((foto, i) => (
                <div key={i} className="inicio-foto-galeria">
                  <img src={foto.src} alt={foto.alt} className="inicio-img-galeria" />
                </div>
              ))}
            </div>

            <button onClick={siguienteFoto} className="inicio-boton-carrusel">›</button>
          </div>
        </section>
      </div>

      {/* 4. SECCIÓN NUESTROS MÁS VENDIDOS */}
      <div className="inicio-seccion-pantalla">
        <section className="inicio-seccion-ancha">
          <h2 className="inicio-titulo-centrado">Nuestros Más Vendidos</h2>
          <p className="inicio-subtitulo-centrado">Las flores favoritas de nuestra comunidad</p>

          <div className="inicio-productos-grid">
            <TarjetaProducto
              titulo="Lirios Eternos"
              descripcion="Brillo y elegancia que nunca se apaga."
              precio="$25.000"
              imagen={IMAGENES.lili}
              popular={true}
            />
            <TarjetaProducto
              titulo="Tulipanes"
              descripcion="Elegancia en limpiapipas de colores."
              precio="$16.000"
              imagen={IMAGENES.tulipanPipas}
              popular={false}
            />
            <TarjetaProducto
              titulo="Ramos"
              descripcion="Combinación de cintas y texturas."
              precio="$55.000"
              imagen={IMAGENES.ramoFloresLila}
              popular={false}
            />
            <TarjetaProducto
              titulo="Rosas de Satín"
              descripcion="Textura suave y brillo permanente."
              precio="$15.000"
              imagen={IMAGENES.florRosaLore}
              popular={false}
            />
          </div>
        </section>
      </div>

      {/* 5. SECCIÓN NUESTRO PROCESO CREATIVO */}
      <div className="inicio-seccion-pantalla">
        <section className="inicio-tarjeta-blanca">
          <h2 className="inicio-titulo-centrado">Nuestro Proceso Creativo</h2>

          <div className="inicio-pasos-grid">
            <div className="inicio-paso-item">
              <div className="inicio-icono-paso paso-naranja">🎨</div>
              <h4 className="inicio-paso-titulo">1. Diseño</h4>
              <p className="inicio-paso-texto">Seleccionamos colores y diseños según tu pedido o nuestras creaciones exclusivas.</p>
            </div>
            <div className="inicio-paso-item">
              <div className="inicio-icono-paso paso-azul">✍️</div>
              <h4 className="inicio-paso-titulo">2. Moldeado</h4>
              <p className="inicio-paso-texto">Cada pétalo se moldea a mano con limpiapipas, dándole forma y vida.</p>
            </div>
            <div className="inicio-paso-item">
              <div className="inicio-icono-paso paso-rosa">🌸</div>
              <h4 className="inicio-paso-titulo">3. Ensamblaje</h4>
              <p className="inicio-paso-texto">Unimos pétalos, tallos y hojas para crear flores realistas y hermosas.</p>
            </div>
            <div className="inicio-paso-item">
              <div className="inicio-icono-paso paso-verde">🎁</div>
              <h4 className="inicio-paso-titulo">4. Empaque</h4>
              <p className="inicio-paso-texto">Envolvemos con amor cada creación para que llegue perfecta a tus manos.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 6 y 7. TARJETAS DE BENEFICIOS Y PREGUNTAS FRECUENTES */}
      <div className="inicio-seccion-pantalla">
        <section className="inicio-seccion-ancha">
          <div className="inicio-beneficios-grid">
            <div className="inicio-tarjeta-beneficio">
              <span className="inicio-icono-beneficio">🖐️</span>
              <h4>100% Artesanal</h4>
              <p className="inicio-paso-texto">Cada pétalo es moldeado a mano con dedicación única.</p>
            </div>
            <div className="inicio-tarjeta-beneficio">
              <span className="inicio-icono-beneficio">♾️</span>
              <h4>Larga Duración</h4>
              <p className="inicio-paso-texto">Materiales premium que mantienen su color por años.</p>
            </div>
            <div className="inicio-tarjeta-beneficio">
              <span className="inicio-icono-beneficio">🚚</span>
              <h4>Envíos Seguros</h4>
              <p className="inicio-paso-texto">Entregas a domicilio con empaque protector de regalo.</p>
            </div>
          </div>
        </section>

        <section className="inicio-tarjeta-blanca">
          <h2 className="inicio-titulo-centrado">Preguntas Frecuentes</h2>
          <p className="inicio-subtitulo-centrado">Todo lo que necesitas saber sobre nuestras flores</p>

          <div className="inicio-lista-faq">
            {preguntas.map((item, index) => (
              <div key={index} className="inicio-item-faq">
                <button onClick={() => togglePregunta(index)} className="inicio-boton-faq">
                  <span>{item.pregunta}</span>
                  <span className="inicio-signo-faq">
                    {preguntaAbierta === index ? '−' : '+'}
                  </span>
                </button>
                {preguntaAbierta === index && (
                  <p className="inicio-respuesta-faq">{item.respuesta}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}