export function Sesion() {
    return `
        <section class="card" id="authCard">
            <!-- El fondo que se mueve -->
            <div class="card-bg"></div>

            <div class="form signin active">
                <form id="loginForm">
                    <img src="assets/imgs/logo2.png" class="form-logo">
                    <h2>Iniciar sesión</h2>
                    <input type="email" id="loginEmail" placeholder="Correo electrónico" required>
                    <input type="password" id="loginPassword" placeholder="Contraseña" required>
                    <button type="submit">INICIAR SESIÓN</button>
                    <p>¿No tienes cuenta? <em id="goToSignup">Registrarse</em></p>
                </form>
            </div>

            <div class="form signup">
                <form id="signupForm">
                    <img src="assets/imgs/logo2.png" class="form-logo">
                    <h2>Registrarse</h2>
                    <input type="text" id="nombre" placeholder="Nombre" required>
                    <input type="text" id="apellido" placeholder="Apellido" required>
                    <input type="tel" id="telefono" placeholder="Número de teléfono" required>
                    <input type="email" id="email" placeholder="Correo electrónico" required>
                    <input type="password" id="password" placeholder="Contraseña" required>
                    <button type="submit">REGISTRARSE</button>
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

    const toggleView = () => {
        card.classList.toggle("signup-mode");
    };

    if(btnSignup) btnSignup.addEventListener("click", toggleView);
    if(btnSignin) btnSignin.addEventListener("click", toggleView);

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        const usuario = { nombre, email, password };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert("Registro exitoso");
        toggleView();
    });

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
            window.location.href = "index.html";
        } else {
            alert("Credenciales incorrectas o usuario no existe");
        }
    });
}