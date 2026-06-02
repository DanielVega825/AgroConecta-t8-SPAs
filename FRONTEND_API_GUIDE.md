# 🌿 AgroConecta — Guía de Integración para el Frontend

> **Versión:** 1.1 · **Base URL:** `http://localhost:8080/api/v1`  
> Este documento es la fuente de verdad entre el backend y el frontend.  
> Describe cada endpoint, su payload exacto, su response y las reglas de acceso por rol.

---

## 1. 🔐 Autenticación y manejo del JWT

### 1.1 Flujo de Login

```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "miPassword123"
}
```

**Response exitosa `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "email": "usuario@ejemplo.com",
  "rol": "CLIENTE",
  "nombre": "Juan Pérez"
}
```

> Si las credenciales son incorrectas → `401 Unauthorized` con `"message": "Credenciales incorrectas"`.

---

### 1.2 Flujo de Registro

```
POST /api/v1/auth/register
```

**Request Body — CLIENTE (teléfono obligatorio):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "miPassword123",
  "rol": "CLIENTE",
  "telefono": "3001234567"
}
```

**Request Body — ADMIN (teléfono opcional):**
```json
{
  "nombre": "Admin Principal",
  "email": "admin@ejemplo.com",
  "password": "adminPass123",
  "rol": "ADMIN"
}
```

> **Reglas del campo `telefono`:**
> - `CLIENTE`: **obligatorio**. Si se omite → `400 Bad Request`.
> - `ADMIN`: **opcional**. Puede omitirse.
> - Formato válido: solo dígitos (7–15), con `+` opcional al inicio. Ejemplos: `"3001234567"`, `"+573001234567"`.

> El campo `rol` es **opcional**. Si se omite, el backend asigna `CLIENTE` por defecto.  
> La contraseña debe tener **mínimo 8 caracteres**.

**Response exitosa `200 OK`:**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "email": "juan@ejemplo.com",
  "rol": "CLIENTE"
}
```

> Si el email ya existe → `400 Bad Request` con `"error": "El email ya está registrado"`.  
> Si CLIENTE no envía teléfono → `400 Bad Request` con `"error": "El teléfono es obligatorio para los clientes"`.

---

### 1.3 Cómo guardar y usar el token

Al recibir la respuesta del login, **guarda los siguientes datos** en `localStorage` (o en tu gestor de estado):

```javascript
// GUARDAR al hacer login exitoso
function guardarSesion(response) {
  localStorage.setItem('token', response.token);
  localStorage.setItem('rol',   response.rol);      // "CLIENTE" | "ADMIN"
  localStorage.setItem('email', response.email);
  localStorage.setItem('nombre', response.nombre);
}

// USAR el token en cada petición autenticada
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Para peticiones multipart (si aplica)
function getAuthHeadersMultipart() {
  const token = localStorage.getItem('token');
  return { 'Authorization': `Bearer ${token}` };
}

// LEER el rol para decidir qué mostrar en la UI
function esAdmin() {
  return localStorage.getItem('rol') === 'ADMIN';
}

function esCliente() {
  return localStorage.getItem('rol') === 'CLIENTE';
}

// CERRAR sesión
function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('email');
  localStorage.removeItem('nombre');
}
```

> **El backend extrae la identidad del cliente directamente del JWT** en endpoints como
> `/mis-pedidos`. Nunca es necesario enviar el `clienteId` en la URL para esos casos.

---

### 1.4 Lógica de redirección por rol

| Rol | Después del login redirigir a |
|---|---|
| `CLIENTE` | Página principal / catálogo |
| `ADMIN` | Panel de administración |
| Sin sesión | Página pública / catálogo (modo lectura) |

---

## 2. 📦 Productos

