# AgroConecta 🌾
 
Bienvenido al repositorio oficial de **AgroConecta**, una plataforma de e-commerce diseñada para conectar productos del campo con el consumidor final.
 
## 👥 Integrantes del Equipo
*   **Cesar España**
*   **Ivan Chavez**
*   **Juan Castro**
*   **Daniel Vega**
 
## 🚀 Flujo de Trabajo (Git)
 
Para mantener la integridad del código y un desarrollo organizado, seguiremos estas reglas:
 
1.  **Rama `develop`**: Es nuestra rama principal de trabajo. Todos los avances, nuevas funcionalidades y correcciones de errores deben integrarse aquí.
2.  **Rama `main`**: Esta rama se reserva exclusivamente para versiones estables. Una vez que la **primera versión (MVP)** del proyecto esté finalizada y probada en `develop`, se realizará el despliegue hacia `main`.
 
---
*AgroConecta - Transformando el comercio agrícola.*
 
 
## Arquitectura SPAs construida a mano con vanilla Js

mi-proyecto-spa/
├── index.html                # Archivo base con <div id="app"></div>
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos globales
│   └── img/
│       └── logo.svg          # Imágenes y assets
└── src/
    ├── main.js               # Punto de entrada (inicializa el router)
    ├── router/
    │   └── index.js          # Definición de rutas y lógica de navegación
    ├── views/
    │   ├── Home.js           # Vista de inicio
    │   └── Contact.js        # Vista de contacto
    ├── components/
    │   ├── Navbar.js         # Componente de navegación común
    │   └── Footer.js         # Pie de página
    ├── services/
    │   └── api.js            # Llamadas a Fetch API o Axios
    └── helpers/
        └── formatter.js      # Utilidades de formato de fechas o moneda


Notas de mejora:

- En el panel de admin (http://127.0.0.1:5503/#/panel): No mostrar boton cerrar sesion.
- Al hacer click en el carrito y despues en proceder con el pago un usuario de tipo administrador mostrar una alerta de que no puede realizar el pago
- Mostrar más pequeño el boton de salir cuando esta logueado
- No permitir el acceso a vistas admin a clientes
- Mejorar el seleccionador de columnas y aplicar filtros a las columnas segun su tipo de dato
- DescripcionLong debe permitir agregar negrilla, tener structura de word en la que se puede añadir listas..etc y que estas propiedades puedan ser rastreables al pasarlo al 
back para que siga teniendo los mismos estilos al mostrar en el front de vuelta.