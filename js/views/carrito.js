import { actualizarContadorCarrito } from "../main.js";
import { createPedido, manejarErrorAPI } from "../services/api.js";

const mostrarToast = (titulo, mensaje, tipo = 'success') => {
    const iconos = { success: 'bi-cart-check-fill', error: 'bi-exclamation-circle-fill', warning: 'bi-exclamation-triangle-fill' };
    const toast = document.createElement('div');
    toast.className = `agro-toast agro-toast-${tipo} shadow-lg`;
    toast.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <i class="bi ${iconos[tipo]} fs-3 text-white"></i>
            <div>
                <h6 class="m-0 fw-bold text-white">${titulo}</h6>
                <p class="m-0 small text-white opacity-75">${mensaje}</p>
            </div>
        </div>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.classList.add('agro-toast-exit'); setTimeout(() => toast.remove(), 500); }, 3000);
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export function Carrito() {
    setTimeout(() => initCarrito(), 0);

    return `
        <section class="hero">
            <span class="badge">Tu Pedido</span>
            <h1>Carrito de Compras</h1>
            <p>Revisa tus productos y finaliza tu pedido para recibirlos en la puerta de tu finca.</p>
        </section>

        <div class="container mt-4 mb-5">
            <div class="row g-4">
                <div class="col-lg-8">
                    <div id="lista-carrito"></div>
                </div>

                <div class="col-lg-4">
                    <div class="card p-4 shadow-sm border-0 rounded-4 sticky-top" style="top: 20px; z-index: 100;">
                        <h4 class="text-success fw-bold mb-4">Resumen del pedido</h4>
                        
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Subtotal</span>
                            <span id="subtotal" class="fw-bold text-dark">$0,00</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-muted">Envío</span>
                            <span id="envio" class="fw-bold text-success">$0,00</span>
                        </div>
                        
                        <div id="container-envio-gratis" class="p-3 bg-light rounded-3 mb-4">
                            <p id="mensaje-envio" class="small mb-2 fw-medium text-center"></p>
                            <div class="progress" style="height: 10px;">
                                <div id="barra-envio" class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar"></div>
                            </div>
                        </div>

                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="h5 fw-bold m-0">Total</span>
                            <span id="total" class="h5 fw-bold text-success m-0">$0,00</span>
                        </div>

                        <button id="btn-proceder-pago" class="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm mb-3">
                            <i class="bi bi-credit-card me-2"></i> Proceder al Pago
                        </button>
                        
                        <div class="text-center mb-4">
                            <a href="#/catalogo" class="btn btn-outline-secondary w-100 py-2 border-0 small">Seguir Comprando</a>
                        </div>

                        <div class="pt-4 border-top">
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <i class="bi bi-shield-check text-success fs-2"></i>
                                <div>
                                    <h6 class="fw-bold m-0 text-success" style="font-size: 0.9rem;">Compra 100% Segura</h6>
                                    <p class="text-muted m-0" style="font-size: 0.75rem;">Tus datos están protegidos.</p>
                                </div>
                            </div>
                            <ul class="list-unstyled small text-muted m-0 d-grid gap-2" style="font-size: 0.8rem;">
                                <li class="d-flex align-items-start gap-2">
                                    <i class="bi bi-patch-check-fill text-success mt-1"></i>
                                    <span>Garantía AgroConecta: Recibe lo que pediste o tu dinero de vuelta.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("lista-carrito");

    function render() {
        if (!contenedor) return;
        contenedor.innerHTML = "";

        if (carrito.length === 0) {
            contenedor.innerHTML = `
                <div class="text-center p-5 bg-white rounded-4 shadow-sm border">
                    <i class="bi bi-cart-x display-1 text-muted opacity-25"></i>
                    <h3 class="fw-bold mt-4">Tu carrito está vacío</h3>
                    <p class="text-muted mb-4">Explora nuestro catálogo para encontrar los mejores insumos.</p>
                    <a href="#/catalogo" class="btn btn-success px-5 py-2 fw-bold rounded-pill">Ir al Catálogo</a>
                </div>
            `;
            actualizarCalculos(0);
            return;
        }

        carrito.forEach((p, index) => {
            const item = document.createElement("div");
            item.className = "card p-3 mb-3 border-0 shadow-sm rounded-4 animate-fade-in cart-item-pro";
            item.innerHTML = `
                <div class="row align-items-center g-3">
                    <div class="col-4 col-md-2">
                        <div class="rounded-3 overflow-hidden border shadow-sm bg-white">
                            <img src="${p.img.includes('assets') || p.img.includes('data:image') ? p.img : `${p.img}`}" class="img-fluid w-100" style="aspect-ratio: 1/1; object-fit: cover;" alt="${p.nombre}">
                        </div>
                    </div>
                    
                    <div class="col-8 col-md-6">
                        <h6 class="fw-bold text-dark mb-1">${p.nombre}</h6>
                        <p class="text-success fw-bold small mb-2">${formatoMoneda(p.precio)}</p>
                        
                        <div class="d-flex align-items-center">
                            <div class="quantity-pill-cart d-flex align-items-center shadow-sm">
                                <button class="btn-qty disminuir">-</button>
                                <span class="qty-val px-3 fw-bold">${p.cantidad}</span>
                                <button class="btn-qty aumentar">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12 col-md-4 text-md-end pt-2 pt-md-0">
                        <div class="mb-1">
                            <span class="fw-bold text-dark h5 d-block mb-2">${formatoMoneda(p.precio * p.cantidad)}</span>
                        </div>
                        <button class="btn-delete-pro eliminar" title="Quitar producto">
                            <i class="bi bi-trash3"></i> <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            `;

            item.querySelector(".aumentar").onclick = () => {
                const pStock = carrito[index].stock || 999;
                if (carrito[index].cantidad >= pStock) {
                    mostrarToast('Stock insuficiente', 'Has alcanzado el límite disponible.', 'error');
                    return;
                }
                carrito[index].cantidad++;
                guardar();
            };
            item.querySelector(".disminuir").onclick = () => { if (carrito[index].cantidad > 1) carrito[index].cantidad--; else carrito.splice(index, 1); guardar(); };
            item.querySelector(".eliminar").onclick = () => { carrito.splice(index, 1); guardar(); };
            contenedor.appendChild(item);
        });

        actualizarCalculos();
    }

    function actualizarCalculos(forzarCero = null) {
        const subtotal = forzarCero === 0 ? 0 : carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
        const meta = 150000;
        let envio = (subtotal > 0 && subtotal < meta) ? 15000 : 0;

        document.getElementById("subtotal").textContent = formatoMoneda(subtotal);
        document.getElementById("envio").textContent = envio === 0 ? (subtotal === 0 ? "$0,00" : "Gratis") : formatoMoneda(envio);
        document.getElementById("total").textContent = formatoMoneda(subtotal + envio);

        const mensaje = document.getElementById("mensaje-envio");
        const barra = document.getElementById("barra-envio");
        const contenedorMeta = document.getElementById("container-envio-gratis");

        if (subtotal === 0) {
            contenedorMeta.classList.add('d-none');
        } else {
            contenedorMeta.classList.remove('d-none');
            if (subtotal >= meta) {
                mensaje.innerHTML = `🎉 ¡Tu envío es <strong>GRATIS</strong>!`;
                barra.style.width = "100%";
                mensaje.className = "small mb-2 fw-bold text-center text-success";
            } else {
                const falta = meta - subtotal;
                mensaje.innerHTML = `Te faltan <strong>${formatoMoneda(falta)}</strong> para envío gratis`;
                barra.style.width = `${(subtotal / meta) * 100}%`;
                mensaje.className = "small mb-2 fw-medium text-center text-dark";
            }
        }
    }

    function guardar() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        render();
        actualizarContadorCarrito();
    }

    render();

    // ============================================================
    // 🛒 PROCEDER AL PAGO - CREAR PEDIDO VÍA API
    // ============================================================
    const btnProcederPago = document.getElementById("btn-proceder-pago");

    if (btnProcederPago) {
        btnProcederPago.onclick = async (e) => {
            e.preventDefault();

            // 1️⃣ VALIDAR SESIÓN
            const token = localStorage.getItem("token");
            const rol = localStorage.getItem("rol");
            const clienteId = localStorage.getItem("clienteId");

            // VALIDAR ADMIN
            if (rol === "ADMIN") {
                mostrarToast('Acción no permitida', 'Un administrador no puede realizar compras.', 'warning');
                return;
            }

            // VALIDAR LOGIN
            if (!token || !clienteId) {
                mostrarToast('Inicia sesión', 'Debes iniciar sesión para continuar con el pago.', 'warning');
                setTimeout(() => { window.location.hash = "#/sesion"; }, 1500);
                return;
            }

            // 2️⃣ VALIDAR CARRITO
            if (carrito.length === 0) {
                mostrarToast('Carrito vacío', 'Agrega productos antes de proceder al pago.', 'warning');
                return;
            }

            // 3️⃣ PREPARAR DETALLES PARA API
            const detalles = carrito.map(p => ({
                productId: p.productId,
                cantidad: p.cantidad
            }));

            // 4️⃣ LLAMAR A API - CREAR PEDIDO
            try {
                btnProcederPago.disabled = true;
                btnProcederPago.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Procesando...';

                const response = await createPedido(clienteId, detalles);

                // 5️⃣ ÉXITO - LIMPIAR CARRITO Y MOSTRAR CONFIRMACIÓN
                carrito = [];
                localStorage.removeItem("carrito");
                actualizarContadorCarrito();

                contenedor.innerHTML = `
                    <div class="text-center p-5 bg-white rounded-4 shadow-sm border">
                        <div style="font-size: 5rem;">✅</div>
                        <h2 class="fw-bold text-success mt-3">¡Compra realizada!</h2>
                        <p class="text-muted mt-3">Gracias por comprar en AgroConecta 🌿</p>
                        <p class="small text-muted">Tu pedido ID: <strong>${response.id}</strong></p>
                        <a href="#/catalogo" class="btn btn-success mt-4 px-5 py-2 rounded-pill">
                            Seguir comprando
                        </a>
                    </div>
                `;

                actualizarCalculos(0);
                mostrarToast('¡Éxito!', 'Tu pedido ha sido registrado correctamente.', 'success');

            } catch (error) {
                // ❌ ERROR EN LA API
                const err = manejarErrorAPI(error);
                console.error("Error al crear pedido:", err);
                
                mostrarToast('Error al procesar', err.message || 'No pudimos procesar tu pedido. Intenta de nuevo.', 'error');
                
                btnProcederPago.disabled = false;
                btnProcederPago.innerHTML = '<i class="bi bi-credit-card me-2"></i> Proceder al Pago';
            }
        };
    }
}