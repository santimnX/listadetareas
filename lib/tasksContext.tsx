
// lib/TaskContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskFormData } from './type';
import * as api from './api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

// Crear el contexto con un valor inicial undefined
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider Component
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (data: TaskFormData) => {
    try {
      const newTask = await api.createTask(data);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Error al crear la tarea');
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, data);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      setError('Error al actualizar la tarea');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea');
    }
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  };

  const value: TaskContextType = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de TaskProvider');
  }
  return context;
}
