const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (e) => {
    e.preventDefault();

    //desestructuramos validarFormulario
    const { exito, errores } = validarFormulario();

    //validamos si la validacion da exito o error para ejecutar el resultado
    if (exito) {
        mostrarResultado();
    }else {
        mostrarMensajeDeError(errores)
    }
});

//leemos los datos que traemos del formulario HTML
const obtenerDatosFormulario = () => {
    const nombre = document.querySelector('#nombre').value;
    const tipoDocumento = document.querySelector('#tipoDocumento').value;
    const documento = document.querySelector('#numeroDocumento').value;
    const edad = document.querySelector('#edad').value
    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;
    const actividad = document.querySelector('#actividad').value;
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;

    const poblacion = edad < 60 ? edad < 30 ? "Joven" : "Adulto" : "Adulto Mayor"

    return {
        nombre,
        tipoDocumento,
        documento,
        edad,
        peso,
        altura,
        actividad,
        generoSeleccionado,
        poblacion
    }

}

//Hacemos las validaciones necesarias para el formulario
const validarFormulario =() => {
    const { nombre, tipoDocumento, documento, edad, peso, altura, actividad, generoSeleccionado, poblacion } = obtenerDatosFormulario();
    const errores = {};

    if (!nombre || !tipoDocumento || !documento || !edad || !peso || !altura || !actividad || !generoSeleccionado || !poblacion) {
        errores.formulario = 'Por favor, rellena todos los campos';
    }
    if (edad < 14 || edad > 120) {
        errores.edad = 'Por favor, ingresa una edad válida';
    }
    if (peso < 20 || peso > 700) {
        errores.peso ='Por favor, ingresa un peso válido';   
    }
    if (altura < 50 || altura > 250) {
        errores.altura = 'Por favor, ingresa una altura válida';   
    }
    //validamos si tenemos algun error dentro del objeto, caso contrario exito = true
    const exito = Object.keys(errores).length === 0;

    return {
        exito,
        errores,
    };
}

//hacemos el calculo de las calorias dependiendo de si es mujer o hombre
const calcularCalorias = () => {
    const { edad, peso, altura, actividad, generoSeleccionado } = obtenerDatosFormulario();

    parcialCalorias = Math.floor(actividad *  (10 * peso) + (6.25 * altura) - (5 * edad))

    const calorias = generoSeleccionado === 'M' 
            ? (parcialCalorias + 5) : (parcialCalorias - 161);

    return {
        calorias,
        ...obtenerDatosFormulario(),
    }

}

//imprimimos el resultado en el html
const mostrarResultado = () => {
    const { nombre, tipoDocumento, documento, poblacion, calorias } = calcularCalorias();

    aparecerResultado()
    resultado.innerHTML = `
    <div class="card-body d-flex flex-column justify-content-center align-items-center w-100 h-100 my-3 shadow text-center">
        <h2>El paciente ${nombre}</h2>
        <p>Identificado con ${tipoDocumento} No. ${documento}</p>
        <span>Requiere un total de <strong>${calorias}</strong> kcal para el sostenimiento de su TBM.</span>
        <span>El grupo poblacional al que pertenece es: <strong>${poblacion}</strong></span>
    </div>`
    //damos un tiempo para la limpieza del formulario con setTimeout
    setTimeout(() => {
        limpiarFormulario()
    }, 8000);
}

 //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
 //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161

const limpiarFormulario = () => {
    formularioCalculadora.reset();
}


function mostrarMensajeDeError() {
    //desestructuramos y sacamos los errores que obtuvimos
    const { errores } = validarFormulario();

    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex flex-column justify-content-center align-items-between w-100  h-100';

    if (errores.formulario) {
        divError.innerHTML += `<span class="alert alert-danger text-center">${errores.formulario}</span>`;
    }
    if (errores.edad) {
        divError.innerHTML += `<span class="alert alert-danger text-center">${errores.edad}</span>`;
    }
    if (errores.peso) {
        divError.innerHTML += `<span class="alert alert-danger text-center">${errores.peso}</span>`;
    }
    if (errores.altura) {
        divError.innerHTML += `<span class="alert alert-danger text-center">${errores.altura}</span>`;
    }

    resultado.style.display = 'block';
    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove(); 
        desvanecerResultado();
    }, 10000);
}


// Animaciones
function aparecerResultado() {
    
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}