// app/[id]/edit.tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTasks } from "../../hooks/useTasks";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();
  const { getTask, updateTask } = useTasks();

  const task = getTask(id);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  const handleUpdate = () => {
    updateTask(id, { title, description });
    router.push(`/${id}`);
  };

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">Editar tarea</Text>

      <TextInput
        className="bg-neutral-900 text-white p-3 rounded-xl mb-3"
        placeholder="Título"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        className="bg-neutral-900 text-white p-3 rounded-xl mb-3"
        placeholder="Descripción"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable
        onPress={handleUpdate}
        className="bg-blue-600 p-3 rounded-xl mt-2"
      >
        <Text className="text-white text-center font-bold text-lg">
          Guardar cambios
        </Text>
      </Pressable>
    </View>
  );
}
