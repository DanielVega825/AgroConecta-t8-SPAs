import { Catalogo } from "./views/catalogo.js";
import { Contacto } from "./views/contacto.js";
import { Home } from "./views/home.js";
import { Nosotros } from "./views/nosotros.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/catalogo": Catalogo,
  "/contacto": Contacto,
  "/nosotros": Nosotros
};



// Ejemplo dentro de router.js
export function router() {
    const path = location.hash.slice(1) || "/";
    const view = routes[path] || Home;

    // Lógica para cambiar el CSS dinámicamente
    let cssPath = "";
    if (path === "/contacto") cssPath = "styles/contact.css";
    if (path === "/nosotros") cssPath = "styles/nosotros.css";

    const linkTag = document.getElementById("page-style");
    if (linkTag) {
        linkTag.href = cssPath; // Se asigna cssPath o lo limpia con ""
    }

    document.getElementById("app").innerHTML = view();
}