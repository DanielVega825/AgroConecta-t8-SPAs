export function Header() {
    const hash = window.location.hash;

    // ============================================================
    // 🔐 LEER SESIÓN DEL NUEVO PATRÓN LOCALSTORAGE
    // ============================================================
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    const nombre = localStorage.getItem("nombre");
    const isLoggedIn = !!token;

    let adminLink = "";
    let userAction = `<a href="#/sesion" class="contenedor-login">Ingresar</a>`;

    if (isLoggedIn && nombre) {
        userAction = `
            <span class="user-greeting" style="font-weight: bold; margin-right: 15px; color: var(--color-primary-600);">Hola, ${nombre}</span>
            <button id="logoutBtn" class="contenedor-login" style="background-color: var(--color-error, #dc3545); border: none; width: auto; font-size: 0.75rem; padding: 4px 19px; min-width: unset; height: auto;">Salir</button>
        `;
        if (rol === "ADMIN") {
            adminLink = `<a href="#/panel">Panel Admin</a>`;
        }
    }

    if (hash === '#/catalogo') {
        return `
        <div id="menu-backdrop" class="menu-backdrop"></div>
        <header>
            <div class="contenedor-header">
                <!-- BOTÓN HAMBURGUESA -->
                <button class="menu-toggle" id="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
 
                <div class="logo">
                    <a href="#/">
                    <img src="assets/imgs/logo2.png" alt="AgroConecta logo" width="160">
                    </a>
                </div>

                <nav class="contenedor-nav" id="nav-menu">
                    <div class="user-info-mobile">
                        ${isLoggedIn ? `<span class="user-name-mobile">${nombre}</span>` : `<a href="#/sesion" class="login-mobile">Ingresar</a>`}
                    </div>
                    <div class="nav-links">
                        <a href="#/">Inicio</a>
                        <a href="#/catalogo">Catalogo</a>
                        <a href="#/nosotros">Nosotros</a>
                        <a href="#/contacto">Contacto</a>
                        ${adminLink}
                    </div>
                    <div class="user-logout-mobile">
                        ${isLoggedIn ? `<button id="logoutBtnMobile" class="logout-mobile">Salir</button>` : ``}
                    </div>
                </nav>

                <div class="contenedor-buscar">
                    <input type="text" placeholder="Buscar..."/>
                </div>
 
                <div class="acciones">
                    <a href="#/carrito" class="carrito-icono">
                        🛒
                        <span id="contador-carrito" class="contador">0</span>
                    </a>
                    ${userAction}
                </div>
               
            </div>
        </header>
    `;
    } else {
        return `
        <div id="menu-backdrop" class="menu-backdrop"></div>
        <header>
            <div class="contenedor-header">
                <!-- BOTÓN HAMBURGUESA -->
                <button class="menu-toggle" id="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
 
                <div class="logo">
                    <a href="#/">
                    <img src="assets/imgs/logo2.png" alt="AgroConecta logo" width="160">
                    </a>
                </div>

                <nav class="contenedor-nav" id="nav-menu">
                    <div class="user-info-mobile">
                        ${isLoggedIn ? `<span class="user-name-mobile">${nombre}</span>` : `<a href="#/sesion" class="login-mobile">Ingresar</a>`}
                    </div>
                    <div class="nav-links">
                        <a href="#/">Inicio</a>
                        <a href="#/catalogo">Catalogo</a>
                        <a href="#/nosotros">Nosotros</a>
                        <a href="#/contacto">Contacto</a>
                        ${adminLink}
                    </div>
                    <div class="user-logout-mobile">
                        ${isLoggedIn ? `<button id="logoutBtnMobile" class="logout-mobile">Salir</button>` : ``}
                    </div>
                </nav>
 
                <div class="acciones">
                    <a href="#/carrito" class="carrito-icono">
                        🛒
                        <span id="contador-carrito" class="contador">0</span>
                    </a>
                    ${userAction}
                </div>
               
            </div>
        </header>
    `;
    }
}