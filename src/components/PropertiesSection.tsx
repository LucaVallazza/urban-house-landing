import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

interface Property {
  id: number;
  titulo: string;
  precio: string;
  tipo: string;
  ubicacion: string;
  caracteristicas: string;
  descripcion: string;
  imgUrl: string;
}

interface PropertiesSectionProps {
  propiedades: Property[];
}

const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  propiedades,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Determinar cantidad de elementos por vista según el ancho de pantalla
  useEffect(() => {
    const updateItemsPerView = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      
      if (mobile) { // sm breakpoint
        setItemsPerView(1); 
      } else if (window.innerWidth < 1024) { // lg breakpoint
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);
  
  // Cálculo correcto del máximo índice posible
  const maxIndex = Math.max(0, propiedades.length - itemsPerView);
  
  // Funciones de navegación
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex >= maxIndex) {
        return 0; // Volver al principio cuando llega al final
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };
  
  // Configurar el carrusel automático
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      
      autoplayTimerRef.current = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, 5000);
    };
    
    startAutoplay();
    
    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, maxIndex]);
  
  // Manejar eventos táctiles para el deslizamiento
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pausar el autoplay durante el toque
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    // Reactivar el autoplay después del toque
    setIsPaused(false);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Umbral mínimo para considerar un deslizamiento
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Restablecer valores
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Pausar autoplay cuando el mouse está sobre el carrusel
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  return (
    <section id="propiedades" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Propiedades Destacadas
        </h2>
        
        {/* Carrusel - padding reducido en móvil */}
        <div 
          className="relative px-0 sm:px-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Botones de navegación - solo para desktop */}
          {propiedades.length > itemsPerView && !isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white h-10 w-10 rounded-full shadow-md flex items-center justify-center text-blue-600 border border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <ChevronLeft />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white h-10 w-10 rounded-full shadow-md flex items-center justify-center text-blue-600 border border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <ChevronRight />
              </button>
            </>
          )}
          
          {/* Contenedor del carrusel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {propiedades.map((propiedad) => (
                <div 
                  key={propiedad.id} 
                  className="px-1 sm:px-2 flex-shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  {/* Contenedor para mantener consistencia en padding solo para móvil */}
                  <div className="sm:p-0 px-2">
                    <PropertyCard propiedad={propiedad} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores - ajustados para mejor visibilidad en móvil */}
          {propiedades.length > itemsPerView && (
            <div className="flex justify-center mt-6 gap-3">
              {Array.from({ length: Math.min(propiedades.length, maxIndex + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Botón Ver todas */}
        <div className="flex justify-center mt-12">
          <Link
            to="/propiedades"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;