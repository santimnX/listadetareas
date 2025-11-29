// app/_layout.tsx
import "../global.css";
import { Stack } from 'expo-router';
import { TaskProvider } from '../lib/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Mis Tareas' }} />
        <Stack.Screen name="new" options={{ title: 'Nueva Tarea' }} />
        <Stack.Screen name="[id]" options={{ title: 'Detalle de Tarea' }} />
      </Stack>
    </TaskProvider>
  );
}