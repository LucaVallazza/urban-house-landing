import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const whatsappMessage = encodeURIComponent("Hola! Estoy interesado en conocer mas acerca de sus propiedades");

  useEffect(() => {
    // Trigger animations after a slight delay for smoother loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with subtle zoom effect */}
      <div className="absolute inset-0 bg-gray-900/70">
        <img
          src="src/assets/hero_background.jpg"
          alt="Hero Background"
          className={`
            w-full h-full object-cover brightness-75 
            transition-all duration-[2s] ease-out
            ${isLoaded ? 'scale-105 blur-md' : 'scale-110 blur-lg'}
          `}
        />
      </div>

      {/* Content container */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        {/* Logo with simple fade */}
        <img 
          src="logo/urbanhouse_icon_white.png" 
          alt="Urban House Logo" 
          className={`
            h-32 w-auto mb-8 drop-shadow-xl
            transition-all duration-1000 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}
          `}
        />

        {/* Title with slightly delayed fade */}
        <h1 
          className={`
            text-5xl md:text-6xl font-bold text-white mb-6
            transition-all duration-1000 ease-out delay-300
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}
          `}
        >
          Urban House
        </h1>

        {/* Subtitle with more delay */}
        <p 
          className={`
            text-xl md:text-2xl text-white mb-8
            transition-all duration-1000 ease-out delay-500
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}
          `}
        >
          Tu hogar ideal está más cerca de lo que pensás
        </p>
        
        {/* Buttons with fade in and slight movement */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link 
            to="/propiedades" 
            className={`
              px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
              transition-all duration-1000 ease-out delay-700 hover:shadow-xl hover:-translate-y-0.5
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}
            `}
          >
            Ver propiedades
          </Link>
          
          <a 
            href={`https://api.whatsapp.com/send?phone=1141406819&text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg
              flex items-center justify-center 
              transition-all duration-1000 ease-out delay-900 hover:shadow-xl hover:-translate-y-0.5
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}
            `}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ponerse en contacto
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;