### 2.1 Mapa de endpoints

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `GET` | `/productos` | Público | Catálogo de productos **activos** |
| `GET` | `/productos/promociones` | Público | Productos con `enPromocion: true` |
| `GET` | `/productos/{id}` | CLIENTE + ADMIN | Detalle de un producto |
| `GET` | `/productos/admin` | ADMIN | Catálogo **completo** (activos + inactivos) |
| `POST` | `/productos` | ADMIN | Crear nuevo producto |
| `PUT` | `/productos/{id}` | ADMIN | Actualizar precio, stock, estado |

---

### 2.2 Response de producto (todos los GETs devuelven este shape)

```json
{
  "id": 1,
  "nombre": "Tomate Chonto",
  "precio": 3500.00,
  "descripcion": "Tomate fresco de la región",
  "imagen": "url_imagen1|url_imagen2|url_imagen3",
  "detalles": {
    "enPromocion": true,
    "descuento": 10,
    "unidad": "kg"
  },
  "cantidad": 150,
  "fechaDeIngreso": "2025-06-01T10:30:00",
  "activo": true,
  "stockMinimo": 5,
  "descripcionLong": "Descripción extendida del producto...",
  "categoriaId": 2,
  "categoriaNombre": "Verduras"
}
```

> **`imagen`**: Es un string con URLs separadas por `|`. Para parsearlas:
> ```javascript
> const imagenes = producto.imagen ? producto.imagen.split('|').filter(s => s) : [];
> ```

> **`detalles`**: Es un objeto JSON libre (jsonb en la BD). El campo `enPromocion` vive aquí:
> ```javascript
> const enPromocion = producto.detalles?.enPromocion === true;
> ```

---

### 2.3 Crear producto (POST — solo ADMIN)

> Las imágenes se envían en **formato Base64** dentro de una lista.

```json
{
  "nombre": "Papa Criolla",
  "precio": 2800.00,
  "descripcion": "Papa criolla de primera",
  "imagenes": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhE..."
  ],
  "detalles": {
    "enPromocion": false,
    "unidad": "kg"
  },
  "cantidad": 200,
  "stockMinimo": 10,
  "descripcionLong": "Descripción extendida...",
  "categoriaId": 3
}
```

> El campo acepta tanto `"imagenes"` como `"imagen"` (lista) — alias configurado en el backend.  
> Mínimo **1** imagen, máximo **7**.

**Cómo convertir un archivo a Base64 en el frontend:**
```javascript
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // incluye el prefijo data:image/...
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Uso con un input type="file" múltiple
const inputFiles = document.querySelector('#imagenesInput').files;
const imagenes = await Promise.all([...inputFiles].map(fileToBase64));
```

---

### 2.4 Actualizar producto (PUT — solo ADMIN)

> Solo se pueden modificar estos campos. El nombre, imágenes y categoría son **inmutables** por este endpoint.

```json
{
  "precio": 3200.00,
  "cantidad": 180,
  "stockMinimo": 8,
  "activo": true,
  "enPromocion": false
}
```

Todos los campos son **obligatorios** en el PUT.

---

## 3. 🗂️ Categorías

### 3.1 Mapa de endpoints

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `GET` | `/categorias` | Público | Listar todas las categorías |
| `GET` | `/categorias/{id}` | Público | Obtener una categoría por ID |
| `POST` | `/categorias` | ADMIN | Crear categoría |
| `PUT` | `/categorias/{id}` | ADMIN | Editar categoría |
| `DELETE` | `/categorias/{id}` | ADMIN | Eliminar categoría |

### 3.2 Payload de categoría

**Request (POST/PUT):**
```json
{ "nombre": "Frutas" }
```

**Response:**
```json
{ "id": 1, "nombre": "Frutas" }
```

---

## 4. 🛒 Pedidos

### 4.1 Mapa de endpoints

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `GET` | `/pedidos/mis-pedidos` | CLIENTE | Historial propio (identidad desde JWT) |
| `POST` | `/pedidos` | CLIENTE | Crear pedido |
| `GET` | `/pedidos` | ADMIN | Todos los pedidos |
| `GET` | `/pedidos/{id}` | ADMIN | Pedido por ID |
| `GET` | `/pedidos/cliente/{clienteId}` | ADMIN | Pedidos de un cliente específico |
| `PUT` | `/pedidos/{id}` | ADMIN | Editar artículos de un pedido |
| `PATCH` | `/pedidos/{id}/estado` | ADMIN | Cambiar estado del pedido |

