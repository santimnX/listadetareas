// components/TaskForm.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { taskFormSchema, TaskFormData, ValidationErrors, Task } from '../lib/type';
import Input from './Input';
import { CheckSquare, Square } from 'lucide-react-native';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData & { completed?: boolean }) => void;
  submitLabel?: string;
}

const CATEGORIES = ['Trabajo', 'Personal', 'Prioridad Alta'];

export default function TaskForm({ 
  initialData, 
  onSubmit, 
  submitLabel = 'Crear Tarea' 
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || CATEGORIES[0],
  });
  
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = () => {
    try {
      // Validar con Zod
      taskFormSchema.parse(formData);
      
      // Si pasa la validación, limpiar errores y enviar
      setErrors({});
      onSubmit({ ...formData, completed });
      
    } catch (error: any) {
      // Capturar errores de Zod
      const validationErrors: ValidationErrors = {};
      
      error.errors?.forEach((err: any) => {
        const field = err.path[0] as keyof TaskFormData;
        validationErrors[field] = err.message;
      });
      
      setErrors(validationErrors);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Input
        label="Título"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        error={errors.title}
        placeholder="Ej: Organizar archivos"
      />

      <Input
        label="Descripción"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        error={errors.description}
        placeholder="Describe la tarea..."
        multiline
        numberOfLines={4}
      />

      {/* Picker de Categoría */}
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Categoría
        </Text>
        <View className={`border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            {CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        {errors.category && (
          <Text className="text-red-500 text-xs mt-1">{errors.category}</Text>
        )}
      </View>

      {/* Checkbox de Completado (solo al editar) */}
      {initialData && (
        <TouchableOpacity
          onPress={() => setCompleted(!completed)}
          className="flex-row items-center mb-6"
        >
          {completed ? (
            <CheckSquare size={24} color="#22c55e" />
          ) : (
            <Square size={24} color="#9ca3af" />
          )}
          <Text className="ml-2 text-base text-gray-700">
            Marcar como completada
          </Text>
        </TouchableOpacity>
      )}

      {/* Botón Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 rounded-lg py-4 items-center"
      >
        <Text className="text-white font-bold text-base">
          {submitLabel}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}