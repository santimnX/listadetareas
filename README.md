📋 Task Manager - Aplicación Móvil de Gestión de Tareas
Aplicación móvil desarrollada con React Native + Expo que permite gestionar tareas de forma eficiente con validaciones robustas y una interfaz moderna.

🎯 Características Principales
✅ Funcionalidades CRUD Completas

Crear nuevas tareas con título, descripción y categoría
Leer y visualizar todas las tareas con estado de completado
Actualizar tareas existentes
Eliminar tareas con confirmación

🔐 Validaciones con Zod

Validación de formularios en tiempo real
Solo caracteres alfanuméricos permitidos
Límites de longitud (título: 100 caracteres, descripción: 500 caracteres)
Campos obligatorios con mensajes de error descriptivos

🎨 Interfaz de Usuario Moderna

Diseño limpio con Tailwind CSS (NativeWind v5)
Header con contadores de tareas pendientes y completadas
Tarjetas de tareas con estado visual (completadas/pendientes)
Modal deslizante para crear/editar tareas
Botón flotante para agregar tareas rápidamente
Estado vacío personalizado cuando no hay tareas

📱 Características Técnicas

Expo Router para navegación basada en archivos
TypeScript completo para type-safety
Axios para peticiones HTTP con interceptores
JSON Server como backend simulado
Picker para selección de categorías predefinidas
Alertas de confirmación para acciones destructivas


🛠️ Tecnologías Utilizadas
TecnologíaVersiónPropósitoReact NativeLatestFramework móvilExpoLatestToolchain y desarrolloTypeScriptLatestTipado estáticoNativeWindv5Estilos con Tailwind CSSZodLatestValidación de esquemasAxiosLatestCliente HTTPJSON ServerLatestAPI REST simulada@react-native-picker/pickerLatestSelector de categorías

📂 Estructura del Proyecto
📦 task-manager/
├── 📁 app/                      # Rutas de la aplicación (Expo Router)
│   ├── _layout.tsx              # Layout principal
│   └── index.tsx                # Pantalla principal con lista de tareas
│
├── 📁 components/               # Componentes reutilizables
│   ├── EmptyState.tsx           # Estado vacío cuando no hay tareas
│   ├── TaskCard.tsx             # Tarjeta individual de tarea
│   └── TaskForm.tsx             # Modal de formulario (crear/editar)
│
├── 📁 lib/                      # Lógica de negocio
│   ├── api.ts                   # Funciones de API con Axios
│   └── types.ts                 # Tipos TypeScript y esquemas Zod
│
├── 📄 db.json                   # Base de datos JSON Server
├── 📄 global.css                # Estilos globales de Tailwind
├── 📄 tailwind.config.js        # Configuración de Tailwind
├── 📄 metro.config.js           # Configuración de Metro bundler
├── 📄 babel.config.js           # Configuración de Babel
├── 📄 nativewind-env.d.ts       # Tipos de NativeWind
└── 📄 package.json              # Dependencias del proyecto

🚀 Instalación y Configuración
1️⃣ Clonar el repositorio
bashgit clone <url-del-repositorio>
cd task-manager
2️⃣ Instalar dependencias
bashnpm install
3️⃣ Instalar JSON Server globalmente (opcional)
bashnpm install -g json-server
4️⃣ Configurar la URL de la API
Edita lib/api.ts y cambia la IP por la de tu máquina local:
typescriptconst API_URL = 'http://TU_IP_LOCAL:3000'; // Ejemplo: http://192.168.1.100:3000
Para obtener tu IP:

Windows: ipconfig → Busca "Dirección IPv4"
Mac/Linux: ifconfig → Busca "inet"


▶️ Ejecutar el Proyecto
Terminal 1: Iniciar JSON Server
bashnpx json-server db.json --host 0.0.0.0 --port 3000
Deberías ver:
JSON Server started on PORT :3000
Endpoints:
http://TU_IP:3000/tasks
Terminal 2: Iniciar Expo
bashnpx expo start
Opciones:

Presiona a para Android
Presiona i para iOS
Presiona w para Web
Escanea el QR con Expo Go en tu teléfono


📱 Uso de la Aplicación
Crear una tarea

Toca el botón flotante + en la esquina inferior derecha
Completa el formulario:

Título: Nombre de la tarea (obligatorio, alfanumérico)
Descripción: Detalles de la tarea (obligatorio, alfanumérico)
Categoría: Selecciona entre Trabajo, Personal o Prioridad Alta


Toca "Crear"

Marcar como completada

Toca el círculo a la izquierda de cualquier tarea
Se mostrará una ✓ verde y el texto se tachará

Editar una tarea

Toca el botón "✏️ Editar" en la tarjeta de la tarea
Modifica los campos necesarios
Toca "Actualizar"

