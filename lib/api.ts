// lib/api.ts
import axios from 'axios';
import { Task, TaskFormData } from '../lib/type';

// URL base de JSON Server
// IMPORTANTE: Cambia esta IP por la de tu máquina local
const API_URL = 'http://192.168.18.216:3000/tasks';

// Configurar axios con timeout
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logging (útil para debug)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout: El servidor no respondió a tiempo');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('🌐 Error de red: Verifica que JSON Server esté corriendo');
    }
    return Promise.reject(error);
  }
);

// GET - Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get<Task[]>('');
    return response.data;
  } catch (error: any) {
    console.error('Error en getTasks:', error.message);
    throw new Error('No se pudieron cargar las tareas. Verifica que JSON Server esté corriendo.');
  }
};

// GET - Obtener una tarea por ID
export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await axiosInstance.get<Task>(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error en getTaskById:', error.message);
    throw new Error('No se pudo cargar la tarea.');
  }
};

// POST - Crear nueva tarea
export const createTask = async (data: TaskFormData): Promise<Task> => {
  try {
    const newTask = {
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    const response = await axiosInstance.post<Task>('', newTask);
    return response.data;
  } catch (error: any) {
    console.error('Error en createTask:', error.message);
    throw new Error('No se pudo crear la tarea.');
  }
};

// PUT - Actualizar tarea existente
export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  try {
    const response = await axiosInstance.put<Task>(`/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error en updateTask:', error.message);
    throw new Error('No se pudo actualizar la tarea.');
  }
};

// DELETE - Eliminar tarea
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error: any) {
    console.error('Error en deleteTask:', error.message);
    throw new Error('No se pudo eliminar la tarea.');
  }
};