export function Panel() {

    // ================================
    // 🔗 REDIRECCIÓN
    // ================================
    window.irAgregarProducto = function () {
        window.location.hash = "#/addProduct";
    };

    return `
        <section class="seccion-admin">
                <section class="seccion-titular">
                    <div>
                        <h1>Panel de administración</h1>
                        <h6>Gestiona productos, ventas y usuarios</h6>
                    </div>
                    <button>Cerrar Sesion</button>
                </section>
                <section class="seccion-estadisticas">
                    <div>
                        <h6>Productos Totales</h6>
                        <span id="stat-total">0</span>
                    </div>
                    <div>
                        <h6>En Promoción</h6>
                        <span id="stat-promo">0</span>
                    </div>
                    <div>
                        <h6>Productos Activos</h6>
                        <span id="stat-activos">0</span>
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
                        <input type="search" id="buscar-producto" placeholder="Buscar Producto...">
                        <button onclick="irAgregarProducto()">Agregar Producto</button>
                        <select id="filtro-categoria">
                            <option value="">Todas las categorías</option>
                        </select>
                    </div>

                    <!-- ================================ -->
                    <!-- 🔽 FILTRO DE COLUMNAS            -->
                    <!-- ================================ -->
                    <div class="filtro-columnas">
                        <h6 class="filtro-columnas__titulo">
                            <i class="bi bi-layout-three-columns"></i> Columnas visibles
                        </h6>
                        <div id="checkboxes-columnas" class="filtro-columnas__checks"></div>
                    </div>

                    <!-- ================================ -->
                    <!-- 📊 TABLA DE PRODUCTOS            -->
                    <!-- ================================ -->
                    <div class="tabla-contenedor">
                        <table>
                            <thead>
                                <tr id="propiedades-producto"></tr>
                            </thead>
                            <tbody id="filas-producto"></tbody>
                        </table>
                    </div>

                    <!-- ================================ -->
                    <!-- ✏️ MODAL EDITAR                  -->
                    <!-- ================================ -->
                    <div id="modal-editar" class="modal-overlay">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3>✏️ Editar Producto</h3>
                                <button class="modal-close" onclick="cerrarModal()">&times;</button>
                            </div>

                            <div class="modal-body">
                                <label class="modal-label">Nombre</label>
                                <input id="edit-nombre" disabled class="modal-input modal-input--disabled">

                                <label class="modal-label">Tipo de Producto</label>
                                <input id="edit-tipo" disabled class="modal-input modal-input--disabled">

                                <label class="modal-label">Precio ($)</label>
                                <input id="edit-precio" type="number" placeholder="Precio" class="modal-input">

                                <label class="modal-label">Cantidad</label>
                                <input id="edit-cantidad" type="number" placeholder="Cantidad" class="modal-input">

                                <label class="modal-label">Stock Mínimo</label>
                                <input id="edit-stockMinimo" type="number" placeholder="Stock Mínimo" class="modal-input">

                                <label class="modal-label">Activo</label>
                                <select id="edit-activo" class="modal-input">
                                    <option value="true">Sí</option>
                                    <option value="false">No</option>
                                </select>

                                <label class="modal-label modal-label--promo">
                                    <input type="checkbox" id="edit-promocion"> En promoción
                                </label>

                                <div id="edit-descuento-group">
                                    <label class="modal-label">Descuento (%)</label>
                                    <input id="edit-descuento" type="number" placeholder="Descuento %" min="1" max="100" class="modal-input">
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button class="modal-btn modal-btn--save" onclick="guardarEdicion()">💾 Guardar</button>
                                <button class="modal-btn modal-btn--cancel" onclick="cerrarModal()">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </section>
        </section>  
    `;
}

