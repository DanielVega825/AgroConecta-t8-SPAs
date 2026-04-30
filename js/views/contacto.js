/**
 * Vista de Contacto - AgroConecta
 * Ubicación: Florencia, Caquetá
 */
export function Contacto() {
    return `
        <section class="hero">
            <span class="badge">Contacto</span>
            <h1>¿Cómo Podemos Ayudarte?</h1>
            <p>Estamos aquí para responder tus preguntas y ayudarte en lo que necesites. <br> Contáctanos por cualquiera de nuestros canales.</p>
        </section>

        <div class="contact-container">
            <aside class="contact-info">
                <div class="info-card">
                    <div class="icon-box green"><i class="bi bi-telephone"></i></div>
                    <h3>Teléfono</h3>
                    <p>Llámanos de lunes a viernes</p>
                    <a href="tel:+573105885140">+57 310 588 5140</a>
                </div>
   
                <div class="info-card">
                    <div class="icon-box green"><i class="bi bi-envelope"></i></div>
                    <h3>Correo Electrónico</h3>
                    <p>Escríbenos, te respondemos en 24h</p>
                    <a href="mailto:info@agroconecta.com">agroconecta.generation@gmail.com</a>
                </div>
   
                <div class="info-card">
                    <div class="icon-box yellow"><i class="bi bi-geo-alt"></i></div>
                    <h3>Ubicación</h3>
                    <p>Visítanos en nuestra oficina</p>
                    <p>Transversal 21 # 3A 57 <br> Barrio Yapurá Sur, Florencia <br> Caquetá, Colombia</p>
                </div>
   
                <div class="info-card">
                    <div class="icon-box orange"><i class="bi bi-clock"></i></div>
                    <h3>Horario de Atención</h3>
                    <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
            </aside>
   
            <section class="form-section">
                <div class="card-form">
                    <h2>Envíanos un Mensaje</h2>
                    <p>Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
   
                    <form id="contact-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Nombre Completo *</label>
                                <input type="text" name="name" id="name" placeholder="Juan Pérez" required>
                            </div>
                            <div class="form-group">
                                <label>Correo Electrónico *</label>
                                <input type="email" name="email" id="email" placeholder="tu@correo.com" required>
                            </div>
                            <div class="form-group">
                                <label>Teléfono *</label>
                                <input type="tel" name="phone" id="phone" placeholder="+57 300 123 4567" required>
                            </div>
                            <div class="form-group">
                                <label>Asunto *</label>
                                <select name="subject" id="subject" required>
                                    <option value="" disabled selected>Selecciona un asunto</option>
                                    <option value="Ventas">Ventas</option>
                                    <option value="Soporte">Soporte</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Mensaje *</label>
                            <textarea name="message" id="message" placeholder="Escribe tu mensaje aquí..." rows="5" required></textarea>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="privacy" required>
                            <label for="privacy">Acepto la política de privacidad y el tratamiento de mis datos.</label>
                        </div>
                        <button type="submit" class="btn-send">
                            <i class="bi bi-send"></i> Enviar Mensaje
                        </button>
                    </form>
                </div>
   
                <div class="whatsapp-card">
                    <h3>¿Prefieres hablar con nosotros directamente?</h3>
                    <p>Chatea con nuestro equipo de soporte para una respuesta inmediata y personalizada por WhatsApp.</p>
                    <button class="btn-whatsapp">
                        <i class="bi bi-whatsapp"></i> Chatea por WhatsApp
                    </button>
                </div>
            </section>
        </div>

        <section class="map-section">
            <div class="container">
                <div class="map-header text-center mb-4">
                    <h2 class="heading-lg">Encuéntranos</h2>
                    <p class="text-muted">Visita nuestra oficina principal en Florencia, Caquetá</p>
                </div>
                <div class="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1573244840815!2d-75.6053805252874!3d1.6033329983815343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e244e43f3365851%3A0xc3928e08f58356f9!2sTv.%2021%20%233a-57%2C%20Florencia%2C%20Caquet%C3%A1!5e0!3m2!1ses!2sco!4v1714251234567!5m2!1ses!2sco" 
                        width="100%" 
                        height="450" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </section>
    `;
}

export function initContactForm() {
    const form = document.getElementById('contact-form');
    const btnWhatsapp = document.querySelector('.btn-whatsapp');

    // Lógica de WhatsApp
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            const numero = "573105885140";
            const texto = encodeURIComponent("Hola AgroConecta, vengo de la página web y me gustaría recibir más información.");
            window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
        });
    }

    // Lógica Formspree
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xnjldgyk", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert("✅ ¡Enviado! Gracias por contactarnos.");
                form.reset();
            } else {
                alert("❌ Hubo un error al enviar el mensaje.");
            }
        } catch (error) {
            alert("❌ Error de conexión al servidor.");
        }
    });
}