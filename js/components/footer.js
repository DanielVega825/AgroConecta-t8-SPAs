export function Footer() {
    return `
        <footer class="footer flex-column">
            <div class="footer__seccions container text-center text-md-start mt-5">
                <div class="row mat-3">
                    <!-- Columna 1: Logo, Nombre y Descripción -->
                    <div class="colum__footer col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <div class="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
                            <!-- Reemplaza con tu logo -->
                            <img src="./assets/imgs/logo3.png" alt="Logo" width="40" 
                                class="footer__logo me-2">
                            <a href="#/" class="text-reset text-decoration-none">
                                <span class="fw-bold text-uppercase h5 mb-0">AgroConecta</span>
                            </a>
                        </div>
                        <p>
                            Conectando productores rurales con insumos esenciales de forma rápida, segura y confiable.
                        </p>
                    </div>
 
                    <!-- Columna 2: Productos/Enlaces -->
                    <div class="colum__footer col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Enlaces</h6>
                        <p><a href="#/" class="text-reset text-decoration-none">inicio</a></p>
                        <p><a href="#/catalogo" class="text-reset text-decoration-none">Catálogo</a></p>
                        <p><a href="#/nosotros" class="text-reset text-decoration-none">Nosotros</a></p>
                        <p><a href="#/contacto" class="text-reset text-decoration-none">Contacto</a></p>
                    </div>
 
                    <!-- Columna 3: Enlaces útiles -->
                    <div class="colum__footer col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Categorías</h6>
                        <p><a href="#!" class="text-reset text-decoration-none">Semillas</a></p>
                        <p><a href="#!" class="text-reset text-decoration-none">Concentrados</a></p>
                        <p><a href="#!" class="text-reset text-decoration-none">Herramientas</a></p>
                    </div>
 
                    <!-- Columna 4: Contacto -->
                    <div class="colum__footer col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Contacto</h6>
                        <p><i class="fas fa-phone me-3"></i> agroconecta.generation@gmail.com</p>
                        <p><i class="fas fa-envelope me-3"></i>+57 310 588 5140</p>
                    </div>
                </div>
            </div>
            <hr>
            <div class="footer__description text-center p-4">
                <p class="footer__derechos">
                    © 2026 AgroConecta. Todos los derechos reservados
                </p>
            </div>
        </footer>
    `;
}
 