---

### 4.2 Crear pedido (POST — solo CLIENTE)

> El backend descuenta el stock automáticamente al crear el pedido.

```json
{
  "clienteId": 5,
  "detalles": [
    { "productoId": 1, "cantidad": 3 },
    { "productoId": 4, "cantidad": 1 }
  ]
}
```

> Si el stock de algún producto es insuficiente → `409 Conflict` con el mensaje del producto afectado.

---

### 4.3 Response de pedido

```json
{
  "id": 12,
  "clienteId": 5,
  "clienteNombre": "Juan Pérez",
  "estadoActual": "PENDIENTE",
  "total": 12500.00,
  "creadoAt": "2025-06-01T14:22:10",
  "detalles": [
    {
      "productoId": 1,
      "productoNombre": "Tomate Chonto",
      "cantidad": 3,
      "precioUni": 3500.00,
      "subtotal": 10500.00
    }
  ],
  "historial": [
    {
      "estado": "PENDIENTE",
      "fecha": "2025-06-01T14:22:10",
      "nota": "Creación inicial del pedido"
    }
  ]
}
```

> Los campos con valor `null` son omitidos en el response por `@JsonInclude(NON_NULL)`.

---

### 4.4 Cambiar estado del pedido (PATCH — solo ADMIN)

```
PATCH /api/v1/pedidos/{id}/estado
```

**Request Body:**
```json
{
  "estado": "COMPRADO",
  "nota": "Pago confirmado por transferencia"
}
```

**Estados válidos del enum `EstadoPedido`:**

| Valor | Significado |
|---|---|
| `PENDIENTE` | Pedido recién creado, sin pagar |
| `COMPRADO` | Pago confirmado |

> `nota` es **opcional**. Si se omite, el backend genera: `"Cambio de estado a COMPRADO"`.

---

## 5. 👤 Usuarios (solo ADMIN)

### 5.1 Mapa de endpoints

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `GET` | `/usuarios` | ADMIN | Listar todos los usuarios |
| `GET` | `/usuarios/{id}` | ADMIN | Obtener usuario por ID |
| `PUT` | `/usuarios/{id}` | ADMIN | Actualizar datos de usuario |
| `PATCH` | `/usuarios/{id}/estado?estado=INACTIVO` | ADMIN | Activar / desactivar usuario |

> El estado en el PATCH va como **query param**, no en el body.

### 5.2 Response de usuario

```json
{
  "id": 5,
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "rol": "CLIENTE",
  "estado": "ACTIVO",
  "fechaCreacion": "2025-05-01T09:00:00",
  "telefono": "3001234567"
}
```

> El campo `telefono` puede ser `null` para usuarios ADMIN que no lo registraron.

**Valores de `estado`:** `ACTIVO` | `INACTIVO`

### 5.3 Actualizar usuario (PUT — solo ADMIN)

```json
{
  "nombre": "Juan Pérez Actualizado",
  "password": "nuevaPass456",
  "telefono": "3009876543"
}
```

> **Regla de negocio:**
> - Si el usuario tiene rol `CLIENTE` → `telefono` es **obligatorio** en el PUT.
> - Si el usuario tiene rol `ADMIN` → `telefono` es **opcional**.
> - Si `password` se omite o está vacío, la contraseña **no se modifica**.

---

## 6. 🚨 Manejo de errores

Todos los errores siguen este formato JSON:

```json
{
  "timestamp": "2025-06-01T14:22:10",
  "status": 400,
  "error": "Bad Request",
  "message": "Descripción del error",
  "path": "/api/v1/productos"
}
```

### Catálogo de errores

