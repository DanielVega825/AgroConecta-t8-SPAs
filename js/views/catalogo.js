const productos = [
    { nombre: "Semillas de Chía", cat: "SEMILLAS", precio: 25000, stock: "50", img: "semillas-chia.jpg", desc: "Premium para siembra." },
    { nombre: "Semillas de Arroz", cat: "SEMILLAS", precio: 38000, stock: "30", img: "semillas-arroz.jpg", desc: "Variedad de rendimiento." },
    { nombre: "Semillas de Maíz", cat: "SEMILLAS", precio: 42000, stock: "25", img: "semillas-maiz.jpg", desc: "Híbrido resistente." },
    { nombre: "Semillas de Frijol", cat: "SEMILLAS", precio: 35000, stock: "40", img: "semillas-frijol.jpg", desc: "Tipo exportación." },
    { nombre: "Concentrado para Ceba", cat: "CONCENTRADOS", precio: 85000, stock: "15", img: "concentrado-ceba.jpg", desc: "Ganancia rápida peso." },
    { nombre: "Concentrado para Ganado", cat: "CONCENTRADOS", precio: 85000, stock: "28", img: "concentrado-ganado.jpg", desc: "Bovinos leche/carne." },
    { nombre: "Concentrado para Pollos", cat: "CONCENTRADOS", precio: 55000, stock: "40", img: "concentrado-aves.jpg", desc: "Etapa engorde." },
    { nombre: "Concentrado para Cerdos", cat: "CONCENTRADOS", precio: 78000, stock: "20", img: "concentrado-cerdos.jpg", desc: "Etapa de levante." },
    { nombre: "Kit Herramientas", cat: "HERRAMIENTAS", precio: 120000, stock: "15", img: "kit-herramientas.jpg", desc: "Set esencial campo." },
    { nombre: "Esparcidor", cat: "HERRAMIENTAS", precio: 95000, stock: "8", img: "esparcidor.jpg", desc: "Abono uniforme." },
    { nombre: "Sistema Ordeño", cat: "HERRAMIENTAS", precio: 450000, stock: "3", img: "sistema-ordeno.jpg", desc: "Alta eficiencia." },
    { nombre: "Pala Profesional", cat: "HERRAMIENTAS", precio: 35000, stock: "22", img: "pala-profesional.jpg", desc: "Acero reforzado." }
];

export function Catalogo() {

    setTimeout(() => initCatalogo(), 0); // 👈 importante

    return `
    <section class="catalogo-container">
 
        <aside class="filtros">
            <h3>Filtros</h3>
 
            <p>Categoría</p>
            <label><input type="radio" name="cat" value="TODOS" checked><span>Todos</span></label>
            <label><input type="radio" name="cat" value="SEMILLAS"><span>Semillas</span></label>
            <label><input type="radio" name="cat" value="CONCENTRADOS"><span>Concentrados</span></label>
            <label><input type="radio" name="cat" value="HERRAMIENTAS"><span>Herramientas</span></label>
 
            <p>Precio</p>
            <label><input type="radio" name="price" value="ALL" checked><span>Todos</span></label>
            <label><input type="radio" name="price" value="LOW"><span>Menos de $50.000</span></label>
            <label><input type="radio" name="price" value="MID"><span>$50k - $100k</span></label>
            <label><input type="radio" name="price" value="HIGH"><span>Más de $100k</span></label>
        </aside>
 
        <div>
            <h1>Catálogo de productos</h1>
            <p>Explora nuestros productos agrícolas</p>
 
            <div id="contenedor-productos" class="productos"></div>
        </div>
 
    </section>
    `;
}

/* =========================
   🔥 LÓGICA DE FILTROS
========================= */
function initCatalogo() {

    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    const render = (lista) => {
        contenedor.innerHTML = lista.map(p => `
            <div class="card">
                <div class="card-img">
                    <img src="assets/imgs/${p.img}" alt="${p.nombre}">
                    <span class="stock">${p.stock} en stock</span>
                </div>
                <div class="card-body">
                    <small>${p.cat}</small>
                    <h3>${p.nombre}</h3>
                    <p>${p.desc}</p>
                    <strong>$${p.precio.toLocaleString('es-CO')}</strong>
                    <button>Agregar</button>
                </div>
            </div>
        `).join('');
    };

    // 1. Obtener y parsear la lista desde localStorage (usando un arreglo vacío como respaldo si no hay nada guardado)
    const productosRecuperados = JSON.parse(localStorage.getItem('listaProducts')) || [];

    const render2 = (lista) => {
    const htmlProductos = lista.map(p => {
        // Obtenemos el valor de la imagen (sea array o string)
        const imagenGuardada = Array.isArray(p.imagen) ? p.imagen[0] : p.imagen;
        
        // Evaluamos si es Base64 o si es un archivo normal
        // Si empieza con "data:image", es Base64 y se usa directo. Si no, es un archivo local.
        const srcImagen = imagenGuardada.startsWith('data:image') 
            ? imagenGuardada 
            : `assets/imgs/${imagenGuardada}`;

        return `
            <div class="card">
                <div class="card-img">
                    <img src="${srcImagen}" alt="${p.nombre}">
                    <span class="stock">${p.cantidad} en stock</span>
                </div>
                <div class="card-body">
                    <small>${p.tipoProducto}</small>
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <strong>$${p.precio.toLocaleString('es-CO')}</strong>
                    <button>Agregar</button>
                </div>
            </div>
        `;
    }).join('');

    contenedor.insertAdjacentHTML('beforeend', htmlProductos);
};

    const filtrar = () => {
        const cat = document.querySelector('input[name="cat"]:checked').value;
        const price = document.querySelector('input[name="price"]:checked').value;

        let filtrados = productos;

        if (cat !== "TODOS") {
            filtrados = filtrados.filter(p => p.cat === cat);
        }

        if (price === "LOW") {
            filtrados = filtrados.filter(p => p.precio < 50000);
        } else if (price === "MID") {
            filtrados = filtrados.filter(p => p.precio >= 50000 && p.precio <= 100000);
        } else if (price === "HIGH") {
            filtrados = filtrados.filter(p => p.precio > 100000);
        }

        render(filtrados);
    };

    document.querySelectorAll('input[name="cat"], input[name="price"]').forEach(el => {
        el.addEventListener("change", filtrar);
    });

    render(productos);
    render2(productosRecuperados)
}