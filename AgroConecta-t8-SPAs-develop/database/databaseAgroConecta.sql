-- =============================================================================
-- 1. CREACIÓN DE TABLAS (Con Constraints de Llaves Primarias al final)
-- =============================================================================

CREATE TABLE usuarios (
    id SERIAL,
    nombres VARCHAR(150) NOT NULL,
	telefono VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
	password VARCHAR(250) NOT NULL,
	rol VARCHAR(100) DEFAULT 'customer',
    -- Definición explícita de PK al final de la entidad
    CONSTRAINT pk_usuarios PRIMARY KEY (id),
	CONSTRAINT usuarios_email_key UNIQUE (email) 
);

CREATE TABLE estados_pedido (
    id SERIAL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    -- Definición explícita de PK al final de la entidad
    CONSTRAINT pk_estados_pedido PRIMARY KEY (id),
	CONSTRAINT estados_pedido_nombre_key UNIQUE (nombre)
);

CREATE TABLE pedidos (
    id SERIAL,
	--columnas de relacion
    usuario_id INT NOT NULL,
    estado_id INT NOT NULL,git add .

	--columnas propias de la tabla
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    creado_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Definición explícita de PK al final de la entidad
    CONSTRAINT pk_pedidos PRIMARY KEY (id)
);





CREATE TABLE historial_estados_pedido (
    id SERIAL,
	--columnas de relacion
    pedido_id INT NOT NULL,
    estado_id INT NOT NULL,

	--columnas propias de la entidad
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    nota TEXT,
    -- Definición explícita de PK al final de la entidad
    CONSTRAINT pk_historial_estados_pedido PRIMARY KEY (id)
);

CREATE TABLE categorias (
    id SERIAL,
    nombre VARCHAR(100) NOT NULL,
    
    CONSTRAINT pk_categorias PRIMARY KEY (id),
	CONSTRAINT categorias_nombre_key UNIQUE(nombre)
);

CREATE TABLE productos (
    id SERIAL,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT,
    imagen TEXT[] DEFAULT '{}',
    detalles JSONB DEFAULT '{}',
    cantidad INTEGER DEFAULT 0,
    tipoProducto VARCHAR(100),
    fechaDeIngreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    stockMinimo INTEGER DEFAULT 5,
    descripcionLong TEXT DEFAULT '',
    
    -- Columna de Relación
    categoria_id INTEGER,

    -- Definición de PK
    CONSTRAINT pk_productos PRIMARY KEY (id)
    
    
);

CREATE TABLE detalles_pedido (
    id SERIAL,
	--columnas de relacion
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,

	--columnas propias de la tabla
    cantidad INT NOT NULL,
    precio_uni DECIMAL(10,2) NOT NULL,
    -- Definición explícita de PK al final de la entidad
    CONSTRAINT pk_detalles_pedido PRIMARY KEY (id),
	CONSTRAINT detalles_pedido_cantidad_check CHECK (cantidad > 0)
);

-- =============================================================================
-- 2. RELACIONES MEDIANTE ALTER TABLE (Explicadas)
-- =============================================================================

/* 
RELACIÓN: usuarios -> pedidos (1 a Muchos)
Por qué: Un pedido debe pertenecer obligatoriamente a un cliente para saber a 
quién facturar y despachar. Un usuario puede realizar múltiples compras.
*/
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_usuario
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
ON DELETE RESTRICT; 
-- RESTRICT evita borrar un usuario si este ya tiene un historial de compras.

/* 
RELACIÓN: estados_pedido -> pedidos (1 a Muchos)
Por qué: El pedido necesita un estado actual de lectura rápida. Esta FK garantiza 
 que el estado asignado sea un estado válido definido por el negocio.
*/
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_estado_actual
FOREIGN KEY (estado_id) REFERENCES estados_pedido(id)
ON DELETE RESTRICT;

