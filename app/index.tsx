// app/index.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useTasks } from '../lib/tasksContext';
import { Plus, ChevronRight } from 'lucide-react-native';
import { Task } from '../lib/type';

export default function HomeScreen() {
  const { tasks, loading, error, deleteTask } = useTasks();

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Eliminar Tarea',
      `¿Estás seguro de eliminar "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteTask(id),
        },
      ]
    );
  };

  if (loading && tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-900">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-slate-400">Cargando tareas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-900 p-4">
        <Text className="text-red-400 text-center">{error}</Text>
      </View>
    );
  }

  const renderTask = ({ item }: { item: Task }) => (
    <Link href={`/${item.id}`} asChild>
      <TouchableOpacity 
        className="bg-slate-800 mx-4 mb-3 p-4 rounded-xl border border-slate-700"
        onLongPress={() => handleDelete(item.id, item.title)}
      >
        <View className="flex-row items-start">
          {/* Checkbox circular */}
          <View className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 ${
            item.completed ? 'bg-blue-500 border-blue-500' : 'border-slate-600'
          }`} />
          
          <View className="flex-1">
            {/* Título */}
            <Text className={`text-base font-medium mb-1 ${
              item.completed ? 'line-through text-slate-500' : 'text-white'
            }`}>
              {item.title}
            </Text>
            
            {/* Descripción */}
            <Text className="text-sm text-slate-400" numberOfLines={2}>
              {item.description}
            </Text>
          </View>

          {/* Ícono flecha derecha */}
          <ChevronRight size={20} color="#64748b" />
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className="flex-1 bg-slate-900">
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-8 mt-20">
            <Text className="text-slate-500 text-lg text-center">
              No hay tareas aún
            </Text>
            <Text className="text-slate-600 text-sm text-center mt-2">
              Presiona el botón + para crear una
            </Text>
          </View>
        }
      />

      {/* Botón Flotante */}
      <Link href="/new" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg">
          <Plus size={28} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}