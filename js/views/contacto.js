export function Contacto() {
    return `
        <section class="hero">
            <span class="badge">Contacto</span>
            <h1>¿Cómo Podemos Ayudarte?</h1>
            <p>Estamos aquí para responder tus preguntas y ayudarte en lo que necesites. <br> Contáctanos por cualquiera de
                nuestros canales.</p>
        </section>

        <div class="contact-container">


            <aside class="contact-info">
                <div class="info-card">
                    <div class="icon-box green"><i class="bi bi-telephone"></i></div>
                    <h3>Teléfono</h3>
                    <p>Llámanos de lunes a viernes</p>
                    <a href="tel:+571234567890">+57 123 456 7890</a>
                    <a href="tel:+573001234567">+57 300 123 4567</a>
                </div>
    
                <div class="info-card">
                    <div class="icon-box green"><i class="bi bi-envelope"></i></div>
                    <h3>Correo Electrónico</h3>
                    <p>Escríbenos, te respondemos en 24h</p>
                    <a href="mailto:info@agroconecta.com">info@agroconecta.com</a>
                    <a href="mailto:soporte@agroconecta.com">soporte@agroconecta.com</a>
                </div>
    
                <div class="info-card">
                    <div class="icon-box yellow"><i class="bi bi-geo-alt"></i></div>
                    <h3>Ubicación</h3>
                    <p>Visítanos en nuestra oficina</p>
                    <p>Calle 123 #45-67 <br> Valledupar, Cesar <br> Colombia</p>
                </div>
    
                <div class="info-card">
                    <div class="icon-box orange"><i class="bi bi-clock"></i></div>
                    <h3>Horario de Atención</h3>
                    <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 1:00 PM</p>
                    <p>Domingos: Cerrado</p>
                </div>
            </aside>
    
            <section class="form-section">
                <div class="card-form">
                    <h2>Envíanos un Mensaje</h2>
                    <p>Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
    
                    <form>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Nombre Completo *</label>
                                <input type="text" placeholder="Juan Pérez" required>
                            </div>
                            <div class="form-group">
                                <label>Correo Electrónico *</label>
                                <input type="email" placeholder="tu@correo.com" required>
                            </div>
                            <div class="form-group">
                                <label>Teléfono *</label>
                                <input type="tel" placeholder="+57 300 123 4567" required>
                            </div>
                            <div class="form-group">
                                <label>Asunto *</label>
                                <select required>
                                    <option value="" disabled selected>Selecciona un asunto</option>
                                    <option>Ventas</option>
                                    <option>Soporte</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Mensaje *</label>
                            <textarea placeholder="Escribe tu mensaje aquí..." rows="5" required></textarea>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="privacy" required>
                            <label for="privacy">Acepto la política de privacidad y el tratamiento de mis datos personales
                                para recibir información sobre productos y servicios de AgroConecta.</label>
                        </div>
                        <button type="submit" class="btn-send">
                            <i class="bi bi-send"></i> Enviar Mensaje
                        </button>
                    </form>
                </div>
    
                <div class="whatsapp-card">
                    <h3>¿Prefieres hablar con nosotros directamente?</h3>
                    <p>También puedes contactarnos por WhatsApp para una respuesta más rápida. Nuestro equipo está
                        disponible de lunes a viernes de 8:00 AM a 6:00 PM.</p>
                    <button class="btn-whatsapp">
                        <i class="bi bi-whatsapp"></i> Chatea por WhatsApp
                    </button>
                </div>
            </section>
        </div>

        <section class="map-section">
            <h2>Encuéntranos</h2>
            <p>Visita nuestra oficina principal en Valledupar</p>
            <div class="map-placeholder">
                <div class="map-content">
                    <i class="bi bi-geo-alt-fill"></i>
                    <p>Mapa interactivo próximamente</p>
                    <span>Calle 123 #45-67, Valledupar, Cesar</span>
                </div>
            </div>
        </section>
    `;
}