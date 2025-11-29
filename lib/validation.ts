import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título no puede estar vacío')
    .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten caracteres alfanuméricos'),
  description: z
    .string()
    .min(1, 'La descripción no puede estar vacía')
    .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,!?]+$/, 'Solo se permiten caracteres alfanuméricos'),
  category: z.enum(['Trabajo', 'Personal', 'Prioridad Alta'])
});

export type TaskFormData = z.infer<typeof taskSchema>;