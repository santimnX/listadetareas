// app/index.tsx
import { View, Text, FlatList } from "react-native";
import { Link } from "expo-router";
import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";

export default function HomeScreen() {
  const { tasks } = useTasks();

  return (
    <View className="flex-1 bg-black px-4 pt-4">
      <Text className="text-white text-3xl font-bold mb-4">Mis tareas</Text>

      <Link href="/new" className="text-blue-400 underline mb-4 text-lg">
        + Nueva tarea
      </Link>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`}>
            <TaskCard task={item} />
          </Link>
        )}
        ListEmptyComponent={
          <Text className="text-neutral-500 text-center mt-10">
            No hay tareas aún.
          </Text>
        }
      />
    </View>
  );
}
