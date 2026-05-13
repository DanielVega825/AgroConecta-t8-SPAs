export function Sesion() {
    return `
        <section class="card card-sesion" id="authCard">

            <a href="#/" class="back-home" title="Volver al inicio">
                <i class="bi bi-arrow-left-circle-fill"></i>
            </a>

            <div class="card-bg">
                
                <div class="overlay-panel overlay-right">
                    <h3>Beneficios de tener tu cuenta</h3>
                    <ul class="benefits-list">
                        <li><i class="bi bi-gift"></i> Accede a tarifas especiales.</li>
                        <li><i class="bi bi-star-fill"></i> Guardar medios de pago y datos.</li>
                        <li><i class="bi bi-bookmark-heart"></i> Recomendaciones personalizadas.</li>
                    </ul>
                </div>

                
                <div class="overlay-panel overlay-left">
                    <h3>Crea tu cuenta, si aún no la tienes</h3>
                    <p>Vive una experiencia completa de compra:</p>
                    <ul class="benefits-list">
                        <li><i class="bi bi-receipt"></i> Revisa tus compras.</li>
                        <li><i class="bi bi-geo-alt"></i> Guardar tus direcciones de envío.</li>
                        <li><i class="bi bi-cart-check-fill"></i> Gestiona tu post venta.</li>
                    </ul>
                </div>
            </div>

            <div class="form signin active">
                <form id="loginForm">
                    <img src="assets/imgs/logo2.png" class="form-logo">
                    <h2>Iniciar sesión</h2>
                    <input type="email" id="loginEmail" placeholder="Correo electrónico" required>
                    <div class="password-wrapper" style="position: relative;">
                        <input type="password" id="loginPassword" placeholder="Contraseña" required style="padding-right: 40px;">
                        <i class="bi bi-eye-slash text-muted" id="togglePasswordLogin" style="position: absolute; right: 15px; top: 15px; cursor: pointer; font-size: 1.2rem; z-index: 10;"></i>
                        
                    </div>
                    <button type="submit">INICIAR SESIÓN</button>
                    <p>¿No tienes cuenta? <em id="goToSignup">Registrarse</em></p>
                </form>
            </div>

            <div class="form signup">
                <form id="signupForm">
                    <h2>Registrarse</h2>
                    <input type="text" id="nombre" placeholder="Nombre" required>
                    <input type="text" id="apellido" placeholder="Apellido" required>
                    <input type="tel" id="telefono" placeholder="Número de teléfono" required>
                    <input type="email" id="email" placeholder="Correo electrónico" required>
                    
                    <div class="password-wrapper" style="position: relative;">
                        <input type="password" id="password" placeholder="Contraseña" required style="padding-right: 40px;">
                        <i class="bi bi-eye-slash text-muted" id="togglePassword" style="position: absolute; right: 15px; top: 15px; cursor: pointer; font-size: 1.2rem; z-index: 10;"></i>
                        <div class="strength-meter">
                            <div id="strength-bar"></div>
                        </div>
                        <small id="strength-text">Seguridad de la contraseña</small>
                    </div>

                    <div class="terms-wrapper">
                        <input type="checkbox" id="terms" required>
                        <label for="terms">
                            Acepto los <a href="#">términos y condiciones</a> y el tratamiento de datos.
                        </label>
                    </div>

                    <button type="submit" id="btn-registrar">REGISTRARSE</button>
                    <p>¿Ya tienes cuenta? <em id="goToSignin">Iniciar sesión</em></p>
                </form>
            </div>
        </section>
    `;
}

export function gestionSesion() {
    
    const card = document.getElementById("authCard");
    const btnSignup = document.getElementById("goToSignup");
    const btnSignin = document.getElementById("goToSignin");
    const formRegistro = document.getElementById("signupForm");
    const formLogin = document.getElementById("loginForm");

    const termsCheckbox = document.getElementById("terms");

    const passwordInput = document.getElementById("password");
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");
    const btnRegistrar = document.getElementById("btn-registrar");

    // Cambio de vista entre Login y Registro
    const toggleView = () => {
        card.classList.toggle("signup-mode");
    };

    const togglePassword = document.getElementById("togglePassword");
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    }

    const togglePasswordLogin = document.getElementById("togglePasswordLogin");
    if (togglePasswordLogin && document.getElementById("loginPassword")) {
        togglePasswordLogin.addEventListener('click', function () {
            const type = document.getElementById("loginPassword").getAttribute('type') === 'password' ? 'text' : 'password';
            document.getElementById("loginPassword").setAttribute('type', type);
            this.classList.toggle('bi-eye');
            this.classList.toggle('bi-eye-slash');
        });
    }

    if (btnSignup) btnSignup.addEventListener("click", toggleView);
    if (btnSignin) btnSignin.addEventListener("click", toggleView);

    if (passwordInput) {
        passwordInput.addEventListener("input", () => {
            const val = passwordInput.value;
            let nivel = 0;

            if (val.length >= 8) nivel++;
            if (/[A-Z]/.test(val)) nivel++;
            if (/[0-9]/.test(val)) nivel++;

            strengthBar.className = ""; // Resetear clases anteriores
            
            if (val.length === 0) {
                strengthBar.style.width = "0%";
                strengthText.textContent = "Seguridad de la contraseña";
            } else if (nivel <= 1) {
                strengthBar.classList.add("weak");
                strengthText.textContent = "Débil: usa 8+ caracteres, mayúsculas y números";
            } else if (nivel === 2) {
                strengthBar.classList.add("medium");
                strengthText.textContent = "Media: casi segura";
            } else if (nivel === 3) {
                strengthBar.classList.add("strong");
                strengthText.textContent = "¡Contraseña Segura!";
            }
        });
    }

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = passwordInput.value.trim();

        if(!termsCheckbox.checked) {
            alert("Acepta terminos para continuar");
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            strengthText.style.color = "red";
            strengthText.textContent = "8 caracteres minímo, 1 Mayuscula y 1 numero";
            return;
        }

        const originalText = btnRegistrar.innerHTML;
        btnRegistrar.innerHTML = 'REGISTRADO CON ÉXITO ✓';
        btnRegistrar.classList.add("btn-success-anim");
        btnRegistrar.disabled = true;

        // Simulación de guardado y transición
        setTimeout(() => {
            const usuario = { nombre, email, password };
            localStorage.setItem("usuario", JSON.stringify(usuario));

            // Resetear botón y volver al Login
            btnRegistrar.innerHTML = originalText;
            btnRegistrar.classList.remove("btn-success-anim");
            btnRegistrar.disabled = false;
            
            toggleView();
        }, 2500);
    });

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // 1. Validar usuario administrador hardcodeado
        if (email === "admin@admin.com" && password === "admin123") {
            alert("Inicio de sesión exitoso. Bienvenido Administrador.");
            localStorage.setItem("userLogged", JSON.stringify({ email: "admin@admin.com", nombre: "Administrador", role: "admin" }));
            window.location.hash = "#/panel";
            return;
        }

        // 2. Validar usuario almacenado en local storage
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
            alert("Inicio de sesión exitoso. Bienvenido " + usuarioGuardado.nombre);
            localStorage.setItem("userLogged", JSON.stringify({ email: usuarioGuardado.email, nombre: usuarioGuardado.nombre, role: "user" }));
            window.location.hash = "#/"; 
        } else {
            alert("Nombre de usuario o contraseña inválidos.");
        }
    });
}