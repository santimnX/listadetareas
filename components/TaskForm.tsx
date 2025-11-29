import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface TaskFormProps {
  title: string;
  description: string;
  category: 'Trabajo' | 'Personal' | 'Prioridad Alta';
  errors: { title?: string; description?: string; category?: string };
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onCategoryChange: (category: 'Trabajo' | 'Personal' | 'Prioridad Alta') => void;
  onSubmit: () => void;
  submitLabel: string;
}

export function TaskForm({
  title,
  description,
  category,
  errors,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onSubmit,
  submitLabel
}: TaskFormProps) {
  const categories: Array<'Trabajo' | 'Personal' | 'Prioridad Alta'> = [
    'Trabajo',
    'Personal',
    'Prioridad Alta'
  ];

  return (
    <View className="p-4">
      {/* Título */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2">Título</Text>
        <TextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder="Ej: Organizar archivos"
          className={`border rounded-lg p-3 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.title && <Text className="text-red-500 text-xs mt-1">{errors.title}</Text>}
      </View>

      {/* Descripción */}
      <View className="mb-4">
        <Text className="text-sm font-semibold mb-2">Descripción</Text>
        <TextInput
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="Describe la tarea..."
          multiline
          numberOfLines={3}
          className={`border rounded-lg p-3 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <Text className="text-red-500 text-xs mt-1">{errors.description}</Text>}
      </View>

      {/* Categoría */}
      <View className="mb-6">
        <Text className="text-sm font-semibold mb-2">Categoría</Text>
        <View className="flex-row gap-2">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => onCategoryChange(cat)}
              className={`flex-1 p-3 rounded-lg border ${
                category === cat ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
              }`}
            >
              <Text className={`text-center text-xs ${category === cat ? 'text-white font-bold' : 'text-gray-700'}`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botón */}
      <TouchableOpacity onPress={onSubmit} className="bg-blue-500 p-4 rounded-lg">
        <Text className="text-white text-center font-bold">{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}