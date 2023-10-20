const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (e) => {
    e.preventDefault();
    calcularCalorias();

});

function calcularCalorias() {
    const nombre = document.querySelector('#nombre').value;
    const tipoDocumento = document.querySelector('#tipoDocumento').value;
    const documento = document.querySelector('#numeroDocumento').value;
    const edad = document.querySelector('#edad').value
    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;
    const actividad = document.querySelector('#actividad').value;
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;

    const poblacion = edad < 60 ? edad < 30? "Joven" : "Adulto" : "Adulto Mayor"
    console.log(poblacion);

    

    if (!edad || !peso || !altura || !actividad || !nombre || !documento) {
        mostrarMensajeDeError("Por favor, rellena todos los campos");
        console.log("Por favor, rellena todos los campos");
       mostrarMensajeDeError();
    } else {
        if ( generoSeleccionado === 'M') {
            const calorias = Math.floor(actividad *  (10 * peso) + (6.25 * altura) - (5 * edad) + 5);
            aparecerResultado()
            resultado.innerHTML = `            
            <div class="card-body d-flex flex-column justify-content-center align-items-center w-100 h-100 my-3 shadow text-center">
                <h2>El paciente ${nombre}</h2>
                <p>Identificado con ${tipoDocumento} No. ${documento}</p>
                <span>Requiere un total de <strong>${calorias}</strong> kcal para el sostenimiento de su TBM</span>
                <span>El grupo poblacional al que perteneces es: <strong>${poblacion}</strong></span>
            </div>`
        
        }else if (generoSeleccionado === 'F') {
            const calorias = Math.floor(actividad *   (10 * peso) + (6.25 * altura) - (5 * edad) - 161);
            aparecerResultado()
            resultado.innerHTML = `
            <div class="card-body d-flex flex-column justify-content-center align-items-center w-100 h-100 my-3 shadow text-center">
                <h2>El paciente ${nombre}</h2>
                <p>Identificado con ${tipoDocumento} No. ${documento}</p>
                <span>Requiere un total de <strong>${calorias}</strong> kcal para el sostenimiento de su TBM</span>
                <span>El grupo poblacional al que perteneces es: <strong>${poblacion}</strong></span>
            </div>`
        }
    }


}

function validarFormulario() {
    const edad = document.querySelector('#edad').value;
    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;
    const actividad = document.querySelector('#actividad').value;

    return edad && peso && altura && actividad;

}
 //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
 //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.style.display = 'block';
    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove(); 
        desvanecerResultado();
    }, 100000);
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