/* 
RELACIÓN: pedidos -> detalles_pedido (1 a Muchos)
Por qué: Conecta los productos comprados con su respectiva cabecera de pedido.
 Si el pedido se elimina, sus líneas de detalle carecen de sentido.
*/
ALTER TABLE detalles_pedido
ADD CONSTRAINT fk_detalles_pedido_cabecera
FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
ON DELETE CASCADE; 
-- CASCADE elimina los detalles automáticamente si se llega a borrar el pedido.

/* 
RELACIÓN: productos -> detalles_pedido (1 a Muchos)
Por qué: Asegura que el artículo vendido exista en el catálogo de productos.
*/
ALTER TABLE detalles_pedido
ADD CONSTRAINT fk_detalles_pedido_producto
FOREIGN KEY (producto_id) REFERENCES productos(id)
ON DELETE RESTRICT;


ALTER TABLE productos
ADD CONSTRAINT fk_productos_categorias 
FOREIGN KEY (categoria_id) 
REFERENCES categorias(id) 
ON DELETE SET NULL ;
-- Si se borra la categoría, el producto queda con categoría NULL

/* 
RELACIÓN: pedidos -> historial_estados_pedido (1 a Muchos)
Por qué: Vincula cada evento de la línea de tiempo con su pedido correspondiente.
 Permite reconstruir la auditoría logística de la compra.
*/
ALTER TABLE historial_estados_pedido
ADD CONSTRAINT fk_historial_pedido
FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
ON DELETE CASCADE;

/* 
RELACIÓN: estados_pedido -> historial_estados_pedido (1 a Muchos)
Por qué: Identifica qué estado específico alcanzó el pedido en ese momento exacto 
 del historial (ej. saber cuándo pasó a 'Enviado').
*/
ALTER TABLE historial_estados_pedido
ADD CONSTRAINT fk_historial_estado
FOREIGN KEY (estado_id) REFERENCES estados_pedido(id)
ON DELETE RESTRICT;


-- 1. Categorías
INSERT INTO categorias (nombre) VALUES 
('Electrónica'), ('Hogar'), ('Deportes'), ('Libros'), ('Ropa'),
('Juguetes'), ('Belleza'), ('Herramientas'), ('Automotriz'), ('Mascotas'),
('Jardinería'), ('Oficina'), ('Salud'), ('Alimentos'), ('Música');

-- 2. Estados de Pedido
INSERT INTO estados_pedido (nombre, descripcion) VALUES 
('Pendiente', 'Pedido recibido pero no pagado'),
('Pagado', 'Pago confirmado por la pasarela'),
('Procesando', 'El pedido se está preparando en bodega'),
('Enviado', 'El paquete está en manos del transportista'),
('En Ruta', 'El repartidor está cerca del domicilio'),
('Entregado', 'El cliente recibió el producto'),
('Cancelado', 'Pedido anulado por el cliente'),
('Devuelto', 'El cliente retornó el producto'),
('Reembolsado', 'Dinero devuelto al cliente'),
('Fallido', 'Error en el procesamiento del pago'),
('En Espera', 'Falta stock para completar'),
('Validando', 'Revisión de seguridad antifraude'),
('Listo para Retiro', 'Disponible en tienda física'),
('Extraviado', 'Reportado como perdido por transporte'),
('Reintentando', 'Segundo intento de entrega programado');

-- 3. Usuarios
INSERT INTO usuarios (nombres, telefono, email, password, rol) VALUES 
('Juan Perez', '555-0101', 'juan@example.com', 'pass123', 'customer'),
('Maria Lopez', '555-0102', 'maria@example.com', 'pass123', 'customer'),
('Carlos Ruiz', '555-0103', 'carlos@admin.com', 'admin456', 'admin'),
('Ana Gomez', '555-0104', 'ana@example.com', 'pass123', 'customer'),
('Luis Sosa', '555-0105', 'luis@example.com', 'pass123', 'customer'),
('Elena Paz', '555-0106', 'elena@example.com', 'pass123', 'customer'),
('Pedro Picapiedra', '555-0107', 'pedro@example.com', 'pass123', 'customer'),
('Laura Noli', '555-0108', 'laura@example.com', 'pass123', 'customer'),
('Diego Mar', '555-0109', 'diego@example.com', 'pass123', 'customer'),
('Sofia Vergara', '555-0110', 'sofia@example.com', 'pass123', 'customer'),
('Roberto Gomez', '555-0111', 'roberto@example.com', 'pass123', 'customer'),
('Lucia Mendez', '555-0112', 'lucia@example.com', 'pass123', 'customer'),
('Marcos Polo', '555-0113', 'marcos@example.com', 'pass123', 'customer'),
('Andrea Doria', '555-0114', 'andrea@example.com', 'pass123', 'customer'),
('Victor Hugo', '555-0115', 'victor@example.com', 'pass123', 'customer');

