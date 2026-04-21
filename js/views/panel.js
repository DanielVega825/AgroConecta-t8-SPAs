export function Panel() {    
    return `
        <section>
            <section class="seccion-titular">
                <h1>Panel de administracion</h1>
                <h3>Gestiona productos, ventas y usuarios</h3>
                <button>Cerrar Sesion</button>
            </section>
            <section class="seccion-estadisticas">
                <div>
                    <h5>Productos Totales</h5>
                    <span>156</span>
                </div>
                <div>
                    <h5>Ventas del Mes</h5>
                    <span>$4.2</span>
                </div>
                <div>
                    <h5>Usuarios Activos</h5>
                    <span>156</span>
                </div>

            </section>
            <section class="seccion-crud">
                <div class="">
                    <ul>
                        <li>Productos</li>
                        <li>Pedidos</li>
                        <li>Usuarios</li>
                        <li>Reportes</li>
                    </ul>
                </div>
                <div class="">
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

    ]
    
    const propiedades = document.getElementById("propiedades-producto");
    const filas = document.getElementById("filas-producto");

    
        let producto = productos[0];
        let claves = Object.keys(producto);
        let valores = Object.values(producto);
        
        claves.forEach(clave => {
            const th = document.createElement("th");
            th.textContent = clave;
            propiedades.appendChild(th);
        });

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            filas.appendChild(td);
        })

}