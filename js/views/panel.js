export function Panel() {

  // ================================
  // 📦 DATOS
  // ================================
  let productos = [
    {
      id: "prod-001",
      nombre: "Semillas Maíz Premium",
      categoria: "Semillas",
      precio: 50000,
      stock: 45,
      estado: "activo",
      enPromocion: false,
      descuento: 0
    },
    {
      id: "prod-002",
      nombre: "Concentrado Ganado",
      categoria: "Concentrados",
      precio: 80000,
      stock: 28,
      estado: "activo",
      enPromocion: true,
      descuento: 50
    }
  ];

  let indexActual = null;

  // ================================
  // 🔗 REDIRECCIÓN
  // ================================
  window.irAgregarProducto = function() {
    window.location.hash = "#/addProduct";
  };

  // ================================
  // 💰 FORMATEAR PRECIO
  // ================================
  function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO");
  }

  // ================================
  // 🔥 CALCULAR PRECIO FINAL
  // ================================
  function calcularPrecioFinal(producto) {
    if (!producto.enPromocion) return producto.precio;
    return producto.precio * (1 - producto.descuento / 100);
  }

  // ================================
  // 📊 RENDER TABLA
  // ================================
  function renderTabla() {

    const tbody = document.getElementById("tabla-productos");
    if (!tbody) return;

    tbody.innerHTML = "";

    productos.forEach((producto, index) => {

      const precioFinal = calcularPrecioFinal(producto);

      tbody.innerHTML += `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.categoria}</td>

          <td>$ ${formatearPrecio(precioFinal)}</td>

          <td>${producto.stock}</td>
          <td>${producto.estado}</td>

          <td>${producto.enPromocion ? "Sí" : "No"}</td>

          <td>
            ${producto.enPromocion ? `${producto.descuento}%` : "—"}
          </td>

          <td>
            <button onclick="abrirModal(${index})">✏️</button>
            <button onclick="eliminarProducto(${index})">🗑️</button>
          </td>
        </tr>
      `;
    });
  }

  // ================================
  // ✏️ ABRIR MODAL
  // ================================
  window.abrirModal = function(index) {

    indexActual = index;
    const producto = productos[index];

    document.getElementById("edit-nombre").value = producto.nombre;
    document.getElementById("edit-categoria").value = producto.categoria;

    document.getElementById("edit-precio").value = producto.precio;
    document.getElementById("edit-stock").value = producto.stock;
    document.getElementById("edit-estado").value = producto.estado;

    document.getElementById("edit-promocion").checked = producto.enPromocion;
    document.getElementById("edit-descuento").value = producto.descuento;

    document.getElementById("modal-editar").style.display = "block";
  };

  // ================================
  // ❌ CERRAR MODAL
  // ================================
  window.cerrarModal = function() {
    document.getElementById("modal-editar").style.display = "none";
  };

  // ================================
  // 💾 GUARDAR EDICIÓN
  // ================================
  window.guardarEdicion = function() {

    const producto = productos[indexActual];

    const precio = document.getElementById("edit-precio").value;
    const stock = document.getElementById("edit-stock").value;
    const estado = document.getElementById("edit-estado").value;

    const promocion = document.getElementById("edit-promocion").checked;
    const descuento = document.getElementById("edit-descuento").value;

    if (!isNaN(precio)) producto.precio = Number(precio);
    if (!isNaN(stock)) producto.stock = Number(stock);
    producto.estado = estado;

    producto.enPromocion = promocion;

    if (promocion && descuento >= 1 && descuento <= 100) {
      producto.descuento = Number(descuento);
    } else {
      producto.descuento = 0;
    }

    cerrarModal();
    renderTabla();
  };

  // ================================
  // 🗑️ ELIMINAR
  // ================================
  window.eliminarProducto = function(index) {
    if (confirm("¿Eliminar producto?")) {
      productos.splice(index, 1);
      renderTabla();
    }
  };

  // ================================
  // ⏱️ INICIAL
  // ================================
  setTimeout(renderTabla, 0);

  // ================================
  // 🖥️ HTML
  // ================================
  return `

    <h1>Panel de Administración</h1>

    <!-- 🔥 BOTÓN NUEVO -->
    <button onclick="irAgregarProducto()" style="margin-bottom:15px;">
      ➕ Agregar Producto
    </button>

    <table border="1" width="100%" cellpadding="10">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Estado</th>
          <th>Promoción</th>
          <th>Descuento</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody id="tabla-productos"></tbody>

    </table>

    <!-- MODAL -->
    <div id="modal-editar" style="
      display:none;
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.4);
    ">

      <div style="
        background:white;
        width:350px;
        margin:80px auto;
        border-radius:10px;
        padding:20px;
      ">

        <h3>Editar Producto</h3>

        <input id="edit-nombre" disabled style="width:100%; margin-bottom:8px;">
        <input id="edit-categoria" disabled style="width:100%; margin-bottom:8px;">

        <input id="edit-precio" type="number" placeholder="Precio" style="width:100%; margin-bottom:8px;">
        <input id="edit-stock" type="number" placeholder="Stock" style="width:100%; margin-bottom:8px;">

        <select id="edit-estado" style="width:100%; margin-bottom:8px;">
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <label>
          <input type="checkbox" id="edit-promocion"> En promoción
        </label>

        <input id="edit-descuento" type="number" placeholder="Descuento %" min="1" max="100" style="width:100%; margin-top:8px;">

        <br><br>

        <button onclick="guardarEdicion()">Guardar</button>
        <button onclick="cerrarModal()">Cancelar</button>

      </div>

    </div>

  `;
}