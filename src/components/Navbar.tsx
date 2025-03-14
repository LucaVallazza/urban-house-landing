import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  visible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ visible }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Close mobile menu if it's open
      setMobileMenuOpen(false);
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <nav 
      className={`
        bg-white fixed w-full z-50 shadow-md
        transition-all duration-500 ease-in-out
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo (always visible) */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img 
                src="/logo/urbanhouse_icon.png" 
                // src="/urban-house-landing/logo/urbanhouse_icon.png" 
                alt="Urban House Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/propiedades" className="text-gray-600 hover:text-blue-600 font-medium">
              Propiedades
            </Link>
            <button 
              onClick={() => handleNavigation('testimonios')}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Testimonios
            </button>
            <button 
              onClick={() => handleNavigation('contacto')}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Abrir menú</span>
              {/* Hamburger Icon */}
              {!mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pb-5">
            <Link 
              to="/propiedades" 
              className="text-gray-600 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Propiedades
            </Link>
            <button 
              onClick={() => handleNavigation('testimonios')}
              className="text-gray-600 hover:text-blue-600 font-medium text-left py-2 border-b border-gray-100"
            >
              Testimonios
            </button>
            <button 
              onClick={() => handleNavigation('contacto')}
              className="text-gray-600 hover:text-blue-600 font-medium text-left py-2"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;