// Formatea un número como precio en dólares u otra moneda

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  }
  