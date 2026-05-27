const formatPrice = (valor) => {
   return valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
   });
};

export function Home() {

   const productosPromo = [
      {
         nombre: "Semillas de Maíz",
         precio: 42000,
         descuento: 20,
         imagen: "semillas-maiz.jpg",
         categoria: "SEMILLAS CERTIFICADAS",
         descripcion:
            "Incrementa el rendimiento de tu cultivo con semillas seleccionadas para una producción más fuerte y rentable."
      },
      {
         nombre: "Concentrado Ganado",
         precio: 85000,
         descuento: 15,
         imagen: "concentrado-ganado.jpg",
         categoria: "NUTRICIÓN ANIMAL",
         descripcion:
            "Mejora la alimentación de tu ganado con nutrición balanceada diseñada para aumentar peso y vitalidad."
      },
      {
         nombre: "Kit Herramientas",
         precio: 120000,
         descuento: 30,
         imagen: "kit-herramientas.jpg",
         categoria: "HERRAMIENTAS AGRÍCOLAS",
         descripcion:
            "Herramientas resistentes y eficientes para trabajar el campo con mayor comodidad y productividad."
      }
   ];

   return `
   <section class="hero-home">

      <div class="hero-overlay"></div>

      <div class="container">

         <div class="hero-content">

            <h1>
               Impulsa tu producción agrícola
               <span>
                  con tecnología e insumos de alto rendimiento
               </span>
            </h1>

            <p>
               Descubre productos diseñados para agricultores que buscan más productividad, mejores cosechas y mayor rentabilidad en cada temporada.
            </p>

            <div class="hero-buttons">

               <a href="#/catalogo" class="btn-hero-primary">
                  Comprar ahora
               </a>

               <a href="#/nosotros" class="btn-hero-secondary">
                  Conocer más
               </a>

            </div>

         </div>

      </div>

   </section>

   <section class="benefits-wrapper">

      <div class="container">

         <div class="benefits-section">

            <article class="benefit-card">

               <div class="benefit-icon">
                  🚚
               </div>

               <h3>
                  Entrega rápida y segura
               </h3>

               <p>
                  Recibe tus productos a tiempo y mantén tu producción activa sin retrasos.
               </p>

            </article>

            <article class="benefit-card">

               <div class="benefit-icon">
                  🛡️
               </div>

               <h3>
                  Calidad garantizada
               </h3>

               <p>
                  Productos seleccionados para ofrecer mayor rendimiento y confianza en cada compra.
               </p>

            </article>

            <article class="benefit-card">

               <div class="benefit-icon">
                  💰
               </div>

               <h3>
                  Precios competitivos
               </h3>

               <p>
                  Obtén soluciones agrícolas premium a precios accesibles para maximizar tu rentabilidad.
               </p>

            </article>

         </div>

      </div>

   </section>

   <section class="promo-section">

      <div class="container">

         <div class="section-header">

            <h2>
               Promociones pensadas para hacer crecer tu campo
            </h2>

            <p>
               Aprovecha descuentos exclusivos en productos agrícolas de alta demanda.
            </p>

         </div>

         <div class="promo-grid">

            ${productosPromo.map(producto => {

               const precioFinal =
                  producto.precio -
                  (producto.precio * producto.descuento / 100);

               return `
               <article class="promo-card">

                  <div class="promo-discount">

                     <strong>
                        -${producto.descuento}%
                     </strong>

                     <span>
                        
                     </span>

                  </div>

                  <div class="promo-image">

                     <img
                        src="assets/imgs/${producto.imagen}"
                        alt="${producto.nombre}"
                        loading="lazy"
                     >

                  </div>

                  <div class="promo-content">

                     <small>
                        ${producto.categoria}
                     </small>

                     <h3>
                        ${producto.nombre}
                     </h3>

                     <p class="promo-description">
                        ${producto.descripcion}
                     </p>

                     <div class="promo-prices">

                        <span class="old-price">
                           ${formatPrice(producto.precio)}
                        </span>

                        <span class="new-price">
                           ${formatPrice(precioFinal)}
                        </span>

                     </div>

                     <a href="#/catalogo" class="promo-btn">
                        Comprar ahora
                     </a>

                  </div>

               </article>
               `;
            }).join("")}

         </div>

      </div>

   </section>

   <section class="info-home">

      <div class="container info-container">

         <div class="info-image">

            <img
               src="assets/imgs/farmer.jpg"
               alt="Agricultora trabajando en el campo"
               loading="lazy"
            >

         </div>

         <div class="info-content">

            <h2>
               Convierte cada cosecha en una oportunidad de crecimiento
            </h2>

            <p>
               Optimiza tu trabajo diario con productos agrícolas que te ayudan a producir más, ahorrar tiempo y aumentar tus ganancias.
            </p>

            <ul class="info-list">

               <li>
                  Mayor productividad en menos tiempo
               </li>

               <li>
                  Herramientas y productos de alto desempeño
               </li>

               <li>
                  Más rentabilidad para tu producción
               </li>

            </ul>

         </div>

      </div>

   </section>

   <section class="cta-home">

      <div class="container cta-container">

         <div class="cta-text">

            <h2>
               Lleva tu producción agrícola al siguiente nivel
            </h2>

            <p>
               Encuentra soluciones agrícolas modernas para trabajar con mayor eficiencia y mejores resultados.
            </p>

         </div>

         <a href="#/catalogo" class="cta-btn">
            Ver catálogo
         </a>

      </div>

   </section>
   `;
}