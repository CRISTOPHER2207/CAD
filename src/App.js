import React, { useState, useEffect } from 'react';
import './App.css';
import fondo from './assets/mierda.jpg';

import imagenCarpinteria from './assets/mueble1.jpg';
import melamina1 from './assets/melamina1.png';
import melamina2 from './assets/melamina2.png';
import melamina3 from './assets/melamina3.jpg';
//... tus otras importaciones
import logo from './assets/logo.png';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Opcional: para íconos


// ... tu componente App

// NUEVO COMPONENTE FOOTER
function Footer() {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="footer-overlay"></div>
      <div className="footer-container">
        
        {/* Columna Izquierda: Logo y Copyright */}
        <div className="footer-column">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>© 2024 Corporation Rescate 24</p>
          <p>Optimizado por <a href="#" className="empresa-web">Agencia Web LM Marketing</a></p>
        </div>

        {/* Columna Central: Servicios */}
        <div className="footer-column">
          <h3>Servicios de asistencia</h3>
          <ul>
            <li><a href="#">Gasfitero en Lima</a></li>
            <li><a href="#">Electricista a Domicilio</a></li>
            <li><a href="#">Albañilería</a></li>
            <li><a href="#">Servicio Pintado</a></li>
            <li><a href="#">Vidriero a Domicilio</a></li>
            <li><a href="#">Carpintería</a></li>
          </ul>
        </div>

        {/* Columna Derecha: Contacto */}
        <div className="footer-column">
          <h3>Contacto</h3>
          <ul>
            <li>📍 Av. Huancavelica Nro. 3225 lima 31</li>
            <li>📧 overaoracio@rescatte24peru.com</li>
            <li>📞 +51 941 943 946</li>
          </ul>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const melaminaImages = [
    { src: melamina1, alt: 'Mueble de melamina 1', text: 'Diseño moderno y funcional para cocinas.' },
    { src: melamina2, alt: 'Mueble de melamina 2', text: 'Acabados de alta calidad y durabilidad.' },
    { src: melamina3, alt: 'Mueble de melamina 3', text: 'Soluciones a medida para optimizar tu espacio.' },
  ];

  const drywallImages = [
    { src: melamina1, alt: 'Drywall proyecto 1', text: 'Divisiones de ambientes funcionales y estéticos.' },
    { src: melamina2, alt: 'Drywall proyecto 2', text: 'Cielos rasos modernos y resistentes.' },
    { src: melamina3, alt: 'Drywall proyecto 3', text: 'Muros personalizados con acabados perfectos.' },
  ];

  const techoImages = [
    { src: melamina1, alt: 'Techo sol y sombra 1', text: 'Techos modernos que combinan estilo y frescura.' },
    { src: melamina2, alt: 'Techo sol y sombra 2', text: 'Diseños ideales para terrazas y patios.' },
    { src: melamina3, alt: 'Techo sol y sombra 3', text: 'Protección y estética para exteriores.' },
  ];

  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    const handleScroll = () => {
      if (scrollContainer.scrollTop > 20) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
    };
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { threshold: 0.3 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const renderGallerySection = (title, images) => (
    <section className="page page3">
      <div className="gallery-section-container fade-in">
        <div className="gallery-wrapper">
          <h1>{title}</h1>
          <div className="gallery-container">
            {images.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image.src} alt={image.alt} className="gallery-image" />
                <p className="gallery-text">{image.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
      
  );

  return (
    <div className="app">
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Proyectos</a></li>
          <li><a href="#">Servicios</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>

      <div className="scroll-container">
        <section className="page page1">
          <div className="overlay"></div>
          <div className="logo-container">
            <div className="logo-content">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </div>
        </section>

        <section className="page page2">
          <div className="text-container fade-in">
            <h1>¿Quiénes somos?</h1>
            <p>
              En CAD, nos especializamos en la fabricación de muebles de melamina a medida y la creación de ambientes funcionales con drywall. Cada pieza que diseñamos y cada pared que levantamos tienen un propósito: mejorar tu espacio, hacerlo más cómodo y reflejar tu estilo.
              Trabajamos con precisión, detalle y calidad para que tu visión se haga realidad. ¿Listo para transformar tu ambiente?
            </p>
          </div>
          <div className="image-container fade-in">
            <img src={imagenCarpinteria} alt="Melamina" className="left-image" />
          </div>
        </section>

        {renderGallerySection('Melamina', melaminaImages)}
        {renderGallerySection('Drywall', drywallImages)}
        {renderGallerySection('Techos Sol y Sombra', techoImages)}
           <Footer />
      
   
    

      </div>

      

      

      <a href="https://wa.me/+51939966333" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
      </a>
    </div>
  );

  

}


export default App;
