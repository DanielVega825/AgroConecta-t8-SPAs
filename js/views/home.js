import { getProductos } from '../services/api.js';
import { actualizarContadorCarrito } from "../main.js";

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

async function initHome() {
   // ============================================================
   // 📦 CARGAR PRODUCTOS EN DESCUENTO DESDE API
   // Los campos reales del backend son: detalles.enDescuento y detalles.porcentajeDescuento
   // ============================================================
   let productosPromocion = [];

   try {
      const productosAPI = await getProductos();
      // Filtrar productos que tienen enDescuento === true en su objeto detalles
      productosPromocion = productosAPI.filter(p => p.detalles?.enDescuento === true);
   } catch (error) {
      console.error("Error cargando productos en descuento:", error);
      productosPromocion = [];
   }

   const carouselTrack = document.getElementById('carousel-track');
   if (!carouselTrack || productosPromocion.length === 0) return;

   // ============================================================
   // 🎨 RENDERIZAR CARRUSEL
   // ============================================================
   const renderCarousel = () => {
      carouselTrack.innerHTML = productosPromocion.map((p, index) => {
         // Extraer primera imagen del pipe-delimited string
         const imagenes = p.imagen ? p.imagen.split('|').filter(s => s) : [];
         const imagenData = imagenes[0] || 'placeholder.jpg';
         const esBase64 = imagenData.startsWith('data:image');
         const srcImg = esBase64 ? imagenData : `${imagenData}`;

         const precioOriginal = Number(p.precio) || 0;
         // Campos reales de la API: detalles.porcentajeDescuento
         const descuento = Number(p.detalles?.porcentajeDescuento) || 0;
         const precioConDescuento = descuento > 0
            ? precioOriginal * (1 - descuento / 100)
            : precioOriginal;

         return `
            <div class="carousel-card" data-index="${index}">
               <div class="carousel-card-image">
                  <img src="${srcImg}" alt="${p.nombre}">
                  ${descuento > 0 ? `<div class="discount-badge">${descuento}% OFF</div>` : ''}
               </div>
               <div class="carousel-card-content">
                  <h4>${p.nombre}</h4>
                  <p class="carousel-card-desc">${p.descripcion || ''}</p>
                  <div class="carousel-prices">
                     ${descuento > 0 ? `<span class="price-original">${formatPrice(precioOriginal)}</span>` : ''}
                     <span class="price-discount">${formatPrice(precioConDescuento)}</span>
                  </div>
                  <button class="carousel-card-btn" 
                          data-product-id="${p.id}"
                          data-nombre="${p.nombre}" 
                          data-precio="${precioConDescuento}" 
                          data-img="${srcImg}" 
                          data-stock="${p.cantidad}">
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

   const total = productosPromocion.length;
   let currentIndex = 0;
   const cardWidth = 280;
   const gap = 20;

   const updateCarousel = (animated = true) => {
      if (!animated) carouselTrack.style.transition = 'none';
      carouselTrack.style.transform = `translateX(${-(currentIndex * (cardWidth + gap))}px)`;
      if (!animated) {
         carouselTrack.getBoundingClientRect();
         carouselTrack.style.transition = '';
      }
   };

   const nextSlide = () => {
      currentIndex++;
      updateCarousel();
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

   // Auto-play cada 2 segundos
   const carouselContainer = document.querySelector('.carousel-container');
   const autoSlide = () => nextSlide();

   let autoPlay = setInterval(autoSlide, 2000);

   carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
   carouselContainer.addEventListener('mouseleave', () => {
      autoPlay = setInterval(autoSlide, 2000);
   });

   // ============================================================
   // 🛒 AGREGAR AL CARRITO DESDE CARRUSEL
   // El listener se registra en el contenedor del carrusel (no en document)
   // para evitar que se acumule con cada navegación al home.
   // ============================================================
   carouselContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.carousel-card-btn');
      if (!btn) return;

      const productId = Number(btn.dataset.productId);
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      const img = btn.dataset.img;
      const stock = parseInt(btn.dataset.stock);

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const existe = carrito.find(p => p.productId === productId);

      if (existe) {
         if (existe.cantidad + 1 > stock) {
            alert('No puedes agregar más productos. Límite de stock alcanzado.');
            return;
         }
         existe.cantidad += 1;
      } else {
         carrito.push({ productId, nombre, precio, img, stock, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();

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
   });
}