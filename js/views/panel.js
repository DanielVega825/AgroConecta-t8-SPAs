export function Panel() {
    window.irAgregarProducto = function () {
        window.location.hash = '#/addProduct';
    };

    return `
    <section class="panel-admin">

        <!-- ── SIDEBAR ──────────────────────────────────────────────── -->
        <aside class="panel-sidebar">
            <div class="panel-sidebar__brand">
                <i class="bi bi-leaf-fill text-success fs-4"></i>
                <span>AgroConecta</span>
            </div>

            <nav class="panel-sidebar__nav">
                <button class="panel-nav-item active" data-tab="productos">
                    <i class="bi bi-box-seam"></i>
                    <span>Productos</span>
                </button>
                <button class="panel-nav-item" data-tab="pedidos">
                    <i class="bi bi-bag-check"></i>
                    <span>Pedidos</span>
                </button>
                <button class="panel-nav-item" data-tab="usuarios">
                    <i class="bi bi-people"></i>
                    <span>Usuarios</span>
                </button>
                <button class="panel-nav-item" data-tab="reportes">
                    <i class="bi bi-bar-chart-line"></i>
                    <span>Reportes</span>
                </button>
            </nav>

            <div class="panel-sidebar__footer">
                <button id="panelLogoutBtn" class="panel-logout-btn">
                    <i class="bi bi-box-arrow-left"></i>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>

        <!-- ── MAIN CONTENT ─────────────────────────────────────────── -->
        <main class="panel-main">

            <!-- Header del panel -->
            <header class="panel-topbar">
                <div class="panel-topbar__title">
                    <h1 id="panel-page-title">Gestión de Productos</h1>
                    <p id="panel-page-sub" class="text-muted mb-0">Administra el inventario del catálogo</p>
                </div>
                <div class="panel-topbar__actions">
                    <div class="panel-admin-badge">
                        <i class="bi bi-shield-check text-success"></i>
                        <span>Administrador</span>
                    </div>
                </div>
            </header>

            <!-- Estadísticas -->
            <section class="panel-stats" id="panel-stats">
                <div class="panel-stat-card">
                    <div class="panel-stat-card__icon panel-stat-card__icon--green">
                        <i class="bi bi-box-seam"></i>
                    </div>
                    <div>
                        <p class="panel-stat-card__label">Total Productos</p>
                        <span class="panel-stat-card__value" id="stat-total">0</span>
                    </div>
                </div>
                <div class="panel-stat-card">
                    <div class="panel-stat-card__icon panel-stat-card__icon--yellow">
                        <i class="bi bi-tag"></i>
                    </div>
                    <div>
                        <p class="panel-stat-card__label">En Promoción</p>
                        <span class="panel-stat-card__value" id="stat-promo">0</span>
                    </div>
                </div>
                <div class="panel-stat-card">
                    <div class="panel-stat-card__icon panel-stat-card__icon--blue">
                        <i class="bi bi-check-circle"></i>
                    </div>
                    <div>
                        <p class="panel-stat-card__label">Activos</p>
                        <span class="panel-stat-card__value" id="stat-activos">0</span>
                    </div>
                </div>
                <div class="panel-stat-card">
                    <div class="panel-stat-card__icon panel-stat-card__icon--red">
                        <i class="bi bi-exclamation-triangle"></i>
                    </div>
                    <div>
                        <p class="panel-stat-card__label">Stock Bajo</p>
                        <span class="panel-stat-card__value" id="stat-stock-bajo">0</span>
                    </div>
                </div>
            </section>

            <!-- ── TAB: PRODUCTOS ──────────────────────────────────── -->
            <section class="panel-tab active" id="tab-productos">
                <div class="panel-card">
                    <div class="panel-card__toolbar">
                        <div class="panel-card__toolbar-left">
                            <div class="panel-search-wrapper">
                                <i class="bi bi-search panel-search-icon"></i>
                                <input type="search" id="buscar-producto" class="panel-search" placeholder="Buscar producto...">
                            </div>
                            <select id="filtro-categoria" class="panel-select">
                                <option value="">Todas las categorías</option>
                            </select>
                        </div>
                        <div class="panel-card__toolbar-right">
                            <button class="panel-btn panel-btn--primary" onclick="irAgregarProducto()">
                                <i class="bi bi-plus-lg"></i> Agregar Producto
                            </button>
                        </div>
                    </div>

                    <!-- Filtro columnas -->
                    <div class="panel-col-filter">
                        <span class="panel-col-filter__label">
                            <i class="bi bi-layout-three-columns"></i> Columnas:
                        </span>
                        <div id="checkboxes-columnas" class="panel-col-filter__checks"></div>
                    </div>

                    <!-- Tabla -->
                    <div class="panel-table-wrapper">
                        <table class="panel-table">
                            <thead>
                                <tr id="propiedades-producto"></tr>
                            </thead>
                            <tbody id="filas-producto"></tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- ── TAB: PEDIDOS ───────────────────────────────────── -->
            <section class="panel-tab" id="tab-pedidos">
                <div class="panel-card">
                    <div class="panel-card__toolbar">
                        <div class="panel-card__toolbar-left">
                            <div class="panel-search-wrapper">
                                <i class="bi bi-search panel-search-icon"></i>
                                <input type="search" id="buscar-pedido" class="panel-search" placeholder="Buscar por cliente o ID...">
                            </div>
                            <select id="filtro-estado-pedido" class="panel-select">
                                <option value="">Todos los estados</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="procesando">Procesando</option>
                                <option value="enviado">Enviado</option>
                                <option value="entregado">Entregado</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>

                    <div class="panel-table-wrapper">
                        <table class="panel-table">
                            <thead>
                                <tr>
                                    <th>ID Pedido</th>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Productos</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="filas-pedidos">
                            </tbody>
                        </table>
                    </div>

                    <div id="pedidos-empty" class="panel-empty-state">
                        <i class="bi bi-bag-x panel-empty-state__icon"></i>
                        <h4>No hay pedidos registrados</h4>
                        <p class="text-muted">Cuando los clientes realicen compras, aparecerán aquí.</p>
                    </div>
                </div>
            </section>

            <!-- ── TAB: USUARIOS ──────────────────────────────────── -->
            <section class="panel-tab" id="tab-usuarios">
                <div class="panel-card">
                    <div class="panel-card__toolbar">
                        <div class="panel-card__toolbar-left">
                            <div class="panel-search-wrapper">
                                <i class="bi bi-search panel-search-icon"></i>
                                <input type="search" id="buscar-usuario" class="panel-search" placeholder="Buscar por nombre o correo...">
                            </div>
                            <select id="filtro-rol" class="panel-select">
                                <option value="">Todos los roles</option>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                        </div>
                    </div>

                    <div class="panel-table-wrapper">
                        <table class="panel-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Fecha Registro</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="filas-usuarios"></tbody>
                        </table>
                    </div>

                    <div id="usuarios-empty" class="panel-empty-state">
                        <i class="bi bi-people panel-empty-state__icon"></i>
                        <h4>No hay usuarios registrados</h4>
                        <p class="text-muted">Los usuarios que se registren en la plataforma aparecerán aquí.</p>
                    </div>
                </div>
            </section>

            <!-- ── TAB: REPORTES ──────────────────────────────────── -->
            <section class="panel-tab" id="tab-reportes">

                <div class="panel-reportes-grid">
                    <!-- Resumen de ventas -->
                    <div class="panel-card panel-reporte-card">
                        <h3 class="panel-card__title">
                            <i class="bi bi-currency-dollar text-success"></i> Resumen de Ventas
                        </h3>
                        <div class="panel-reporte-stats">
                            <div class="panel-reporte-stat">
                                <span class="panel-reporte-stat__val" id="rpt-ingresos">$ 0</span>
                                <span class="panel-reporte-stat__label">Ingresos Totales</span>
                            </div>
                            <div class="panel-reporte-stat">
                                <span class="panel-reporte-stat__val" id="rpt-pedidos">0</span>
                                <span class="panel-reporte-stat__label">Pedidos Totales</span>
                            </div>
                            <div class="panel-reporte-stat">
                                <span class="panel-reporte-stat__val" id="rpt-ticket">$ 0</span>
                                <span class="panel-reporte-stat__label">Ticket Promedio</span>
                            </div>
                        </div>
                    </div>

                    <!-- Inventario por categoría -->
                    <div class="panel-card panel-reporte-card">
                        <h3 class="panel-card__title">
                            <i class="bi bi-pie-chart text-warning"></i> Inventario por Categoría
                        </h3>
                        <div id="rpt-categorias" class="panel-reporte-categorias"></div>
                    </div>

                    <!-- Top productos -->
                    <div class="panel-card panel-reporte-card panel-reporte-card--full">
                        <h3 class="panel-card__title">
                            <i class="bi bi-trophy text-warning"></i> Productos en Inventario
                        </h3>
                        <div class="panel-table-wrapper">
                            <table class="panel-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody id="rpt-tabla-productos"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Alertas de stock -->
                    <div class="panel-card panel-reporte-card">
                        <h3 class="panel-card__title">
                            <i class="bi bi-exclamation-triangle text-danger"></i> Alertas de Stock
                        </h3>
                        <div id="rpt-alertas" class="panel-reporte-alertas"></div>
                    </div>
                </div>
            </section>

        </main>

        <!-- ── MODAL EDITAR PRODUCTO ──────────────────────────────── -->
        <div id="modal-editar" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="bi bi-pencil-square me-2"></i>Editar Producto</h3>
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
                    <button class="modal-btn modal-btn--save" onclick="guardarEdicion()">
                        <i class="bi bi-floppy me-1"></i> Guardar
                    </button>
                    <button class="modal-btn modal-btn--cancel" onclick="cerrarModal()">Cancelar</button>
                </div>
            </div>
        </div>

    </section>
    `;
}

