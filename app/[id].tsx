import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../lib/TaskContext';
import { TaskForm } from '../components/TaskForm';
import { taskSchema } from '../lib/validation';
import { api } from '../lib/api';
import { Task } from '../types/task';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTask, deleteTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Trabajo' | 'Personal' | 'Prioridad Alta'>('Trabajo');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      const data = await api.getTask(id);
      setTask(data);
      setTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
    } catch (err) {
      Alert.alert('Error', 'No se pudo cargar la tarea');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      taskSchema.parse({ title, description, category });
      setErrors({});

      await updateTask(id, { title, description, category });
      Alert.alert('Éxito', 'Tarea actualizada');
      setIsEditing(false);
      loadTask();
    } catch (err: any) {
      if (err.errors) {
        const zodErrors: any = {};
        err.errors.forEach((e: any) => {
          zodErrors[e.path[0]] = e.message;
        });
        setErrors(zodErrors);
      }
    }
  };

  const handleDelete = () => {
    Alert.alert('Eliminar tarea', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(id);
          router.back();
        }
      }
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!task) return null;

  return (
    <View className="flex-1 bg-white">
      {isEditing ? (
        <TaskForm
          title={title}
          description={description}
          category={category}
          errors={errors}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onCategoryChange={setCategory}
          onSubmit={handleUpdate}
          submitLabel="Guardar Cambios"
        />
      ) : (
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{task.title}</Text>
          <Text className="text-gray-600 mb-4">{task.description}</Text>
          <View className="bg-blue-100 self-start px-3 py-1 rounded mb-6">
            <Text className="text-sm">{task.category}</Text>
          </View>

          <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-blue-500 p-4 rounded-lg mb-3">
            <Text className="text-white text-center font-bold">Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} className="bg-red-500 p-4 rounded-lg">
            <Text className="text-white text-center font-bold">Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}