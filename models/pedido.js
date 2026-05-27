/**
 * Modelo para Pedido — basado en PedidoResponseDTO del backend.
 * Incluye detalles de línea y el historial de cambios de estado.
 */
export class Pedido {
    constructor({
        id,
        clienteId,
        clienteNombre = "",
        estadoActual = "PENDIENTE",
        total,
        creadoAt,
        // Listas de DTOs anidados (no entidades crudas)
        detalles = [],
        historial = [],
    }) {
        if (!id) throw new Error("El ID del pedido es requerido");
        if (!clienteId) throw new Error("El ID del cliente es requerido");
        if (total === undefined || total === null || isNaN(Number(total))) {
            throw new Error("El total del pedido debe ser un número válido");
        }

        this.id = id;
        this.clienteId = clienteId;
        this.clienteNombre = clienteNombre;
        this.estadoActual = estadoActual;
        this.total = Number(total);
        this.creadoAt = creadoAt ? new Date(creadoAt) : new Date();
        this.detalles = detalles;   // List<DetallePedidoResponseDTO>
        this.historial = historial; // List<HistorialEstadoResponseDTO>
    }

    /**
     * Devuelve el total formateado como moneda colombiana.
     */
    getTotalFormateado() {
        return `$ ${this.total.toLocaleString("es-CO")}`;
    }

    /**
     * Devuelve la fecha de creación en formato legible.
     */
    getFechaFormateada() {
        return this.creadoAt.toLocaleString("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    }

    /**
     * Retorna un emoji+texto según el estado del pedido.
     */
    getEtiquetaEstado() {
        const estados = {
            PENDIENTE:   "🟡 Pendiente",
            EN_PROCESO:  "🔵 En proceso",
            ENVIADO:     "🚚 Enviado",
            ENTREGADO:   "✅ Entregado",
            CANCELADO:   "❌ Cancelado",
        };
        return estados[this.estadoActual] || this.estadoActual;
    }
}
