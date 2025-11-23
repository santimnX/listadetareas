// app/[id]/index.tsx
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useTasks } from "../../hooks/useTasks";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getTask, deleteTask } = useTasks();

  const task = getTask(id);

  if (!task) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-red-500 text-xl">Tarea no encontrada.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-3xl font-bold">{task.title}</Text>

      {task.description ? (
        <Text className="text-neutral-400 mt-3 text-lg">
          {task.description}
        </Text>
      ) : null}

      <Link
        href={`/${id}/edit`}
        className="text-blue-400 underline mt-6 text-lg"
      >
        Editar tarea
      </Link>

      <Pressable
        onPress={() => {
          deleteTask(id);
          router.push("/");
        }}
        className="bg-red-600 p-3 rounded-xl mt-6"
      >
        <Text className="text-white text-center font-bold">Eliminar</Text>
      </Pressable>
    </View>
  );
}
