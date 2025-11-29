import { Alert } from 'react-native';
import { Task, TaskFormData } from '../types/task';

// Cambia esto según tu configuración
// Para Android Emulator usa: http://10.0.2.2:3000/tasks
// Para dispositivo físico usa tu IP local: http://192.168.x.x:3000/tasks
// Para iOS Simulator usa: http://localhost:3000/tasks
export const API_URL = 'http://0.0.0.0:3000/tasks'; 

export const api = {
  // GET - Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    try {
      console.log('🔵 Obteniendo tareas desde:', API_URL);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Tareas obtenidas:', data.length);
      return data;
    } catch (error) {
      console.error('❌ Error al obtener tareas:', error);
      Alert.alert('Error', 'No se pudieron cargar las tareas');
      throw error;
    }
  },

  // GET - Obtener una tarea por ID
  getTask: async (id: string): Promise<Task> => {
    try {
      console.log('🔵 Obteniendo tarea ID:', id);
      const response = await fetch(`${API_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error('Tarea no encontrada');
      }
      
      const data = await response.json();
      console.log('✅ Tarea obtenida:', data);
      return data;
    } catch (error) {
      console.error('❌ Error al obtener tarea:', error);
      Alert.alert('Error', 'No se pudo cargar la tarea');
      throw error;
    }
  },

  // POST - Crear nueva tarea
  createTask: async (data: TaskFormData): Promise<Task> => {
    try {
      console.log('🔵 Creando tarea:', data);
      
      const newTask = {
        ...data,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}`);
      }

      const createdTask = await response.json();
      console.log('✅ Tarea creada:', createdTask);
      return createdTask;
    } catch (error) {
      console.error('❌ Error al crear tarea:', error);
      Alert.alert('Error', 'No se pudo crear la tarea');
      throw error;
    }
  },

  // PUT - Actualizar tarea completa
  updateTask: async (id: string, data: Partial<Task>): Promise<Task> => {
    try {
      console.log('🔵 Actualizando tarea ID:', id, 'con datos:', data);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          ...data,
          updatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar tarea');
      }

      const updatedTask = await response.json();
      console.log('✅ Tarea actualizada:', updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('❌ Error al actualizar tarea:', error);
      Alert.alert('Error', 'No se pudo actualizar la tarea');
      throw error;
    }
  },

  // PATCH - Cambiar solo el estado de completada
  toggleComplete: async (id: string, currentCompleted: boolean): Promise<Task> => {
    try {
      console.log('🔵 Cambiando estado de tarea ID:', id);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          completed: !currentCompleted
        })
      });

      if (!response.ok) {
        throw new Error('Error al cambiar estado');
      }

      const updatedTask = await response.json();
      console.log('✅ Estado cambiado:', updatedTask);
      return updatedTask;
    } catch (error) {
      console.error('❌ Error al cambiar estado:', error);
      Alert.alert('Error', 'No se pudo cambiar el estado');
      throw error;
    }
  },

  // DELETE - Eliminar tarea
  deleteTask: async (id: string): Promise<void> => {
    try {
      console.log('🔴 Eliminando tarea ID:', id);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json' 
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}`);
      }

      console.log('✅ Tarea eliminada correctamente');
    } catch (error) {
      console.error('❌ Error al eliminar tarea:', error);
      Alert.alert('Error', 'No se pudo eliminar la tarea');
      throw error;
    }
  }
};