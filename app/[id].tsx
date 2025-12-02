// app/[id].tsx
import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTasks } from '../lib/tasksContext';
import TaskForm from '../components/TaskForm';
import { TaskFormData } from '../lib/type';

export default function TaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTaskById, addTask, updateTask } = useTasks();

  const isNew = id === 'new';
  const task = isNew ? undefined : getTaskById(id);

  const handleSubmit = async (data: TaskFormData & { completed?: boolean }) => {
    try {
      if (isNew) {
        // Crear nueva tarea
        await addTask(data);
        Alert.alert('Éxito', 'Tarea creada correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        // Actualizar tarea existente
        await updateTask(id, data);
        Alert.alert('Éxito', 'Tarea actualizada correctamente', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la tarea');
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: isNew ? 'Nueva Tarea' : 'Editar Tarea',
        }} 
      />
      <View className="flex-1 bg-white">
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          submitLabel={isNew ? 'Crear Tarea' : 'Actualizar Tarea'}
        />
      </View>
    </>
  );
}