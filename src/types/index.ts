export interface Property {
  id: number;
  titulo: string;
  precio: string;
  tipo: string;
  ubicacion: string;
  caracteristicas: string;
  descripcion: string;
}

export interface Testimonial {
  id: number;
  nombre: string;
  rol: string;
  texto: string;
  rating: number;
}