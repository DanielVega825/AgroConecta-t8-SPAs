const formatPrice = (valor) => {
   return valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
   });
};

export function Home() {
   setTimeout(() => initHome(), 0);

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

         <div class="carousel-container">
            <button class="carousel-btn carousel-btn-prev" id="carousel-prev">&#10094;</button>
            <div class="carousel-wrapper">
               <div class="carousel-track" id="carousel-track"></div>
            </div>
            <button class="carousel-btn carousel-btn-next" id="carousel-next">&#10095;</button>
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

function initHome() {
   // Obtener productos del localStorage
   const productosRaw = JSON.parse(localStorage.getItem('listaProducts')) || [];
   
   // Filtrar solo los productos en descuento
   const productosDescuento = productosRaw.filter(p => p.detalles && p.detalles.enDescuento);
   
   const carouselTrack = document.getElementById('carousel-track');
   if (!carouselTrack || productosDescuento.length === 0) return;

   // Renderizar tarjetas del carrusel
   const renderCarousel = () => {
      carouselTrack.innerHTML = productosDescuento.map((p, index) => {
         const imagenData = Array.isArray(p.imagenes) ? p.imagenes[0] : p.imagenes;
         const esBase64 = imagenData && imagenData.startsWith('data:image');
         const srcImg = esBase64 ? imagenData : `assets/imgs/${imagenData || 'placeholder.jpg'}`;
         const precioOriginal = p.precio;
         const descuento = p.detalles.porcentajeDescuento || 0;
         const precioConDescuento = precioOriginal * (1 - descuento / 100);

         return `
            <div class="carousel-card" data-index="${index}">
               <div class="carousel-card-image">
                  <img src="${srcImg}" alt="${p.nombre}">
                  <div class="discount-badge">${descuento}% OFF</div>
               </div>
               <div class="carousel-card-content">
                  <h4>${p.nombre}</h4>
                  <p class="carousel-card-desc">${p.descripcion}</p>
                  <div class="carousel-prices">
                     <span class="price-original">${formatPrice(precioOriginal)}</span>
                     <span class="price-discount">${formatPrice(precioConDescuento)}</span>
                  </div>
                  <button class="carousel-card-btn" data-nombre="${p.nombre}" data-precio="${precioConDescuento}" data-img="${srcImg}" data-stock="${p.cantidad}">
                     Agregar al carrito
                  </button>
               </div>
            </div>
         `;
      }).join('');
   };

   renderCarousel();

   // Clonar tarjetas al final para loop infinito sin salto visible
   Array.from(carouselTrack.children).forEach(card => {
      carouselTrack.appendChild(card.cloneNode(true));
   });

   const total = productosDescuento.length;
   let currentIndex = 0;
   const cardWidth = 280;
   const gap = 20;

   const updateCarousel = (animated = true) => {
      if (!animated) carouselTrack.style.transition = 'none';
      carouselTrack.style.transform = `translateX(${-(currentIndex * (cardWidth + gap))}px)`;
      if (!animated) {
         // Forzar reflow para que el cambio sin animación se aplique antes de reactivar
         carouselTrack.getBoundingClientRect();
         carouselTrack.style.transition = '';
      }
   };

   const nextSlide = () => {
      currentIndex++;
      updateCarousel();
      // Si llegamos al clon del primero, reseteamos sin animación
      if (currentIndex >= total) {
         setTimeout(() => {
            currentIndex = 0;
            updateCarousel(false);
         }, 400);
      }
   };

   const prevSlide = () => {
      if (currentIndex > 0) {
         currentIndex--;
         updateCarousel();
      }
   };

   document.getElementById('carousel-next').addEventListener('click', nextSlide);
   document.getElementById('carousel-prev').addEventListener('click', prevSlide);

   // Auto-play cada 2 segundos con loop infinito
   const carouselContainer = document.querySelector('.carousel-container');
   const autoSlide = () => nextSlide();

   let autoPlay = setInterval(autoSlide, 2000);

   // Pausa al pasar el mouse, reanuda al salir
   carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
   carouselContainer.addEventListener('mouseleave', () => {
      autoPlay = setInterval(autoSlide, 2000);
   });

   // Agregar productos al carrito desde el carrusel
   document.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-card-btn')) {
         const nombre = e.target.dataset.nombre;
         const precio = parseFloat(e.target.dataset.precio);
         const img = e.target.dataset.img;
         const stock = parseInt(e.target.dataset.stock);

         let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
         const existe = carrito.find(p => p.nombre === nombre);

         if (existe) {
            if (existe.cantidad + 1 > stock) {
               alert('No puedes agregar más productos. Límite de stock alcanzado.');
               return;
            }
            existe.cantidad += 1;
         } else {
            carrito.push({ nombre, precio, img, stock, cantidad: 1 });
         }

         localStorage.setItem('carrito', JSON.stringify(carrito));
         
         // Actualizar contador
         const contador = document.getElementById('contador-carrito');
         if (contador) {
            const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
            contador.textContent = total;
            contador.classList.add('animar');
            setTimeout(() => contador.classList.remove('animar'), 200);
         }

         // Mostrar notificación
         const toast = document.createElement('div');
         toast.className = 'agro-toast shadow-lg';
         toast.innerHTML = `
            <div class="d-flex align-items-center gap-3">
               <i class="bi bi-cart-check-fill fs-3 text-white"></i>
               <div>
                  <h6 class="m-0 fw-bold text-white">¡Añadido!</h6>
                  <p class="m-0 small text-white opacity-75">${nombre}</p>
               </div>
            </div>
         `;
         document.body.appendChild(toast);
         setTimeout(() => {
            toast.classList.add('agro-toast-exit');
            setTimeout(() => toast.remove(), 500);
         }, 3000);
      }
   });
}