-- 4. Productos
INSERT INTO productos (nombre, precio, descripcion, categoria_id, cantidad) VALUES 
('Smartphone X', 899.99, 'Celular gama alta', 1, 50),
('Sofá Cama', 450.00, 'Sofá de 3 plazas', 2, 10),
('Balón de Fútbol', 25.50, 'Tamaño oficial', 3, 100),
('Libro SQL', 45.00, 'Guía completa de BD', 4, 30),
('Camiseta Algodón', 15.00, 'Talla M blanca', 5, 200),
('Set de Legos', 89.90, 'Castillo medieval', 6, 15),
('Crema Hidratante', 12.00, 'Para piel seca', 7, 80),
('Taladro Percutor', 75.00, '18V inalámbrico', 8, 20),
('Aceite Motor', 35.00, 'Sintético 5W30', 9, 45),
('Cama Perro', 40.00, 'Tamaño grande', 10, 12),
('Tijeras Poda', 18.00, 'Acero inoxidable', 11, 25),
('Silla Oficina', 120.00, 'Ergonómica', 12, 8),
('Vitaminas C', 9.99, 'Frasco 60 caps', 13, 150),
('Café Gourmet', 14.50, 'Grano molido 500g', 14, 60),
('Guitarra Acústica', 199.00, 'Madera de pino', 15, 5);

-- 5. Pedidos
INSERT INTO pedidos (usuario_id, estado_id, total) VALUES 
(1, 6, 925.49), (2, 4, 45.00), (4, 1, 15.00), (5, 6, 25.50), (6, 2, 89.90),
(7, 3, 12.00), (8, 6, 150.00), (9, 7, 35.00), (10, 6, 40.00), (11, 4, 18.00),
(12, 1, 240.00), (13, 6, 9.99), (14, 5, 29.00), (15, 6, 199.00), (1, 6, 12.00);

-- 6. Detalles de Pedido
INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_uni) VALUES 
(1, 1, 1, 899.99), (1, 3, 1, 25.50), (2, 4, 1, 45.00), (3, 5, 1, 15.00), (4, 3, 1, 25.50),
(5, 6, 1, 89.90), (6, 7, 1, 12.00), (7, 8, 2, 75.00), (8, 9, 1, 35.00), (9, 10, 1, 40.00),
(10, 11, 1, 18.00), (11, 12, 2, 120.00), (12, 13, 1, 9.99), (13, 14, 2, 14.50), (14, 15, 1, 199.00);

-- 7. Historial de Estados
INSERT INTO historial_estados_pedido (pedido_id, estado_id, nota) VALUES 
(1, 1, 'Pedido iniciado'), (1, 2, 'Pago exitoso'), (1, 6, 'Entregado conforme'),
(2, 1, 'Esperando pago'), (2, 4, 'Enviado por DHL'), (5, 2, 'Pago verificado'),
(7, 1, 'Creado'), (7, 6, 'Recibido en portería'), (8, 7, 'Cliente no quiso el producto'),
(9, 6, 'Entregado'), (10, 4, 'Despachado'), (11, 1, 'Pendiente de fondos'),
(13, 1, 'Iniciado'), (13, 5, 'Repartidor en zona'), (14, 6, 'Entrega exitosa');
