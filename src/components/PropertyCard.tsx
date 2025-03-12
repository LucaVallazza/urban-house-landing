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
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={propiedad.imgUrl}
        alt={propiedad.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{propiedad.titulo}</h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {propiedad.tipo}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{propiedad.descripcion}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          {propiedad.ubicacion}
        </div>
        <div className="text-gray-600 mb-4">{propiedad.caracteristicas}</div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            USD {propiedad.precio}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Ver más <ChevronRight className="inline-block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;