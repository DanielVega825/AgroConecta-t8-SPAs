export function Nosotros() {
    return `
    <main class="nosotros-page">
        <section class="hero">
            <span class="badge">Nuestra Esencia</span>
            <h1>Transformando el Agro Colombiano</h1>
            <p>Conectamos la tradición del campo con la innovación tecnológica para un comercio justo y eficiente en Florencia y todo el país.</p>
        </section>

        <section class="container section">
            <div class="row align-items-center g-5">
                <div class="col-md-6">
                    <h2 class="heading-lg">Nuestra Historia</h2>
                    <p class="text-muted">
                        AgroConecta es un proyecto desarrollado con el propósito de conectar
                        productores agrícolas y consumidores mediante el uso de herramientas tecnológicas.
                    </p>
                    <p class="text-muted">
                        Nuestra plataforma facilita la comercialización directa, promoviendo el
                        comercio justo y apoyando el crecimiento de las comunidades rurales.
                    </p>
                    <p class="text-muted">
                        Este proyecto surge como parte de nuestro proceso de formación en el programa
                        <strong>Desarrollador Junior Full Stack</strong>. Trabajamos con compromiso e innovación para aportar al desarrollo del país.
                    </p>
                </div>
                <div class="col-md-6 text-center">
                    <img src="assets/imgs/nosotros.png" class="img-fluid img-rounded shadow-lg" alt="Equipo AgroConecta">
                </div>
            </div>
        </section>

        <section class="container section">
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card-custom h-100">
                        <h3 class="text-success mb-3">Misión</h3>
                        <p>Facilitar el acceso a insumos agrícolas de calidad para todos los productores rurales mediante una plataforma confiable, eliminando intermediarios y ofreciendo precios justos.</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card-custom h-100">
                        <h3 class="text-success mb-3">Visión</h3>
                        <p>Ser la plataforma líder en comercio electrónico agropecuario en Colombia, conectando a miles de productores con insumos de calidad y transformando el sector agrícola.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="container section text-center">
            <h2 class="heading-lg mb-5">Nuestro Impacto</h2>
            <div class="row g-4">
                ${[
                    ["250+", "Productores conectados"],
                    ["900+", "Compradores activos"],
                    ["1200+", "Productos vendidos"],
                    ["25+", "Municipios cubiertos"]
                ].map(i => `
                    <div class="col-6 col-md-3">
                        <div class="card-impact">
                            <h4>${i[0]}</h4>
                            <p class="mb-0">${i[1]}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>

        <section class="container section text-center mb-5">
            <h2 class="heading-lg mb-5">Nuestro Equipo</h2>
            <div class="row g-4">
                ${[
                    ["Cesar España", "Full Stack Developer", "fotoCesar.jpeg"],
                    ["Ivan Chavez", "Software Developer", "fotoIvan.jpeg"],
                    ["José Vega", "Back-end Engineer", "fotoJose.jpeg"],
                    ["Juan Castro", "Full Stack Developer", "fotoJuan.jpeg"]
                ].map(p => `
                    <div class="col-6 col-md-3">
                        <div class="card-team">
                            <div class="img-wrapper mb-3">
                                <img src="assets/imgs/equipo/${p[2]}" alt="${p[0]}" class="img-team">
                            </div>
                            <h5 class="mb-1">${p[0]}</h5>
                            <p class="text-success small fw-bold">${p[1]}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>
    </main>
    `;
}