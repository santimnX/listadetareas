// lib/helpers.ts

/**
 * Convierte un ID recibido desde la URL a número seguro
 */
export function parseId(id: string | string[] | undefined): number | null {
    if (!id) return null;
    if (Array.isArray(id)) return Number(id[0]);
    const parsed = Number(id);
    return isNaN(parsed) ? null : parsed;
  }
  
  /**
   * Retorna una pequeña demora (útil para simular carga)
   */
  export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  /**
   * Capitaliza la primera letra
   */
  export function capitalize(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  