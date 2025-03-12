import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  visible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ visible }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="logo/urbanhouse_icon.png" 
                alt="Urban House Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;