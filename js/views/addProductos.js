import { Producto } from '../../models/productos.js';
import { products } from '../../data/products.js';

const LIMITE_MB_IMAGEN = 2;
const LIMITE_BYTES_IMAGEN = LIMITE_MB_IMAGEN * 1024 * 1024;

export function AddProduct() {

    return `
    
    <section class="product-form py-5">

        <div class="container p-5">

            <form id="formularioProducto" class="product-form__card card">

                <!-- INFORMACIÓN BÁSICA -->
                <div class="product-form__section mb-5">

                    <h2 class="h5 border-bottom pb-2 mb-4">
                        Información Básica
                    </h2>

                    <div class="row g-3">

                        <div class="col-md-6">
                            <label class="form-label fw-bold">
                                Nombre del Producto *
                            </label>

                            <input 
                                type="text"
                                id="nombreProducto"
                                class="form-control bg-light"
                                placeholder="Ej: Tomate Cherry Orgánico"
                                required
                            >
                        </div>

                        <div class="col-md-6">

                            <label class="form-label fw-bold">
                                Tipo de Producto *
                            </label>

                            <select 
                                id="tipoProducto"
                                class="form-select bg-light"
                                required
                            >

                                <option value="" selected disabled>
                                    Seleccionar tipo
                                </option>

                                <option value="Semillas">
                                    Semillas
                                </option>

                                <option value="Concentrados">
                                    Concentrados
                                </option>

                                <option value="Herramientas">
                                    Herramientas
                                </option>

                            </select>
                        </div>

                        <div class="col-12">

                            <label class="form-label fw-bold">
                                Precio ($) *
                            </label>

                            <input 
                                type="number"
                                id="precioProducto"
                                class="form-control bg-light"
                                placeholder="0.00"
                                step="0.01"
                                min="0.01"
                                required
                            >
                        </div>

                        <div class="col-12">

                            <label class="form-label fw-bold">
                                Descripción *
                            </label>

                            <textarea 
                                id="descripcionProducto"
                                class="form-control bg-light"
                                rows="3"
                                placeholder="Describe el producto..."
                                required
                            ></textarea>

                        </div>
                    </div>
                </div>

                <!-- INVENTARIO -->
                <div class="product-form__section mb-5">

                    <h2 class="h5 border-bottom pb-2 mb-4">
                        Inventario
                    </h2>

                    <div class="row g-3">

                        <div class="col-md-6">

                            <label class="form-label fw-bold">
                                Cantidad Disponible *
                            </label>

                            <input 
                                type="number"
                                id="cantidadProducto"
                                class="form-control bg-light"
                                placeholder="0"
                                min="0"
                                required
                            >
                        </div>

                        <div class="col-md-6">

                            <label class="form-label fw-bold">
                                Stock Mínimo *
                            </label>

                            <input 
                                type="number"
                                id="stockMinimo"
                                class="form-control bg-light"
                                value="5"
                                min="0"
                                required
                            >
                        </div>
                    </div>
                </div>

                <!-- ESTADOS -->
                <div class="product-form__section mb-5">

                    <h2 class="h5 border-bottom pb-2 mb-4">
                        Estados del Producto
                    </h2>

                    <div class="row g-3">

                        <div class="col-md-4">

                            <label class="product-form__status-card">

                                <input 
                                    type="checkbox"
                                    id="checkActivo"
                                    class="form-check-input me-2"
                                >

                                Activo
                            </label>
                        </div>

                        <div class="col-md-4">

                            <label class="product-form__status-card">

                                <input 
                                    type="checkbox"
                                    id="checkDisponible"
                                    class="form-check-input me-2"
                                >

                                Disponible
                            </label>
                        </div>

                        <div class="col-md-4">

                            <label class="product-form__status-card">

                                <input 
                                    type="checkbox"
                                    id="checkDescuento"
                                    class="form-check-input me-2"
                                >

                                En descuento
                            </label>
                        </div>
                    </div>

                    <!-- DESCUENTO -->
                    <div 
                        id="grupoDescuento"
                        class="product-form__discount-container product-form__section mt-4 d-none animate-fade-in"
                    >

                        <div class="row align-items-center">

                            <div class="col-12 mb-3">

                                <label class="d-flex align-items-center mb-0">

                                    <span class="me-2">%</span>

                                    Porcentaje de Descuento

                                    <span class="ms-1">*</span>

                                </label>
                            </div>

                            <div class="col-12">

                                <div class="input-group">

                                    <input 
                                        type="number"
                                        id="inputDescuento"
                                        class="form-control"
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                    >

                                    <span class="input-group-text">
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- IMÁGENES -->
                <div class="product-form__section mb-5">

                    <h2 class="h5 border-bottom pb-2 mb-4">
                        Imágenes del Producto
                    </h2>

                    <div 
                        class="alert alert-info d-flex align-items-center gap-2 mb-3"
                    >

                        <span>
                            Solo se permiten imágenes de máximo 
                            <strong>${LIMITE_MB_IMAGEN} MB</strong>.
                        </span>
                    </div>

                    <div class="mb-3">

                        <input 
                            class="form-control bg-light"
                            type="file"
                            id="imagenesProducto"
                            accept="image/*"
                            multiple
                            required
                        >

                        <div 
                            id="mensajeErrorImagen"
                            class="invalid-feedback d-block"
                            style="display:none!important;"
                        ></div>
                    </div>

                    <div 
                        id="contenedorPreview"
                        class="d-flex flex-wrap gap-3"
                    ></div>
                </div>

                <!-- DETALLES -->
                <div class="product-form__section mb-4">

                    <h2 class="h5 border-bottom pb-2 mb-4">
                        Detalles Adicionales
                    </h2>

                    <textarea 
                        id="detallesProducto"
                        class="form-control"
                        rows="4"
                        placeholder="Escribe detalles adicionales..."
                    ></textarea>

                </div>

                <!-- BOTONES -->
                <div class="d-flex gap-3 mt-4">

                    <button 
                        type="submit"
                        class="btn btn-success flex-grow-1 py-2 fw-bold"
                    >

                        Agregar Producto
                    </button>

                    <button 
                        type="reset"
                        id="btnLimpiar"
                        class="btn btn-outline-secondary px-5 py-2"
                    >

                        Limpiar
                    </button>
                </div>

            </form>
        </div>
    </section>
    `;
}

