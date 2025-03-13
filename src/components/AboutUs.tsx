import React, { useState } from 'react';
import { Award, Users, ShieldCheck, Target, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [isMobile, setIsMobile] = useState(false);
  
  // // Verificar si la pantalla es móvil al cargar y cuando cambia el tamaño
  // useEffect(() => {
  //   const checkIfMobile = () => {
  //     setIsMobile(window.innerWidth < 640); // 640px es el breakpoint sm en Tailwind
  //   };
    
  //   // Verificar inicialmente
  //   checkIfMobile();
    
  //   // Verificar cuando cambia el tamaño de la ventana
  //   window.addEventListener('resize', checkIfMobile);
    
  //   return () => {
  //     window.removeEventListener('resize', checkIfMobile);
  //   };
  // }, []);
  
  // Datos de las tarjetas
  const features = [
    {
      icon: <Award size={48} strokeWidth={1.5} />,
      title: "Experiencia",
      description: "Más de una década brindando soluciones inmobiliarias efectivas a cientos de clientes satisfechos."
    },
    {
      icon: <Users size={48} strokeWidth={1.5} />,
      title: "Equipo profesional",
      description: "Contamos con un equipo de agentes altamente capacitados y comprometidos con tu satisfacción."
    },
    {
      icon: <ShieldCheck size={48} strokeWidth={1.5} />,
      title: "Confianza",
      description: "Transparencia y honestidad en cada paso del proceso, garantizando transacciones seguras y claras."
    },
    {
      icon: <Target size={48} strokeWidth={1.5} />,
      title: "Enfoque personalizado",
      description: "Entendemos tus necesidades específicas para ofrecerte las mejores opciones adaptadas a tus requisitos."
    }
  ];

  // Navegar a la tarjeta anterior
  const prevCard = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  };

  // Navegar a la tarjeta siguiente
  const nextCard = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <section id="sobre-nosotros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Sobre Nosotros</h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600">
            En <span className="font-semibold text-blue-600">Urban House</span> nos apasiona conectar personas con el hogar de sus sueños. 
            Con más de 10 años de experiencia en el mercado inmobiliario, ofrecemos un servicio integral y personalizado 
            para hacer de cada transacción una experiencia satisfactoria.
          </p>
        </div>
        
        {/* Vista de escritorio - grid normal */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 flex justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Vista móvil - carrusel */}
        <div className="sm:hidden mt-12 relative">
          <div className="bg-white p-6 rounded-lg shadow-md min-h-[250px] flex flex-col items-center">
            <div className="text-blue-600 flex justify-center mb-5">
              {features[activeIndex].icon}
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">{features[activeIndex].title}</h3>
            <p className="text-gray-600 text-center">
              {features[activeIndex].description}
            </p>
            
            {/* Indicadores de página */}
            <div className="flex justify-center mt-6 gap-2">
              {features.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Ver característica ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Botones de navegación */}
          <button 
            onClick={prevCard}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 bg-white h-8 w-8 rounded-full shadow-md flex items-center justify-center text-blue-600 border border-gray-200"
            aria-label="Característica anterior"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextCard}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 bg-white h-8 w-8 rounded-full shadow-md flex items-center justify-center text-blue-600 border border-gray-200"
            aria-label="Característica siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Nuestra misión con icono de estrella */}
        <div className="mt-16 bg-blue-50 p-8 rounded-lg border border-blue-100 max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Star size={32} className="text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Nuestra misión</h3>
          <p className="text-gray-700 text-center">
            Facilitar el acceso a la vivienda ideal, brindando asesoramiento experto y acompañamiento durante 
            todo el proceso de compra, venta o alquiler, con el compromiso de superar las expectativas de 
            nuestros clientes en cada interacción.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;