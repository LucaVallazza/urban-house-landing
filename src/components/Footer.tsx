import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
 <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Urban House</h3>
              <p className="text-gray-400">
                Tu inmobiliaria de confianza en Buenos Aires
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Av. Santa Fe 1234, CABA
                </p>
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  +54 11 4567-8900
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  info@urbanhouse.com.ar
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horarios</h3>
              <p className="text-gray-400">
                Lunes a Viernes: 9:00 - 18:00
                <br />
                Sábados: 9:00 - 13:00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Urban House. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;