| Status | Error | Cuándo ocurre |
|---|---|---|
| `400` | Bad Request | Campos inválidos o faltantes (incluye teléfono ausente en CLIENTE) |
| `401` | Unauthorized | Token ausente, expirado o credenciales incorrectas |
| `403` | Forbidden | El rol del usuario no tiene permiso |
| `404` | Not Found | Recurso inexistente por el ID proporcionado |
| `409` | Conflict | Email duplicado en registro / stock insuficiente |
| `500` | Internal Server Error | Error inesperado en el servidor |

### Errores de validación (400) — incluyen el campo `fields`

```json
{
  "timestamp": "2025-06-01T14:22:10",
  "status": 400,
  "error": "Bad Request",
  "message": "Error de validación",
  "fields": {
    "nombre": "El nombre del producto es obligatorio",
    "telefono": "El teléfono debe contener solo dígitos (7-15), con '+' opcional al inicio"
  },
  "path": "/api/v1/auth/register"
}
```

### Stock insuficiente (409)

```json
{
  "status": 409,
  "error": "Conflict",
  "message": "El producto 'Tomate Chonto' no cuenta con suficiente stock. Stock actual disponible: 2"
}
```

---

## 7. 🗺️ Matriz de acceso por rol

| Endpoint | Sin sesión | CLIENTE | ADMIN |
|---|:---:|:---:|:---:|
| `GET /productos` | ✅ | ✅ | ✅ |
| `GET /productos/promociones` | ✅ | ✅ | ✅ |
| `GET /categorias/**` | ✅ | ✅ | ✅ |
| `POST /auth/login` | ✅ | ✅ | ✅ |
| `POST /auth/register` | ✅ | ✅ | ✅ |
| `GET /productos/{id}` | ❌ | ✅ | ✅ |
| `GET /pedidos/mis-pedidos` | ❌ | ✅ | ❌ |
| `POST /pedidos` | ❌ | ✅ | ❌ |
| `GET /productos/admin` | ❌ | ❌ | ✅ |
| `POST /productos` | ❌ | ❌ | ✅ |
| `PUT /productos/{id}` | ❌ | ❌ | ✅ |
| `POST /categorias` | ❌ | ❌ | ✅ |
| `PUT/DELETE /categorias/{id}` | ❌ | ❌ | ✅ |
| `GET /pedidos/**` | ❌ | ❌ | ✅ |
| `PUT /pedidos/{id}` | ❌ | ❌ | ✅ |
| `PATCH /pedidos/{id}/estado` | ❌ | ❌ | ✅ |
| `GET/PUT/PATCH /usuarios/**` | ❌ | ❌ | ✅ |

---

## 8. 💡 Buenas prácticas para el frontend

1. **Centraliza las llamadas a la API** en un módulo/servicio (`api.js`), no hagas `fetch` sueltos.

2. **Intercepta el 401 globalmente**: Si el backend responde `401`, borra la sesión y redirige al login.

3. **No expongas el token en la URL** ni en atributos HTML visibles.

4. **Valida el rol antes de renderizar**: Oculta rutas y botones según el rol guardado en `localStorage`.

5. **`/mis-pedidos` no necesita ID en la URL**: El backend extrae la identidad del JWT. Solo envía el header `Authorization`.

6. **Para el catálogo público** (`/productos`, `/categorias`), no es necesario enviar el header `Authorization`.

7. **Imágenes**: El campo `imagen` en el response es un string delimitado por `|`. Parsea con `.split('|').filter(s => s)`.  
   Al **enviar** imágenes, conviértelas a **Base64** con `FileReader.readAsDataURL()` y pásalas en el array `imagenes`.

8. **`detalles`**: El campo `enPromocion` está anidado dentro del objeto `detalles` en el response del producto.

9. **Teléfono en registro**: Si el formulario detecta rol `CLIENTE`, muestra el campo `telefono` como **requerido**. Para `ADMIN`, muéstralo como opcional.

10. **Teléfono en actualización**: Al actualizar un usuario con rol `CLIENTE`, siempre incluye el campo `telefono` en el payload.
