import { actualizarContadorCarrito } from "../main.js";
// ======================== =======
// 🛒 VISTA DEL CARRITO
// ===============================
export function Carrito() {
    return `
        <div class="container mt-4">
            <h2 class="mb-4 text-success">Carrito de Compras</h2>

            <div class="row">
                <!-- LISTA DE PRODUCTOS -->
                <div class="col-md-8" id="lista-carrito"></div>

                <!-- RESUMEN -->
                <div class="col-md-4">
                    <div class="card p-3 shadow-sm">

                        <p class="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span id="subtotal">$0</span>
                        </p>

                        <p class="d-flex justify-content-between">
                            <span>Envío</span>
                            <span id="envio">$0</span>
                        </p>

                        <hr>

                        <h5 class="d-flex justify-content-between">
                            <span>Total</span>
                            <span id="total">$0</span>
                        </h5>

                        <!-- MENSAJE DINÁMICO -->
                        <p id="mensaje-envio" class="text-success small mt-2"></p>

                        <button class="btn btn-success w-100 mt-3">
                            Proceder al Pago
                        </button>

                    </div>
                </div>
            </div>
        </div>
    `;
}


// ===============================
// 🔥 LÓGICA DEL CARRITO
// ===============================
export function initCarrito() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contenedor = document.getElementById("lista-carrito");

    function render() {
        contenedor.innerHTML = "";

        if (carrito.length === 0) {
            contenedor.innerHTML = "<p>Tu carrito está vacío</p>";
            actualizarTotal();
            return;
        }

        carrito.forEach((producto, index) => {

            const item = document.createElement("div");
            item.className = "card mb-3 p-3";

            item.innerHTML = `
                <div class="d-flex align-items-center justify-content-between">

                    <!-- IZQUIERDA -->
                    <div class="d-flex align-items-center">

                        <div style="width:80px; height:80px;">
                            <img src="assets/imgs/${producto.img}" 
                            alt="${producto.nombre}" 
                            style="width:100%; height:100%; object-fit:cover; border-radius:10px;">
                        </div>

                        <div class="ms-3">
                            <h6>${producto.nombre}</h6>
                            <p class="text-success mb-1">
                                $${producto.precio.toLocaleString('es-CO')}
                            </p>

                            <div>
                                <button class="btn btn-sm btn-outline-secondary disminuir">-</button>
                                <span class="mx-2">${producto.cantidad}</span>
                                <button class="btn btn-sm btn-outline-secondary aumentar">+</button>
                            </div>
                        </div>

                    </div>

                    <!-- DERECHA -->
                    <div class="text-end">

                        <!-- TOTAL ARRIBA -->
                        <p class="fw-bold mb-1">
                            $${(producto.precio * producto.cantidad).toLocaleString('es-CO')}
                        </p>

                        <!-- BASURA ABAJO -->
                        <button class="btn btn-sm btn-danger eliminar">🗑</button>

                    </div>

                </div>
            `;

            // EVENTOS
            item.querySelector(".aumentar").onclick = () => {
                carrito[index].cantidad++;
                guardar();
            };

            item.querySelector(".disminuir").onclick = () => {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                } else {
                    carrito.splice(index, 1);
                }
                guardar();
            };

            item.querySelector(".eliminar").onclick = () => {
                carrito.splice(index, 1);
                guardar();
            };

            contenedor.appendChild(item);
        });

        actualizarTotal();
    }


    function actualizarTotal() {

        const subtotal = carrito.reduce(
            (acc, p) => acc + p.precio * p.cantidad,
            0
        );

        // 🚚 ENVÍO DINÁMICO
        let envio = 0;

        if (subtotal < 100000) {
            envio = carrito.reduce(
                (acc, p) => acc + (p.cantidad * 10000),
                0
            );
        }

        const total = subtotal + envio;

        // 🧾 PINTAR VALORES
        document.getElementById("subtotal").textContent =
            `$${subtotal.toLocaleString('es-CO')}`;

        document.getElementById("envio").textContent =
            envio === 0
                ? "Gratis"
                : `$${envio.toLocaleString('es-CO')}`;

        document.getElementById("total").textContent =
            `$${total.toLocaleString('es-CO')}`;

        // 💬 MENSAJE DINÁMICO PRO
        const mensaje = document.getElementById("mensaje-envio");

        if (subtotal >= 100000) {
            mensaje.textContent = "🚚 ¡Tu envío es GRATIS!";
        } else {
            const falta = 100000 - subtotal;
            mensaje.textContent =
                `Te faltan $${falta.toLocaleString('es-CO')} para envío gratis`;
        }
    }


    function guardar() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        render();
        actualizarContadorCarrito();
    }

    render();

    actualizarContadorCarrito();
}