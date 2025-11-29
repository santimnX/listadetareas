🧱 Arquitectura del Proyecto

El proyecto está organizado en carpetas profesionales:

components/ → Componentes visuales sin lógica (UI pura).

context/ → Lógica global de tareas (TaskContext).

hooks/ → Hook personalizado useTasks() para acceder al context.

libs/ → Funciones para conectar con la API (GET, POST, PUT, DELETE).

types/ → Interfaces TypeScript, como la interfaz Task.

pages/ → Páginas principales (lista, crear, editar).

🗄️ Backend: JSON Server

Se usa un archivo db.json con datos como:

{
  "task": [
    { "id": 1, "title": "a title", "description": "a description" }
  ]
}


Permite hacer:

GET (listar)

POST (crear)

PUT (editar)

DELETE (eliminar)

🧩 Principales Funciones

✔ Listar tareas
✔ Crear nuevas tareas
✔ Editar tareas existentes
✔ Eliminar tareas
✔ Estado global con Context API
✔ Rutas con React Router (/, /new, /edit/:id)

🔄 Cómo funciona internamente

El usuario interactúa con un componente (form, botón, etc.).

El componente llama a una función del TaskContext.

El context usa funciones de libs/api para comunicarse con JSON Server.

Se actualiza el estado global (tasks).

Toda la UI se actualiza automáticamente.

🚀 Qué presenta el proyecto

Arquitectura limpia (UI, lógica y API separadas).

Componentes reutilizables.

TypeScript estrictamente tipado.

Backend fake para pruebas.

Proyecto profesional y escalable.
