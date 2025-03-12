import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertiesSection from './components/PropertiesSection';
import TestimonialCard from './components/TestimonialCard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AllProperties from './pages/AllProperties';
import properties from './data/properties.json';

const App = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only hide when at the very top (with small threshold)
      setVisible(window.scrollY > 10);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const propiedadesDestacadas = [
    {
      id: 1,
      titulo: 'Ático de Lujo en Palermo',
      precio: '450.000',
      tipo: 'Venta',
      ubicacion: 'Palermo, Buenos Aires',
      caracteristicas: '3 amb. | 120m² | 2 baños',
      descripcion: 'Espectacular ático con vista panorámica y terraza privada',
      imgUrl: '/src/assets/propiedades/pale-atico.jpg'
    },
    {
      id: 2,
      titulo: 'Departamento Moderno',
      precio: '180.000',
      tipo: 'Alquiler',
      ubicacion: 'Belgrano, Buenos Aires',
      caracteristicas: '2 amb. | 75m² | 1 baño',
      descripcion: 'Ubicación privilegiada, totalmente renovado',
      imgUrl: '/src/assets/propiedades/belg-dto-Moderno.jpg'
    },
    {
      id: 3,
      titulo: 'Casa Familiar',
      precio: '320.000',
      tipo: 'Venta',
      ubicacion: 'Vicente López, GBA',
      caracteristicas: '4 amb. | 200m² | 3 baños',
      descripcion: 'Amplio jardín y piscina, perfecta para familias',
      imgUrl: '/src/assets/propiedades/vic-lop-casa-familiar.jpg'
    }
  ];

  const testimonios = [
    {
      id: 1,
      nombre: 'María González',
      rol: 'Propietaria',
      texto: 'Me ayudaron a vender mi casa en menos de 1 mes. Muy recomendados',
      rating: 5
    },
    {
      id: 2,
      nombre: 'Carlos Rodríguez',
      rol: 'Comprador',
      texto: 'Me ayudaron a encontrar exactamente lo que buscaba, su asesoramiento fue fundamental.',
      rating: 5
    },
    {
      id: 3,
      nombre: 'Laura Martínez',
      rol: 'Inversora',
      texto: 'profesionales serios y confiables. es la tercera venta que realizo con ellos.',
      rating: 5
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 scroll-smooth">
            <Navbar visible={visible} />
            <Hero />
            <PropertiesSection propiedades={propiedadesDestacadas} />
            <section id="testimonios" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Lo que dicen nuestros clientes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonios.map((testimonio) => (
                    <TestimonialCard key={testimonio.id} testimonio={testimonio} />
                  ))}
                </div>
              </div>
            </section>
            <ContactForm />
            <Footer />
          </div>
        } />
        <Route 
          path="/propiedades" 
          element={
            <>
              <Navbar visible={visible} />
              <AllProperties propiedades={properties.propiedades} />
            </>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;