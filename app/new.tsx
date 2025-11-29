import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTasks } from '../lib/TaskContext';
import { TaskForm } from '../components/TaskForm';
import { taskSchema } from '../lib/validation';

export default function NewTaskScreen() {
  const { createTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Trabajo' | 'Personal' | 'Prioridad Alta'>('Trabajo');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = async () => {
    try {
      // Validar con Zod
      taskSchema.parse({ title, description, category });
      setErrors({});

      // Crear tarea
      await createTask({ title, description, category });
      Alert.alert('Éxito', 'Tarea creada correctamente');
      router.back();
    } catch (err: any) {
      if (err.errors) {
        const zodErrors: any = {};
        err.errors.forEach((e: any) => {
          zodErrors[e.path[0]] = e.message;
        });
        setErrors(zodErrors);
      } else {
        Alert.alert('Error', 'No se pudo crear la tarea');
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <TaskForm
        title={title}
        description={description}
        category={category}
        errors={errors}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onCategoryChange={setCategory}
        onSubmit={handleSubmit}
        submitLabel="Crear Tarea"
      />
    </View>
  );
}