Eliminar una tarea

Toca el botón "🗑️ Eliminar" en la tarjeta de la tarea
Confirma la eliminación en el diálogo


🗂️ Estructura de Datos (db.json)
json{
  "tasks": [
    {
      "id": "1",
      "title": "Organizar archivos del proyecto",
      "description": "Revisar y ordenar todos los documentos",
      "category": "Trabajo",
      "completed": false,
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
Campos de una tarea:

id (string): Identificador único generado por JSON Server
title (string): Título de la tarea (1-100 caracteres)
description (string): Descripción detallada (1-500 caracteres)
category (string): "Trabajo" | "Personal" | "Prioridad Alta"
completed (boolean): Estado de completado
createdAt (string): Fecha de creación en formato ISO


🔧 Arquitectura del Proyecto
Validación con Zod
Todas las tareas se validan con esquemas Zod:
typescriptexport const CreateTaskSchema = z.object({
  title: z.string()
    .min(1, 'El título es obligatorio')
    .max(100, 'Máximo 100 caracteres')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Solo letras, números y espacios'),
  description: z.string()
    .min(1, 'La descripción es obligatoria')
    .max(500, 'Máximo 500 caracteres')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Solo letras, números y espacios'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  completed: z.boolean(),
});
API con Axios
Todas las peticiones HTTP incluyen:

Interceptores para logging
Manejo de errores con try-catch
Validación de respuestas con Zod
Timeouts de 10 segundos
Alertas de feedback al usuario


🎨 Estilos y Diseño
Paleta de Colores

Primario: Azul #3B82F6
Éxito: Verde #22C55E
Error: Rojo #EF4444
Fondo: Gris claro #F3F4F6
Tarjetas: Blanco #FFFFFF

Componentes Principales

Header: Contador de tareas con badges de colores
TaskCard: Tarjeta con checkbox, título, descripción y acciones
TaskModal: Modal deslizante con formulario completo
EmptyState: Estado vacío con ilustración y mensaje
Botón Flotante: FAB (Floating Action Button) para crear tareas


📋 Cumplimiento de Requisitos Académicos
✅ Indicadores de Evaluación Implementados
1. Formularios con Validaciones

✅ Formulario de creación/edición con 3 campos
✅ Validaciones: campos obligatorios, solo alfanuméricos, límites de longitud
✅ Estados de error visuales en tiempo real
✅ Validación con Zod en cliente antes de enviar

2. Conexión a API REST

✅ GET: Obtener todas las tareas (/tasks)
✅ POST: Crear nueva tarea (/tasks)
✅ PUT: Actualizar tarea (/tasks/:id)
✅ DELETE: Eliminar tarea (/tasks/:id)
✅ JSON Server como backend simulado

3. Gestión de Estado

✅ Estado local con useState y useEffect
✅ Sin prop-drilling (toda la lógica centralizada en index.tsx)
✅ Re-render automático después de operaciones CRUD

4. Navegación con Expo Router

✅ File-based routing con carpeta /app
✅ Modal para crear/editar (en lugar de rutas dinámicas)
✅ Stack Navigator configurado

5. TypeScript

✅ Interfaces para Task y formularios
✅ Tipos inferidos desde esquemas Zod
✅ Type-safety en todos los componentes y funciones

6. Arquitectura Modular

✅ Separación clara: /app, /components, /lib
✅ Componentes reutilizables y desacoplados
✅ Lógica de API separada de la UI

7. Control de Versiones (Git)

✅ Commits descriptivos por fase del proyecto
✅ README.md completo con documentación
✅ .gitignore configurado correctamente


🐛 Solución de Problemas Comunes
Error: "No se pudo conectar con el servidor"
Causa: JSON Server no está corriendo o la IP es incorrecta.
Solución:

Verifica que JSON Server esté corriendo: npx json-server db.json --host 0.0.0.0 --port 3000
Verifica tu IP local con ipconfig (Windows) o ifconfig (Mac/Linux)
Actualiza la URL en lib/api.ts
Asegúrate de que tu teléfono/emulador esté en la misma red WiFi

Error: Validación falla
Causa: Caracteres especiales en el formulario.
Solución:

Solo usa letras, números y espacios en los campos
Resp

https://github.com/user-attachments/assets/0df95286-3f33-435b-b079-d59b5fe80e3b

eta los límites: título ≤ 100 caracteres, descripción ≤ 500 caracteres

Error: Estilos de Tailwind no funcionan
Causa: NativeWind no está configurado correctamente.
Solución:

Verifica que global.css esté importado en _layout.tsx
Reinicia el servidor de Expo: r en la terminal
Verifica tailwind.config.js y metro.config.js
