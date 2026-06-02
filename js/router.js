import { Home } from "./views/home.js";
import { Catalogo } from "./views/catalogo.js";
import { Contacto, initContactForm } from "./views/contacto.js";
import { Nosotros } from "./views/nosotros.js";
import { Panel, gestionPanel } from "./views/panel.js";
import { AddProduct, initAddProductLogic } from "./views/addProductos.js";
import { Carrito, initCarrito } from "./views/carrito.js";
import { Sesion, gestionSesion } from "./views/sesion.js";

const routes = {
    "/": Home,
    "/home": Home,
    "/catalogo": Catalogo,
    "/contacto": Contacto,
    "/nosotros": Nosotros,
    "/addProduct": AddProduct,
    "/panel": { view: Panel, init: gestionPanel },
    "/carrito": { view: Carrito, init: initCarrito },
    "/sesion": { view: Sesion, init: gestionSesion },
};

export function router() {
    const path = location.hash.slice(1) || "/";

    // ============================================================
    // 🔐 RESTRICCIÓN DE ACCESO - VALIDAR ROL
    // ============================================================
    const adminRoutes = ["/addProduct", "/panel"];
    if (adminRoutes.includes(path)) {
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");

        // Si no hay sesión o el rol no es ADMIN, denegar acceso
        if (!token || rol !== "ADMIN") {
            alert("Acceso denegado: Esta vista es exclusiva para administradores.");
            window.location.hash = "#/";
            return;
        }
    }

    const matched = routes[path] || Home;

    // Normalizar: si la ruta es una función, convertirla a objeto {view, init}
    const route = typeof matched === "function"
        ? { view: matched, init: null }
        : matched;

    // ============================================================
    // 🎨 MANEJO DEL CSS DINÁMICO
    // ============================================================
    let cssPath = "";
    if (path === "/contacto") cssPath = "styles/contact.css";
    if (path === "/nosotros") cssPath = "styles/nosotros.css";
    if (path === "/addProduct") cssPath = "styles/addProduct.css";
    if (path === "/panel") cssPath = "styles/panel.css";
    if (path === "/carrito") cssPath = "styles/carrito.css";
    if (path === "/sesion") cssPath = "styles/sesion.css";
    if (path === "/" || path === "/home") cssPath = "styles/home.css";

    const appContainer = document.getElementById("app");
    const header = document.querySelector("header");
    const footer = document.getElementById("main-footer");

    // ============================================================
    // 🎯 RENDERIZAR VISTA
    // ============================================================
    const renderView = () => {
        if (path === "/sesion") {
            if (header) header.style.display = "none";
            if (footer) footer.style.display = "none";
            appContainer.innerHTML = `
                <div class="sesion-full-page">
                    ${route.view()}
                </div>
            `;
        } else {
            if (header) header.style.display = "block";
            if (footer) footer.style.display = "block";
            appContainer.innerHTML = route.view();
        }

        // Ejecuta la función init que trae la lógica del componente si existe
        if (route.init) {
            route.init();
        }

        // Inicializar lógica específica (DESPUÉS de inyectar el HTML)
        if (path === "/contacto") initContactForm();
        if (path === "/addProduct") initAddProductLogic();
        
        // Mostrar el contenedor con una suave transición
        appContainer.style.opacity = "1";
    };

    const linkTag = document.getElementById("page-style");
    
    // ============================================================
    // ⏱️ MANEJO DE FOUC - ESPERAR A QUE CSS CARGUE
    // ============================================================
    if (linkTag) {
        // Ocultamos temporalmente para evitar FOUC (Flash of Unstyled Content)
        appContainer.style.transition = "opacity 0.2s ease-in-out";
        appContainer.style.opacity = "0";

        if (cssPath) {
            // Si el CSS ya es el mismo, no lo volvemos a cargar
            if (linkTag.href.includes(cssPath)) {
                renderView();
            } else {
                // Si es un CSS nuevo, esperamos a que cargue
                linkTag.onload = () => {
                    renderView();
                    linkTag.onload = null; // Limpiar evento
                };
                linkTag.href = cssPath;
            }
        } else {
            // Si la ruta no tiene CSS específico
            linkTag.href = "";
            renderView();
        }
    } else {
        renderView();
    }
}