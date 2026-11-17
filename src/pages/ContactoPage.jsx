import { useState, useEffect } from 'react';
import './ContactoPage.css';


const NUMERO_WHATSAPP = "573206104806";

export function ContactoPage() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [alerta, setAlerta] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    const mensajeGuardado = localStorage.getItem('mensajePersonalizado');
    if (mensajeGuardado) {
      setMensaje(mensajeGuardado);
      localStorage.removeItem('mensajePersonalizado');
    }

    const nombreUsuario = localStorage.getItem('usuarioNombre');
    const emailUsuario = localStorage.getItem('usuarioEmail');
    if (nombreUsuario) setNombre(nombreUsuario);
    if (emailUsuario) setCorreo(emailUsuario);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
      setAlerta({
        texto: 'Faltan campos por rellenar. Por favor completa todos los datos.',
        tipo: 'error'
      });
      return;
    }

    // Armamos el texto formateado que llegará al chat de WhatsApp
    const textoWhatsApp = `🌸 *Nuevo mensaje desde Flores Eternas* 🌸\n\n*Nombre:* ${nombre}\n*Correo:* ${correo}\n*Mensaje:* ${mensaje}`;
    
    // Codificamos el texto para URL y abrimos la API de WhatsApp
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoWhatsApp)}`;
    window.open(urlWhatsApp, '_blank');

    setAlerta({
      texto: '¡Redirigiendo a WhatsApp con tu mensaje listo para enviar! 🌸',
      tipo: 'exito'
    });

    setNombre('');
    setCorreo('');
    setMensaje('');
  };

  return (
    <div className="contacto-page">
      <div className="formulario-contacto">
        <h2>Formulario de Contacto</h2>
        <p className="contacto-subtitulo">
          ¿Quieres un arreglo personalizado o tienes alguna duda? Escríbenos directo a WhatsApp.
        </p>

        {alerta.texto && (
          <div className={`alerta-contacto ${alerta.tipo}`}>
            {alerta.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Escribe tu nombre y apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              placeholder="Escribe tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              placeholder="Escribe tu mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-enviar-contacto">
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}