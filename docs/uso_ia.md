# Informe de Uso de Inteligencia Artificial - Proyecto Gestor de Tareas

**Estudiante:** Martin Ariel Nicolas Valdebenito Saavedra  
**Carrera:** Técnico en Informática  
**Fecha:** 24 de abril de 2026

---

## 1. Modelo de IA Identificado

- **Modelo:** Gemini 3 Flash
- **Interfaz:** Web (Free Tier)
- **Especialidad aplicada:** Ingeniería de Prompts para desarrollo Web (HTML5, CSS3, JavaScript ES6).

---

## 2. Documentación Detallada de Prompts y Respuestas

### Interacción 1: Arquitectura del Layout y Control de Desbordamiento (Scroll)

- **Prompt del Usuario:** > _"Ahora funciona todo bien, solo que quiero que la página no se tenga que scrollear. Al añadir el footer se hizo un espacio hacia abajo por lo que ahora tengo que bajar para ver el footer completo. Ayúdame a arreglar eso: [Código CSS Base]"_
- **Detalle de la Respuesta:** La IA identificó que el problema radicaba en la acumulación de márgenes y paddings que excedían el `100vh` del Viewport. La solución técnica consistió en:
  1.  Cambiar `min-height: 100vh` por `height: 100vh` en el `body` para fijar el marco.
  2.  Aplicar `flex-direction: column` al body y `flex: 1` al elemento `main`.
  3.  Ajustar las columnas del tablero con `max-height` y `overflow-y: auto` para que el scroll fuera interno en las listas de tareas y no en la página completa.

### Interacción 2: Estandarización mediante Variables CSS y Responsive Design

- **Prompt del Usuario:** > _"Ahora el diseño ya está bien pero debo cumplir con los siguientes requisitos: Variables CSS (:root), estilos para tarjetas, colores por estado (azul, amarillo, verde), diseño responsive (3 breakpoints)."_
- **Detalle de la Respuesta:** La IA estructuró un bloque `:root` para centralizar la paleta de colores y los espaciados, facilitando el mantenimiento. Para el diseño responsivo, propuso una estrategia de **Mobile First** en el archivo principal y un archivo `responsive.css` con los siguientes breakpoints:
  - **600px:** Cambio de grid de 1 columna para móviles.
  - **601px - 1024px:** Grid de 2 columnas para tablets.
  - **1025px+:** Grid de 3 columnas para escritorio.
    Se implementaron selectores específicos como `.tarea-card.alta` vinculados a las variables de color de estado.

### Interacción 3: Lógica Funcional y CRUD en JavaScript

- **Prompt del Usuario:** > _"Quiero seguir con la funcionalidad con JavaScript: Agregar tarea desde formulario a pendientes, cambiar estado mediante botones, eliminar tarea y actualizar contadores automáticamente."_
- **Detalle de la Respuesta:** La IA diseñó una solución basada en el patrón de **Estado Centralizado**. En lugar de leer el HTML constantemente, se creó un array de objetos llamado `tareas`.
  1.  **Create:** Uso de `Date.now()` para IDs únicos y captura de valores mediante `document.getElementById`.
  2.  **Read:** Función `renderizarTareas()` que utiliza `forEach` para reconstruir el DOM dinámicamente.
  3.  **Update/Delete:** Funciones `moverTarea` y `eliminarTarea` que utilizan métodos de array como `.map()` y `.filter()` para actualizar el estado y re-renderizar la vista.

### Interacción 4: Refinamiento de Campos y Seguridad de Interfaz

- **Prompt del Usuario:** > _"La descripción en realidad es el título, agrégale que puedas ponerle un título obligatorio y una descripción opcional a la tarea y que no se salga el texto del cuadro."_
- **Detalle de la Respuesta:** Se actualizaron los tres pilares del proyecto:
  - **HTML:** Se separaron los inputs en `titulo` (required) y `descripcion` (textarea).
  - **JS:** Se incluyó un condicional ternario en el template string: `${tarea.descripcion ? ... : ''}` para no mostrar campos vacíos.
  - **CSS:** Se aplicó `word-wrap: break-word` y `overflow-wrap: break-word` en `.tarea-card` para evitar que cadenas de texto largas (sin espacios) rompieran el ancho de las columnas.

---

## 3. Ajustes Manuales Realizados

El código sugerido por la IA fue refinado manualmente en los siguientes puntos:

1.  **Identidad Visual (Logo):** Se restauró manualmente el efecto `hover` y la escala del logo (`1.8` a `1.9`) para mantener la estética original, ya que la IA tendía a resetear estos valores.
2.  **Ajuste de Columnas:** Se modificó el `max-height` de las columnas en el tablero para que fuera más flexible según el tamaño de la pantalla del monitor de pruebas.
3.  **Refinamiento de Validaciones:** Se añadió un `.trim()` manual en el JavaScript a los valores de los inputs para evitar que se crearan tareas que solo contuvieran espacios en blanco.

---

## 4. Reflexión Crítica

El uso de la IA fue fundamental para la estructuración técnica del proyecto, permitiendo implementar conceptos avanzados de CSS Grid y manipulación de arreglos en JavaScript de forma eficiente.

- **Ventajas:** Permite prototipar layouts complejos y depurar errores de desbordamiento visual de manera inmediata. Ayuda a seguir mejores prácticas como el uso de variables y la separación de archivos (CSS/JS).
- **Riesgos Identificados:** La IA puede generar código que "pisa" estilos previos si no se le da un contexto preciso. Es vital tener conocimientos base para decidir qué parte del código sugerido es útil y cuál debe descartarse para no perder la esencia del diseño original.
- **Conclusión:** La herramienta incrementó la productividad, pero la lógica final y el control de calidad dependieron enteramente de la revisión humana.
