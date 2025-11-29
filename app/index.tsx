import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useTasks } from '../lib/TaskContext';
import { TaskCard } from '../components/TaskCard';

export default function HomeScreen() {
  const { tasks, loading, toggleComplete } = useTasks();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No hay tareas. ¡Crea una nueva!</Text>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => router.push(`/${item.id}`)}
            onToggle={() => toggleComplete(item.id)}
          />
        )}
      />

      {/* Botón flotante */}
      <TouchableOpacity
        onPress={() => router.push('/new')}
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}