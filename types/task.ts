// types/task.ts
export interface Task {
    id: number;
    title: string;
    description?: string;
  }
  
  export interface TaskPayload {
    title: string;
    description?: string;
  }
  