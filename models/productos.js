export class Producto {
  constructor({
    id,
    nombre,
    precio,
    descripcion,
    imagen = [],
    detalles = {},
    cantidad = 0,
    tipoProducto,
    fechaDeIngreso,
    activo = true,
    stockMinimo = 5
  }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.detalles = detalles;
    this.cantidad = cantidad;
    this.tipoProducto = tipoProducto;
    this.fechaDeIngreso = fechaDeIngreso;
    this.activo = activo;
    this.stockMinimo = stockMinimo;
  }

  obtenerEstado() {
    if (!this.activo) return "inactivo";
    if (this.cantidad === 0) return "agotado";
    if (this.cantidad <= this.stockMinimo) return "stock bajo";
    return "activo";
  }
}