import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { router } from "./router.js";
 
console.log("main.js cargado");
 
function renderLayout() {
    console.log("renderLayout iniciado");
    const root = document.getElementById("root");
    console.log("root element:", root);
 
    if (!root) {
        console.error("No se encontró el elemento #root");
        return;
    }
 
    root.innerHTML = `
        <header id="main-header">${Header()}</header>
        <main id="app" class="flex-fill"></main>
        <footer id="main-footer">${Footer()}</footer>
    `;
    console.log("renderLayout completado");
}
 
// Al usar type="module", el script se carga de forma diferida (defer),
// por lo que el DOM root ya estará disponible.
console.log("Iniciando aplicación SPA...");
renderLayout();
router();

actualizarContadorCarrito();
 
window.addEventListener("hashchange", router);

export function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = total;

        contador.classList.add("animar");

        setTimeout(() => {
            contador.classList.remove("animar");
        }, 200);
    }
}