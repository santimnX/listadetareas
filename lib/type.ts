// lib/types.ts
import { z } from 'zod';

// Schema de validación para el formulario
export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras, números y espacios'),
  
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Solo se permiten letras, números y espacios'),
  
  category: z
    .string()
    .min(1, 'La categoría es obligatoria')
});

// Inferir tipos desde el schema
export type TaskFormData = z.infer<typeof taskFormSchema>;

// Interface completa de Task (incluye campos que vienen del servidor)
export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

// Tipo para errores de validación
export type ValidationErrors = {
  [K in keyof TaskFormData]?: string;
};