export function initAddProductLogic() {

    const inputImagenes =
        document.getElementById('imagenesProducto');

    const contenedorPreview =
        document.getElementById('contenedorPreview');

    const botonLimpiar =
        document.getElementById('btnLimpiar');

    const mensajeError =
        document.getElementById('mensajeErrorImagen');

    const formulario =
        document.getElementById('formularioProducto');

    if (!inputImagenes || !contenedorPreview) return;

    let imagenesValidas = [];

    // ==============================
    // SUBIR IMÁGENES
    // ==============================

    inputImagenes.addEventListener('change', (evento) => {

        const archivos = Array.from(evento.target.files);

        const imagenesRechazadas = [];

        archivos.forEach((archivo) => {

            if (!archivo.type.startsWith('image/')) return;

            if (archivo.size > LIMITE_BYTES_IMAGEN) {

                imagenesRechazadas.push(
                    `${archivo.name} (${(archivo.size / 1024 / 1024).toFixed(2)} MB)`
                );

                return;
            }

            imagenesValidas.push(archivo);

            const lector = new FileReader();

            lector.onload = (e) => {

                const tarjetaImagen =
                    document.createElement('div');

                tarjetaImagen.className =
                    'product-form__thumb-container position-relative';

                tarjetaImagen.innerHTML = `
                
                    <div class="product-form__img-thumb rounded border">

                        <img 
                            src="${e.target.result}"
                            class="img-fluid"
                            alt="Vista previa"
                        >

                    </div>

                    <div class="small text-muted text-center mt-1">

                        ${(archivo.size / 1024).toFixed(0)} KB

                    </div>

                    <button 
                        type="button"
                        class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 btnEliminarImagen"
                    >

                        &times;

                    </button>
                `;

                tarjetaImagen
                    .querySelector('.btnEliminarImagen')
                    .addEventListener('click', () => {

                        imagenesValidas =
                            imagenesValidas.filter(
                                img => img.name !== archivo.name
                            );

                        tarjetaImagen.remove();

                        limpiarErrores();
                    });

                contenedorPreview.appendChild(tarjetaImagen);
            };

            lector.readAsDataURL(archivo);
        });

        if (imagenesRechazadas.length > 0) {

            mostrarError(
                `Las siguientes imágenes superan el límite permitido de ${LIMITE_MB_IMAGEN} MB: ${imagenesRechazadas.join(', ')}`
            );

        } else {

            limpiarErrores();
        }

        inputImagenes.value = '';
    });

    // ==============================
    // MOSTRAR ERROR
    // ==============================

    function mostrarError(texto) {

        mensajeError.textContent = texto;

        mensajeError.style.display = 'block';

        inputImagenes.classList.add('is-invalid');
    }

    // ==============================
    // LIMPIAR ERROR
    // ==============================

    function limpiarErrores() {

        mensajeError.textContent = '';

        mensajeError.style.display = 'none';

        inputImagenes.classList.remove('is-invalid');
    }

    // ==============================
    // LIMPIAR FORMULARIO
    // ==============================

    if (botonLimpiar) {

        botonLimpiar.addEventListener('click', () => {

            contenedorPreview.innerHTML = '';

            imagenesValidas = [];

            limpiarErrores();

            if (grupoDescuento) {
                grupoDescuento.classList.add('d-none');
            }
        });
    }

    // ==============================
    // DESCUENTOS
    // ==============================

    const checkDescuento =
        document.getElementById('checkDescuento');

    const grupoDescuento =
        document.getElementById('grupoDescuento');

    const inputDescuento =
        document.getElementById('inputDescuento');

    if (checkDescuento && grupoDescuento) {

        checkDescuento.addEventListener('change', (e) => {

            if (e.target.checked) {

                grupoDescuento.classList.remove('d-none');

                inputDescuento.setAttribute('required', true);

            } else {

                grupoDescuento.classList.add('d-none');

                inputDescuento.value = '';

                inputDescuento.removeAttribute('required');
            }
        });
    }

    // ==============================
    // GUARDAR PRODUCTO
    // ==============================

    if (formulario) {

        formulario.addEventListener('submit', (e) => {

            e.preventDefault();

            if (imagenesValidas.length === 0) {

                mostrarError(
                    'Debes subir al menos una imagen.'
                );

                return;
            }

            const promesasImagenes =
                imagenesValidas.map((archivo) => {

                    return new Promise((resolve) => {

                        const lector = new FileReader();

                        lector.onload = (evento) =>
                            resolve(evento.target.result);

                        lector.readAsDataURL(archivo);
                    });
                });

            Promise.all(promesasImagenes)
                .then((imagenesConvertidas) => {

                    try {

                        const nuevoProducto =
                            new Producto({

                                id: crypto.randomUUID(),

                                nombre:
                                    document.getElementById('nombreProducto').value,

                                precio:
                                    parseFloat(
                                        document.getElementById('precioProducto').value
                                    ),

                                descripcion:
                                    document.getElementById('descripcionProducto').value,

                                imagen:
                                    imagenesConvertidas,

                                detalles: {

                                    enPromocion:
                                        checkDescuento?.checked || false,

                                    porcentajeDescuento:
                                        checkDescuento?.checked
                                            ? parseFloat(inputDescuento.value)
                                            : 0
                                },

                                cantidad:
                                    parseInt(
                                        document.getElementById('cantidadProducto').value
                                    ),

                                tipoProducto:
                                    document.getElementById('tipoProducto').value,

                                fechaDeIngreso:
                                    new Date().toISOString().split('T')[0],

                                activo:
                                    document.getElementById('checkActivo').checked,

                                stockMinimo:
                                    parseInt(
                                        document.getElementById('stockMinimo').value
                                    )
                            });

                        products.push(nuevoProducto);

                        const productosGuardados =
                            JSON.parse(
                                localStorage.getItem('listaProducts')
                            ) || [];

                        productosGuardados.push(nuevoProducto);

                        localStorage.setItem(
                            'listaProducts',
                            JSON.stringify(productosGuardados)
                        );

                        alert('Producto agregado correctamente');

                        formulario.reset();

                        contenedorPreview.innerHTML = '';

                        imagenesValidas = [];

                        limpiarErrores();

                        if (grupoDescuento) {

                            grupoDescuento.classList.add('d-none');

                            inputDescuento.removeAttribute('required');
                        }

                    } catch (error) {

                        alert(
                            'Error al guardar producto: ' +
                            error.message
                        );
                    }
                });
        });
    }
}