const formulario = document.getElementById("formulario-tarea");
const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
const inputPrioridad = document.getElementById("prioridad");
const inputFecha = document.getElementById("fecha");

const contenedores = {
  pendientes: document.querySelector("#pendientes .tareas-container"),
  "en-progreso": document.querySelector("#en-progreso .tareas-container"),
  completadas: document.querySelector("#completadas .tareas-container"),
};

const contadores = {
  pendientes: document.querySelector("#pendientes .contador"),
  "en-progreso": document.querySelector("#en-progreso .contador"),
  completadas: document.querySelector("#completadas .contador"),
};

let tareas = [];

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevaTarea = {
    id: Date.now(),
    titulo: inputTitulo.value.trim(),
    descripcion: inputDescripcion.value.trim(),
    prioridad: inputPrioridad.value,
    fecha: inputFecha.value,
    estado: "pendientes",
  };

  tareas.push(nuevaTarea);
  formulario.reset();
  renderizarTareas();
});

function renderizarTareas() {
  Object.values(contenedores).forEach((c) => (c.innerHTML = ""));
  const conteo = { pendientes: 0, "en-progreso": 0, completadas: 0 };

  tareas.forEach((tarea) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = `tarea-card ${tarea.prioridad}`;

    tarjeta.innerHTML = `
      <div class="tarea-contenido">
        <p class="tarea-titulo"><strong>${tarea.titulo}</strong></p>
        ${tarea.descripcion ? `<p class="tarea-desc">${tarea.descripcion}</p>` : ""}
        <div class="tarea-meta">
          <span>📅 ${tarea.fecha}</span>
          <span>Prioridad ${tarea.prioridad}</span>
        </div>
      </div>
      <div class="acciones">
        ${obtenerBotonesAccion(tarea)}
        <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">X</button>
      </div>
    `;

    contenedores[tarea.estado].appendChild(tarjeta);
    conteo[tarea.estado]++;
  });

  Object.keys(conteo).forEach((k) => (contadores[k].innerText = conteo[k]));
}

function obtenerBotonesAccion(tarea) {
  if (tarea.estado === "pendientes") {
    return `<button onclick="moverTarea(${tarea.id}, 'en-progreso')">Comenzar</button>`;
  } else if (tarea.estado === "en-progreso") {
    return `
      <button onclick="moverTarea(${tarea.id}, 'pendientes')">Parar</button>
      <button onclick="moverTarea(${tarea.id}, 'completadas')">Listo</button>
    `;
  }
  return `<button onclick="moverTarea(${tarea.id}, 'en-progreso')">Reabrir</button>`;
}

window.moverTarea = (id, nuevoEstado) => {
  tareas = tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t));
  renderizarTareas();
};

window.eliminarTarea = (id) => {
  if (confirm("¿Eliminar esta tarea?")) {
    tareas = tareas.filter((t) => t.id !== id);
    renderizarTareas();
  }
};
