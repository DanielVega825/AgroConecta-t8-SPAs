import { Home } from "./views/home.js";
import { Catalogo } from "./views/catalogo.js";
import { Contacto, initContactForm } from "./views/contacto.js"; // Importas ambos del mismo archivo
import { Nosotros } from "./views/nosotros.js";
import { Panel, gestionPanel } from "./views/panel.js";
import { AddProduct, initAddProductLogic } from "./views/addProductos.js";

const routes = {
    "/": Home,
    "/home": Home,
    "/catalogo": Catalogo,
    "/contacto": Contacto,
    "/nosotros": Nosotros,
    "/addProduct": AddProduct,
    "/panel": { view: Panel, init: gestionPanel }
};

export function router() {
    const path = location.hash.slice(1) || "/";
    const matched = routes[path] || Home;

    // Normalizar: si la ruta es una función, convertirla a objeto {view, init}
    const route = typeof matched === "function"
        ? { view: matched, init: null }
        : matched;

    // 1. Manejo del CSS dinámico
    let cssPath = "";
    if (path === "/contacto") cssPath = "styles/contact.css";
    if (path === "/nosotros") cssPath = "styles/nosotros.css";
    if (path === "/addProduct") cssPath = "styles/addProduct.css";
    if (path === "/panel") cssPath = "styles/panel.css";

    const linkTag = document.getElementById("page-style");
    if (linkTag) {
        linkTag.href = cssPath;
    }

    // 2. Inyectar la vista en el HTML
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = route.view();

    // 3. Ejecuta la función init que trae la lógica del componente si existe
    if (route.init) {
        route.init();
    }

    // 4. Inicializar lógica específica (DESPUÉS de inyectar el HTML)
    if (path === "/contacto") {
        initContactForm();
    }

    // Inicializar el cargador de imágenes
    if (path === "/addProduct") {
        initAddProductLogic();
    }
}