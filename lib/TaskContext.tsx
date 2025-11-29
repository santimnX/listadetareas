import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';
import { api } from './api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  loadTasks: () => Promise<void>;
  createTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: TaskFormData) => {
    try {
      setLoading(true);
      const newTask = await api.createTask(data);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear tarea');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      setLoading(true);
      const updated = await api.updateTask(id, data);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, loadTasks, createTask, updateTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks debe usarse dentro de TaskProvider');
  return context;
}