# 🌸 Flores Eternas Nicore — Plataforma E-Commerce

Aplicación web tipo **SPA (Single Page Application)** desarrollada con **React + Vite** para la comercialización de arreglos florales artesanales elaborados en cinta de satén y limpiapipas (*chenille*).

---

## 📋 Descripción del Proyecto

**Flores Eternas Nicore** permite a los clientes explorar un catálogo interactivo con filtro de precios, personalizar tipos de flores y colores con cotización directa vía WhatsApp, gestionar un carrito de compras, simular pagos y administrar registros desde un módulo administrativo.

### Funcionalidades Principales
- **Landing Page:** Presentación de la marca, galería de inspiración floral con carrusel interactivo, productos destacados, proceso creativo y preguntas frecuentes.
- **Catálogo Interactivo:** Listado de arreglos florales con filtro dinámico por rango de precio y adición al carrito.
- **Tipos de Flores:** Selector interactivo de variantes de color (rosas, tulipanes y girasoles) conectado con cotización personalizada por WhatsApp.
- **Carrito y Pasarela de Compra:** Gestión de artículos seleccionados, cálculo automático de totales y confirmación de pago.
- **Autenticación:** Registro de nuevos clientes, inicio de sesión y recuperación de contraseña.
- **Módulo de Administración (CRUD):** Gestión completa (crear, visualizar, editar y eliminar) de usuarios registrados e historial de compras realizadas.

---

## 🛠️ Tecnologías y Arquitectura

- **Frontend:** React 19, Vite, React Router DOM (`react-router-dom`), CSS3 modular y Font Awesome.
- **Persistencia de Datos:** Web Storage API (`localStorage`) para gestionar el estado de sesión, usuarios registrados, carrito de compras e historial de pedidos en el navegador sin requerir servidor externo.
- **Pruebas Unitarias:** Jest (`jest`) para validación automatizada de la lógica de negocio (CRUD, cálculos y filtros).
- **Arquitectura:** Separación modular por responsabilidades (`components/` para piezas reutilizables, `pages/` para vistas completas, `assets/` para recursos multimedia, `utils/` para lógica pura y `tests/` para pruebas unitarias).

---

## 🚀 Instrucciones de Instalación y Ejecución Local

### Requisitos previos
- Tener instalado **Node.js** (versión 18 o superior).

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/Ingenieria_FloresEternas.git](https://github.com/tu-usuario/Ingenieria_FloresEternas.git)
   cd Ingenieria_FloresEternas

2. **Instalar las dependencias:**
   npm install

3. **Ejecutar el servidor de desarrollo:**
   npm run dev

4. **Abrir en el navegador:**
   - Ingresa a la dirección local que indica la consola (por defecto: http://localhost:5173/).

⚠️Nota sobre Base de Datos: Este proyecto utiliza almacenamiento local del navegador (localStorage), por lo que no requiere configuración de motor de base de datos ni variables de entorno .env para su ejecución.

5. **Ejecución de pruebas unitarias:**
   El proyecto cuenta con pruebas unitarias automatizadas ubicadas en src/tests/ que validan la lógica del módulo administrativo, el cálculo de totales del carrito y el filtro de precios del catálogo.

   _Para ejecutar toda la suite de pruebas en la terminal:_
   npm test

-> Esto ejecutará Jest, verificando cada función de negocio y mostrando el resumen de pruebas aprobadas (PASS) en consola.
