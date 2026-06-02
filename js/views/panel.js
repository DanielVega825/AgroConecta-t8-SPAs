import { getProductos, updateProducto, deleteProducto, getPedidos, getUsuarios, getCategorias } from '../services/api.js';

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
                    <!-- TABS DE NAVEGACIÓN -->
                    <div class="panel-tabs">
                        <button class="panel-tab panel-tab--active" id="tab-productos" onclick="cambiarTab('productos')">
                            <i class="bi bi-box-seam"></i> Productos
                        </button>
                        <button class="panel-tab" id="tab-pedidos" onclick="cambiarTab('pedidos')">
                            <i class="bi bi-receipt"></i> Pedidos
                        </button>
                        <button class="panel-tab" id="tab-usuarios" onclick="cambiarTab('usuarios')">
                            <i class="bi bi-people"></i> Usuarios
                        </button>
                    </div>

                    <!-- ======= SECCIÓN PRODUCTOS ======= -->
                    <div id="seccion-productos">
                        <div class="panel-toolbar">
                            <input type="search" id="buscar-producto" placeholder="🔍 Buscar producto...">
                            <button class="btn-agregar" onclick="irAgregarProducto()">
                                <i class="bi bi-plus-lg"></i> Agregar
                            </button>
                            <select id="filtro-categoria">
                                <option value="">Todas las categorías</option>
                            </select>
                            <div class="dropdown-columnas" id="dropdown-columnas-wrapper">
                                <button class="btn-columnas" id="btn-toggle-columnas" onclick="toggleDropdownColumnas()" type="button">
                                    <i class="bi bi-layout-three-columns"></i> Columnas <i class="bi bi-chevron-down"></i>
                                </button>
                                <div class="dropdown-columnas__menu" id="menu-columnas" style="display:none;">
                                    <div class="dropdown-columnas__header">Columnas visibles</div>
                                    <div id="checkboxes-columnas"></div>
                                </div>
                            </div>
                        </div>
                        <div class="tabla-contenedor table-responsive shadow-sm rounded bg-white p-2">
                            <table class="table table-striped table-hover table-bordered align-middle mb-0" id="tabla-productos">
                                <thead class="table-dark">
                                    <tr id="propiedades-producto"></tr>
                                </thead>
                                <tbody id="filas-producto"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ======= SECCIÓN PEDIDOS ======= -->
                    <div id="seccion-pedidos" style="display:none;">
                        <div class="panel-toolbar">
                            <input type="search" id="buscar-pedido" placeholder="🔍 Buscar pedido...">
                            <select id="filtro-estado-pedido">
                                <option value="">Todos los estados</option>
                                <option value="PENDIENTE">🟡 Pendiente</option>
                                <option value="COMPRADO">✅ Comprado</option>
                            </select>
                        </div>
                        <div class="tabla-contenedor table-responsive shadow-sm rounded bg-white p-2">
                            <table class="table table-striped table-hover table-bordered align-middle mb-0">
                                <thead class="table-dark">
                                    <tr>
                                        <th>#ID</th><th>Cliente</th><th>Estado</th>
                                        <th>Total</th><th>Fecha</th><th>Detalles</th>
                                    </tr>
                                </thead>
                                <tbody id="filas-pedidos"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ======= SECCIÓN USUARIOS ======= -->
                    <div id="seccion-usuarios" style="display:none;">
                        <div class="panel-toolbar">
                            <input type="search" id="buscar-usuario" placeholder="🔍 Buscar usuario...">
                            <select id="filtro-rol-usuario">
                                <option value="">Todos los roles</option>
                                <option value="CLIENTE">Cliente</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                        <div class="tabla-contenedor table-responsive shadow-sm rounded bg-white p-2">
                            <table class="table table-striped table-hover table-bordered align-middle mb-0">
                                <thead class="table-dark">
                                    <tr>
                                        <th>#ID</th><th>Nombre</th><th>Email</th>
                                        <th>Teléfono</th><th>Rol</th><th>Estado</th><th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody id="filas-usuarios"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- MODAL EDITAR PRODUCTO -->
                    <div id="modal-editar" class="modal-overlay">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3>✏️ Editar Producto</h3>
                                <button class="modal-close" onclick="cerrarModal()">&times;</button>
                            </div>
                            <div class="modal-body">
                                <label class="modal-label">Nombre</label>
                                <input id="edit-nombre" disabled class="modal-input modal-input--disabled">
                                <label class="modal-label">Categoría</label>
                                <input id="edit-categoria" disabled class="modal-input modal-input--disabled">
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
                                <div id="edit-descuento-group" style="display: none;">
                                    <label class="modal-label">Descuento (%)</label>
                                    <input id="edit-descuento" type="number" placeholder="Descuento %" min="1" max="100" class="modal-input">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="modal-btn modal-btn--save" onclick="guardarEdicion()">💾 Guardar</button>
                                <button class="modal-btn modal-btn--cancel" onclick="cerrarModal()">Cancelar</button>
                                <button class="modal-btn modal-btn--delete" onclick="eliminarProducto()">🗑️ Eliminar</button>
                            </div>
                        </div>
                    </div>
                </section>
        </section>  
    `;
}

export async function gestionPanel() {
    // ============================================================
    // 📂 CARGAR CATEGORÍAS DESDE API
    // ============================================================
    let categoriasDisponibles = [];
    try {
        categoriasDisponibles = await getCategorias();
    } catch (error) {
        console.error("Error cargando categorías:", error);
    }

    // ============================================================
    // 📦 DATOS
    // ============================================================
    let productos = [];      // ← SOLO ESTA QUEDA
    let pedidos = [];
    let usuarios = [];
    let indexActual = null;

    // Cargar datos iniciales desde la API
    try {
        productos = await getProductos(true) || [];
    } catch (error) {
        console.error("Error cargando productos:", error);
        productos = [];
    }

    // ============================================================
    // 🏷️ DEFINICIÓN DE COLUMNAS
    // ============================================================
    const COLUMNAS_FIJAS = ["nombre", "activo"];

    const columnasDisponibles = [
        { clave: "nombre", label: "Producto", tipo: "texto" },
        { clave: "categoriaNombre", label: "Categoría", tipo: "texto" },
        { clave: "precio", label: "Precio", tipo: "numero" },
        { clave: "cantidad", label: "Cantidad", tipo: "numero" },
        { clave: "stockMinimo", label: "Stock Mín.", tipo: "numero" },
        { clave: "activo", label: "Activo", tipo: "booleano" },
        { clave: "enPromocion", label: "Promoción", tipo: "booleano" },
        { clave: "descuento", label: "Descuento", tipo: "numero" },
        { clave: "descripcion", label: "Descripción", tipo: "texto" },
        { clave: "fechaDeIngreso", label: "Fecha Ingreso", tipo: "fecha" },
    ];

    let columnasVisibles = ["nombre", "categoriaNombre", "precio", "cantidad", "stockMinimo", "activo", "enPromocion", "descuento"];

    const filtrosActivos = {
        nombre: "", categoriaNombre: "",
        precio: { operacion: ">=", valor: "" },
        cantidad: { operacion: ">=", valor: "" },
        stockMinimo: { operacion: ">=", valor: "" },
        activo: "", enPromocion: "",
        descuento: { operacion: ">=", valor: "" },
        descripcion: "", fechaDeIngreso: "",
    };

    // ============================================================
    // 🔀 CAMBIAR TAB
    // ============================================================
    window.cambiarTab = async function (tab) {
        ["productos", "pedidos", "usuarios"].forEach(t => {
            const sec = document.getElementById(`seccion-${t}`);
            const btn = document.getElementById(`tab-${t}`);
            if (sec) sec.style.display = t === tab ? "" : "none";
            if (btn) btn.classList.toggle("panel-tab--active", t === tab);
        });
        if (tab === "pedidos") await renderPedidos();
        if (tab === "usuarios") await renderUsuarios();
    };

    // ============================================================
    // 🔽 DROPDOWN COLUMNAS
    // ============================================================
    window.toggleDropdownColumnas = function () {
        const menu = document.getElementById("menu-columnas");
        if (!menu) return;
        const isOpen = menu.style.display !== "none";
        menu.style.display = isOpen ? "none" : "block";
    };

    document.addEventListener("click", (e) => {
        const wrapper = document.getElementById("dropdown-columnas-wrapper");
        if (wrapper && !wrapper.contains(e.target)) {
            const menu = document.getElementById("menu-columnas");
            if (menu) menu.style.display = "none";
        }
    }, true);

    // ============================================================
    // 💰 UTILIDADES
    // ============================================================
    function formatearPrecio(v) { return Number(v).toLocaleString("es-CO"); }

    function calcularPrecioFinal(p) {
        const enPromo = p.detalles?.enPromocion === true;
        const desc = p.detalles?.descuento || 0;
        return enPromo ? p.precio * (1 - desc / 100) : p.precio;
    }

    function obtenerValorCelda(p, clave) {
        switch (clave) {
            case "precio": return `$ ${formatearPrecio(calcularPrecioFinal(p))}`;
            case "activo": return p.activo ? "✅ Sí" : "❌ No";
            case "enPromocion": return p.detalles?.enPromocion === true ? "🏷️ Sí" : "No";
            case "descuento": return p.detalles?.enPromocion === true ? `${p.detalles.descuento || 0}%` : "—";
            case "cantidad": return p.cantidad ?? "—";
            case "stockMinimo": return p.stockMinimo ?? "—";
            case "descripcion": return p.descripcion ? (p.descripcion.length > 40 ? p.descripcion.substring(0, 40) + "…" : p.descripcion) : "—";
            case "fechaDeIngreso": return p.fechaDeIngreso || "—";
            default: return p[clave] ?? "—";
        }
    }

    // ============================================================
    // 📊 ESTADÍSTICAS
    // ============================================================
    function renderEstadisticas() {
        const tot = document.getElementById("stat-total");
        const pro = document.getElementById("stat-promo");
        const act = document.getElementById("stat-activos");
        if (tot) tot.textContent = productos.length;
        if (pro) pro.textContent = productos.filter(p => p.detalles?.enPromocion === true).length;
        if (act) act.textContent = productos.filter(p => p.activo).length;
    }

    // ============================================================
    // ☑️ DROPDOWN CHECKBOXES DE COLUMNAS
    // ============================================================
    function renderCheckboxesColumnas() {
        const container = document.getElementById("checkboxes-columnas");
        if (!container) return;
        container.innerHTML = "";

        columnasDisponibles.forEach(col => {
            const esFija = COLUMNAS_FIJAS.includes(col.clave);
            const isChecked = columnasVisibles.includes(col.clave);

            const item = document.createElement("label");
            item.className = `dropdown-col-item${isChecked ? " dropdown-col-item--active" : ""}${esFija ? " dropdown-col-item--locked" : ""}`;
            item.title = esFija ? "Esta columna siempre es visible" : "";

            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.checked = isChecked;
            cb.disabled = esFija;
            cb.value = col.clave;

            if (!esFija) {
                cb.addEventListener("change", () => {
                    if (cb.checked) {
                        if (!columnasVisibles.includes(col.clave)) columnasVisibles.push(col.clave);
                        item.classList.add("dropdown-col-item--active");
                    } else {
                        columnasVisibles = columnasVisibles.filter(c => c !== col.clave);
                        item.classList.remove("dropdown-col-item--active");
                    }
                    renderTabla();
                });
            }

            const lockIcon = esFija ? `<i class="bi bi-lock-fill ms-1 text-muted" style="font-size:10px;"></i>` : "";
            item.appendChild(cb);
            item.insertAdjacentHTML("beforeend", ` ${col.label}${lockIcon}`);
            container.appendChild(item);
        });
    }

    // ============================================================
    // 🔎 FILTRADO DE PRODUCTOS
    // ============================================================
    function obtenerProductosFiltrados() {
        const q = (document.getElementById("buscar-producto")?.value || "").toLowerCase();
        const cat = document.getElementById("filtro-categoria")?.value || "";

        return productos.filter(p => {
            if (!p.nombre.toLowerCase().includes(q)) return false;
            if (cat && (p.categoriaNombre || "") !== cat) return false;
            return true;
        });
    }

    // ============================================================
    // 🔍 FILA DE FILTROS
    // ============================================================
    function renderFiltrosRow() {
        const thead = document.getElementById("propiedades-producto")?.parentNode;
        if (!thead) return;

        let trFiltros = document.getElementById("filtros-producto-row");
        if (!trFiltros) {
            trFiltros = document.createElement("tr");
            trFiltros.id = "filtros-producto-row";
            thead.appendChild(trFiltros);
        }
        trFiltros.className = "tabla-filtros-row";
        trFiltros.innerHTML = "";

        const visibles = columnasDisponibles.filter(c => columnasVisibles.includes(c.clave));

        visibles.forEach(col => {
            const th = document.createElement("th");
            th.className = "th-filtro";
            let html = `<input type="text" id="fi-${col.clave}" class="table-filter-input" placeholder="Filtrar..." style="width: 100%;">`;
            th.innerHTML = html;
            trFiltros.appendChild(th);
        });

        const thBtn = document.createElement("th");
        thBtn.className = "th-filtro-accion";
        thBtn.innerHTML = `<button id="btn-limpiar-filtros" class="btn-limpiar-filtros" title="Limpiar filtros">🧹</button>`;
        trFiltros.appendChild(thBtn);

        const btnL = document.getElementById("btn-limpiar-filtros");
        if (btnL) btnL.addEventListener("click", renderTabla);
    }

    // ============================================================
    // 📊 RENDER SOLO FILAS
    // ============================================================
    function renderTablaSoloFilas() {
        const tbody = document.getElementById("filas-producto");
        if (!tbody) return;

        tbody.innerHTML = "";
        const filtrados = obtenerProductosFiltrados();

        if (filtrados.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = columnasVisibles.length + 1;
            td.className = "tabla-vacia";
            td.innerHTML = `<div class="tabla-vacia__contenido"><span class="tabla-vacia__icon">📦</span><p>No hay productos</p></div>`;
            tr.appendChild(td);
            tbody.appendChild(tr);
        } else {
            filtrados.forEach(p => {
                const idx = productos.indexOf(p);
                const tr = document.createElement("tr");
                columnasDisponibles
                    .filter(c => columnasVisibles.includes(c.clave))
                    .forEach(col => {
                        const td = document.createElement("td");
                        td.textContent = obtenerValorCelda(p, col.clave);
                        tr.appendChild(td);
                    });
                const tdAcc = document.createElement("td");
                tdAcc.innerHTML = `<button class="btn-editar" onclick="abrirModal(${idx})" title="Editar">✏️</button>`;
                tr.appendChild(tdAcc);
                tbody.appendChild(tr);
            });
        }
    }

    // ============================================================
    // 📊 RENDER TABLA COMPLETA
    // ============================================================
    function renderTabla() {
        const thead = document.getElementById("propiedades-producto");
        if (!thead) return;

        thead.innerHTML = "";
        columnasDisponibles
            .filter(c => columnasVisibles.includes(c.clave))
            .forEach(col => {
                const th = document.createElement("th");
                th.textContent = col.label;
                thead.appendChild(th);
            });
        const thAcc = document.createElement("th");
        thAcc.textContent = "Acción";
        thead.appendChild(thAcc);

        renderFiltrosRow();
        renderTablaSoloFilas();
    }

    // ============================================================
    // 📦 RENDER PEDIDOS
    // ============================================================
    async function renderPedidos() {
        const tbody = document.getElementById("filas-pedidos");
        if (!tbody) return;

        try {
            pedidos = await getPedidos() || [];
        } catch (error) {
            console.error("Error cargando pedidos:", error);
            pedidos = [];
        }

        const q = (document.getElementById("buscar-pedido")?.value || "").toLowerCase();
        const est = document.getElementById("filtro-estado-pedido")?.value || "";

        const filtrados = pedidos.filter(p => {
            const nombre = (p.clienteNombre || "").toLowerCase();
            const id = String(p.id || "");
            if (q && !nombre.includes(q) && !id.includes(q)) return false;
            if (est && p.estadoActual !== est) return false;
            return true;
        });

        const etiquetas = { PENDIENTE: "🟡 Pendiente", COMPRADO: "✅ Comprado" };

        tbody.innerHTML = "";
        if (filtrados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="tabla-vacia"><div class="tabla-vacia__contenido"><span class="tabla-vacia__icon">🧾</span><p>No hay pedidos</p></div></td></tr>`;
            return;
        }

        filtrados.forEach(p => {
            const fecha = p.creadoAt ? new Date(p.creadoAt).toLocaleDateString("es-CO") : "—";
            const total = `$ ${Number(p.total || 0).toLocaleString("es-CO")}`;
            const estado = etiquetas[p.estadoActual] || p.estadoActual || "—";
            const nDet = (p.detalles || []).length;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><span class="badge-id">#${p.id}</span></td>
                <td>${p.clienteNombre || "—"}</td>
                <td><span class="estado-badge">${estado}</span></td>
                <td class="fw-semibold text-success">${total}</td>
                <td>${fecha}</td>
                <td><span class="badge bg-secondary">${nDet} ítem(s)</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ============================================================
    // 👥 RENDER USUARIOS
    // ============================================================
    async function renderUsuarios() {
        const tbody = document.getElementById("filas-usuarios");
        if (!tbody) return;

        try {
            usuarios = await getUsuarios() || [];
        } catch (error) {
            console.error("Error cargando usuarios:", error);
            usuarios = [];
        }

        const q = (document.getElementById("buscar-usuario")?.value || "").toLowerCase();
        const rol = document.getElementById("filtro-rol-usuario")?.value || "";

        const filtrados = usuarios.filter(u => {
            const nombre = (u.nombre || "").toLowerCase();
            const email = (u.email || "").toLowerCase();
            if (q && !nombre.includes(q) && !email.includes(q)) return false;
            if (rol && (u.rol || "") !== rol) return false;
            return true;
        });

        const rolesLabel = { CLIENTE: "🛒 Cliente", ADMIN: "🛡️ Admin" };
        const estadoLabel = { ACTIVO: "✅ Activo", INACTIVO: "❌ Inactivo" };

        tbody.innerHTML = "";
        if (filtrados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="tabla-vacia"><div class="tabla-vacia__contenido"><span class="tabla-vacia__icon">👥</span><p>No hay usuarios</p></div></td></tr>`;
            return;
        }

        filtrados.forEach(u => {
            const fecha = u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleDateString("es-CO") : "—";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><span class="badge-id">#${u.id || "?"}</span></td>
                <td class="fw-semibold">${u.nombre}</td>
                <td><a href="mailto:${u.email}" class="text-decoration-none">${u.email}</a></td>
                <td>${u.telefono || "—"}</td>
                <td><span class="badge bg-primary">${rolesLabel[u.rol] || u.rol}</span></td>
                <td>${estadoLabel[u.estado] || u.estado}</td>
                <td>${fecha}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ============================================================
    // 📂 POBLAR CATEGORÍAS
    // ============================================================
    function poblarCategorias() {
        const sel = document.getElementById("filtro-categoria");
        if (!sel) return;
        const categorias = categoriasDisponibles.map(c => c.nombre);
        sel.innerHTML = '<option value="">Todas las categorías</option>' +
            categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    // ============================================================
    // ✏️ MODAL EDITAR
    // ============================================================
    window.abrirModal = function (index) {
        indexActual = index;
        const p = productos[index];
        document.getElementById("edit-nombre").value = p.nombre || "";
        document.getElementById("edit-categoria").value = p.categoriaNombre || "";
        document.getElementById("edit-precio").value = p.precio || 0;
        document.getElementById("edit-cantidad").value = p.cantidad ?? 0;
        document.getElementById("edit-stockMinimo").value = p.stockMinimo ?? 5;
        document.getElementById("edit-activo").value = p.activo ? "true" : "false";
        const enPromo = p.detalles?.enPromocion === true;
        document.getElementById("edit-promocion").checked = enPromo;
        document.getElementById("edit-descuento").value = p.detalles?.descuento || 0;
        document.getElementById("edit-descuento-group").style.display = enPromo ? "block" : "none";
        document.getElementById("modal-editar").classList.add("modal-overlay--visible");
    };

    window.cerrarModal = function () {
        document.getElementById("modal-editar").classList.remove("modal-overlay--visible");
    };

    window.eliminarProducto = async function () {
        if (indexActual === null) return;
        const p = productos[indexActual];
        const nombre = p.nombre || "este producto";
        
        if (!confirm(`¿Estás seguro de eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;

        try {
            await deleteProducto(p.id);
            productos.splice(indexActual, 1);
            indexActual = null;
            cerrarModal();
            renderTabla();
            renderEstadisticas();
            alert("Producto eliminado exitosamente");
        } catch (error) {
            const err = manejarErrorAPI(error);
            alert(`Error al eliminar: ${err.message}`);
        }
    };

    window.guardarEdicion = async function () {
        if (indexActual === null) return;
        
        const p = productos[indexActual];
        const precio = parseFloat(document.getElementById("edit-precio").value);
        const cant = parseInt(document.getElementById("edit-cantidad").value);
        const stock = parseInt(document.getElementById("edit-stockMinimo").value);
        const activo = document.getElementById("edit-activo").value === "true";
        const promo = document.getElementById("edit-promocion").checked;
        const desc = parseFloat(document.getElementById("edit-descuento").value) || 0;

        if (isNaN(precio) || precio < 0) { alert("El precio debe ser un número positivo."); return; }
        if (isNaN(cant) || cant < 0) { alert("La cantidad no puede ser negativa."); return; }
        if (isNaN(stock) || stock < 0) { alert("El stock mínimo no puede ser negativo."); return; }

        try {
            // Actualizar en la API
            await updateProducto(p.id, {
                precio,
                cantidad: cant,
                stockMinimo: stock,
                activo,
                enPromocion: promo
            });

            // Actualizar objeto local
            p.precio = precio;
            p.cantidad = cant;
            p.stockMinimo = stock;
            p.activo = activo;
            p.enPromocion = promo;
            if (p.detalles) {
                p.detalles.enPromocion = promo;
                p.detalles.descuento = promo && desc >= 1 && desc <= 100 ? desc : 0;
            }

            cerrarModal();
            renderTabla();
            renderEstadisticas();
            alert("Producto actualizado exitosamente");
        } catch (error) {
            const err = manejarErrorAPI(error);
            alert(`Error al actualizar: ${err.message}`);
        }
    };

    // ============================================================
    // 🎧 EVENTOS
    // ============================================================
    const inputBuscar = document.getElementById("buscar-producto");
    if (inputBuscar) inputBuscar.addEventListener("input", renderTabla);

    const selCat = document.getElementById("filtro-categoria");
    if (selCat) selCat.addEventListener("change", renderTabla);

    const cbPromo = document.getElementById("edit-promocion");
    if (cbPromo) cbPromo.addEventListener("change", e => {
        document.getElementById("edit-descuento-group").style.display = e.target.checked ? "block" : "none";
    });

    const inputPedido = document.getElementById("buscar-pedido");
    if (inputPedido) inputPedido.addEventListener("input", renderPedidos);
    const selEstado = document.getElementById("filtro-estado-pedido");
    if (selEstado) selEstado.addEventListener("change", renderPedidos);

    const inputUsuario = document.getElementById("buscar-usuario");
    if (inputUsuario) inputUsuario.addEventListener("input", renderUsuarios);
    const selRol = document.getElementById("filtro-rol-usuario");
    if (selRol) selRol.addEventListener("change", renderUsuarios);

    // ============================================================
    // ⏱️ INICIALIZAR
    // ============================================================
    renderCheckboxesColumnas();
    poblarCategorias();
    renderTabla();
    renderEstadisticas();
}