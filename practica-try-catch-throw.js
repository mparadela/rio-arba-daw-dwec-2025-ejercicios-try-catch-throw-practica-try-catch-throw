// ====================================
// FUNCIONES DE VALIDACIÓN CON THROW
// ====================================

function validarNombre(nombre) {
    if (nombre.trim() === '') {
        throw new Error('El nombre es obligatorio');
    }

    if (nombre.trim().length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres');
    }

    return true;
}

/**
 * Ya implementada - no tocar
 */
function validarEmail(email) {
    if (email.trim() === '') {
        throw new Error('El email es obligatorio');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('El formato del email no es válido');
    }
    
    return true;
}

function validarTelefono(telefono) {
    if (telefono.trim() === '') {
        throw new Error('El teléfono es obligatorio');
    }

    const telefonoRegex = /^[679]\d{8}$/;
    if (!telefonoRegex.test(telefono)) {
        throw new Error('El teléfono debe tener 9 dígitos y empezar por 6, 7 o 9');
    }

    return true;
}

// ====================================
// MANEJO DEL FORMULARIO
// ====================================

const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const mensajeDiv = document.getElementById('mensaje');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpiar estados anteriores
    nombreInput.classList.remove('valido', 'invalido');
    emailInput.classList.remove('valido', 'invalido');
    telefonoInput.classList.remove('valido', 'invalido');
    mensajeDiv.innerHTML = '';

    const errores = [];

    // Validar nombre
    try {
        validarNombre(nombreInput.value);
        nombreInput.classList.add('valido');
    } catch (error) {
        nombreInput.classList.add('invalido');
        errores.push(`Nombre: ${error.message}`);
    }

    // Validar email
    try {
        validarEmail(emailInput.value);
        emailInput.classList.add('valido');
    } catch (error) {
        emailInput.classList.add('invalido');
        errores.push(`Email: ${error.message}`);
    }

    // Validar teléfono
    try {
        validarTelefono(telefonoInput.value);
        telefonoInput.classList.add('valido');
    } catch (error) {
        telefonoInput.classList.add('invalido');
        errores.push(`Teléfono: ${error.message}`);
    }

    // Mostrar resultado
    if (errores.length > 0) {
        mensajeDiv.className = 'mensaje error';
        mensajeDiv.innerHTML = `
            <strong>✗ Errores encontrados:</strong><br>
            ${errores.map(e => `• ${e}`).join('<br>')}
        `;
    } else {
        mensajeDiv.className = 'mensaje exito';
        mensajeDiv.innerHTML = `
            <strong>✓ Formulario válido</strong><br>
            Los datos se han validado correctamente.
        `;

        console.log('Datos válidos:', {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value
        });
    }
});
