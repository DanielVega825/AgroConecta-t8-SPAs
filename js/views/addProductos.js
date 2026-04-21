
export function AddProduct() {
    return `
        <section class="container product-form py-5">
    <div class="container">
        <form class="product-form__card card shadow-sm p-4">
            
            <div class="product-form__section mb-5">
                <h2 class="h5 border-bottom pb-2 mb-4">Información Básica</h2>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Nombre del Producto *</label>
                        <input type="text" class="form-control bg-light" placeholder="Ej: Tomate Cherry Orgánico">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Tipo de Producto *</label>
                        <select class="form-select bg-light">
                            <option selected disabled>Seleccionar tipo</option>
                            <option value="1">Vegetales</option>
                            <option value="2">Frutas</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label class="form-label fw-bold">Precio ($) *</label>
                        <input type="number" class="form-control bg-light" placeholder="0.00">
                    </div>
                    <div class="col-12">
                        <label class="form-label fw-bold">Descripción *</label>
                        <textarea class="form-control bg-light" rows="3" placeholder="Describe el producto..."></textarea>
                    </div>
                </div>
            </div>

            <div class="product-form__section mb-5">
                <h2 class="h5 border-bottom pb-2 mb-4">Inventario</h2>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Cantidad Disponible *</label>
                        <input type="number" class="form-control bg-light" placeholder="0">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold">Stock Mínimo *</label>
                        <input type="number" class="form-control bg-light" value="5">
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
                            <input type="checkbox" id="checkPromotion" class="form-check-input me-2"> En Promoción
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
                    <input class="form-control bg-light" type="file" id="productImages" accept="image/*" multiple>
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
    const form = document.getElementById('form-add-product');
    const previewContainer = document.getElementById('previewContainer');
    
    // Referencias para el descuento
    const checkPromotion = document.getElementById('checkPromotion');
    const discountInput = document.getElementById('discountInput');
    const discountGroup = document.getElementById('discountGroup');

    if (!form) return;

    // 1. Manejo de visibilidad del descuento (lo que ya teníamos)
    checkPromotion?.addEventListener('change', (e) => {
        discountGroup.classList.toggle('d-none', !e.target.checked);
    });

    // 2. Escuchar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que la página se recargue

        // Extraer las imágenes del preview (guardamos los src de los <img>)
        const imagenesCargadas = Array.from(previewContainer.querySelectorAll('img'))
                                      .map(img => img.src);

        // Crear el objeto de detalles adicionales
        const detallesAdicionales = {
            enPromocion: checkPromotion.checked,
            porcentajeDescuento: checkPromotion.checked ? parseFloat(discountInput.value) : 0,
            // Aquí podrías capturar el contenido del editor de texto enriquecido si lo tienes implementado
            descripcionLarga: form.querySelector('.product-form__editor-content')?.value || ""
        };

        // 3. Instanciar la clase Producto
        const nuevoProducto = new Producto({
            id: crypto.randomUUID(), // Genera un ID único
            nombre: form.querySelector('input[placeholder*="Nombre"]').value,
            precio: parseFloat(form.querySelector('input[type="number"]').value),
            descripcion: form.querySelector('textarea').value,
            imagen: imagenesCargadas,
            detalles: detallesAdicionales,
            cantidad: parseInt(form.querySelector('input[placeholder="0"]').value) || 0,
            tipoProducto: form.querySelector('select').value,
            fechaDeIngreso: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            activo: form.querySelector('.product-form__status-card input').checked, // Asumiendo que el primero es Activo
            stockMinimo: parseInt(form.querySelectorAll('input[type="number"]')[1].value) || 5
        });

        // 4. Añadir al arreglo global
        productos.push(nuevoProducto);

        // 5. Feedback y Limpieza
        console.log("Producto Agregado:", productos);
        alert(`¡Producto "${nuevoProducto.nombre}" agregado con éxito!`);
        
        form.reset();
        previewContainer.innerHTML = '';
        discountGroup.classList.add('d-none');
    });

    // Llamamos a la lógica de imágenes que ya tenías
    initImageLogic(previewContainer);
}

function initImageLogic(container) {
    const input = document.getElementById('productImages');
    input?.addEventListener('change', (e) => {
        const files = e.target.files;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const div = document.createElement('div');
                div.className = 'product-form__thumb-container position-relative';
                div.innerHTML = `
                    <div class="product-form__img-thumb rounded border">
                        <img src="${event.target.result}" class="img-fluid">
                    </div>
                    <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1">&times;</button>
                `;
                div.querySelector('button').onclick = () => div.remove();
                container.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });
}