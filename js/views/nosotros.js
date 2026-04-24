export function Nosotros() {
    return `
    <main class="nosotros">

        <!-- HERO -->
        <section class="container section text-center">
            <h1 class="heading-xl">Transformando el Agro Colombiano</h1>

        </section>

        <!-- HISTORIA -->
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
                        <strong>Desarrollador Junior Full Stack en Java</strong> del bootcamp
                        <strong>Generation Colombia</strong>.
                    </p>

                    <p class="text-muted">
                        Como equipo, trabajamos con compromiso, responsabilidad e innovación,
                        buscando aportar al desarrollo tecnológico y social del país.
                    </p>
                </div>

                <div class="col-md-6 text-center">
                    <img src="../../assets/imgs/nosotros.png"
                        class="img-fluid img-rounded"
                        alt="Equipo AgroConecta">
                </div>

            </div>
        </section>

        <!-- MISION / VISION -->
        <section class="container section">
            <div class="row g-4">

                <div class="col-md-6">
                    <div class="card-custom">
                        <h3>Misión</h3>
                        <p>
                            Facilitar el acceso a insumos agrícolas de calidad para todos los productores
                            rurales de Colombia mediante una plataforma confiable, eliminando intermediarios
                            y ofreciendo precios justos.
                        </p>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card-custom">
                        <h3>Visión</h3>
                        <p>
                            Ser la plataforma líder en comercio electrónico agropecuario en Colombia,
                            conectando a miles de productores con insumos de calidad y transformando
                            el sector agrícola.
                        </p>
                    </div>
                </div>

            </div>
        </section>

        <!-- IMPACTO -->
        <section class="container section text-center">
            <h2 class="heading-lg">Nuestro Impacto</h2>

            <div class="row g-4 mt-3">
                ${[
                    ["250+", "Productores conectados"],
                    ["900+", "Compradores activos"],
                    ["1200+", "Productos vendidos"],
                    ["25+", "Municipios cubiertos"]
                ].map(i => `
                    <div class="col-6 col-md-3">
                        <div class="card-impact">
                            <h4>${i[0]}</h4>
                            <p>${i[1]}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        </section>

        <!-- EQUIPO -->
        <section class="container section text-center">
            <h2 class="heading-lg">Nuestro Equipo</h2>

            <div class="row g-4 mt-4">

                ${[
                    ["Cesar España", "Full Stack", "fotoCesar.jpeg"],
                    ["Ivan Chavez", "Desarrollador", "fotoIvan.jpeg"],
                    ["José Vega", "Back-end", "fotoJose.jpeg"],
                    ["Juan Castro", "Full Stack", "fotoJuan.jpeg"]
                ].map(p => `
                    <div class="col-6 col-md-3">
                        <div class="card-team">

                            <div class="img-wrapper">
                                <img 
                                    src="../../assets/imgs/equipo/${p[2]}" 
                                    alt="Foto de ${p[0]}" 
                                    class="img-team">
                            </div>

                            <h5>${p[0]}</h5>
                            <p>${p[1]}</p>

                        </div>
                    </div>
                `).join("")}

            </div>
        </section>

    </main>
    `;
}