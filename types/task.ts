export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Trabajo' | 'Personal' | 'Prioridad Alta';
  completed: boolean;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: 'Trabajo' | 'Personal' | 'Prioridad Alta';
}