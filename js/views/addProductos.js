import { Producto } from '../../models/productos.js';
import { products } from '../../data/products.js';

export function AddProduct() {
    return `
        <section class="product-form py-5">
    <div class="container p-5">
        <form id="productForm" class="product-form__card card">
            
            <div class="product-form__section mb-5">
                <h2 class="h5 border-bottom pb-2 mb-4">Información Básica</h2>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Nombre del Producto *</label>
                        <input type="text" id="productName" class="form-control bg-light" placeholder="Ej: Tomate Cherry Orgánico" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Tipo de Producto *</label>
                        <select id="productType" class="form-select bg-light" required>
                            <option value="" selected disabled>Seleccionar tipo</option>
                            <option value="Semillas">Semillas</option>
                            <option value="Concentrados">Concentrados</option>
                            <option value="Herramientas">Herramientas</option>
                            
                        </select>
                    </div>
                    <div class="col-12">
                        <label class="form-label fw-bold">Precio ($) *</label>
                        <input type="number" id="productPrice" class="form-control bg-light" placeholder="0.00" step="0.01" min="0.01" required>
                    </div>
                    <div class="col-12">
                        <label class="form-label fw-bold">Descripción *</label>
                        <textarea id="productDescription" class="form-control bg-light" rows="3" placeholder="Describe el producto..." required></textarea>
                    </div>
                </div>
            </div>

            <div class="product-form__section mb-5">
                <h2 class="h5 border-bottom pb-2 mb-4">Inventario</h2>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Cantidad Disponible *</label>
                        <input type="number" id="productQuantity" class="form-control bg-light" placeholder="0" min="0" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Stock Mínimo *</label>
                        <input type="number" id="productMinStock" class="form-control bg-light" value="5" min="0" required>
                    </div>
                </div>
            </div>

            <div class="product-form__section mb-5">
                <h2 class="h5 border-bottom pb-2 mb-4">Estados del Producto</h2>
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="product-form__status-card">
                            <input type="checkbox" class="form-check-input me-2"> Activo
                        </label>
                    </div>
                    <div class="col-md-4">
                        <label class="product-form__status-card">
                            <input type="checkbox" class="form-check-input me-2"> Disponible
                        </label>
                    </div>
                    <div class="col-md-4">
                        <label class="product-form__status-card">
                            <input type="checkbox" id="checkPromotion" class="form-check-input me-2"> En descuento
                        </label>
                    </div>
                </div>

                <div id="discountGroup" class="product-form__discount-container product-form__section mt-4 d-none animate-fade-in">
                    <div class="row align-items-center">
                        <div class="col-12 mb-3">
                            <label class="product-form__discount-label d-flex align-items-center mb-0">
                                <span class="product-form__discount-percent-icon me-2">%</span>
                                Porcentaje de Descuento 
                                <span class="product-form__discount-required ms-1">*</span>
                            </label>
                        </div>
                        <div class="col-12">
                            <div class="input-group">
                                <input type="number" id="discountInput" class="product-form__discount-input form-control" placeholder="0.00" min="0" max="100">
                                <span class="product-form__discount-percent-add-on input-group-text">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="product-form__section mb-5">
                <h2 class="h5 border-bottom pb-2 mb-4">Imágenes del Producto</h2>
                <div class="mb-3">
                    <input class="form-control bg-light" type="file" id="productImages" accept="image/*" multiple required>
                </div>
                <div id="previewContainer" class="product-form__image-preview d-flex flex-wrap gap-3"></div>
            </div>

            <div class="product-form__section mb-4">
                <h2 class="h5 border-bottom pb-2 mb-4">Detalles Adicionales</h2>
                <div class="product-form__editor rounded border">
                    <div class="product-form__editor-toolbar bg-light border-bottom p-2 d-flex gap-3">
                        <span class="text-muted small">Normal ▼</span>
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-light border-0 fw-bold">B</button>
                            <button type="button" class="btn btn-light border-0 fst-italic">I</button>
                            <button type="button" class="btn btn-light border-0 text-decoration-underline">U</button>
                        </div>
                    </div>
                    <textarea class="form-control border-0 shadow-none" rows="4" placeholder="Escribe detalles adicionales..."></textarea>
                </div>
            </div>

            <div class="d-flex gap-3 mt-4">
                <button type="submit" class="btn btn-success flex-grow-1 py-2 fw-bold">
                    <i class="bi bi-box-seam me-2"></i>Agregar Producto
                </button>
                <button type="reset" class="btn btn-outline-secondary px-5 py-2">
                    Limpiar
                </button>
            </div>

        </form>
    </div>
</section>
    `;
}
export function initAddProductLogic() {
    const input = document.getElementById('productImages');
    const container = document.getElementById('previewContainer');
    const btnReset = document.getElementById('btn-reset');


    if (!input || !container) return;

    input.addEventListener('change', (e) => {
        const files = e.target.files;

        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const thumbContainer = document.createElement('div');
                    thumbContainer.className = 'product-form__thumb-container position-relative';

                    thumbContainer.innerHTML = `
                        <div class="product-form__img-thumb rounded border">
                            <img src="${event.target.result}" class="img-fluid" alt="Preview">
                        </div>
                        <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 product-form__btn--remove">
                            &times;
                        </button>
                    `;

                    // Lógica para eliminar la miniatura individualmente
                    thumbContainer.querySelector('.product-form__btn--remove').onclick = () => thumbContainer.remove();

                    container.appendChild(thumbContainer);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Limpiar el contenedor al resetear el formulario
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            container.innerHTML = '';
        });
    }

    const checkPromotion = document.getElementById('checkPromotion');
    const discountGroup = document.getElementById('discountGroup');
    const discountInput = document.getElementById('discountInput');

    if (checkPromotion && discountGroup) {
        checkPromotion.addEventListener('change', (e) => {
            if (e.target.checked) {
                // Mostramos la sección y la hacemos requerida
                discountGroup.classList.remove('d-none');
                discountInput.setAttribute('required', 'true');
            } else {
                // Ocultamos y limpiamos el valor
                discountGroup.classList.add('d-none');
                discountInput.value = '';
                discountInput.removeAttribute('required');
            }
        });
    }

    // Aseguramos que la lógica de imágenes también se cargue
    initImageLogic();

    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Recopilar imágenes
            const imagenesCargadas = Array.from(container.querySelectorAll('img')).map(img => img.src);

            if (imagenesCargadas.length === 0) {
                alert("Por favor, sube al menos una imagen del producto.");
                return;
            }

            try {
                const nuevoProducto = new Producto({
                    id: crypto.randomUUID(),
                    nombre: document.getElementById('productName').value,
                    precio: parseFloat(document.getElementById('productPrice').value),
                    descripcion: document.getElementById('productDescription').value,
                    imagen: imagenesCargadas,
                    detalles: {
                        enPromocion: checkPromotion?.checked || false,
                        porcentajeDescuento: checkPromotion?.checked ? parseFloat(discountInput.value) : 0,
                    },
                    cantidad: parseInt(document.getElementById('productQuantity').value),
                    tipoProducto: document.getElementById('productType').value,
                    fechaDeIngreso: new Date().toISOString().split('T')[0],
                    activo: document.querySelectorAll('.product-form__status-card input')[0].checked,
                    stockMinimo: parseInt(document.getElementById('productMinStock').value)
                });

                products.push(nuevoProducto);
                console.log("Producto Agregado:", products);

                localStorage.setItem("listaProducts", JSON.stringify(products))
                alert("¡Producto agregado con éxito!");


                form.reset();
                container.innerHTML = '';
                if (discountGroup) {
                    discountGroup.classList.add('d-none');
                    discountInput.removeAttribute('required');
                }
            } catch (error) {
                alert("Error de validación: " + error.message);
            }
        });
    }
}

// Separamos la lógica de imágenes para limpieza
function initImageLogic() {
    const input = document.getElementById('productImages');
    const container = document.getElementById('previewContainer');
    if (!input || !container) return;

    input.addEventListener('change', (e) => {
        // ... (el código de FileReader que ya tienes) ...
    });
}