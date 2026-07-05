
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function soloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

function validarLongitud(numero, maxLongitud) {
    const cadena = String(numero).trim();
    return cadena.length > 0 && cadena.length <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}


function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{8,}$/;
    return regex.test(password);
}


function campoVacio(texto) {
    return texto.trim() === "";
}

function validarTelefonoExacto(telefono) {
    return String(telefono).trim().length === 10;
}



const formRegistro = document.getElementById('formRegistro');
if (formRegistro) {
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const fechaNac = document.getElementById('fechaNac').value;

        if (campoVacio(nombre) || campoVacio(correo) || campoVacio(telefono) || campoVacio(fechaNac)) {
            Swal.fire('Campos vacíos', 'Por favor, rellena todos los campos.', 'error');
            return;
        }

        if (!soloLetras(nombre)) {
            Swal.fire('Nombre inválido', 'El nombre solo acepta letras.', 'warning');
            return;
        }

        if (!validarCorreo(correo)) {
            Swal.fire('Correo inválido', 'Formato de correo incorrecto.', 'warning');
            return;
        }

        if (!validarTelefonoExacto(telefono)) {
            Swal.fire('Teléfono inválido', 'Debe tener exactamente 10 dígitos.', 'warning');
            return;
        }

        const edad = calcularEdad(fechaNac);
        const esMayor = esMayorDeEdad(fechaNac);

     
        console.log("Nombre limpio:", nombre.trim());
        console.log("Nombre en formato título:", nombre.trim());
        console.log("Correo válido:", validarCorreo(correo));
        console.log("Teléfono válido:", validarTelefonoExacto(telefono));
        console.log("Edad calculada:", edad);
        console.log("Mayor de edad:", esMayor);

        document.getElementById('txtEdadResultado').innerText = edad;
        const divAlerta = document.getElementById('alertaMayoria');

        if (esMayor) {
            divAlerta.className = "alert alert-success mt-2";
            divAlerta.innerText = "Eres mayor de edad.";
        } else {
            divAlerta.className = "alert alert-danger mt-2";
            divAlerta.innerText = "Eres menor de edad.";
        }

        const miModal = new bootstrap.Modal(document.getElementById('modalEdad'));
        miModal.show();
    });
}


const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const correo = document.getElementById('loginCorreo').value;
        const password = document.getElementById('loginPassword').value;

        console.log("Intentando validar login...");

        if (campoVacio(correo) || campoVacio(password)) {
            Swal.fire('Campos vacíos', 'Ingresa tus credenciales completas.', 'error');
            return;
        }

        if (!validarCorreo(correo)) {
            Swal.fire('Correo inválido', 'Formato de correo incorrecto.', 'warning');
            return;
        }

        if (!validarPassword(password)) {
            Swal.fire('Contraseña inválida', 'La contraseña no cumple con los criterios de seguridad (Mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres).', 'warning');
            return;
        }

        console.log("Correo válido: true");
        console.log("Contraseña válida: true");

        Swal.fire('¡Éxito!', 'Campos validados correctamente.', 'success');
    });
}