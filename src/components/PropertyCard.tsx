import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
  propiedad: {
    id: number;
    titulo: string;
    precio: string;
    tipo: string;
    ubicacion: string;
    caracteristicas: string;
    descripcion: string;
    imgUrl: string
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ propiedad }) => {
  // Manejador de eventos para el botón "Ver detalles"
  const handleVerDetalles = () => {
    alert("Esta función no está implementada para la versión de demostración de esta página");
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 h-full flex flex-col">
      {/* Imagen - altura fija */}
      <div className="relative h-48 md:h-56">
        <img 
          src={propiedad.imgUrl} 
          alt={propiedad.titulo} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
          {propiedad.tipo}
        </div>
      </div>
      
      {/* Contenido - flex-grow para expandirse */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{propiedad.titulo}</h3>
        <p className="text-blue-600 font-bold mb-2">${propiedad.precio}</p>
        
        {/* Ubicación con ícono de ubicación */}
        <p className="text-gray-500 text-sm mb-2 flex items-center">
          <MapPin size={14} className="mr-1 flex-shrink-0 text-gray-400" />
          {propiedad.ubicacion}
        </p>
        
        <p className="text-gray-500 text-sm mb-2">{propiedad.descripcion}</p>
        <p className="text-gray-500 text-sm mb-4 flex-grow">{propiedad.caracteristicas}</p>
        
        {/* Botón con borde azul y fondo blanco */}
        <button 
          onClick={handleVerDetalles}
          className="mt-auto border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
        >
          Ver detalles
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;