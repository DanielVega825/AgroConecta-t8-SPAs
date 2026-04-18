export function Header() {
    return `
        <header>
            <div class="contenedor-header">

                <div class="logo">
                <img src="/assets/imgs/logo.svg" alt="AgroConecta logo" width="40" height="32">
                    <span>AgroConecta</span>
                </div>
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
                    <button class="btn-carrito">🛒</button>
                    <button class="contenedor-login">Ingresar</button>
                </div>
                
            </div>
        </header>
    `;
}