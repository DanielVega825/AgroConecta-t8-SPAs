import { Header } from "./components/header.js";
import { Footer } from "./components/footer.js";
import { router } from "./router.js";
 
console.log("main.js cargado");

// ============================================================
// 📊 ACTUALIZAR CONTADOR DEL CARRITO
// ============================================================
export function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = total;
        if (total > 0) {
            contador.classList.remove("d-none");
        } else {
            contador.classList.add("d-none");
        }
    }
}

// ============================================================
// 🎨 RENDERIZAR LAYOUT PRINCIPAL
// ============================================================
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

// ============================================================
// 🔄 ACTUALIZAR HEADER CUANDO CAMBIA LA SESIÓN
// ============================================================
function updateHeader() {
    const headerElement = document.querySelector("header");
    if (headerElement) {
        headerElement.outerHTML = Header();
    }
    actualizarContadorCarrito();
}

// ============================================================
// 🔗 CONFIGURAR FILTROS DEL FOOTER
// ============================================================
function setupFooterFilters() {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    footer.querySelectorAll(".footer-filter-link").forEach(enlace => {
        enlace.onclick = (e) => {
            const link = e.target.closest('.footer-filter-link');
            const categoria = link?.dataset.categoria;
            if (!categoria) return;

            localStorage.setItem('filtro_pendiente_categoria', categoria);

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

// ============================================================
// ☰ MENÚ MÓVIL
// ============================================================
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
 
        nav.querySelectorAll("a").forEach(link => {
            link.onclick = () => {
                nav.classList.remove("active");
                if (backdrop) {
                    backdrop.classList.remove("active");
                }
            };
        });
    }
 
    if (backdrop) {
        backdrop.onclick = () => {
            nav.classList.remove("active");
            backdrop.classList.remove("active");
        };
    }
}

// ============================================================
// 🚪 LOGOUT
// ============================================================
function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutBtnMobile = document.getElementById("logoutBtnMobile");
    const nav = document.getElementById("nav-menu");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("email");
        localStorage.removeItem("nombre");
        localStorage.removeItem("clienteId");
        updateHeader();
        window.location.hash = "#/";
    };

    if (logoutBtn) {
        logoutBtn.onclick = handleLogout;
    }
    if (logoutBtnMobile) {
        logoutBtnMobile.onclick = () => {
            handleLogout();
            if (nav) nav.classList.remove("active");
        };
    }
}

// ============================================================
// 🎯 EVENT LISTENER PRINCIPAL
// ============================================================
window.addEventListener("hashchange", () => {
    router();
    setupFooterFilters();
});

// ============================================================
// ⏱️ INICIALIZACIÓN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    renderLayout();
    router();
    setupMenu();
    setupLogout();
    setupFooterFilters();
    actualizarContadorCarrito();
});