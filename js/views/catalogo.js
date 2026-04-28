/**
 * Vista de Catálogo - AgroConecta
 * Incluye: Vista Rápida (Modal), Filtros y 4 Columnas
 */
export function Catalogo() {
    // Ejecutamos la lógica después de que el HTML se cargue en el DOM
    setTimeout(() => initCatalogo(), 0);

    return `
        <section class="hero">
            <span class="badge">Productos</span>
            <h1>Catálogo de Productos</h1>
            <p>Explora nuestra amplia selección de insumos agropecuarios de alta calidad para potenciar tu producción.</p>
        </section>

        <section class="catalogo-container">
            <aside class="filtros">
                <h3>Filtros</h3>

                <p>Categoría</p>
                <div class="filter-options">
                    <label><input type="radio" name="cat" value="TODOS" checked><span>Todos</span></label>
                    <label><input type="radio" name="cat" value="SEMILLAS"><span>Semillas</span></label>
                    <label><input type="radio" name="cat" value="CONCENTRADOS"><span>Concentrados</span></label>
                    <label><input type="radio" name="cat" value="HERRAMIENTAS"><span>Herramientas</span></label>
                </div>

                <p>Precio</p>
                <div class="filter-options">
                    <label><input type="radio" name="price" value="ALL" checked><span>Todos</span></label>
                    <label><input type="radio" name="price" value="LOW"><span>Menos de $50.000</span></label>
                    <label><input type="radio" name="price" value="MID"><span>$50k - $150k</span></label>
                    <label><input type="radio" name="price" value="HIGH"><span>Más de $150k</span></label>
                </div>
                
                <button id="btn-limpiar" class="btn-limpiar-filtros">
                    <i class="bi bi-trash"></i> Limpiar Filtros
                </button>
            </aside>

            <div class="catalog-main">
                <div id="contenedor-productos" class="productos">
                    </div>
            </div>
        </section>

        <div id="modal-producto" class="modal-agro-overlay">
            <div class="modal-agro-content">
                <button class="modal-agro-close" id="close-modal">&times;</button>
                <div class="modal-agro-body">
                    <div class="modal-agro-img">
                        <img id="modal-img" src="" alt="Producto">
                    </div>
                    <div class="modal-agro-info">
                        <small id="modal-cat"></small>
                        <h2 id="modal-nombre"></h2>
                        <p id="modal-desc"></p>
                        <div class="modal-agro-stats">
                             <span id="modal-stock"></span>
                        </div>
                        <strong id="modal-precio"></strong>
                        <div class="modal-agro-actions">
                            <input type="number" value="1" min="1" class="modal-qty">
                            <button class="btn-add-modal">Agregar al Carrito</button>
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
    if (!contenedor || !modal) return;

    // 1. Los 12 Productos Base
    const productosBase = [
        { id: 1, nombre: "Semillas de Chía", cat: "SEMILLAS", precio: 25000, stock: 50, img: "semillas-chia.jpg", desc: "Semillas premium ricas en Omega-3, ideales para siembra directa y nutrición animal superior." },
        { id: 2, nombre: "Semillas de Arroz", cat: "SEMILLAS", precio: 38000, stock: 30, img: "semillas-arroz.jpg", desc: "Variedad certificada de gran rendimiento, seleccionada por su resistencia a enfermedades del trópico." },
        { id: 3, nombre: "Semillas de Maíz", cat: "SEMILLAS", precio: 42000, stock: 25, img: "semillas-maiz.jpg", desc: "Híbrido de alto potencial productivo. Excelente vigor inicial y estabilidad en diferentes suelos." },
        { id: 4, nombre: "Semillas de Frijol", cat: "SEMILLAS", precio: 35000, stock: 40, img: "semillas-frijol.jpg", desc: "Grano seleccionado tipo exportación con alta capacidad de germinación." },
        { id: 5, nombre: "Concentrado Ceba", cat: "CONCENTRADOS", precio: 85000, stock: 15, img: "concentrado-ceba.jpg", desc: "Suplemento energético para una ganancia de peso acelerada en bovinos de levante." },
        { id: 6, nombre: "Concentrado Ganado", cat: "CONCENTRADOS", precio: 85000, stock: 28, img: "concentrado-ganado.jpg", desc: "Equilibrio nutricional perfecto para ganado de leche y carne, mejorando la productividad." },
        { id: 7, nombre: "Concentrado Pollos", cat: "CONCENTRADOS", precio: 55000, stock: 40, img: "concentrado-aves.jpg", desc: "Alimento balanceado para aves de corral en etapa de engorde temprano." },
        { id: 8, nombre: "Concentrado Cerdos", cat: "CONCENTRADOS", precio: 78000, stock: 20, img: "concentrado-cerdos.jpg", desc: "Fórmula optimizada para el desarrollo muscular y salud digestiva de porcinos." },
        { id: 9, nombre: "Kit Herramientas", cat: "HERRAMIENTAS", precio: 120000, stock: 15, img: "kit-herramientas.jpg", desc: "Incluye las herramientas manuales básicas reforzadas para el mantenimiento de cultivos." },
        { id: 10, nombre: "Esparcidor", cat: "HERRAMIENTAS", precio: 95000, stock: 8, img: "esparcidor.jpg", desc: "Herramienta de precisión para la distribución uniforme de fertilizantes granulados." },
        { id: 11, nombre: "Sistema Ordeño", cat: "HERRAMIENTAS", precio: 450000, stock: 3, img: "sistema-ordeno.jpg", desc: "Equipo de alta eficiencia para la automatización del ordeño en pequeñas y medianas fincas." },
        { id: 12, nombre: "Pala Profesional", cat: "HERRAMIENTAS", precio: 35000, stock: 22, img: "pala-profesional.jpg", desc: "Acero de alta resistencia con mango ergonómico antideslizante para largas jornadas." }
    ];

    // 2. Recuperar productos del LocalStorage
    const productosNuevosRaw = JSON.parse(localStorage.getItem('listaProducts')) || [];
    const productosNuevos = productosNuevosRaw.map((p, index) => ({
        id: `custom-${index}`,
        nombre: p.nombre,
        cat: p.tipoProducto.toUpperCase(),
        precio: p.precio,
        stock: p.cantidad,
        img: Array.isArray(p.imagen) ? p.imagen[0] : p.imagen,
        desc: p.descripcion,
        esBase64: (Array.isArray(p.imagen) ? p.imagen[0] : p.imagen).startsWith('data:image')
    }));

    const todosLosProductos = [...productosBase, ...productosNuevos];

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
                        <small>${p.cat}</small>
                        <h3 class="trigger-modal">${p.nombre}</h3>
                        <p>${p.desc.substring(0, 45)}...</p>
                        <strong>$${p.precio.toLocaleString('es-CO')}</strong>
                        <button class="btn-carrito-agro">Agregar al Carrito</button>
                    </div>
                </div>
            `;
        }).join('');

        // Eventos para abrir el modal
        document.querySelectorAll('.trigger-modal').forEach(el => {
            el.onclick = (e) => {
                const card = e.target.closest('.card');
                const pId = card.dataset.id;
                const producto = todosLosProductos.find(item => item.id == pId);
                abrirModal(producto);
            };
        });
    };

    const abrirModal = (p) => {
        const srcImagen = p.esBase64 ? p.img : `assets/imgs/${p.img}`;
        document.getElementById('modal-img').src = srcImagen;
        document.getElementById('modal-nombre').textContent = p.nombre;
        document.getElementById('modal-cat').textContent = p.cat;
        document.getElementById('modal-desc').textContent = p.desc;
        document.getElementById('modal-precio').textContent = `$${p.precio.toLocaleString('es-CO')}`;
        document.getElementById('modal-stock').textContent = `Stock disponible: ${p.stock}`;
        modal.classList.add('active');
    };

    // Lógica para cerrar el modal
    document.getElementById('close-modal').onclick = () => modal.classList.remove('active');
    window.onclick = (e) => { if (e.target == modal) modal.classList.remove('active'); };

    // Lógica de Filtros
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

    document.querySelectorAll('input[name="cat"], input[name="price"]').forEach(el => {
        el.addEventListener("change", filtrar);
    });

    document.getElementById('btn-limpiar').onclick = () => {
        document.querySelector('input[name="cat"][value="TODOS"]').checked = true;
        document.querySelector('input[name="price"][value="ALL"]').checked = true;
        render(todosLosProductos);
    };

    render(todosLosProductos);
}