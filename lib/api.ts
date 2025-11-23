// lib/api.ts
// Simulated API without fetch
// Simple in-memory store for demo
let tasks: any[] = [];
let idCounter = 1;

export const api = {
  getTasks: async () => {
    return [...tasks];
  },

  getTask: async (id: number) => {
    return tasks.find((t) => t.id === id) || null;
  },

  createTask: async (data: any) => {
    const newTask = { id: idCounter++, ...data };
    tasks.push(newTask);
    return newTask;
  },

  updateTask: async (id: number, data: any) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
  },

  deleteTask: async (id: number) => {
    tasks = tasks.filter((t) => t.id !== id);
    return true;
  },
};

// lib/validation.ts
export const validateTask = (data: any) => {
  const errors: any = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = "El título es obligatorio";
  }

  if (data.title && data.title.length > 50) {
    errors.title = "Máximo 50 caracteres";
  }

  return errors;
};

// lib/helpers.ts
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
