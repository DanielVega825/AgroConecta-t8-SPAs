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
