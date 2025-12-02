// app/_layout.tsx
import { Stack } from 'expo-router';
import { TaskProvider } from '../lib/tasksContext';
import '../global.css';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a', // slate-900
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#0f172a',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'My Tasks',
          }} 
        />
        <Stack.Screen 
          name="[id]" 
          options={{ 
            title: 'Tarea',
          }} 
        />
      </Stack>
    </TaskProvider>
  );
}