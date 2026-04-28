import { actualizarContadorCarrito } from "../main.js";

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

    setTimeout(() => initCatalogo(), 0);

    return `
    <section class="catalogo-container">
        <aside class="filtros">
            <h3>Filtros</h3>

            <p>Categoría</p>
            <label><input type="radio" name="cat" value="TODOS" checked> Todos</label>
            <label><input type="radio" name="cat" value="SEMILLAS"> Semillas</label>
            <label><input type="radio" name="cat" value="CONCENTRADOS"> Concentrados</label>
            <label><input type="radio" name="cat" value="HERRAMIENTAS"> Herramientas</label>

            <p>Precio</p>
            <label><input type="radio" name="price" value="ALL" checked> Todos</label>
            <label><input type="radio" name="price" value="LOW"> Menos de $50.000</label>
            <label><input type="radio" name="price" value="MID"> $50k - $100k</label>
            <label><input type="radio" name="price" value="HIGH"> Más de $100k</label>
        </aside>

        <div>
            <h1>Catálogo</h1>
            <div id="contenedor-productos" class="productos"></div>
        </div>
    </section>
    `;
}

function initCatalogo() {

    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    const render = (lista) => {
        contenedor.innerHTML = lista.map(p => `
            <div class="card">
                <div class="card-img">
                    <img src="assets/imgs/${p.img}" alt="${p.nombre}">
                </div>
                <div class="card-body">
                    <h3>${p.nombre}</h3>
                    <p>$${p.precio.toLocaleString('es-CO')}</p>
                    <button 
                        class="btn-agregar"
                        data-nombre="${p.nombre}" 
                        data-precio="${p.precio}"
                        data-img="${p.img}">
                        Agregar
                    </button>
                </div>
            </div>
        `).join('');
    };

    render(productos);
}

//
// 🔥 EVENTO GLOBAL (SOLUCIONA DUPLICADOS)
//
if (!window.eventoCarritoActivo) {

    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("btn-agregar")) {

            const producto = {
                nombre: e.target.dataset.nombre,
                precio: Number(e.target.dataset.precio),
                img: e.target.dataset.img
            };

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const existe = carrito.find(p => p.nombre === producto.nombre);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({ ...producto, cantidad: 1 });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarContadorCarrito();

            console.log("✅ Producto agregado:", producto);
        }
    });

    window.eventoCarritoActivo = true;
}