const malla = [/* misma estructura que te pasé antes, puedes copiarla tal cual */];

const mallaDiv = document.getElementById("malla");
const estadoRamos = new Map();

malla.forEach((sem) => {
  const columna = document.createElement("div");
  columna.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = sem.semestre;
  columna.appendChild(titulo);

  sem.ramos.forEach((ramo) => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo.nombre;
    div.dataset.nombre = ramo.nombre;

    estadoRamos.set(ramo.nombre, {
      aprobado: false,
      nodo: div,
      ...ramo,
    });

    columna.appendChild(div);
  });

  mallaDiv.appendChild(columna);
});

function actualizarEstado() {
  estadoRamos.forEach((ramo) => {
    if (ramo.aprobado) return;
    const requisitos = ramo.requiere || [];
    const habilitado = requisitos.every((req) => estadoRamos.get(req)?.aprobado);
    if (requisitos.length === 0 || habilitado) {
      ramo.nodo.classList.add("desbloqueado");
    } else {
      ramo.nodo.classList.remove("desbloqueado");
    }
  });
}

estadoRamos.forEach((ramo) => {
  ramo.nodo.addEventListener("click", () => {
    if (!ramo.nodo.classList.contains("desbloqueado")) return;
    ramo.aprobado = true;
    ramo.nodo.classList.add("aprobado");
    actualizarEstado();
  });
});

actualizarEstado();
