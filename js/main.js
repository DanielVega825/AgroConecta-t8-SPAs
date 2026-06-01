import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { router } from "./router.js";
import { products } from "../data/products.js";
 
 
console.log("main.js cargado");
 
localStorage.setItem("listaProducts", JSON.stringify(products))
 
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
//Uso de clicks en el footer
function setupFooterFilters() {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    footer.querySelectorAll(".footer-filter-link").forEach(enlace => {
        enlace.onclick = (e) => {
            const link = e.target.closest('.footer-filter-link');
            const categoria = link?.dataset.categoria;
            if (!categoria) return;

            localStorage.setItem('filtro_pendiente_categoria', categoria);

            // Si ya estamos en el catálogo, aplicar el filtro directamente sin esperar hashchange
            if (location.hash === '#/catalogo') {
                e.preventDefault();
                const radio = document.querySelector(`input[name="cat"][value="${categoria}"]`);
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                    localStorage.removeItem('filtro_pendiente_categoria');
                    window.scrollTo(0, 0);
                }
            }
        };
    });
}
 
function setupMenu() {
    const btn = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");
    const backdrop = document.getElementById("menu-backdrop");
 
    if (btn && nav) {
        btn.onclick = () => {
            nav.classList.toggle("active");
            if (backdrop) {
                backdrop.classList.toggle("active");
            }
        };
 
        // Cerramos el menú cuando se hace click en cualquier enlace
        nav.querySelectorAll("a").forEach(link => {
            link.onclick = () => {
                nav.classList.remove("active");
                if (backdrop) {
                    backdrop.classList.remove("active");
                }
            };
        });
    }
 
    // Cerrar menú al hacer click en el backdrop
    if (backdrop) {
        backdrop.onclick = () => {
            nav.classList.remove("active");
            backdrop.classList.remove("active");
        };
    }
}
 
function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutBtnMobile = document.getElementById("logoutBtnMobile");
    const nav = document.getElementById("nav-menu");
    const backdrop = document.getElementById("menu-backdrop");
   
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("userLogged");
        // Cerrar menú y backdrop
        if (nav) {
            nav.classList.remove("active");
        }
        if (backdrop) {
            backdrop.classList.remove("active");
        }
        window.location.hash = "#/";
        // Forzar actualización de la vista al hacer logout
        updateHeader();
        setupMenu();
        setupLogout();
    };
   
    if (logoutBtn) {
        logoutBtn.onclick = handleLogout;
    }
   
    if (logoutBtnMobile) {
        logoutBtnMobile.onclick = handleLogout;
    }
}
 
// Al usar type="module", el script se carga de forma diferida (defer),
// por lo que el DOM root ya estará disponible.
console.log("Iniciando aplicación SPA...");
renderLayout();
router();
setupMenu(); // <--- Llamada inicial para que el menú funcione al cargar la página
setupLogout(); // <--- Inicializar el botón de salir
setupFooterFilters();
actualizarContadorCarrito();
 
window.addEventListener("hashchange", () => {
    window.scrollTo(0, 0); // <--- AÑADE ESTA LÍNEA AQUÍ (Lleva el scroll al inicio)
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