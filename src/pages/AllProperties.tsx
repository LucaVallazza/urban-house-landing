import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

interface AllPropertiesProps {
  propiedades: Property[];
}

const AllProperties: React.FC<AllPropertiesProps> = ({ propiedades }) => {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [minAmbientes, setMinAmbientes] = useState('');
  const [maxAmbientes, setMaxAmbientes] = useState('');

  // Helper function to normalize text
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Get unique locations and types
  const ubicaciones = [...new Set(propiedades.map(p => p.ubicacion.split(',')[0].trim()))];
  const tipos = [...new Set(propiedades.map(p => p.tipo))];

  // Filter properties
  const filteredProperties = useMemo(() => {
    return propiedades.filter(propiedad => {
      const normalizedSearch = normalizeText(searchTerm);
      const searchMatch = searchTerm === '' || 
        normalizeText(propiedad.descripcion).includes(normalizedSearch) ||
        normalizeText(propiedad.ubicacion).includes(normalizedSearch) ||
        normalizeText(propiedad.titulo).includes(normalizedSearch);

      const tipoMatch = selectedTipo === '' || propiedad.tipo === selectedTipo;
      
      const ubicacionMatch = selectedUbicacion === '' || 
        propiedad.ubicacion.includes(selectedUbicacion);

      const precio = parseInt(propiedad.precio.replace(/\./g, ''));
      const precioMatch = (minPrecio === '' || precio >= parseInt(minPrecio)) &&
        (maxPrecio === '' || precio <= parseInt(maxPrecio));

      const ambientes = parseInt(propiedad.caracteristicas.split('|')[0].trim());
      const ambientesMatch = (minAmbientes === '' || ambientes >= parseInt(minAmbientes)) &&
        (maxAmbientes === '' || ambientes <= parseInt(maxAmbientes));

      return searchMatch && tipoMatch && ubicacionMatch && precioMatch && ambientesMatch;
    });
  }, [propiedades, searchTerm, selectedTipo, selectedUbicacion, minPrecio, maxPrecio, minAmbientes, maxAmbientes]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Todas nuestras propiedades
        </h1>
  
        {/* Filters Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por ubicación o descripción"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
  
            {/* Tipo Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tipo
              </label>
              <select
                value={selectedTipo}
                onChange={(e) => setSelectedTipo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
              >
                <option value="">Todos</option>
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
  
            {/* Ubicación Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Ubicación
              </label>
              <select
                value={selectedUbicacion}
                onChange={(e) => setSelectedUbicacion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
              >
                <option value="">Todas</option>
                {ubicaciones.map(ubicacion => (
                  <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                ))}
              </select>
            </div>
  
            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Rango de Precio (USD)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={minPrecio}
                  onChange={(e) => setMinPrecio(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <input
                  type="number"
                  value={maxPrecio}
                  onChange={(e) => setMaxPrecio(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
  
            {/* Ambientes Range */}
            <div className="space-y-2 lg:col-span-4">
              <label className="block text-sm font-semibold text-gray-700">
                Ambientes
              </label>
              <div className="flex gap-3 max-w-md">
                <input
                  type="number"
                  value={minAmbientes}
                  onChange={(e) => setMinAmbientes(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <input
                  type="number"
                  value={maxAmbientes}
                  onChange={(e) => setMaxAmbientes(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((propiedad) => (
            <PropertyCard key={propiedad.id} propiedad={propiedad} />
          ))}
        </div>
  
        {/* No Results Message */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200 mt-8">
            <p className="text-xl text-gray-500">
              No se encontraron propiedades con los filtros seleccionados
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTipo('');
                setSelectedUbicacion('');
                setMinPrecio('');
                setMaxPrecio('');
                setMinAmbientes('');
                setMaxAmbientes('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;