e-Commerce FINANCE
...encontrando la libertad Financiera.

Este proyecto es una plataforma de comercio electrónico especializada en el sector financiero. Su objetivo es permitir a los usuarios explorar distintos instrumentos de inversión, añadir paquetes de inversión a un carrito de compras y gestionar todo el proceso de pago. La aplicación está diseñada para ser una experiencia fluida y dinámica, donde la información se actualiza sin recargar la página, permitiendo a los usuarios revisar los detalles de sus paquetes de inversión seleccionados, modificar cantidades, eliminar instrumentos en el carrito de compras y elegir un método de pago para completar su transacción de manera segura.

Características Principales
Página de Inicio: Muestra los productos de inversión disponibles para su selección.

Página de Detalle del Instrumento: Al seleccionar un producto, el usuario puede acceder a una página dedicada que muestra información detallada, incluyendo descripción, tipo, rendimiento y precio por paquete.

Gestión del Carrito: Los usuarios pueden agregar una cantidad específica de paquetes de inversión a su carrito, y el sistema detecta si un instrumento ya existe para modificar la cantidad en lugar de añadir un nuevo elemento. También desde esta página es posible adicionar y disminuir paquetes o eliminar intrumentos completos del carro de compras. 

Módulo de Pago: El usuario puede revisar el resumen de su carrito y seleccionar un método de pago, ya sea tarjeta de crédito o transferencia bancaria.

Cálculo Automático: La aplicación calcula dinámicamente el monto total a invertir y el número total de paquetes seleccionados.

Ventana Modal de Confirmación: Se utiliza una ventana modal para proporcionar retroalimentación al usuario durante la validación del pago.

Tecnologías Utilizadas.
HTML: Para la estructura de todas las páginas de la aplicación.

CSS: Para el diseño visual, la organización y la estética del sitio web.

JavaScript: Toda la lógica interactiva se maneja con JavaScript, incluyendo la manipulación del DOM, el cálculo de totales y la validación de formularios.

AJAX (Asynchronous JavaScript and XML): La aplicación utiliza llamadas asíncronas para obtener dinámicamente los datos de los instrumentos de inversión y el carrito. Esto permite que la información se cargue sin recargar toda la página, proporcionando una experiencia de usuario más fluida y rápida.

Cómo Usar la Aplicación.
Clona este repositorio en tu máquina local.

git clone [https://github.com/cfalcone1977/eComerceFinance]

Navega al directorio del proyecto.

cd [eComerceFinance]

Abre el archivo index.html en tu navegador web de preferencia para acceder a la página principal.

Estructura del Proyecto
La estructura del proyecto sigue una organización clara para facilitar el desarrollo y el mantenimiento:

eCommerce-Finance/
├── css/
│   ├── carrito.css
│   ├── detalle.css
│   ├── index.css
│   └── pago.css
├── imagenes/
│   ├── cart-lleno.svg
│   ├── cart4.svg
│   ├── favicon-32x32.png
│   ├── mas.svg
│   └── menos.svg
├── js/
│   ├── apis.js
│   ├── carrito.js
│   ├── control.js
│   ├── detalle.js
│   ├── index.js
│   └── pago.js
├── pages/
│   ├── carrito.html
│   ├── detalle.html
│   └── pago.html
└── index.html

Autor
Cristian Falcone.