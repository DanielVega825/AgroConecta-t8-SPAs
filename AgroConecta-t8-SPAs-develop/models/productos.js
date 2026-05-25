/**
 * añadir:
    descripcionLong = ""
 */
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
    stockMinimo = 5,
  }) {
    if (!nombre || nombre.trim() === '') throw new Error("El nombre es requerido");
    if (!precio || isNaN(precio) || precio <= 0) throw new Error("El precio debe ser un número válido mayor a 0");
    if (!descripcion || descripcion.trim() === '') throw new Error("La descripción es requerida");
    if (!tipoProducto || tipoProducto === 'Seleccionar tipo') throw new Error("Debe seleccionar un tipo de producto");
    if (cantidad < 0) throw new Error("La cantidad no puede ser menor a 0");
    if (!Array.isArray(imagen) || imagen.length === 0) throw new Error("Debe proporcionar un arreglo con al menos una imagen");

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