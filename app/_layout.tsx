// app/_layout.tsx
import "../global.css";
import { Stack } from "expo-router";
import { TasksProvider } from "../context/TasksContext";

export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#111" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#000" },
        }}
      />
    </TasksProvider>
  );
}
