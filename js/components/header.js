export function Header() {
    const hash = window.location.hash;
    
    if (hash === '#/catalogo') {
        return `
        <header>
            <div class="contenedor-header">
 
                <div class="logo">
                    <a href="#/">
                    <img src="/assets/imgs/logo2.png" alt="AgroConecta logo" width="160">
                    </a>
                       
                </div>

                <!-- BOTÓN HAMBURGUESA -->
                <button class="menu-toggle" id="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav class="contenedor-nav">
                    <a href="#/">Inicio</a>
                    <a href="#/catalogo">Catalogo</a>
                    <a href="#/nosotros">Nosotros</a>
                    <a href="#/contacto">Contacto</a>
                </nav>
                <div class="contenedor-buscar">
                    <input type="text" placeholder="Buscar..."/>
                </div>
 
                <div class="acciones">
                    <a href="#/carrito" class="carrito-icono">
                        🛒
                        <span id="contador-carrito" class="contador">0</span>
                    </a>
                    <button class="contenedor-login">Ingresar</button>
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
                    <img src="/assets/imgs/logo2.png" alt="AgroConecta logo" width="160">
                    </a>
                       
                </div>

                <!-- BOTÓN HAMBURGUESA -->
                <button class="menu-toggle" id="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav class="contenedor-nav">
                    <a href="#/">Inicio</a>
                    <a href="#/catalogo">Catalogo</a>
                    <a href="#/nosotros">Nosotros</a>
                    <a href="#/contacto">Contacto</a>
                </nav>
                
 
                <div class="acciones">
                    <a href="#/carrito" class="carrito-icono">
                        🛒
                        <span id="contador-carrito" class="contador">0</span>
                    </a>
                    <button class="contenedor-login">Ingresar</button>
                </div>
               
            </div>
        </header>
    `;

    }
    
}