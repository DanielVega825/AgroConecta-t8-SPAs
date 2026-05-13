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

function updateHeader() {
    const headerElement = document.querySelector("header"); // Selecciona el tag header
    if (headerElement) {
        headerElement.outerHTML = Header(); 
    }
    actualizarContadorCarrito(); // Importante: re-vincular el contador
}

function setupMenu() {
    const btn = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");

    if (btn && nav) {
        btn.onclick = () => { // Usamos .onclick para asegurar que no se dupliquen
            nav.classList.toggle("active");
        };

        // Cerramos el menú cuando se hace click en cualquier enlace
        nav.querySelectorAll("a").forEach(link => {
            link.onclick = () => {
                nav.classList.remove("active");
            };
        });
    }
}
 
function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem("userLogged");
            window.location.hash = "#/";
            // Forzar actualización de la vista al hacer logout
            updateHeader();
            setupMenu();
            setupLogout();
        };
    }
}

// Al usar type="module", el script se carga de forma diferida (defer),
// por lo que el DOM root ya estará disponible.
console.log("Iniciando aplicación SPA...");
renderLayout();
router();
setupMenu(); // <--- Llamada inicial para que el menú funcione al cargar la página
setupLogout(); // <--- Inicializar el botón de salir
actualizarContadorCarrito();
 
window.addEventListener("hashchange", () => {
    updateHeader();
    setupMenu();
    setupLogout();
    router();    
});



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