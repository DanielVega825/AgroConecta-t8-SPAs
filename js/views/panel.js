export function Panel() {    
    return `
        <section class="seccion-admin">
            <section class="seccion-titular">
                <div>
                    <h1>Panel de administracion</h1>
                    <h6>Gestiona productos, ventas y usuarios</h6>
                </div>
                <button>Cerrar Sesion</button>
            </section>
            <section class="seccion-estadisticas">
                <div>
                    <h6>Productos Totales</h6>
                    <span>156</span>
                </div>
                <div>
                    <h6>Ventas del Mes</h6>
                    <span>$4.2</span>
                </div>
                <div>
                    <h6>Usuarios Activos</h6>
                    <span>156</span>
                </div>

            </section>
            <section class="seccion-crud">
                <div>
                    <ul>
                        <li>Productos</li>
                        <li>Pedidos</li>
                        <li>Usuarios</li>
                        <li>Reportes</li>
                    </ul>
                </div>
                <div>
                    <input type="search" placeholder="Buscar Producto..."></input>
                    <button>Agregar Producto</button>
                    <select>
                        <option>Todas las categorias</option>
                    </select>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr id="propiedades-producto">
                            
                            </tr>
                        </thead>
                        <tbody id="filas-producto">

                        </tbody>
                    </table>
                </div>
            </section>
        </section>  
    `;
}

export function gestionPanel() {
     const productos = [
        {
            id: "123",
            nombre: "kitherramientas",
            precio: 5000,
            descripcion: "kit basico",
            imagen: [],
            detalles: {},
            cantidad: 5,
            tipoProducto: "herramientas",
            fechaDeIngreso: "",
            activo: true,
            stockMinimo: 5,
            disponible: true,
            descontinuado: false,
            enPromocion: false
        },
        {
            id: "123",
            nombre: "kitherramientas",
            precio: 5000,
            descripcion: "kit basico",
            imagen: [],
            detalles: {},
            cantidad: 5,
            tipoProducto: "herramientas",
            fechaDeIngreso: "",
            activo: true,
            stockMinimo: 5,
            disponible: true,
            descontinuado: false,
            enPromocion: false
        }

    ]
    
    const propiedades = document.getElementById("propiedades-producto");
    const filas = document.getElementById("filas-producto");

        let claves = Object.keys(productos[0]);
        
        claves.forEach(clave => {
            const th = document.createElement("th");
            th.textContent = clave;
            propiedades.appendChild(th);
        });

        productos.forEach(producto => {
        const tr = document.createElement("tr");

        Object.values(producto).forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        });

        filas.appendChild(tr);
        });

}