export function gestionPanel() {

    // ================================
    // 📦 OBTENER PRODUCTOS DE localStorage
    // ================================
    let productos = JSON.parse(localStorage.getItem("listaProducts")) || [];

    // Variable para rastrear el índice del producto en edición
    let indexActual = null;

    // ================================
    // 🏷️ DEFINICIÓN DE COLUMNAS
    // ================================
    // Mapeo de claves del producto a nombres legibles para el <th>
    const columnasDisponibles = [
        { clave: "nombre", label: "Producto" },
        { clave: "tipoProducto", label: "Tipo" },
        { clave: "precio", label: "Precio" },
        { clave: "cantidad", label: "Cantidad" },
        { clave: "stockMinimo", label: "Stock Mín." },
        { clave: "activo", label: "Activo" },
        { clave: "enPromocion", label: "Promoción" },
        { clave: "descuento", label: "Descuento" },
        { clave: "descripcion", label: "Descripción" },
        { clave: "fechaDeIngreso", label: "Fecha Ingreso" }
    ];

    // Columnas visibles por defecto
    let columnasVisibles = [
        "nombre", "tipoProducto", "precio", "cantidad",
        "stockMinimo", "activo", "enPromocion", "descuento"
    ];

    // ================================
    // 💰 FORMATEAR PRECIO
    // ================================
    function formatearPrecio(valor) {
        return Number(valor).toLocaleString("es-CO");
    }

    // ================================
    // 🔥 CALCULAR PRECIO FINAL
    // ================================
    function calcularPrecioFinal(producto) {
        const enPromo = producto.enPromocion
            || (producto.detalles && producto.detalles.enPromocion);
        const descuento = producto.descuento
            || (producto.detalles && producto.detalles.porcentajeDescuento)
            || 0;

        if (!enPromo) return producto.precio;
        return producto.precio * (1 - descuento / 100);
    }

    // ================================
    // 📄 OBTENER VALOR DE CELDA
    // ================================
    function obtenerValorCelda(producto, clave) {
        switch (clave) {
            case "precio":
                return `$ ${formatearPrecio(calcularPrecioFinal(producto))}`;
            case "activo":
                return producto.activo ? "✅ Sí" : "❌ No";
            case "enPromocion": {
                const enPromo = producto.enPromocion
                    || (producto.detalles && producto.detalles.enPromocion);
                return enPromo ? "🏷️ Sí" : "No";
            }
            case "descuento": {
                const enPromo = producto.enPromocion
                    || (producto.detalles && producto.detalles.enPromocion);
                const desc = producto.descuento
                    || (producto.detalles && producto.detalles.porcentajeDescuento)
                    || 0;
                return enPromo ? `${desc}%` : "—";
            }
            case "cantidad":
                return producto.cantidad ?? "—";
            case "stockMinimo":
                return producto.stockMinimo ?? "—";
            case "descripcion":
                return producto.descripcion
                    ? (producto.descripcion.length > 40
                        ? producto.descripcion.substring(0, 40) + "…"
                        : producto.descripcion)
                    : "—";
            case "fechaDeIngreso":
                return producto.fechaDeIngreso || "—";
            default:
                return producto[clave] ?? "—";
        }
    }

    // ================================
    // 📊 RENDERIZAR ESTADÍSTICAS
    // ================================
    function renderEstadisticas() {
        const totalEl = document.getElementById("stat-total");
        const promoEl = document.getElementById("stat-promo");
        const activosEl = document.getElementById("stat-activos");

        if (totalEl) totalEl.textContent = productos.length;

        if (promoEl) {
            const enPromo = productos.filter(p =>
                p.enPromocion || (p.detalles && p.detalles.enPromocion)
            ).length;
            promoEl.textContent = enPromo;
        }

        if (activosEl) {
            const activos = productos.filter(p => p.activo).length;
            activosEl.textContent = activos;
        }
    }

    // ================================
    // ☑️ RENDERIZAR CHECKBOXES DE COLUMNAS
    // ================================
    function renderCheckboxesColumnas() {
        const container = document.getElementById("checkboxes-columnas");
        if (!container) return;

        container.innerHTML = "";

        columnasDisponibles.forEach(col => {
            const isChecked = columnasVisibles.includes(col.clave);

            const label = document.createElement("label");
            label.className = "filtro-columnas__item";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = isChecked;
            checkbox.value = col.clave;

            checkbox.addEventListener("change", (e) => {
                if (e.target.checked) {
                    columnasVisibles.push(col.clave);
                } else {
                    columnasVisibles = columnasVisibles.filter(c => c !== col.clave);
                }
                renderTabla();
            });

            label.appendChild(checkbox);
            label.append(` ${col.label}`);
            container.appendChild(label);
        });
    }

    // ================================
    // 🔎 FILTRAR POR BÚSQUEDA Y CATEGORÍA
    // ================================
    function obtenerProductosFiltrados() {
        const busqueda = (document.getElementById("buscar-producto")?.value || "").toLowerCase();
        const categoriaFiltro = document.getElementById("filtro-categoria")?.value || "";

        return productos.filter(p => {
            const coincideNombre = p.nombre.toLowerCase().includes(busqueda);
            const tipo = p.tipoProducto || "";
            const coincideCategoria = !categoriaFiltro || tipo === categoriaFiltro;
            return coincideNombre && coincideCategoria;
        });
    }

    // ================================
    // 📊 RENDER TABLA
    // ================================
    function renderTabla() {
        const thead = document.getElementById("propiedades-producto");
        const tbody = document.getElementById("filas-producto");
        if (!thead || !tbody) return;

        // --- Cabeceras ---
        thead.innerHTML = "";
        columnasDisponibles
            .filter(col => columnasVisibles.includes(col.clave))
            .forEach(col => {
                const th = document.createElement("th");
                th.textContent = col.label;
                thead.appendChild(th);
            });

        // Columna de acción (Editar)
        const thAccion = document.createElement("th");
        thAccion.textContent = "Acción";
        thead.appendChild(thAccion);

        // --- Filas ---
        tbody.innerHTML = "";
        const productosFiltrados = obtenerProductosFiltrados();

        if (productosFiltrados.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = columnasVisibles.length + 1;
            td.className = "tabla-vacia";
            td.innerHTML = `
                <div class="tabla-vacia__contenido">
                    <span class="tabla-vacia__icon">📦</span>
                    <p>No hay productos registrados</p>
                    <button class="tabla-vacia__btn" onclick="irAgregarProducto()">
                        ➕ Agregar primer producto
                    </button>
                </div>
            `;
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        productosFiltrados.forEach((producto, index) => {
            // Encontrar el índice real en el array original
            const indexReal = productos.indexOf(producto);

            const tr = document.createElement("tr");

            columnasDisponibles
                .filter(col => columnasVisibles.includes(col.clave))
                .forEach(col => {
                    const td = document.createElement("td");
                    td.textContent = obtenerValorCelda(producto, col.clave);
                    tr.appendChild(td);
                });

            // Celda de acción: solo Editar
            const tdAccion = document.createElement("td");
            tdAccion.innerHTML = `
                <button class="btn-editar" onclick="abrirModal(${indexReal})" title="Editar producto">
                    ✏️
                </button>
            `;
            tr.appendChild(tdAccion);

            tbody.appendChild(tr);
        });
    }

    // ================================
    // 📂 POBLAR SELECT DE CATEGORÍAS
    // ================================
    function poblarCategorias() {
        const select = document.getElementById("filtro-categoria");
        if (!select) return;

        const tipos = [...new Set(productos.map(p => p.tipoProducto).filter(Boolean))];
        tipos.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo;
            option.textContent = tipo;
            select.appendChild(option);
        });
    }

    // ================================
    // ✏️ ABRIR MODAL
    // ================================
    window.abrirModal = function (index) {
        indexActual = index;
        const producto = productos[index];

        document.getElementById("edit-nombre").value = producto.nombre || "";
        document.getElementById("edit-tipo").value = producto.tipoProducto || "";
        document.getElementById("edit-precio").value = producto.precio || 0;
        document.getElementById("edit-cantidad").value = producto.cantidad ?? 0;
        document.getElementById("edit-stockMinimo").value = producto.stockMinimo ?? 5;

        document.getElementById("edit-activo").value = producto.activo ? "true" : "false";

        const enPromo = producto.enPromocion
            || (producto.detalles && producto.detalles.enPromocion)
            || false;
        document.getElementById("edit-promocion").checked = enPromo;

        const descuento = producto.descuento
            || (producto.detalles && producto.detalles.porcentajeDescuento)
            || 0;
        document.getElementById("edit-descuento").value = descuento;

        // Mostrar/ocultar grupo de descuento según el checkbox
        const descGroup = document.getElementById("edit-descuento-group");
        descGroup.style.display = enPromo ? "block" : "none";

        document.getElementById("modal-editar").classList.add("modal-overlay--visible");
    };

    // ================================
    // ❌ CERRAR MODAL
    // ================================
    window.cerrarModal = function () {
        document.getElementById("modal-editar").classList.remove("modal-overlay--visible");
    };

    // ================================
    // 💾 GUARDAR EDICIÓN
    // ================================
    window.guardarEdicion = function () {
        const producto = productos[indexActual];

        const precio = document.getElementById("edit-precio").value;
        const cantidad = document.getElementById("edit-cantidad").value;
        const stockMinimo = document.getElementById("edit-stockMinimo").value;
        const activo = document.getElementById("edit-activo").value === "true";

        const promocion = document.getElementById("edit-promocion").checked;
        const descuento = document.getElementById("edit-descuento").value;

        if (!isNaN(precio)) producto.precio = Number(precio);
        if (!isNaN(cantidad)) producto.cantidad = Number(cantidad);
        if (!isNaN(stockMinimo)) producto.stockMinimo = Number(stockMinimo);
        producto.activo = activo;

        producto.enPromocion = promocion;

        // También actualizar en detalles si existe
        if (producto.detalles) {
            producto.detalles.enPromocion = promocion;
        }

        if (promocion && descuento >= 1 && descuento <= 100) {
            producto.descuento = Number(descuento);
            if (producto.detalles) {
                producto.detalles.porcentajeDescuento = Number(descuento);
            }
        } else {
            producto.descuento = 0;
            if (producto.detalles) {
                producto.detalles.porcentajeDescuento = 0;
            }
        }

        // Guardar cambios en localStorage
        localStorage.setItem("listaProducts", JSON.stringify(productos));

        cerrarModal();
        renderTabla();
        renderEstadisticas();
    };

    // ================================
    // 🎧 EVENTOS DE BÚSQUEDA Y FILTRO
    // ================================
    const inputBuscar = document.getElementById("buscar-producto");
    if (inputBuscar) {
        inputBuscar.addEventListener("input", renderTabla);
    }

    const selectCategoria = document.getElementById("filtro-categoria");
    if (selectCategoria) {
        selectCategoria.addEventListener("change", renderTabla);
    }

    // Toggle descuento en modal
    const editPromoCheckbox = document.getElementById("edit-promocion");
    if (editPromoCheckbox) {
        editPromoCheckbox.addEventListener("change", (e) => {
            const descGroup = document.getElementById("edit-descuento-group");
            descGroup.style.display = e.target.checked ? "block" : "none";
        });
    }

    // ================================
    // ⏱️ INICIALIZAR
    // ================================
    renderCheckboxesColumnas();
    poblarCategorias();
    renderTabla();
    renderEstadisticas();
}