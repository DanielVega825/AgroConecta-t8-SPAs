/**
 * Modelo para Usuario — basado en UsuarioResponseDTO del backend.
 * Soporta tanto clientes (con pedidos) como trabajadores (con datos laborales).
 */
export class Usuario {
    constructor({
        clienteId,
        name,
        email,
        activo = true,
        telefono = "",
        rol,
        // Datos exclusivos de CLIENTES
        pedidos = null,
        // Datos exclusivos de TRABAJADORES
        salario = null,
        fechaContratacion = null,
        area = null,
        turno = null,
        codigoEmpleado = null,
    }) {
        if (!name || name.trim() === "") throw new Error("El nombre del usuario es requerido");
        if (!email || !email.includes("@")) throw new Error("El email del usuario no es válido");
        if (!rol) throw new Error("El rol del usuario es requerido");

        this.clienteId = clienteId;
        this.name = name;
        this.email = email;
        this.activo = activo;
        this.telefono = telefono;
        this.rol = rol; // Enum: "ADMIN", "CLIENTE", "EMPLEADO", etc.

        // Solo presente si el usuario es CLIENTE (Jackson @JsonInclude(NON_NULL))
        this.pedidos = pedidos;

        // Solo presente si es TRABAJADOR/EMPLEADO
        this.salario = salario;
        this.fechaContratacion = fechaContratacion;
        this.area = area;
        this.turno = turno;
        this.codigoEmpleado = codigoEmpleado;
    }

    esCliente() {
        return this.rol === "CLIENTE";
    }

    esTrabajador() {
        return this.rol === "EMPLEADO" || this.rol === "ADMIN";
    }

    obtenerEtiquetaRol() {
        const roles = {
            CLIENTE: "Cliente",
            EMPLEADO: "Empleado",
            ADMIN: "Administrador",
        };
        return roles[this.rol] || this.rol;
    }
}
