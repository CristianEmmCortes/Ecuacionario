// Clase Fenomeno
class Fenomeno {
    constructor(nombre) {
        this.nombre = nombre;
        this.ecuaciones = []; 
    }

    agregarEcuacion(ecuacion) {
        this.ecuaciones.push(ecuacion); 
    }

    mostrarEcuacion(nombreEcuacion) {
        const ecuacion = this.ecuaciones.find((ecuacion) => ecuacion.nombre === nombreEcuacion); 
        if (ecuacion) {
            console.log(`Ecuación de ${this.nombre}: ${ecuacion.nombre}`);
            console.log("Variables:");
            ecuacion.variables.forEach((variable) => {
                console.log(`- ${variable}`);
            });
        } else {
            console.log(`No se encontró la ecuación ${nombreEcuacion} para el fenómeno ${this.nombre}`);
        }
    }
}

// Clase Ecuacion
class Ecuacion {
    constructor(nombre, variables) {
        this.nombre = nombre;
        this.variables = variables;
    }
}

// Crear fenómenos
const tiroParabolico = new Fenomeno("TiroParabolico");
const mrua = new Fenomeno("MRUA");

// Crear ecuaciones para el Tiro Parabólico
tiroParabolico.agregarEcuacion(new Ecuacion("PosicionFinal", ["PosicionInicial", "VelocidadInicial", "Angulo", "Gravedad", "Tiempo"]));
tiroParabolico.agregarEcuacion(new Ecuacion("VelocidadFinal", ["VelocidadInicial", "Angulo", "Gravedad", "Tiempo"]));
tiroParabolico.agregarEcuacion(new Ecuacion("AlturaFinal", ["AlturaInicial","VelocidadInicial","Angulo","Tiempo","Gravedad"]))

// Aquí agregamos las ecuaciones para MRUA
mrua.agregarEcuacion(new Ecuacion("PosicionFinal", ["PosicionInicial", "VelocidadFinal", "Aceleracion", "Tiempo"]));
mrua.agregarEcuacion(new Ecuacion("VelocidadFinal",["PosicionFinal","PosicionInicial","Tiempo"]))
mrua.agregarEcuacion(new Ecuacion("Aceleracion",["VelocidadFinal","VelocidadInicial","Tiempo"]))
mrua.agregarEcuacion(new Ecuacion("(VelocidadFinal)^2",["VelociadInicial","Aceleración","PosicionFinal","Tiempo"]))

// Obtener referencias a los elementos de los filtros
const mruaCheckbox = document.getElementById("mruCheckbox");
const tiroParabolicoCheckbox = document.getElementById("tiroParabolicoCheckbox");
const tiempoCheckbox = document.getElementById("tiempoCheckbox");
/* const velocidadInicialCheckbox = document.getElementById("velocidadInicialCheckbox") */
/////////////
const velocidadInicialCheckbox = document.getElementById("velocidadInicialCheckbox");
const velocidadFinalCheckbox = document.getElementById("velocidadFinalCheckbox");
/////////////
const aceleracionCheckbox = document.getElementById("aceleracionCheckbox");
const posicionCheckbox = document.getElementById("posicionCheckbox");
const anguloCheckbox = document.getElementById("anguloCheckbox");
const gravedadCheckbox = document.getElementById("gravedadCheckbox");

// Verificamos los eventos de cambio en los filtros
mruaCheckbox.addEventListener("change", actualizarEcuaciones);
tiroParabolicoCheckbox.addEventListener("change", actualizarEcuaciones);
tiempoCheckbox.addEventListener("change", actualizarEcuaciones);
/* velocidadCheckbox.addEventListener("change", actualizarEcuaciones); */

/////////
velocidadInicialCheckbox.addEventListener("change", actualizarEcuaciones);
velocidadFinalCheckbox.addEventListener("change", actualizarEcuaciones);
/////////////


aceleracionCheckbox.addEventListener("change", actualizarEcuaciones);
posicionCheckbox.addEventListener("change", actualizarEcuaciones);
anguloCheckbox.addEventListener("change", actualizarEcuaciones);
gravedadCheckbox.addEventListener("change", actualizarEcuaciones);

