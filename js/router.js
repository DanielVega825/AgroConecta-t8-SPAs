import { Home } from "./views/home.js";
import { Catalogo } from "./views/catalogo.js";
import { Contacto, initContactForm } from "./views/contacto.js"; // Importas ambos del mismo archivo
import { Nosotros } from "./views/nosotros.js";
import { Panel, gestionPanel } from "./views/panel.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/panel": {view: Panel, init: gestionPanel},
  "/catalogo": Catalogo,
  "/contacto": Contacto,
  "/nosotros": Nosotros
};

export function router() {
    const path = location.hash.slice(1) || "/";
    const route = routes[path] || {view: Home};

    // 1. Manejo del CSS dinámico
    let cssPath = "";
    if (path === "/contacto") cssPath = "styles/contact.css";
    if (path === "/nosotros") cssPath = "styles/nosotros.css";
    if (path === "/panel") cssPath = "styles/panel.css";

    const linkTag = document.getElementById("page-style");
    if (linkTag) {
        linkTag.href = cssPath;
    }

    // 2. Inyectar la vista en el HTML
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = route.view();

    //Ejwcuta la funcion init que trae la logica del componente si exite
    if(route.init) {
        route.init();
    }

    // 3. Inicializar lógica específica (DESPUÉS de inyectar el HTML)
    if (path === "/contacto") {
        initContactForm();
    }
}