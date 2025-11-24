// types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
  
  export interface TaskPayload {
    title: string;
    description?: string;
  }
  