// Función para actualizar las ecuaciones en pantalla según los checkboxes seleccionados
function actualizarEcuaciones() {
    const ecuacionesContainer = document.getElementById("ecuaciones-container");
    ecuacionesContainer.innerHTML = ""; // Borrar ecuaciones actuales

    // Verificar si MRUA está seleccionado
    if (mruaCheckbox.checked) {
        // Mostrar ecuaciones de MRUA
        mostrarEcuacionesPorFenomeno(mrua);
    }

    // Verificar si Tiro Parabólico está seleccionado
    if (tiroParabolicoCheckbox.checked) {
        // Mostrar ecuaciones de Tiro Parabólico
        mostrarEcuacionesPorFenomeno(tiroParabolico);
    }

    // Verificar si Tiempo está seleccionado
    if (tiempoCheckbox.checked) {
        // Mostrar ecuaciones que contienen la variable "Tiempo"
        mostrarEcuacionesPorVariable("Tiempo");
    }

    // Verificar si Velocidad está seleccionado
/*     if (velocidadCheckbox.checked) {
        // Mostrar ecuaciones que contienen la variable "Velocidad"
        mostrarEcuacionesPorVariable("Velocidad");
    } */
///////////////////////////////////
if (velocidadInicialCheckbox.checked) {
    // Mostrar ecuaciones que contienen la variable "Velocidad"
    mostrarEcuacionesPorVariable("VelocidadInicial");
}

if (velocidadFinalCheckbox.checked) {
    // Mostrar ecuaciones que contienen la variable "Velocidad"
    mostrarEcuacionesPorVariable("VelocidadFinal");
}

///////////////////////////////

    // Verificar si Aceleración está seleccionado
    if (aceleracionCheckbox.checked) {
        // Mostrar ecuaciones que contienen la variable "Aceleración"
        mostrarEcuacionesPorVariable("Aceleración");
    }

    // Verificar si Posición está seleccionado
    if (posicionCheckbox.checked) {
        // Mostrar ecuaciones que contienen la variable "Posición"
        mostrarEcuacionesPorVariable("Posición");
    }

    // Verificar si Ángulo está seleccionado
    if (anguloCheckbox.checked) {
        // Mostrar ecuaciones que contienen la variable "Ángulo"
        mostrarEcuacionesPorVariable("Ángulo");
    }

    // Verificar si Gravedad está seleccionado
    if (gravedadCheckbox.checked) {
        // Mostrar ecuaciones que contienen la variable "Gravedad"
        mostrarEcuacionesPorVariable("Gravedad");
    }
}

// Función para mostrar ecuaciones de un fenómeno específico
function mostrarEcuacionesPorFenomeno(fenomeno) {
    const ecuacionesContainer = document.getElementById("ecuaciones-container");
    fenomeno.ecuaciones.forEach((ecuacion) => {
        const ecuacionElement = document.createElement("div");
        ecuacionElement.textContent = `Ecuación de ${fenomeno.nombre}: ${ecuacion.nombre}`;
        ecuacionElement.classList.add("ecuacion");
        ecuacionesContainer.appendChild(ecuacionElement);
    });
}

// Función para mostrar ecuaciones que contienen una variable específica
function mostrarEcuacionesPorVariable(variable) {
    const ecuacionesContainer = document.getElementById("ecuaciones-container");
    [mrua, tiroParabolico].forEach((fenomeno) => {
        fenomeno.ecuaciones.forEach((ecuacion) => {
            if (ecuacion.variables.includes(variable)) {
                const ecuacionElement = document.createElement("div");
                ecuacionElement.textContent = `Ecuación de ${fenomeno.nombre}: ${ecuacion.nombre}`;
                ecuacionElement.classList.add("ecuacion");
                ecuacionesContainer.appendChild(ecuacionElement);
            }
        });
    });
}

// Llamar a la función inicial para configurar el estado inicial de las ecuaciones
actualizarEcuaciones();
