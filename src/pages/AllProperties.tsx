import React, { useState, useMemo } from 'react';
import { Search, Home, MapPin, DollarSign, Layout, Filter, X, ChevronDown } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

interface AllPropertiesProps {
  propiedades: Property[];
}

const AllProperties: React.FC<AllPropertiesProps> = ({ propiedades }) => {
  // Estados de filtros y otras funciones permanecen igual
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [minAmbientes, setMinAmbientes] = useState('');
  const [maxAmbientes, setMaxAmbientes] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  // Count active filters
  const activeFilterCount = [
    searchTerm, 
    selectedTipo, 
    selectedUbicacion, 
    minPrecio, 
    maxPrecio, 
    minAmbientes, 
    maxAmbientes
  ].filter(Boolean).length;

  // Filter properties
  const filteredProperties = useMemo(() => {
    // ...your existing filter logic
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

  // Toggle filter section visibility
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // Toggle filter category in mobile view
  const toggleFilter = (filter: string) => {
    setActiveFilters(current => 
      current.includes(filter) 
        ? current.filter(f => f !== filter)
        : [...current, filter]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTipo('');
    setSelectedUbicacion('');
    setMinPrecio('');
    setMaxPrecio('');
    setMinAmbientes('');
    setMaxAmbientes('');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Eliminar el h1 "Todas nuestras propiedades" ya que el Navbar ya debería estar presente */}
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={toggleFilters}
          className="md:hidden w-full flex items-center justify-center gap-2 bg-white py-3 px-4 rounded-lg shadow-md mb-4 font-medium text-gray-700 transition-all"
        >
          {filtersOpen ? (
            <>
              <X size={18} />
              Cerrar filtros
            </>
          ) : (
            <>
              <Filter size={18} />
              {activeFilterCount > 0 ? `Filtros (${activeFilterCount})` : 'Filtrar propiedades'}
            </>
          )}
        </button>
  
        {/* Filters Section */}
        <div className={`bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 mb-8
          ${filtersOpen ? 'max-h-[1500px] opacity-100' : 'md:max-h-[1500px] md:opacity-100 max-h-0 opacity-0'}`}>
          
          {/* Desktop Filter Header - Modificado para ser más prominente */}
          <div className="hidden md:flex items-center justify-between bg-blue-50 p-4 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <Filter className="text-blue-600" size={20} />
              <h2 className="font-semibold text-gray-800">Buscar propiedades</h2>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
              >
                <X size={14} />
                Limpiar filtros ({activeFilterCount})
              </button>
            )}
          </div>
          
          {/* Filter Content */}
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
              
              {/* Search Filter */}
              <div className={`filter-group ${activeFilters.includes('search') ? 'active' : ''}`}>
                <div 
                  className="flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleFilter('search')}
                >
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Search size={16} className="text-blue-600" />
                    <span>Buscar</span>
                  </div>
                  <ChevronDown size={16} className="md:hidden" />
                </div>
                <div className={`mt-2 md:block ${activeFilters.includes('search') ? 'block' : 'hidden'}`}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar propiedades"
                      className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 placeholder-gray-400"
                    />
                    <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
  
              {/* Tipo Filter */}
              <div className={`filter-group ${activeFilters.includes('tipo') ? 'active' : ''}`}>
                <div 
                  className="flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleFilter('tipo')}
                >
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Home size={16} className="text-blue-600" />
                    <span>Tipo</span>
                  </div>
                  <ChevronDown size={16} className="md:hidden" />
                </div>
                <div className={`mt-2 md:block ${activeFilters.includes('tipo') ? 'block' : 'hidden'}`}>
                  <div className="relative">
                    <select
                      value={selectedTipo}
                      onChange={(e) => setSelectedTipo(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-gray-50 pr-10"
                    >
                      <option value="">Todos los tipos</option>
                      {tipos.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
  
              {/* Ubicación Filter */}
              <div className={`filter-group ${activeFilters.includes('ubicacion') ? 'active' : ''}`}>
                <div 
                  className="flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleFilter('ubicacion')}
                >
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <MapPin size={16} className="text-blue-600" />
                    <span>Ubicación</span>
                  </div>
                  <ChevronDown size={16} className="md:hidden" />
                </div>
                <div className={`mt-2 md:block ${activeFilters.includes('ubicacion') ? 'block' : 'hidden'}`}>
                  <div className="relative">
                    <select
                      value={selectedUbicacion}
                      onChange={(e) => setSelectedUbicacion(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-gray-50 pr-10"
                    >
                      <option value="">Todas las ubicaciones</option>
                      {ubicaciones.map(ubicacion => (
                        <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
  
              {/* Price Filter */}
              <div className={`filter-group ${activeFilters.includes('precio') ? 'active' : ''}`}>
                <div 
                  className="flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleFilter('precio')}
                >
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <DollarSign size={16} className="text-blue-600" />
                    <span>Precio (USD)</span>
                  </div>
                  <ChevronDown size={16} className="md:hidden" />
                </div>
                <div className={`mt-2 md:block ${activeFilters.includes('precio') ? 'block' : 'hidden'}`}>
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={minPrecio}
                        onChange={(e) => setMinPrecio(e.target.value)}
                        placeholder="Min"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 placeholder-gray-400"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={maxPrecio}
                        onChange={(e) => setMaxPrecio(e.target.value)}
                        placeholder="Max"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Ambientes Filter */}
              <div className={`filter-group ${activeFilters.includes('ambientes') ? 'active' : ''}`}>
                <div 
                  className="flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleFilter('ambientes')}
                >
                  <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <Layout size={16} className="text-blue-600" />
                    <span>Ambientes</span>
                  </div>
                  <ChevronDown size={16} className="md:hidden" />
                </div>
                <div className={`mt-2 md:block ${activeFilters.includes('ambientes') ? 'block' : 'hidden'}`}>
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={minAmbientes}
                        onChange={(e) => setMinAmbientes(e.target.value)}
                        placeholder="Min"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 placeholder-gray-400"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={maxAmbientes}
                        onChange={(e) => setMaxAmbientes(e.target.value)}
                        placeholder="Max"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filter Actions */}
            <div className="md:hidden mt-6 flex justify-between">
              <button
                onClick={clearFilters}
                className="py-2 px-4 text-gray-600 text-sm border border-gray-300 rounded-lg"
              >
                Limpiar filtros
              </button>
              <button
                onClick={toggleFilters}
                className="py-2 px-5 bg-blue-600 text-white font-medium rounded-lg text-sm"
              >
                Ver {filteredProperties.length} propiedades
              </button>
            </div>
          </div>
        </div>
  
        {/* Results Stats */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 font-medium">
            {filteredProperties.length} 
            {filteredProperties.length === 1 ? ' propiedad encontrada' : ' propiedades encontradas'}
          </p>
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
            <p className="text-xl text-gray-500 mb-2">
              No se encontraron propiedades
            </p>
            <p className="text-gray-400 mb-4">
              Intenta modificar los filtros de búsqueda
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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