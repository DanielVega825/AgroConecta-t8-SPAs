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
                                <option value="EN_PROCESO">🔵 En proceso</option>
                                <option value="ENVIADO">🚚 Enviado</option>
                                <option value="ENTREGADO">✅ Entregado</option>
                                <option value="CANCELADO">❌ Cancelado</option>
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
                                <option value="EMPLEADO">Empleado</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                        <div class="tabla-contenedor table-responsive shadow-sm rounded bg-white p-2">
                            <table class="table table-striped table-hover table-bordered align-middle mb-0">
                                <thead class="table-dark">
                                    <tr>
                                        <th>#ID</th><th>Nombre</th><th>Email</th>
                                        <th>Teléfono</th><th>Rol</th><th>Activo</th><th>Info Extra</th>
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
                                <button class="modal-btn modal-btn--delete" onclick="eliminarProducto()">🗑️ Eliminar</button>
                            </div>
                        </div>
                    </div>
                </section>
        </section>  
    `;
}

export function gestionPanel() {

    // ============================================================
    // 📦 DATOS
    // ============================================================
    let productos = JSON.parse(localStorage.getItem("listaProducts")) || [];
    let pedidos = JSON.parse(localStorage.getItem("listaPedidos")) || [];
    let usuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    let indexActual = null;

    // ============================================================
    // 🏷️ DEFINICIÓN DE COLUMNAS — nombre y activo siempre fijas
    // ============================================================
    const COLUMNAS_FIJAS = ["nombre", "activo"];

    const columnasDisponibles = [
        { clave: "nombre", label: "Producto", tipo: "texto" },
        { clave: "categoriaId", label: "Categoría", tipo: "categoria" },
        { clave: "precio", label: "Precio", tipo: "numero" },
        { clave: "cantidad", label: "Cantidad", tipo: "numero" },
        { clave: "stockMinimo", label: "Stock Mín.", tipo: "numero" },
        { clave: "activo", label: "Activo", tipo: "booleano" },
        { clave: "enPromocion", label: "Promoción", tipo: "booleano" },
        { clave: "descuento", label: "Descuento", tipo: "numero" },
        { clave: "descripcion", label: "Descripción", tipo: "texto" },
        { clave: "fechaDeIngreso", label: "Fecha Ingreso", tipo: "fecha" },
    ];

    let columnasVisibles = ["nombre", "categoriaId", "precio", "cantidad", "stockMinimo", "activo", "enPromocion", "descuento"];

    const filtrosActivos = {
        nombre: "", categoriaId: "",
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
    window.cambiarTab = function (tab) {
        ["productos", "pedidos", "usuarios"].forEach(t => {
            const sec = document.getElementById(`seccion-${t}`);
            const btn = document.getElementById(`tab-${t}`);
            if (sec) sec.style.display = t === tab ? "" : "none";
            if (btn) btn.classList.toggle("panel-tab--active", t === tab);
        });
        if (tab === "pedidos") renderPedidos();
        if (tab === "usuarios") renderUsuarios();
    };
    function cargarPedidos() {

        const pedidos =
            JSON.parse(localStorage.getItem("listaPedidos")) || [];

        const filasPedidos =
            document.getElementById("filas-pedidos");

        if (!filasPedidos) return;

        filasPedidos.innerHTML = "";

        if (pedidos.length === 0) {

            filasPedidos.innerHTML = `
         <tr>
            <td colspan="6" class="text-center p-4">
               No hay pedidos registrados
            </td>
         </tr>
      `;

            return;
        }

        pedidos.forEach((pedido) => {

            filasPedidos.innerHTML += `
         <tr>

            <td>#${pedido.id}</td>

            <td>
               <strong>${pedido.cliente}</strong>
               <br>
               <small>${pedido.email}</small>
            </td>

            <td>
               <span class="badge bg-warning text-dark">
                  ${pedido.estado}
               </span>
            </td>

            <td>
               ${pedido.total.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP'
            })}
            </td>

            <td>${pedido.fecha}</td>

            <td>
               <button
                  class="btn btn-success btn-sm"
                  onclick='verPedido(${JSON.stringify(pedido)})'
               >
                  Ver
               </button>
            </td>

         </tr>
      `;
        });
    }
    window.verPedido = function (pedido) {

        let productosHTML = "";

        pedido.productos.forEach((p) => {

            productosHTML += `
         • ${p.nombre}
         | Cantidad: ${p.cantidad}
         | Precio: ${p.precio}
      <br>
      `;
        });

        alert(`
