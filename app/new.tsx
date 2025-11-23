// app/new.tsx
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { useTasks } from "../hooks/useTasks";

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    addTask({ title, description });
    router.push("/");
  };

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">
        Crear nueva tarea
      </Text>

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
        onPress={handleSubmit}
        className="bg-blue-600 p-3 rounded-xl mt-2"
      >
        <Text className="text-white text-center font-bold text-lg">
          Guardar
        </Text>
      </Pressable>
    </View>
  );
}
