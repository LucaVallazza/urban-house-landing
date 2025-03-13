import React, { ChangeEvent, useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  // Mensaje para WhatsApp
  const whatsappMessage = encodeURIComponent("Hola! Me gustaría recibir más información sobre sus propiedades.");
  const whatsappLink = `https://wa.me/5491112345678?text=${whatsappMessage}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica de envío del formulario
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Contactanos
        </h2>
        
        {/* Contenedor flex para colocar formulario y mapa lado a lado en desktop */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna del formulario */}
          <div className="lg:w-1/2">
            <h3 className="text-xl font-semibold mb-6">
              ¿Tenés alguna consulta?
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mensaje</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded h-32"
                  required
                ></textarea>
              </div>
              
              {/* Botones de contacto */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Enviar consulta
                </button>
                
                {/* Botón de WhatsApp */}
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded flex items-center justify-center gap-2 transition"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 1 1 0c0 .97 1.12 1.58 2 2.02 1.12.56 2 1.03 2 2.48a.5.5 0 0 1-1 0c0-.97-1.12-1.58-2-2.02-1.12-.56-2-1.03-2-2.48z" />
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </form>
          </div>
          
          {/* Columna del mapa */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-6">
              Nuestra ubicación
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="flex items-center text-gray-700 mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Av. Santa Fe 1234, CABA
              </p>
              <p className="flex items-center text-gray-700">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +54 9 11 2345-6789
              </p>
            </div>
            
            {/* Google Maps iframe - altura completa */}
            <div className="rounded-lg overflow-hidden shadow-md flex-grow">
              <iframe 
                title="Ubicación de Urban House"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.2025191600297!2d-58.390358684770194!3d-34.595957080463945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac2cb899b23%3A0xfd22b64681c66d9!2sAv.%20Santa%20Fe%201234%2C%20C1059%20CABA!5e0!3m2!1sen!2sar!4v1615818420337!5m2!1sen!2sar" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '350px' }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;