export function gestionPanel() {

    // ── DATOS ──────────────────────────────────────────────────────────────
    let productos = JSON.parse(localStorage.getItem('listaProducts')) || [];
    let indexActual = null;

    // ── NAVEGACIÓN ENTRE PESTAÑAS ──────────────────────────────────────────
    const navItems = document.querySelectorAll('.panel-nav-item');
    const tabs = document.querySelectorAll('.panel-tab');
    const pageTitle = document.getElementById('panel-page-title');
    const pageSub = document.getElementById('panel-page-sub');
    const statsSection = document.getElementById('panel-stats');

    const tabMeta = {
        productos: {
            title: 'Gestión de Productos',
            sub: 'Administra el inventario del catálogo',
            stats: true,
        },
        pedidos: {
            title: 'Gestión de Pedidos',
            sub: 'Revisa y administra los pedidos de los clientes',
            stats: false,
        },
        usuarios: {
            title: 'Gestión de Usuarios',
            sub: 'Administra las cuentas registradas en la plataforma',
            stats: false,
        },
        reportes: {
            title: 'Reportes y Estadísticas',
            sub: 'Visualiza el desempeño del negocio',
            stats: false,
        },
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.tab;

            navItems.forEach(n => n.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(`tab-${target}`)?.classList.add('active');

            if (pageTitle) pageTitle.textContent = tabMeta[target].title;
            if (pageSub) pageSub.textContent = tabMeta[target].sub;
            if (statsSection) {
                statsSection.style.display = tabMeta[target].stats ? 'grid' : 'none';
            }

            if (target === 'pedidos') renderPedidos();
            if (target === 'usuarios') renderUsuarios();
            if (target === 'reportes') renderReportes();
        });
    });

    // ── LOGOUT ─────────────────────────────────────────────────────────────
    const logoutBtn = document.getElementById('panelLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userLogged');
            window.location.hash = '#/';
        });
    }

    // ── COLUMNAS DISPONIBLES ───────────────────────────────────────────────
    const columnasDisponibles = [
        { clave: 'nombre', label: 'Producto' },
        { clave: 'tipoProducto', label: 'Tipo' },
        { clave: 'precio', label: 'Precio' },
        { clave: 'cantidad', label: 'Cantidad' },
        { clave: 'stockMinimo', label: 'Stock Mín.' },
        { clave: 'activo', label: 'Activo' },
        { clave: 'enPromocion', label: 'Promoción' },
        { clave: 'descuento', label: 'Descuento' },
        { clave: 'descripcion', label: 'Descripción' },
        { clave: 'fechaDeIngreso', label: 'Fecha Ingreso' },
    ];

    let columnasVisibles = ['nombre', 'tipoProducto', 'precio', 'cantidad', 'stockMinimo', 'activo', 'enPromocion', 'descuento'];

    // ── UTILIDADES ─────────────────────────────────────────────────────────
    function formatearPrecio(valor) {
        return Number(valor).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
    }

    function calcularPrecioFinal(producto) {
        const enPromo = producto.enPromocion || (producto.detalles?.enPromocion);
        const descuento = producto.descuento || (producto.detalles?.porcentajeDescuento) || 0;
        if (!enPromo) return producto.precio;
        return producto.precio * (1 - descuento / 100);
    }

    function obtenerValorCelda(producto, clave) {
        switch (clave) {
            case 'precio':
                return formatearPrecio(calcularPrecioFinal(producto));
            case 'activo':
                return producto.activo
                    ? '<span class="panel-badge panel-badge--green">Activo</span>'
                    : '<span class="panel-badge panel-badge--gray">Inactivo</span>';
            case 'enPromocion': {
                const enPromo = producto.enPromocion || (producto.detalles?.enPromocion);
                return enPromo
                    ? '<span class="panel-badge panel-badge--yellow">Sí</span>'
                    : '<span class="panel-badge panel-badge--gray">No</span>';
            }
            case 'descuento': {
                const enPromo = producto.enPromocion || (producto.detalles?.enPromocion);
                const desc = producto.descuento || (producto.detalles?.porcentajeDescuento) || 0;
                return enPromo ? `<span class="panel-badge panel-badge--yellow">${desc}%</span>` : '—';
            }
            case 'cantidad': {
                const qty = producto.cantidad ?? 0;
                const min = producto.stockMinimo ?? 5;
                if (qty === 0) return `<span class="panel-badge panel-badge--red">${qty} (Agotado)</span>`;
                if (qty <= min) return `<span class="panel-badge panel-badge--orange">${qty} (Bajo)</span>`;
                return qty;
            }
            case 'stockMinimo':
                return producto.stockMinimo ?? '—';
            case 'descripcion':
                return producto.descripcion
                    ? (producto.descripcion.length > 40 ? producto.descripcion.substring(0, 40) + '…' : producto.descripcion)
                    : '—';
            case 'fechaDeIngreso':
                return producto.fechaDeIngreso || '—';
            default:
                return producto[clave] ?? '—';
        }
    }

    // ── ESTADÍSTICAS ───────────────────────────────────────────────────────
    function renderEstadisticas() {
        const totalEl = document.getElementById('stat-total');
        const promoEl = document.getElementById('stat-promo');
        const activosEl = document.getElementById('stat-activos');
        const stockBajoEl = document.getElementById('stat-stock-bajo');

        if (totalEl) totalEl.textContent = productos.length;
        if (promoEl) promoEl.textContent = productos.filter(p => p.enPromocion || p.detalles?.enPromocion).length;
        if (activosEl) activosEl.textContent = productos.filter(p => p.activo).length;
        if (stockBajoEl) stockBajoEl.textContent = productos.filter(p => (p.cantidad ?? 0) <= (p.stockMinimo ?? 5) && (p.cantidad ?? 0) > 0).length;
    }

    // ── CHECKBOXES DE COLUMNAS ─────────────────────────────────────────────
    function renderCheckboxesColumnas() {
        const container = document.getElementById('checkboxes-columnas');
        if (!container) return;
        container.innerHTML = '';
        columnasDisponibles.forEach(col => {
            const label = document.createElement('label');
            label.className = 'panel-col-check';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = columnasVisibles.includes(col.clave);
            checkbox.value = col.clave;
            checkbox.addEventListener('change', (e) => {
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

    // ── FILTROS ────────────────────────────────────────────────────────────
    function obtenerProductosFiltrados() {
        const busqueda = (document.getElementById('buscar-producto')?.value || '').toLowerCase();
        const categoriaFiltro = document.getElementById('filtro-categoria')?.value || '';
        return productos.filter(p => {
            const coincideNombre = p.nombre.toLowerCase().includes(busqueda);
            const coincideCategoria = !categoriaFiltro || p.tipoProducto === categoriaFiltro;
            return coincideNombre && coincideCategoria;
        });
    }

    // ── TABLA DE PRODUCTOS ─────────────────────────────────────────────────
    function renderTabla() {
        const thead = document.getElementById('propiedades-producto');
        const tbody = document.getElementById('filas-producto');
        if (!thead || !tbody) return;

        thead.innerHTML = '';
        columnasDisponibles
            .filter(col => columnasVisibles.includes(col.clave))
            .forEach(col => {
                const th = document.createElement('th');
                th.textContent = col.label;
                thead.appendChild(th);
            });
        const thAccion = document.createElement('th');
        thAccion.textContent = 'Acciones';
        thead.appendChild(thAccion);

        tbody.innerHTML = '';
        const productosFiltrados = obtenerProductosFiltrados();

        if (productosFiltrados.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = columnasVisibles.length + 1;
            td.innerHTML = `
                <div class="panel-empty-state">
                    <i class="bi bi-box panel-empty-state__icon"></i>
                    <h4>No hay productos registrados</h4>
                    <p class="text-muted">Comienza agregando tu primer producto al catálogo.</p>
                    <button class="panel-btn panel-btn--primary mt-2" onclick="irAgregarProducto()">
                        <i class="bi bi-plus-lg"></i> Agregar Producto
                    </button>
                </div>
            `;
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }

        productosFiltrados.forEach((producto) => {
            const indexReal = productos.indexOf(producto);
            const tr = document.createElement('tr');

            columnasDisponibles
                .filter(col => columnasVisibles.includes(col.clave))
                .forEach(col => {
                    const td = document.createElement('td');
                    td.innerHTML = obtenerValorCelda(producto, col.clave);
                    tr.appendChild(td);
                });

            const tdAccion = document.createElement('td');
            tdAccion.innerHTML = `
                <div class="panel-action-btns">
                    <button class="panel-btn-icon panel-btn-icon--edit" onclick="abrirModal(${indexReal})" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="panel-btn-icon panel-btn-icon--delete" onclick="eliminarProducto(${indexReal})" title="Eliminar">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            `;
            tr.appendChild(tdAccion);
            tbody.appendChild(tr);
        });
    }

    // ── ELIMINAR PRODUCTO ──────────────────────────────────────────────────
    window.eliminarProducto = function (index) {
        if (!confirm(`¿Estás seguro de eliminar el producto "${productos[index]?.nombre}"?`)) return;
        productos.splice(index, 1);
        localStorage.setItem('listaProducts', JSON.stringify(productos));
        renderTabla();
        renderEstadisticas();
    };

    // ── POBLAR SELECT CATEGORÍAS ───────────────────────────────────────────
    function poblarCategorias() {
        const select = document.getElementById('filtro-categoria');
        if (!select) return;
        const tipos = [...new Set(productos.map(p => p.tipoProducto).filter(Boolean))];
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo;
            select.appendChild(option);
        });
    }

    // ── MODAL EDITAR ───────────────────────────────────────────────────────
    window.abrirModal = function (index) {
        indexActual = index;
        const p = productos[index];
        document.getElementById('edit-nombre').value = p.nombre || '';
        document.getElementById('edit-tipo').value = p.tipoProducto || '';
        document.getElementById('edit-precio').value = p.precio || 0;
        document.getElementById('edit-cantidad').value = p.cantidad ?? 0;
        document.getElementById('edit-stockMinimo').value = p.stockMinimo ?? 5;
        document.getElementById('edit-activo').value = p.activo ? 'true' : 'false';
        const enPromo = p.enPromocion || p.detalles?.enPromocion || false;
        document.getElementById('edit-promocion').checked = enPromo;
        const descuento = p.descuento || p.detalles?.porcentajeDescuento || 0;
        document.getElementById('edit-descuento').value = descuento;
        document.getElementById('edit-descuento-group').style.display = enPromo ? 'block' : 'none';
        document.getElementById('modal-editar').classList.add('modal-overlay--visible');
    };

    window.cerrarModal = function () {
        document.getElementById('modal-editar').classList.remove('modal-overlay--visible');
    };

    window.guardarEdicion = function () {
        const p = productos[indexActual];
        const precio = document.getElementById('edit-precio').value;
        const cantidad = document.getElementById('edit-cantidad').value;
        const stockMinimo = document.getElementById('edit-stockMinimo').value;
        const activo = document.getElementById('edit-activo').value === 'true';
        const promocion = document.getElementById('edit-promocion').checked;
        const descuento = document.getElementById('edit-descuento').value;

        if (!isNaN(precio)) p.precio = Number(precio);
        if (!isNaN(cantidad)) p.cantidad = Number(cantidad);
        if (!isNaN(stockMinimo)) p.stockMinimo = Number(stockMinimo);
        p.activo = activo;
        p.enPromocion = promocion;
        if (p.detalles) p.detalles.enPromocion = promocion;

        if (promocion && descuento >= 1 && descuento <= 100) {
            p.descuento = Number(descuento);
            if (p.detalles) p.detalles.porcentajeDescuento = Number(descuento);
        } else {
            p.descuento = 0;
            if (p.detalles) p.detalles.porcentajeDescuento = 0;
        }

        localStorage.setItem('listaProducts', JSON.stringify(productos));
        cerrarModal();
        renderTabla();
        renderEstadisticas();
    };

    // ── PESTAÑA: PEDIDOS ───────────────────────────────────────────────────
    function renderPedidos() {
        const tbody = document.getElementById('filas-pedidos');
        const emptyState = document.getElementById('pedidos-empty');
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

        if (!tbody) return;

        if (pedidos.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.style.display = 'flex';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        const estadoBadge = {
            pendiente: 'panel-badge--yellow',
            procesando: 'panel-badge--blue',
            enviado: 'panel-badge--green',
            entregado: 'panel-badge--green',
            cancelado: 'panel-badge--red',
        };

        tbody.innerHTML = pedidos.map((pedido, i) => `
            <tr>
                <td><span class="panel-id">#${pedido.id || String(i + 1).padStart(4, '0')}</span></td>
                <td>${pedido.cliente || 'Cliente desconocido'}</td>
                <td>${pedido.fecha || '—'}</td>
                <td>${pedido.items ? pedido.items.length : '—'} ítem(s)</td>
                <td>${pedido.total ? formatearPrecio(pedido.total) : '—'}</td>
                <td><span class="panel-badge ${estadoBadge[pedido.estado] || 'panel-badge--gray'}">${pedido.estado || 'pendiente'}</span></td>
                <td>
                    <div class="panel-action-btns">
                        <button class="panel-btn-icon panel-btn-icon--edit" title="Ver detalle">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Filtro en tiempo real
        const inputBuscar = document.getElementById('buscar-pedido');
        if (inputBuscar) {
            inputBuscar.addEventListener('input', () => {
                const q = inputBuscar.value.toLowerCase();
                document.querySelectorAll('#filas-pedidos tr').forEach(tr => {
                    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
                });
            });
        }
    }

    // ── PESTAÑA: USUARIOS ──────────────────────────────────────────────────
    function renderUsuarios() {
        const tbody = document.getElementById('filas-usuarios');
        const emptyState = document.getElementById('usuarios-empty');

        const usuarios = [];

        // Usuario admin hardcodeado
        usuarios.push({
            nombre: 'Administrador',
            email: 'admin@admin.com',
            role: 'admin',
            fechaRegistro: '2026-01-01',
            activo: true,
        });

        // Usuarios registrados en localStorage
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioGuardado) {
            usuarios.push({
                nombre: usuarioGuardado.nombre || 'Usuario',
                email: usuarioGuardado.email || '—',
                role: 'user',
                fechaRegistro: usuarioGuardado.fechaRegistro || '—',
                activo: true,
            });
        }

        if (!tbody) return;

        if (usuarios.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.style.display = 'flex';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        tbody.innerHTML = usuarios.map(u => `
            <tr>
                <td>
                    <div class="panel-user-cell">
                        <div class="panel-user-avatar">${(u.nombre || '?').charAt(0).toUpperCase()}</div>
                        <span>${u.nombre}</span>
                    </div>
                </td>
                <td>${u.email}</td>
                <td>
                    <span class="panel-badge ${u.role === 'admin' ? 'panel-badge--blue' : 'panel-badge--gray'}">
                        ${u.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                </td>
                <td>${u.fechaRegistro || '—'}</td>
                <td>
                    <span class="panel-badge ${u.activo ? 'panel-badge--green' : 'panel-badge--red'}">
                        ${u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td>
                    <div class="panel-action-btns">
                        <button class="panel-btn-icon panel-btn-icon--edit" title="Ver perfil">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Filtro en tiempo real
        const inputBuscar = document.getElementById('buscar-usuario');
        if (inputBuscar) {
            inputBuscar.addEventListener('input', () => {
                const q = inputBuscar.value.toLowerCase();
                document.querySelectorAll('#filas-usuarios tr').forEach(tr => {
                    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
                });
            });
        }
    }

    // ── PESTAÑA: REPORTES ──────────────────────────────────────────────────
    function renderReportes() {
        // Ingresos simulados (pedidos)
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        const ingresoTotal = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
        const ticketPromedio = pedidos.length > 0 ? ingresoTotal / pedidos.length : 0;

        const rptIngresos = document.getElementById('rpt-ingresos');
        const rptPedidos = document.getElementById('rpt-pedidos');
        const rptTicket = document.getElementById('rpt-ticket');
        if (rptIngresos) rptIngresos.textContent = formatearPrecio(ingresoTotal);
        if (rptPedidos) rptPedidos.textContent = pedidos.length;
        if (rptTicket) rptTicket.textContent = formatearPrecio(ticketPromedio);

        // Inventario por categoría
        const categoriasContainer = document.getElementById('rpt-categorias');
        if (categoriasContainer) {
            const categorias = {};
            productos.forEach(p => {
                const cat = p.tipoProducto || 'Sin categoría';
                categorias[cat] = (categorias[cat] || 0) + 1;
            });

            const total = productos.length || 1;
            const colores = {
                'Semillas': '#16a34a',
                'Concentrados': '#2563eb',
                'Herramientas': '#d97706',
                'Sin categoría': '#9ca3af',
            };

            categoriasContainer.innerHTML = Object.entries(categorias).map(([cat, qty]) => {
                const pct = Math.round((qty / total) * 100);
                const color = colores[cat] || '#6b7280';
                return `
                    <div class="panel-cat-row">
                        <div class="panel-cat-row__label">
                            <span class="panel-cat-dot" style="background:${color}"></span>
                            <span>${cat}</span>
                        </div>
                        <div class="panel-cat-row__bar-wrap">
                            <div class="panel-cat-row__bar" style="width:${pct}%;background:${color}"></div>
                        </div>
                        <span class="panel-cat-row__count">${qty} (${pct}%)</span>
                    </div>
                `;
            }).join('') || '<p class="text-muted small">Sin datos disponibles.</p>';
        }

        // Tabla de productos
        const tablaProductos = document.getElementById('rpt-tabla-productos');
        if (tablaProductos) {
            const sorted = [...productos].sort((a, b) => (b.cantidad || 0) - (a.cantidad || 0));
            tablaProductos.innerHTML = sorted.slice(0, 10).map((p, i) => {
                const estado = p.activo
                    ? (p.cantidad <= p.stockMinimo ? '<span class="panel-badge panel-badge--orange">Stock bajo</span>' : '<span class="panel-badge panel-badge--green">Activo</span>')
                    : '<span class="panel-badge panel-badge--gray">Inactivo</span>';
                return `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${p.nombre}</td>
                        <td>${p.tipoProducto || '—'}</td>
                        <td>${formatearPrecio(p.precio)}</td>
                        <td>${p.cantidad ?? 0}</td>
                        <td>${estado}</td>
                    </tr>
                `;
            }).join('') || '<tr><td colspan="6" class="text-center text-muted py-3">No hay productos registrados.</td></tr>';
        }

        // Alertas de stock
        const alertasContainer = document.getElementById('rpt-alertas');
        if (alertasContainer) {
            const conStockBajo = productos.filter(p => (p.cantidad ?? 0) <= (p.stockMinimo ?? 5) && (p.cantidad ?? 0) >= 0);
            alertasContainer.innerHTML = conStockBajo.length > 0
                ? conStockBajo.map(p => `
                    <div class="panel-alerta-item">
                        <i class="bi bi-exclamation-triangle-fill text-warning"></i>
                        <div>
                            <span class="fw-bold">${p.nombre}</span>
                            <span class="text-muted small d-block">Stock actual: ${p.cantidad ?? 0} — Mínimo: ${p.stockMinimo ?? 5}</span>
                        </div>
                        <span class="panel-badge ${(p.cantidad ?? 0) === 0 ? 'panel-badge--red' : 'panel-badge--orange'}">
                            ${(p.cantidad ?? 0) === 0 ? 'Agotado' : 'Bajo'}
                        </span>
                    </div>
                `).join('')
                : '<p class="text-muted small text-center py-3"><i class="bi bi-check-circle-fill text-success me-1"></i> Sin alertas de stock.</p>';
        }
    }

    // ── EVENTOS DE BÚSQUEDA ────────────────────────────────────────────────
    const inputBuscar = document.getElementById('buscar-producto');
    if (inputBuscar) inputBuscar.addEventListener('input', renderTabla);

    const selectCategoria = document.getElementById('filtro-categoria');
    if (selectCategoria) selectCategoria.addEventListener('change', renderTabla);

    const editPromoCheckbox = document.getElementById('edit-promocion');
    if (editPromoCheckbox) {
        editPromoCheckbox.addEventListener('change', (e) => {
            document.getElementById('edit-descuento-group').style.display = e.target.checked ? 'block' : 'none';
        });
    }

    // ── INICIALIZACIÓN ─────────────────────────────────────────────────────
    renderCheckboxesColumnas();
    poblarCategorias();
    renderTabla();
    renderEstadisticas();
}
