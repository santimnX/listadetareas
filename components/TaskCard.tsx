import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
}

export function TaskCard({ task, onPress, onToggle }: TaskCardProps) {
  const categoryColors = {
    Trabajo: 'bg-blue-100',
    Personal: 'bg-green-100',
    'Prioridad Alta': 'bg-red-100'
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 mb-3 rounded-lg shadow-sm flex-row items-center"
    >
      <TouchableOpacity
        onPress={onToggle}
        className={`w-6 h-6 rounded-full border-2 mr-3 ${
          task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}
      >
        {task.completed && <Text className="text-white text-center">✓</Text>}
      </TouchableOpacity>

      <View className="flex-1">
        <Text className={`text-base font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </Text>
        <Text className="text-gray-500 text-sm">{task.description}</Text>
        <View className={`mt-2 self-start px-2 py-1 rounded ${categoryColors[task.category]}`}>
          <Text className="text-xs">{task.category}</Text>
        </View>
      </View>

      <Text className="text-gray-400 text-xl">›</Text>
    </TouchableOpacity>
  );
}