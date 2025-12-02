// components/TaskCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../lib/type';
import { Edit, Trash2 } from 'lucide-react-native';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <View className="bg-white mx-4 mb-3 p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text 
            className={`text-lg font-bold ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">{task.category}</Text>
        </View>
        
        {task.completed && (
          <View className="bg-green-100 px-2 py-1 rounded">
            <Text className="text-green-700 text-xs font-semibold">Completada</Text>
          </View>
        )}
      </View>

      {/* Descripción */}
      <Text className="text-gray-600 mb-3">{task.description}</Text>

      {/* Botones de Acción */}
      <View className="flex-row justify-end gap-2">
        <TouchableOpacity
          onPress={onEdit}
          className="bg-blue-100 px-4 py-2 rounded-lg flex-row items-center"
        >
          <Edit size={16} color="#2563eb" />
          <Text className="text-blue-600 font-semibold ml-2">Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="bg-red-100 px-4 py-2 rounded-lg flex-row items-center"
        >
          <Trash2 size={16} color="#dc2626" />
          <Text className="text-red-600 font-semibold ml-2">Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}