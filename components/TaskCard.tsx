// components/TaskCard.tsx
import { View, Text } from "react-native";
import { Task } from "../types/task";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <View className="bg-neutral-900 p-4 rounded-xl mb-3 border border-neutral-800">
      <Text className="text-white text-xl font-semibold">
        {task.title}
      </Text>

      {task.description ? (
        <Text className="text-neutral-400 mt-1">{task.description}</Text>
      ) : null}
    </View>
  );
}
