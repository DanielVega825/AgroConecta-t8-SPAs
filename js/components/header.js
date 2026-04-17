export function Header() {
    return `
        <header>
            <h1>AgroConecta</h1>
            <nav>
                <ul style="display:flex; list-style:none; gap:1rem;">
                    <li><a href="#/home">Inicio</a></li>
                    <li><a href="#/catalogo">Catalogo</a></li>
                    <li><a href="#/contacto">Contacto</a></li>
                    <li><a href="#/nosotros">Nosotros</a></li>
                </ul>
            </nav>
        </header>
    `;
}