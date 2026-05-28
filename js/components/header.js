export function Header() {
    const hash = window.location.hash;

    //Verificar usuario logeado
    const userLoggedStr = localStorage.getItem("userLogged");
    const userLogged = userLoggedStr ? JSON.parse(userLoggedStr) : null;

    let adminLink = "";
    let userAction = `<a href="#/sesion" class="contenedor-login">Ingresar</a>`;

    if (userLogged) {
        userAction = `
            <span class="user-greeting" style="font-weight: bold; margin-right: 15px; color: var(--color-primary-600);">Hola, ${userLogged.nombre}</span>
            <button id="logoutBtn" class="contenedor-login" style="background-color: var(--color-error, #dc3545); border: none; width: auto; font-size: 0.75rem; padding: 4px 10px; min-width: unset; height: auto;">Salir</button>
        `;
        if (userLogged.role === "admin") {
            adminLink = `<a href="#/panel">Panel Admin</a>`;
        }
    }

    if (hash === '#/catalogo') {
        return `
        <header>
            <div class="contenedor-header">
 
                <div class="logo">
                    <a href="#/">
                    <img src="assets/imgs/logo2.png" alt="AgroConecta logo" width="160">
                    </a>
                       
                </div>

                <!-- BOTÓN HAMBURGUESA -->
                <button class="menu-toggle" id="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav class="contenedor-nav" id="nav-menu">
                    <a href="#/">Inicio</a>
                    <a href="#/catalogo">Catalogo</a>
                    <a href="#/nosotros">Nosotros</a>
                    <a href="#/contacto">Contacto</a>
                    ${adminLink}
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
        <header>
            <div class="contenedor-header">
 
                <div class="logo">
                    <a href="#/">
                    <img src="assets/imgs/logo2.png" alt="AgroConecta logo" width="160">
                    </a>
                       
                </div>

                <!-- BOTÓN HAMBURGUESA -->
                <button class="menu-toggle" id="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav class="contenedor-nav" id="nav-menu">
                    <a href="#/">Inicio</a>
                    <a href="#/catalogo">Catalogo</a>
                    <a href="#/nosotros">Nosotros</a>
                    <a href="#/contacto">Contacto</a>
                    ${adminLink}
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