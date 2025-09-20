e-Commerce FINANCE
...encontrando la libertad Financiera.

Este proyecto es el módulo de pago y confirmación de una plataforma de comercio electrónico especializada en inversiones financieras. La aplicación permite a los usuarios revisar los detalles de sus paquetes de inversión seleccionados, elegir un método de pago y completar su transacción de manera segura.

Características Principales
Detalle de Inversiones: Muestra una lista dinámica y detallada de los productos de inversión seleccionados, incluyendo la cantidad y el subtotal de cada uno.

Cálculo Automático: Calcula y presenta el monto total a invertir y el número de paquetes seleccionados.

Selección de Pago: Permite al usuario elegir entre dos métodos de pago: tarjeta de crédito/débito y transferencia bancaria.

Formulario de Tarjeta: Incluye un formulario interactivo con validación básica en el lado del cliente para los datos de la tarjeta (número, nombre, vencimiento y CVV).

Ventana Modal de Confirmación: Utiliza una ventana modal para proporcionar retroalimentación al usuario durante el proceso de validación del pago.

Tecnologías Utilizadas
HTML: Para la estructura de la página y el formulario de pago.

CSS: Para el diseño visual, la organización y la estética del módulo de pago.

JavaScript: Para toda la lógica interactiva, incluyendo la manipulación del DOM, el cálculo de totales, la validación de formularios y la gestión del flujo de la ventana modal.

AJAX (Asynchronous JavaScript and XML): La aplicación utiliza llamadas asíncronas para obtener dinámicamente los datos del carrito de inversiones. Esto permite que la información se cargue sin necesidad de recargar toda la página, proporcionando una experiencia de usuario más fluida y rápida.

Cómo Usar la Aplicación
Clona este repositorio en tu máquina local.

git clone [URL-DEL-REPOSITORIO]

Navega al directorio del proyecto.

cd [nombre-del-repositorio]

Abre el archivo index.html en tu navegador web de preferencia.

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