Pedido de: ${pedido.cliente}

Productos:
${productosHTML}

Total:
${pedido.total.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        })}
   `);
    };
    function cargarUsuarios() {

        const usuarios =
            JSON.parse(localStorage.getItem("listaUsuarios")) || [];

        const filasUsuarios =
            document.getElementById("filas-usuarios");

        if (!filasUsuarios) return;

        filasUsuarios.innerHTML = "";

        if (usuarios.length === 0) {

            filasUsuarios.innerHTML = `
         <tr>
            <td colspan="7" class="text-center p-4">
               No hay usuarios registrados
            </td>
         </tr>
      `;

            return;
        }

        usuarios.forEach((usuario, index) => {

            filasUsuarios.innerHTML += `
         <tr>

            <td>${index + 1}</td>

            <td>${usuario.nombre}</td>

            <td>${usuario.email}</td>

            <td>${usuario.telefono || "No registrado"}</td>

            <td>
               <span class="badge bg-primary">
                  ${usuario.role || "CLIENTE"}
               </span>
            </td>

            <td>
               <span class="text-success fw-bold">
                  Activo
               </span>
            </td>

            <td>
               Usuario registrado correctamente
            </td>

         </tr>
      `;
        });
    }
    // ============================================================
    // 🔽 DROPDOWN COLUMNAS
    // ============================================================
    window.toggleDropdownColumnas = function () {
        const menu = document.getElementById("menu-columnas");
        if (!menu) return;
        const isOpen = menu.style.display !== "none";
        menu.style.display = isOpen ? "none" : "block";
    };

    // Cerrar dropdown al hacer click fuera
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
        const enPromo = p.enPromocion || (p.detalles && p.detalles.enPromocion);
        const desc = p.descuento || (p.detalles && p.detalles.porcentajeDescuento) || 0;
        return enPromo ? p.precio * (1 - desc / 100) : p.precio;
    }

    function obtenerValorCelda(p, clave) {
        switch (clave) {
            case "precio": return `$ ${formatearPrecio(calcularPrecioFinal(p))}`;
            case "activo": return p.activo ? "✅ Sí" : "❌ No";
            case "enPromocion": {
                const e = p.enPromocion || (p.detalles && p.detalles.enPromocion);
                return e ? "🏷️ Sí" : "No";
            }
            case "descuento": {
                const e = p.enPromocion || (p.detalles && p.detalles.enPromocion);
                const d = p.descuento || (p.detalles && p.detalles.porcentajeDescuento) || 0;
                return e ? `${d}%` : "—";
            }
            case "cantidad": return p.cantidad ?? "—";
            case "stockMinimo": return p.stockMinimo ?? "—";
            case "descripcion": return p.descripcion
                ? (p.descripcion.length > 40 ? p.descripcion.substring(0, 40) + "…" : p.descripcion)
                : "—";
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
        if (pro) pro.textContent = productos.filter(p => p.enPromocion || (p.detalles && p.detalles.enPromocion)).length;
        if (act) act.textContent = productos.filter(p => p.activo).length;
    }

    // ============================================================
    // ☑️ DROPDOWN CHECKBOXES DE COLUMNAS (con columnas fijas bloqueadas)
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
            if (cat && (p.categoriaId || "") !== cat) return false;

            for (const col of columnasDisponibles) {
                const clave = col.clave;
                const f = filtrosActivos[clave];
                if (!columnasVisibles.includes(clave)) continue;

                if (clave === "nombre" || clave === "descripcion") {
                    if (f && !(p[clave] || "").toLowerCase().includes(f.toLowerCase())) return false;
                } else if (clave === "tipoProducto") {
                    if (f && (p.tipoProducto || "") !== f) return false;
                } else if (clave === "activo") {
                    if (f !== "" && p.activo !== (f === "true")) return false;
                } else if (clave === "enPromocion") {
                    if (f !== "") {
                        const pv = p.enPromocion || (p.detalles && p.detalles.enPromocion) || false;
                        if (pv !== (f === "true")) return false;
                    }
                } else if (["precio", "cantidad", "stockMinimo", "descuento"].includes(clave)) {
                    if (f && f.valor !== "") {
                        const fv = parseFloat(f.valor);
                        let pv = clave === "precio" ? calcularPrecioFinal(p)
                            : clave === "descuento" ? (p.descuento || (p.detalles && p.detalles.porcentajeDescuento) || 0)
                                : (p[clave] ?? 0);
                        if (f.operacion === ">=" && !(pv >= fv)) return false;
                        if (f.operacion === "<=" && !(pv <= fv)) return false;
                        if (f.operacion === "=" && pv !== fv) return false;
                    }
                } else if (clave === "fechaDeIngreso") {
                    if (f && !(p.fechaDeIngreso || "").startsWith(f)) return false;
                }
            }
            return true;
        });
    }

    // ============================================================
    // 🔍 FILA DE FILTROS (segunda fila del thead)
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
            let html = "";

            if (col.clave === "nombre" || col.clave === "descripcion") {
                html = `<input type="text" id="fi-${col.clave}" class="table-filter-input" placeholder="Buscar..." value="${filtrosActivos[col.clave] || ''}">`;
            } else if (col.clave === "tipoProducto") {
                const tipos = [...new Set(productos.map(p => p.tipoProducto).filter(Boolean))];
                html = `<select id="fi-${col.clave}" class="table-filter-select"><option value="">Todos</option>${tipos.map(t => `<option value="${t}" ${filtrosActivos[col.clave] === t ? "selected" : ""}>${t}</option>`).join("")}</select>`;
            } else if (["precio", "cantidad", "stockMinimo", "descuento"].includes(col.clave)) {
                const f = filtrosActivos[col.clave];
                html = `<div class="filter-number-group"><select id="fo-${col.clave}" class="table-filter-operator"><option value=">=" ${f.operacion === ">=" ? "selected" : ""}>≥</option><option value="<=" ${f.operacion === "<=" ? "selected" : ""}>≤</option><option value="=" ${f.operacion === "=" ? "selected" : ""}}>=</option></select><input type="number" id="fv-${col.clave}" class="table-filter-input-number" placeholder="Val" value="${f.valor || ''}"></div>`;
            } else if (col.clave === "activo" || col.clave === "enPromocion") {
                const v = filtrosActivos[col.clave];
                html = `<select id="fi-${col.clave}" class="table-filter-select"><option value="">Todos</option><option value="true" ${v === "true" ? "selected" : ""}>Sí</option><option value="false" ${v === "false" ? "selected" : ""}>No</option></select>`;
            } else if (col.clave === "fechaDeIngreso") {
                html = `<input type="date" id="fi-${col.clave}" class="table-filter-date" value="${filtrosActivos[col.clave] || ''}">`;
            }

            th.innerHTML = html;
            trFiltros.appendChild(th);
        });

        // Botón limpiar
        const thBtn = document.createElement("th");
        thBtn.className = "th-filtro-accion";
        thBtn.innerHTML = `<button id="btn-limpiar-filtros" class="btn-limpiar-filtros" title="Limpiar filtros">🧹</button>`;
        trFiltros.appendChild(thBtn);

        // Bind eventos
        visibles.forEach(col => {
            const clave = col.clave;
            if (["nombre", "descripcion", "fechaDeIngreso"].includes(clave)) {
                const el = document.getElementById(`fi-${clave}`);
                if (el) el.addEventListener("input", e => { filtrosActivos[clave] = e.target.value; renderTablaSoloFilas(); });
            } else if (["tipoProducto", "activo", "enPromocion"].includes(clave)) {
                const el = document.getElementById(`fi-${clave}`);
                if (el) el.addEventListener("change", e => { filtrosActivos[clave] = e.target.value; renderTablaSoloFilas(); });
            } else if (["precio", "cantidad", "stockMinimo", "descuento"].includes(clave)) {
                const op = document.getElementById(`fo-${clave}`);
                const vl = document.getElementById(`fv-${clave}`);
                if (op) op.addEventListener("change", e => { filtrosActivos[clave].operacion = e.target.value; renderTablaSoloFilas(); });
                if (vl) vl.addEventListener("input", e => { filtrosActivos[clave].valor = e.target.value; renderTablaSoloFilas(); });
            }
        });

        const btnL = document.getElementById("btn-limpiar-filtros");
        if (btnL) btnL.addEventListener("click", () => {
            Object.keys(filtrosActivos).forEach(k => {
                if (typeof filtrosActivos[k] === "object") { filtrosActivos[k].valor = ""; filtrosActivos[k].operacion = ">="; }
                else filtrosActivos[k] = "";
            });
            renderTabla();
        });
    }

    // ============================================================
    // 📊 RENDER SOLO FILAS
    // ============================================================
    function renderTablaSoloFilas() {
        const tbody = document.getElementById("filas-producto");
        if (!tbody) return;

        const focusId = document.activeElement?.id || null;
        const selStart = document.activeElement?.selectionStart ?? null;
        const selEnd = document.activeElement?.selectionEnd ?? null;

        tbody.innerHTML = "";
        const filtrados = obtenerProductosFiltrados();

        if (filtrados.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = columnasVisibles.length + 1;
            td.className = "tabla-vacia";
            td.innerHTML = `<div class="tabla-vacia__contenido"><span class="tabla-vacia__icon">📦</span><p>No hay productos que coincidan</p></div>`;
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

        if (focusId) {
            const el = document.getElementById(focusId);
            if (el) { el.focus(); try { if (selStart !== null) el.setSelectionRange(selStart, selEnd); } catch (_) { } }
        }
    }

    // ============================================================
    // 📊 RENDER TABLA COMPLETA (headers + filtros + filas)
    // ============================================================
    function renderTabla() {
        const thead = document.getElementById("propiedades-producto");
        if (!thead) return;

        const focusId = document.activeElement?.id || null;
        const selStart = document.activeElement?.selectionStart ?? null;
        const selEnd = document.activeElement?.selectionEnd ?? null;

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

        if (focusId) {
            const el = document.getElementById(focusId);
            if (el) { el.focus(); try { if (selStart !== null) el.setSelectionRange(selStart, selEnd); } catch (_) { } }
        }
    }

    // ============================================================
    // 📦 RENDER PEDIDOS
    // ============================================================
    function renderPedidos() {
        const tbody = document.getElementById("filas-pedidos");
        if (!tbody) return;

        const q = (document.getElementById("buscar-pedido")?.value || "").toLowerCase();
        const est = document.getElementById("filtro-estado-pedido")?.value || "";

        const filtrados = pedidos.filter(p => {
            const nombre = (p.clienteNombre || "").toLowerCase();
            const id = String(p.id || "");
            if (q && !nombre.includes(q) && !id.includes(q)) return false;
            if (est && p.estadoActual !== est) return false;
            return true;
        });

        const etiquetas = { PENDIENTE: "🟡 Pendiente", EN_PROCESO: "🔵 En proceso", ENVIADO: "🚚 Enviado", ENTREGADO: "✅ Entregado", CANCELADO: "❌ Cancelado" };

        tbody.innerHTML = "";
        if (filtrados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="tabla-vacia"><div class="tabla-vacia__contenido"><span class="tabla-vacia__icon">🧾</span><p>No hay pedidos registrados</p></div></td></tr>`;
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
                <td><span class="estado-badge estado-${(p.estadoActual || "").toLowerCase()}">${estado}</span></td>
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
    function renderUsuarios() {
        const tbody = document.getElementById("filas-usuarios");
        if (!tbody) return;

        const q = (document.getElementById("buscar-usuario")?.value || "").toLowerCase();
        const rol = document.getElementById("filtro-rol-usuario")?.value || "";

        const filtrados = usuarios.filter(u => {
            const nombre = (u.name || "").toLowerCase();
            const email = (u.email || "").toLowerCase();
            if (q && !nombre.includes(q) && !email.includes(q)) return false;
            if (rol && (u.rol || "") !== rol) return false;
            return true;
        });

        const rolesLabel = { CLIENTE: "🛒 Cliente", EMPLEADO: "👷 Empleado", ADMIN: "🛡️ Admin" };

        tbody.innerHTML = "";
        if (filtrados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="tabla-vacia"><div class="tabla-vacia__contenido"><span class="tabla-vacia__icon">👥</span><p>No hay usuarios registrados</p></div></td></tr>`;
            return;
        }

        filtrados.forEach(u => {
            const extra = u.rol === "CLIENTE"
                ? `<span class="badge bg-info text-dark">${(u.pedidos || []).length} pedido(s)</span>`
                : `<span class="badge bg-warning text-dark">${u.area || "—"} · ${u.turno || "—"}</span>`;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><span class="badge-id">#${u.clienteId || "?"}</span></td>
                <td class="fw-semibold">${u.name}</td>
                <td><a href="mailto:${u.email}" class="text-decoration-none">${u.email}</a></td>
                <td>${u.telefono || "—"}</td>
                <td><span class="badge bg-primary">${rolesLabel[u.rol] || u.rol}</span></td>
                <td>${u.activo ? "✅ Sí" : "❌ No"}</td>
                <td>${extra}</td>
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
        const tipos = [...new Set(productos.map(p => p.tipoProducto).filter(Boolean))];
        tipos.forEach(t => {
            const o = document.createElement("option");
            o.value = t; o.textContent = t;
            sel.appendChild(o);
        });
    }

    // ============================================================
    // ✏️ MODAL EDITAR
    // ============================================================
    window.abrirModal = function (index) {
        indexActual = index;
        const p = productos[index];
        document.getElementById("edit-nombre").value = p.nombre || "";
        document.getElementById("edit-tipo").value = p.tipoProducto || "";
        document.getElementById("edit-precio").value = p.precio || 0;
        document.getElementById("edit-cantidad").value = p.cantidad ?? 0;
        document.getElementById("edit-stockMinimo").value = p.stockMinimo ?? 5;
        document.getElementById("edit-activo").value = p.activo ? "true" : "false";
        const enPromo = p.enPromocion || (p.detalles && p.detalles.enPromocion) || false;
        document.getElementById("edit-promocion").checked = enPromo;
        document.getElementById("edit-descuento").value = p.descuento || (p.detalles && p.detalles.porcentajeDescuento) || 0;
        document.getElementById("edit-descuento-group").style.display = enPromo ? "block" : "none";
        document.getElementById("modal-editar").classList.add("modal-overlay--visible");
    };

    window.cerrarModal = function () {
        document.getElementById("modal-editar").classList.remove("modal-overlay--visible");
    };

    window.eliminarProducto = function () {
        if (indexActual === null) return;
        const nombre = productos[indexActual]?.nombre || "este producto";
        if (!confirm(`¿Estás seguro de eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
        productos.splice(indexActual, 1);
        localStorage.setItem("listaProducts", JSON.stringify(productos));
        indexActual = null;
        cerrarModal();
        renderTabla();
        renderEstadisticas();
    };

    window.guardarEdicion = function () {
        const p = productos[indexActual];
        const precio = parseFloat(document.getElementById("edit-precio").value);
        const cant = parseInt(document.getElementById("edit-cantidad").value);
        const stock = parseInt(document.getElementById("edit-stockMinimo").value);

        if (isNaN(precio) || precio < 0) { alert("El precio debe ser un número positivo."); return; }
        if (isNaN(cant) || cant < 0) { alert("La cantidad no puede ser negativa."); return; }
        if (isNaN(stock) || stock < 0) { alert("El stock mínimo no puede ser negativo."); return; }
        const activo = document.getElementById("edit-activo").value === "true";
        const promo = document.getElementById("edit-promocion").checked;
        const desc = document.getElementById("edit-descuento").value;

        if (!isNaN(precio)) p.precio = precio;
        if (!isNaN(cant)) p.cantidad = cant;
        if (!isNaN(stock)) p.stockMinimo = stock;
        p.activo = activo;
        p.enPromocion = promo;
        if (p.detalles) p.detalles.enPromocion = promo;

        if (promo && desc >= 1 && desc <= 100) {
            p.descuento = Number(desc);
            if (p.detalles) p.detalles.porcentajeDescuento = Number(desc);
        } else {
            p.descuento = 0;
            if (p.detalles) p.detalles.porcentajeDescuento = 0;
        }

        localStorage.setItem("listaProducts", JSON.stringify(productos));
        cerrarModal();
        renderTabla();
        renderEstadisticas();
    };

    // ============================================================
    // 🎧 EVENTOS GENERALES
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
>>>>>>>>> Temporary merge branch 2
    renderCheckboxesColumnas();
    poblarCategorias();
    renderTabla();
    renderEstadisticas();
}
