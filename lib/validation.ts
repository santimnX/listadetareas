// lib/validation.ts

// Regex que permite solo letras y números (incluye espacios opcional)
const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;

export function validateRequired(value: string): string | null {
  if (!value.trim()) return "Este campo es obligatorio.";
  return null;
}

export function validateAlphanumeric(value: string): string | null {
  if (!alphanumericRegex.test(value)) {
    return "Solo se permiten caracteres alfanuméricos.";
  }
  return null;
}

export function validateMinLength(
  value: string,
  min: number
): string | null {
  if (value.trim().length < min) {
    return `Debe tener al menos ${min} caracteres.`;
  }
  return null;
}

/**
 * Valida ambos campos de una tarea.
 * Reutilizable en new.tsx y edit.tsx.
 */
export function validateTaskFields(title: string, description: string) {
  const errors: { title?: string; description?: string } = {};

  const titleReq = validateRequired(title);
  const titleAlpha = validateAlphanumeric(title);

  if (titleReq) errors.title = titleReq;
  else if (titleAlpha) errors.title = titleAlpha;

  if (description.trim()) {
    const descAlpha = validateAlphanumeric(description);
    if (descAlpha) errors.description = descAlpha;
  }

  return errors;
}
