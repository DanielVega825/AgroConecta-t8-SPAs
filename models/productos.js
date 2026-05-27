export class Producto {
  constructor({
    nombre,
    precio,
    descripcion,
    imagenes = [],
    detalles = { enDescuento: false, porcentajeDescuento: null },
    cantidad = 0,
    stockMinimo = 6,
    descripcionLong = "",
    categoriaId // Único campo identificador numérico (Long en Java)
  }) {
    // Validaciones básicas de negocio
    if (!nombre || nombre.trim() === '') throw new Error("El nombre es requerido");
    if (!precio || isNaN(precio) || precio <= 0) throw new Error("El precio debe ser mayor a 0");
    if (!descripcion || descripcion.trim() === '') throw new Error("La descripción es requerida");

    // Validación del índice (debe existir y ser un número entero válido)
    if (!categoriaId || isNaN(categoriaId) || !Number.isInteger(Number(categoriaId))) {
      throw new Error("Debe seleccionar una categoría válida (ID numérico requerido)");
    }

    if (stockMinimo <= 5) throw new Error("El stock mínimo debe ser mayor a 5");
    if (!Array.isArray(imagenes) || imagenes.length === 0) throw new Error("Debe proporcionar al menos una imagen");

    // Validación condicional del JSON de detalles
    if (detalles.enDescuento && (!detalles.porcentajeDescuento || detalles.porcentajeDescuento <= 0)) {
      throw new Error("Si el producto está en descuento, debe ingresar un porcentaje válido");
    }

    // Asignación de propiedades alineadas con el DTO

    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagenes = imagenes;
    this.detalles = detalles;
    this.cantidad = cantidad;
    this.stockMinimo = stockMinimo;
    this.descripcionLong = descripcionLong;
    this.categoriaId = Number(categoriaId); // Forzamos el tipo numérico
  }

  obtenerEstado() {
    if (!this.activo) return "inactivo";
    if (this.cantidad === 0) return "agotado";
    if (this.cantidad <= this.stockMinimo) return "stock bajo";
    return "activo";
  }
}
