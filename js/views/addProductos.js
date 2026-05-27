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
                <div class="product-form__editor rounded border shadow-sm">
                    <div class="product-form__editor-toolbar bg-light border-bottom p-2 d-flex flex-wrap gap-2 align-items-center" style="position: sticky; top: 0; z-index: 10;">
                        <div class="btn-group btn-group-sm">
                            <select id="btn-formatBlock" class="form-select form-select-sm border-0 bg-transparent text-secondary" style="width: auto; font-weight: bold; cursor: pointer; box-shadow: none;" title="Estilos de Bloque">
                                <option value="p">Párrafo</option>
                                <option value="h1">Título 1</option>
                                <option value="h2">Título 2</option>
                                <option value="h3">Título 3</option>
                                <option value="h4">Título 4</option>
                            </select>
                        </div>
                        <div class="btn-group btn-group-sm border-end pe-2">
                            <button type="button" class="btn btn-light border-0 fw-bold" id="btn-bold" title="Negrita (Ctrl+B)">B</button>
                            <button type="button" class="btn btn-light border-0 fst-italic" id="btn-italic" title="Cursiva (Ctrl+I)">I</button>
                            <button type="button" class="btn btn-light border-0 text-decoration-underline" id="btn-underline" title="Subrayado (Ctrl+U)">U</button>
                            <button type="button" class="btn btn-light border-0 text-decoration-line-through" id="btn-strike" title="Tachado">S</button>
                        </div>
                        <div class="btn-group btn-group-sm border-end pe-2">
                            <button type="button" class="btn btn-light border-0" id="btn-subscript" title="Subíndice">X<sub>2</sub></button>
                            <button type="button" class="btn btn-light border-0" id="btn-superscript" title="Superíndice">X<sup>2</sup></button>
                        </div>
                        <div class="btn-group btn-group-sm border-end pe-2 d-flex align-items-center">
                            <label for="btn-foreColor" class="mb-0 text-secondary small me-1 ms-1" title="Color del texto"><i class="bi bi-palette-fill"></i></label>
                            <input type="color" id="btn-foreColor" class="form-control form-control-color p-0 border-0 bg-transparent" value="#000000" title="Color del texto" style="width: 24px; height: 24px; cursor: pointer;">
                            <label for="btn-backColor" class="mb-0 text-secondary small me-1 ms-2" title="Color de fondo"><i class="bi bi-paint-bucket"></i></label>
                            <input type="color" id="btn-backColor" class="form-control form-control-color p-0 border-0 bg-transparent" value="#ffffff" title="Color de fondo" style="width: 24px; height: 24px; cursor: pointer;">
                        </div>
                        <div class="btn-group btn-group-sm border-end pe-2">
                            <button type="button" class="btn btn-light border-0" id="btn-alignLeft" title="Alinear a la izquierda"><i class="bi bi-text-left"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-alignCenter" title="Centrar"><i class="bi bi-text-center"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-alignRight" title="Alinear a la derecha"><i class="bi bi-text-right"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-alignJustify" title="Justificar"><i class="bi bi-justify"></i></button>
                        </div>
                        <div class="btn-group btn-group-sm border-end pe-2">
                            <button type="button" class="btn btn-light border-0" id="btn-ul" title="Lista con viñetas"><i class="bi bi-list-ul"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-ol" title="Lista numerada"><i class="bi bi-list-ol"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-outdent" title="Reducir sangría"><i class="bi bi-text-indent-right"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-indent" title="Aumentar sangría"><i class="bi bi-text-indent-left"></i></button>
                        </div>
                        <div class="btn-group btn-group-sm border-end pe-2">
                            <button type="button" class="btn btn-light border-0" id="btn-link" title="Insertar enlace"><i class="bi bi-link-45deg"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-image" title="Insertar imagen"><i class="bi bi-image"></i></button>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-light border-0" id="btn-removeFormat" title="Limpiar formato"><i class="bi bi-eraser"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-undo" title="Deshacer"><i class="bi bi-arrow-counterclockwise"></i></button>
                            <button type="button" class="btn btn-light border-0" id="btn-redo" title="Rehacer"><i class="bi bi-arrow-clockwise"></i></button>
                        </div>
                    </div>
                    <div id="productDescriptionLong" contenteditable="true" class="form-control border-0 shadow-none editor-content bg-white" style="min-height: 250px; overflow-y: auto; outline: none; padding: 15px; font-size: 1rem;" placeholder="Escribe detalles adicionales y formatea el texto aquí..."></div>
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

    // Lógica del Editor de Texto Enriquecido para DescripcionLong
    const editor = document.getElementById("productDescriptionLong");
    const actions = [
        "bold", "italic", "underline", "strikeThrough",
        "subscript", "superscript",
        "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
        "insertUnorderedList", "insertOrderedList",
        "outdent", "indent",
        "removeFormat", "undo", "redo"
    ];

    if (editor) {
        const executeCmd = (cmd, value = null) => {
            document.execCommand(cmd, false, value);
            editor.focus();
        };

        actions.forEach(action => {
            // Mapeamos los IDs de botones con las acciones de document.execCommand
            const btnId = `btn-${action.replace('strikeThrough', 'strike').replace('justifyLeft', 'alignLeft').replace('justifyCenter', 'alignCenter').replace('justifyRight', 'alignRight').replace('justifyFull', 'alignJustify').replace('insertUnorderedList', 'ul').replace('insertOrderedList', 'ol')}`;
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.onclick = (e) => { e.preventDefault(); executeCmd(action); };
            }
        });

        // Controles con valor
        const btnFormat = document.getElementById("btn-formatBlock");
        if (btnFormat) btnFormat.onchange = (e) => { executeCmd("formatBlock", e.target.value); };

        const foreColor = document.getElementById("btn-foreColor");
        if (foreColor) foreColor.oninput = (e) => { executeCmd("foreColor", e.target.value); };

        const backColor = document.getElementById("btn-backColor");
        if (backColor) backColor.oninput = (e) => { executeCmd("hiliteColor", e.target.value); };

        const btnLink = document.getElementById("btn-link");
        if (btnLink) btnLink.onclick = (e) => {
            e.preventDefault();
            const url = prompt("Introduce la URL del enlace (ej: https://ejemplo.com):");
            if (url) executeCmd("createLink", url);
        };

        const btnImage = document.getElementById("btn-image");
        if (btnImage) btnImage.onclick = (e) => {
            e.preventDefault();
            const url = prompt("Introduce la URL de la imagen:");
            if (url) executeCmd("insertImage", url);
        };
    }

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
                const tipoValue = document.getElementById('productType').value;
                let catId = 1;
                if (tipoValue === "Semillas") catId = 1;
                else if (tipoValue === "Concentrados") catId = 2;
                else if (tipoValue === "Herramientas") catId = 3;

                const nuevoProducto = new Producto({
                    nombre: document.getElementById('productName').value,
                    precio: parseFloat(document.getElementById('productPrice').value),
                    descripcion: document.getElementById('productDescription').value,
                    imagenes: imagenesCargadas,
                    detalles: {
                        enDescuento: checkPromotion?.checked || false,
                        porcentajeDescuento: checkPromotion?.checked ? parseFloat(discountInput.value) : null,
                    },
                    cantidad: parseInt(document.getElementById('productQuantity').value),
                    stockMinimo: parseInt(document.getElementById('productMinStock').value),
                    descripcionLong: editor ? editor.innerHTML : "",
                    categoriaId: catId
                });

                // Campos para compatibilidad con el panel
                nuevoProducto.tipoProducto = tipoValue;
                nuevoProducto.enPromocion = checkPromotion?.checked || false;
                nuevoProducto.descuento = checkPromotion?.checked ? parseFloat(discountInput.value) : 0;

                //Subir los productos al backend
                // uploadProduct(nuevoProducto);

                products.push(nuevoProducto);
                console.log("Producto Agregado:", products);

                localStorage.setItem("listaProducts", JSON.stringify(products))
                alert("¡Producto agregado con éxito!");


                form.reset();
                if (editor) editor.innerHTML = '';
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

// async function uploadProduct(product) {
//     console.log(JSON.stringify(product));
//     try {
//         await fetch('http://localhost:8080/api/productos', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(product),
//         });
//     } catch (error) {
//         console.error("Error al subir el producto:", error);
//     }
// }
