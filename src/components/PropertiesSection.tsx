import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';

interface Property {
  id: number;
  titulo: string;
  precio: string;
  tipo: string;
  ubicacion: string;
  caracteristicas: string;
  descripcion: string;
}

interface PropertiesSectionProps {
  propiedades: Property[];
}



const PropertiesSection: React.FC<PropertiesSectionProps> = ({ propiedades }) => {
  return (
    <section id="propiedades" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Propiedades Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedades.map((propiedad) => (
            <PropertyCard key={propiedad.id} propiedad={propiedad} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link 
            to="/propiedades"
            className="
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              font-medium 
              py-3 
              px-8 
              rounded-lg 
              transition-all 
              duration-300
              shadow-lg
              hover:shadow-xl
              transform
              hover:-translate-y-0.5
            "
          >
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;

