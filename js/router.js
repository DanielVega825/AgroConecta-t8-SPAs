import { Home } from "./views/home.js";
import { Catalogo } from "./views/catalogo.js";
import { Contacto, initContactForm } from "./views/contacto.js"; // Importas ambos del mismo archivo
import { Nosotros } from "./views/nosotros.js";
import { Panel } from "./views/panel.js";
import { AddProduct, initAddProductLogic } from "./views/addProductos.js";

const routes = {
    "/": Home,
    "/home": Home,
    "/catalogo": Catalogo,
    "/contacto": Contacto,
    "/nosotros": Nosotros,
    "/addProduct": AddProduct,
    "/panel": Panel 
};

export function router() {
    const path = location.hash.slice(1) || "/";
    const view = routes[path] || Home;

    // 1. Manejo del CSS dinámico
    let cssPath = "";
    if (path === "/contacto") cssPath = "styles/contact.css";
    if (path === "/nosotros") cssPath = "styles/nosotros.css";
    if (path === "/addProduct") cssPath = "styles/addProduct.css";

    const linkTag = document.getElementById("page-style");
    if (linkTag) {
        linkTag.href = cssPath;
    }

    // 2. Inyectar la vista en el HTML
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = view();

    // 3. Inicializar lógica específica (DESPUÉS de inyectar el HTML)
    if (path === "/contacto") {
        initContactForm();
    }

    // NUEVA LÓGICA: Inicializar el cargador de imágenes
    if (path === "/addProduct") {
        initAddProductLogic();
    }
}