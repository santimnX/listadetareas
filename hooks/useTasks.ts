import { useEffect, useState } from "react";
import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://192.168.45.30:3000/tasks"; // <-- cambia tu IP

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Cargar las tareas del servidor
  const loadTasks = async () => {
    try {
      const res = await axios.get<Task[]>(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error cargando tareas:", err);
    }
  };

  // Agregar tarea nueva al servidor
  const addTask = async (task: Omit<Task, "id">) => {
    try {
      const res = await axios.post<Task>(API_URL, task);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error agregando tarea:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    addTask,
  };
}
