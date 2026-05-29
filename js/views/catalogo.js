import { actualizarContadorCarrito } from "../main.js";

// ✅ Formateador Profesional: $ 25.000,00
const formatPrice = (valor) => {
    return valor.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export function Catalogo() {
    setTimeout(() => initCatalogo(), 0);

    return `
        <section class="hero">
            <span class="badge">Productos</span>
            <h1>Catálogo de Productos</h1>
            <p>Explora nuestra selección de insumos agropecuarios de alta calidad para potenciar tu producción.</p>
        </section>

        <section class="catalogo-container">
            <aside class="filtros">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="m-0">Filtros</h3>
                    <button id="btn-limpiar" class="btn btn-sm btn-outline-success border-0">Limpiar</button>
                </div>

                <p class="small fw-bold text-muted text-uppercase mb-3">Categoría</p>
                <div class="filter-options">
                    <label><input type="radio" name="cat" value="TODOS" checked><span> Todos</span></label>
                    <label><input type="radio" name="cat" value="SEMILLAS"><span> Semillas</span></label>
                    <label><input type="radio" name="cat" value="CONCENTRADOS"><span> Concentrados</span></label>
                    <label><input type="radio" name="cat" value="HERRAMIENTAS"><span> Herramientas</span></label>
                </div>

                <p class="small fw-bold text-muted text-uppercase mt-4 mb-3">Precio</p>
                <div class="filter-options">
                    <label><input type="radio" name="price" value="ALL" checked><span> Todos</span></label>
                    <label><input type="radio" name="price" value="LOW"><span> Menos de $50k</span></label>
                    <label><input type="radio" name="price" value="MID"><span> $50k - $150k</span></label>
                    <label><input type="radio" name="price" value="HIGH"><span> Más de $150k</span></label>
                </div>
            </aside>

            <div class="catalog-main">
                <div id="contenedor-productos" class="productos"></div>
            </div>
        </section>

        <div id="modal-producto" class="modal-agro-overlay">
            <div class="modal-agro-content animate-fade-in">
                <button class="modal-agro-close" id="close-modal">&times;</button>
                <div class="modal-agro-body">
                    <div class="modal-agro-img">
                        <img id="modal-img" src="" alt="Producto">
                    </div>
                    
                    <div class="modal-agro-info">
                        <div class="mb-2">
                            <span id="modal-cat" class="modal-badge-cat"></span>
                        </div>
                        <h2 id="modal-nombre" class="fw-bold mb-3"></h2>
                        
                        <div class="modal-price-container mb-4">
                            <h3 id="modal-precio" class="text-dark fw-bold m-0"></h3>
                            <span class="text-success small fw-bold">IVA incluido</span>
                        </div>

                        <p id="modal-desc" class="text-muted mb-4 small" style="line-height: 1.6;"></p>

                        <div class="modal-trust-box p-3 rounded-3 mb-4 bg-light border">
                            <div class="d-flex align-items-center gap-2 text-success mb-2">
                                <i class="bi bi-truck fs-5"></i>
                                <span class="small fw-bold">Envío rápido a todo el país</span>
                            </div>
                            <div class="d-flex align-items-center gap-2 text-muted">
                                <i class="bi bi-shield-lock-fill"></i>
                                <span class="small">Compra Protegida con AgroConecta</span>
                            </div>
                        </div>

                        <div class="modal-agro-actions">
                            <div class="row g-3 align-items-center mb-4">
                                <div class="col-auto">
                                    <div class="input-group input-group-sm quantity-pill shadow-sm">
                                        <button class="btn btn-light border-end" type="button" id="modal-minus">-</button>
                                        <input type="number" value="1" min="1" class="form-control text-center fw-bold border-0 bg-white" id="modal-qty" readonly>
                                        <button class="btn btn-light border-start" type="button" id="modal-plus">+</button>
                                    </div>
                                </div>
                                <div class="col">
                                    <span id="modal-stock" class="small text-muted italic"></span>
                                </div>
                            </div>
                            
                            <button class="btn btn-success w-100 py-3 fw-bold rounded-4 shadow d-flex align-items-center justify-content-center gap-2" id="btn-add-from-modal">
                                <i class="bi bi-cart-plus fs-5"></i> AGREGAR AL CARRITO
                            </button>
                        </div>

                        <div class="mt-4 pt-3 border-top d-flex justify-content-between">
                            <div class="d-flex align-items-center gap-1 text-muted" style="font-size: 0.7rem;">
                                <i class="bi bi-award text-success"></i> Calidad Superior
                            </div>
                            <div class="d-flex align-items-center gap-1 text-muted" style="font-size: 0.7rem;">
                                <i class="bi bi-check-circle text-success"></i> Stock Real
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    const modal = document.getElementById('modal-producto');
    const inputQty = document.getElementById('modal-qty');
    
    if (!contenedor || !modal) return;

    // Lógica +/- Modal
    document.getElementById('modal-plus').onclick = () => {
        const stock = Number(document.getElementById('modal-stock').dataset.stock);
        if (parseInt(inputQty.value) < stock) {
            inputQty.value = parseInt(inputQty.value) + 1;
        } else {
            alert("Límite de stock alcanzado.");
        }
    };
    document.getElementById('modal-minus').onclick = () => { if (inputQty.value > 1) inputQty.value = parseInt(inputQty.value) - 1; };

    

        const productosNuevosRaw = JSON.parse(localStorage.getItem('listaProducts')) || [];
        console.log("Productos nuevos cargados:", productosNuevosRaw);
        const productosNuevos = productosNuevosRaw.map((p, index) => {
        // 1. Corregir el acceso a la propiedad (imagenes en vez de imagen)
        const imagenData = Array.isArray(p.imagenes) ? p.imagenes[0] : p.imagenes;
        
        // 2. Validar que la imagen exista para evitar errores de lectura
        const imagenSegura = imagenData || 'placeholder.jpg'; 
        const esBase64 = imagenSegura.startsWith('data:image');

        return {
            id: `custom-${index}`,
            nombre: p.nombre,
            cat: (p.tipoProducto || "VARIOS").toUpperCase(), // Evita errores si tipoProducto es undefined
            precio: Number(p.precio) || 0,
            stock: Number(p.cantidad) || 0,
            img: imagenSegura,
            desc: p.descripcion || "",
            esBase64: esBase64
        };
    });
    console.log("Productos nuevos procesados:", productosNuevos);

    const todosLosProductos = [...productosNuevos];

    const render = (lista) => {
        contenedor.innerHTML = lista.map(p => {
            const srcImagen = p.esBase64 ? p.img : `assets/imgs/${p.img}`;
            return `
                <div class="card" data-id="${p.id}">
                    <div class="card-img trigger-modal">
                        <img src="${srcImagen}" alt="${p.nombre}">
                        <span class="stock">${p.stock} en stock</span>
                    </div>
                    <div class="card-body">
                        <small class="text-success fw-bold text-uppercase">${p.cat}</small>
                        <h3 class="trigger-modal h6 fw-bold mb-2">${p.nombre}</h3>
                        <strong class="h5 text-dark d-block mb-3">${formatPrice(p.precio)}</strong>
                        <button class="btn btn-success btn-sm w-100 btn-agregar" 
                                data-nombre="${p.nombre}" 
                                data-precio="${p.precio}" 
                                data-img="${srcImagen}"
                                data-stock="${p.stock}">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.trigger-modal').forEach(el => {
            el.onclick = (e) => {
                const card = e.target.closest('.card');
                const producto = todosLosProductos.find(item => item.id == card.dataset.id);
                abrirModal(producto);
            };
        });
    };

    const mostrarNotificacion = (nombre) => {
        const toast = document.createElement("div");
        toast.className = "agro-toast shadow-lg";
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
            toast.classList.add("agro-toast-exit");
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    if (!window.eventoCarritoActivo) {
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-agregar") || e.target.id === "btn-add-from-modal") {
                let pData, cant = 1;
                if (e.target.id === "btn-add-from-modal") {
                    // ✅ Lógica de precio corregida (Sin división por 100)
                    const rawPriceText = document.getElementById('modal-precio').textContent;
                    const cleanPrice = Number(rawPriceText.replace(/[^0-9]/g, "")) / 100;
                    
                    pData = {
                        nombre: document.getElementById('modal-nombre').textContent,
                        precio: cleanPrice,
                        img: document.getElementById('modal-img').src,
                        stock: Number(document.getElementById('modal-stock').dataset.stock)
                    };
                    cant = Number(document.getElementById('modal-qty').value);
                    modal.classList.remove('active');
                } else {
                    pData = {
                        nombre: e.target.dataset.nombre,
                        precio: Number(e.target.dataset.precio),
                        img: e.target.dataset.img,
                        stock: Number(e.target.dataset.stock)
                    };
                }

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const existe = carrito.find(p => p.nombre === pData.nombre);
                
                let cantidadFinal = cant;
                if (existe) {
                    if (existe.cantidad + cant > pData.stock) {
                        alert("No puedes agregar más productos. Límite de stock alcanzado.");
                        return;
                    }
                    existe.cantidad += cant;
                    existe.stock = pData.stock; // Actualizar por si cambió
                } else {
                    if (cant > pData.stock) {
                        alert("No puedes agregar más productos. Límite de stock alcanzado.");
                        return;
                    }
                    carrito.push({ ...pData, cantidad: cant });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarContadorCarrito();
                mostrarNotificacion(pData.nombre);
            }
        });
        window.eventoCarritoActivo = true;
    }

    const abrirModal = (p) => {
        const srcImg = p.esBase64 ? p.img : `assets/imgs/${p.img}`;
        document.getElementById('modal-img').src = srcImg;
        document.getElementById('modal-nombre').textContent = p.nombre;
        document.getElementById('modal-cat').textContent = p.cat;
        document.getElementById('modal-desc').textContent = p.desc;
        document.getElementById('modal-precio').textContent = formatPrice(p.precio);
        const modalStock = document.getElementById('modal-stock');
        modalStock.textContent = `(${p.stock} disponibles)`;
        modalStock.dataset.stock = p.stock;
        document.getElementById('modal-qty').value = 1;
        modal.classList.add('active');
    };

    document.getElementById('close-modal').onclick = () => modal.classList.remove('active');
    window.onclick = (e) => { if (e.target == modal) modal.classList.remove('active'); };

    const filtrar = () => {
        const cat = document.querySelector('input[name="cat"]:checked').value;
        const price = document.querySelector('input[name="price"]:checked').value;
        let filtrados = todosLosProductos;
        if (cat !== "TODOS") filtrados = filtrados.filter(p => p.cat === cat);
        if (price === "LOW") filtrados = filtrados.filter(p => p.precio < 50000);
        else if (price === "MID") filtrados = filtrados.filter(p => p.precio >= 50000 && p.precio <= 150000);
        else if (price === "HIGH") filtrados = filtrados.filter(p => p.precio > 150000);
        render(filtrados);
    };

    document.querySelectorAll('input[name="cat"], input[name="price"]').forEach(el => el.addEventListener("change", filtrar));
    render(todosLosProductos);
}