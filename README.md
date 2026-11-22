# 🌸 Flores Eternas Nicore — Plataforma E-Commerce

Aplicación web tipo **SPA (Single Page Application)** desarrollada con **React + Vite** para la comercialización de arreglos florales artesanales elaborados en cinta de satén y limpiapipas (*chenille*).

---

## 📋 Descripción del Proyecto

**Flores Eternas Nicore** permite a los clientes explorar un catálogo interactivo con filtro de precios, personalizar tipos de flores y colores con cotización directa vía WhatsApp, gestionar un carrito de compras, simular pagos y administrar registros desde un módulo administrativo.

### Funcionalidades Principales
* **Landing Page:** Presentación de la marca, galería de inspiración floral con carrusel interactivo, productos destacados, proceso creativo y preguntas frecuentes.
* **Catálogo Interactivo:** Listado de arreglos florales con filtro dinámico por rango de precio y adición al carrito.
* **Tipos de Flores:** Selector interactivo de variantes de color (rosas, tulipanes y girasoles) conectado con cotización personalizada por WhatsApp.
* **Carrito y Pasarela de Compra:** Gestión de artículos seleccionados, cálculo automático de totales y confirmación de pago.
* **Autenticación:** Registro de nuevos clientes, inicio de sesión y recuperación de contraseña.
* **Módulo de Administración:** Visualización en tablas de los usuarios registrados y el historial de compras realizadas.

---

## 🛠️ Tecnologías y Arquitectura

* **Frontend:** React 19, Vite, React Router DOM (`react-router-dom`), CSS3 modular y Font Awesome.
* **Persistencia de Datos:** Web Storage API (`localStorage`) para gestionar el estado de sesión, usuarios registrados, carrito de compras e historial de pedidos en el navegador sin requerir servidor externo.
* **Arquitectura:** Separación modular por responsabilidades (`components/` para piezas reutilizables, `pages/` para vistas completas y `assets/` para gestión centralizada de recursos multimedia).

---

## 🚀 Instrucciones de Instalación y Ejecución Local

### Requisitos previos
* Tener instalado **Node.js** (versión 18 o superior).

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/Ingenieria_FloresEternas.git](https://github.com/tu-usuario/Ingenieria_FloresEternas.git)
   cd Ingenieria_FloresEternas