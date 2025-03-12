import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonio: {
    id: number;
    nombre: string;
    rol: string;
    texto: string;
    rating: number;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonio }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg testimonial-card">
      <div className="flex items-center mb-4">
        {[...Array(testimonio.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
          />
        ))}
      </div>
      <p className="text-gray-600 mb-4">{testimonio.texto}</p>
      <div className="flex items-center">
        <div className="ml-4">
          <p className="font-semibold">{testimonio.nombre}</p>
          <p className="text-gray-500 text-sm">{testimonio.rol}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;