import React, { useState, useEffect } from 'react';
import './App.css';

// --- COMPONENTES EXTERNOS ---
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- ACTIVOS ---
import fondo from './assets/mierda.jpg';
import logo from './assets/logo.png';
import imagenCarpinteria from './assets/mueble1.jpg'; // Imagen representativa para Showroom
import melamina1 from './assets/melamina1.png';
import melamina2 from './assets/melamina2.png';
import melamina3 from './assets/melamina3.jpg';

// --- ICONOS ---
import {
  FaHammer, FaPalette, FaLayerGroup, FaHourglassHalf, FaFacebook, FaInstagram,
  FaLeaf, FaShieldAlt, FaTools, FaRulerCombined, FaHardHat, FaSun
} from 'react-icons/fa';

// --- COMPONENTE FOOTER ---
function Footer() {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="footer-overlay"></div>
      <div className="footer-container">
        <div className="footer-column">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>© 2024 Corporation Rescate 24</p>
          <p>Optimizado por <a href="https://google.com" className="empresa-web" target="_blank" rel="noopener noreferrer">Agencia Web LM Marketing</a></p>
        </div>
        <div className="footer-column">
          <h3>Servicios de asistencia</h3>
          <ul>
            <li><button className="link-btn">Gasfitero en Lima</button></li>
            <li><button className="link-btn">Electricista a Domicilio</button></li>
            <li><button className="link-btn">Albañilería</button></li>
            <li><button className="link-btn">Carpintería</button></li>
          </ul>
        </div>
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

  // Ajustes de los carruseles automáticos
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    fade: true,
  };

  // --- ESTRUCTURA DE DATOS PARA LAS SECCIONES DETALLADAS ---
  const sections = {
    melamina: {
      id: 'melamina',
      title: 'Muebles de Melamina',
      headline: 'Diseño funcional y estética moderna para tu hogar.',
      images: [melamina1, melamina2, melamina3],
      features: [
        { icon: <FaLayerGroup />, title: 'Materiales Premium', description: 'Melamina de alta densidad con protección antimicrobiana y resistencia al rayado.' },
        { icon: <FaPalette />, title: 'Diseño Personalizado', description: 'Creamos muebles a medida que se adaptan perfectamente a tu espacio y estilo.' },
        { icon: <FaShieldAlt />, title: 'Acabados Duraderos', description: 'Cantos de PVC y herrajes de primera calidad para una larga vida útil.' }
      ]
    },
    drywall: {
      id: 'drywall',
      title: 'Estructuras en Drywall',
      headline: 'Soluciones constructivas versátiles, rápidas y limpias.',
      images: [melamina2, melamina3, melamina1],
      features: [
        { icon: <FaHardHat />, title: 'Instalación Rápida', description: 'Proceso de construcción en seco que reduce significativamente los tiempos de obra.' },
        { icon: <FaRulerCombined />, title: 'Versatilidad de Diseño', description: 'Ideal para cielos rasos, tabiquería, detalles curvos y muebles empotrados.' },
        { icon: <FaLeaf />, title: 'Eficiencia', description: 'Permite incorporar fácilmente aislamiento térmico y acústico en su interior.' }
      ]
    },
    techos: {
      id: 'techos',
      title: 'Techos Sol y Sombra',
      headline: 'Disfruta de tus exteriores con estilo y protección.',
      images: [melamina3, melamina1, melamina2],
      features: [
        { icon: <FaSun />, title: 'Protección UV', description: 'Coberturas que filtran los rayos solares dañinos, creando un ambiente fresco.' },
        { icon: <FaTools />, title: 'Estructura Robusta', description: 'Utilizamos madera selecta tratada o metal con acabados resistentes a la intemperie.' },
        { icon: <FaRulerCombined />, title: 'Integración Arquitectónica', description: 'Diseños que complementan la estética de tu terraza o jardín.' }
      ]
    }
  };

  // Control de Navbar al hacer scroll
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    const handleScroll = () => {
      if (scrollContainer.scrollTop > 20) setIsNavbarVisible(false);
      else setIsNavbarVisible(true);
    };
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  // Control de animaciones fade-in corregido
  useEffect(() => {
    const scrollRoot = document.querySelector('.scroll-container');
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Dejar de observar para que no desaparezca
          }
        });
      },
      { 
        root: scrollRoot,
        threshold: 0.1 
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Función de renderizado para las secciones en Zigzag
  const renderDetailedSection = (data, isImageRight) => (
    <section className="page detailed-section" id={data.id}>
      <div className={`detailed-container fade-in ${isImageRight ? 'reverse-layout' : ''}`}>
        <div className="detailed-carousel-col">
          <div className="carousel-wrapper-shadow">
            <Slider {...sliderSettings}>
              {data.images.map((img, i) => (
                <div key={i} className="carousel-slide-item">
                  <img src={img} alt={`${data.title} ${i}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="detailed-text-col">
          <h2>{data.title}</h2>
          <div className="divider-line"></div>
          <p className="section-headline">{data.headline}</p>
          <div className="features-list">
            {data.features.map((f, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-content">
                  <h4>{f.title}</h4>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="elegant-button">Cotizar ahora</button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="app">
      {/* Barra de navegación */}
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#melamina">Melamina</a></li>
          <li><a href="#drywall">Drywall</a></li>
          <li><a href="#techos">Techos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      <div className="scroll-container">
        {/* VENTANA 1: INICIO */}
        <section className="page page1" id="inicio">
          <div className="overlay"></div>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </section>

        {/* VENTANA 2: SELLO DE CALIDAD */}
        <section className="page page-quality">
          <div className="quality-content">
            <div className="quality-header">
              <h1>El Sello de Calidad</h1>
              <p className="quality-subtitle">Artesanía de Excelencia. Diseño Personalizado. Calidad Duradera.</p>
            </div>
            <div className="quality-grid">
              <div className="quality-item"><FaHammer className="quality-icon" /><h3>Calidad Artesanal</h3><p>Fabricación cuidadosa por expertos.</p></div>
              <div className="quality-item"><FaPalette className="quality-icon" /><h3>Diseño a Medida</h3><p>Adaptado a tu estilo y espacio.</p></div>
              <div className="quality-item"><FaLayerGroup className="quality-icon" /><h3>Materiales Premium</h3><p>Selección para durabilidad y estética.</p></div>
              <div className="quality-item"><FaHourglassHalf className="quality-icon" /><h3>Larga Duración</h3><p>Construido para resistir el paso del tiempo.</p></div>
            </div>
          </div>
        </section>
        
        {/* VENTANA 3: MENÚ DE COLECCIONES */}
        <section className="page collections-section">
          <div className="collections-content">
            <div className="collections-header">
              <h1>Explora nuestras Colecciones</h1>
              <p>Descubre la variedad de servicios para tu hogar.</p>
            </div>
            <div className="collections-grid">
                <a href="#melamina" className="collection-card-link">
                  <div className="collection-card">
                    <div className="collection-image-wrapper"><img src={melamina1} alt="Melamina" /></div>
                    <h3>MELAMINA</h3>
                  </div>
                </a>
                <a href="#drywall" className="collection-card-link">
                  <div className="collection-card">
                    <div className="collection-image-wrapper"><img src={melamina2} alt="Drywall" /></div>
                    <h3>DRYWALL</h3>
                  </div>
                </a>
                <a href="#techos" className="collection-card-link">
                  <div className="collection-card">
                    <div className="collection-image-wrapper"><img src={melamina3} alt="Techos" /></div>
                    <h3>TECHOS</h3>
                  </div>
                </a>
            </div>
          </div>
        </section>

        {/* VENTANAS DETALLADAS (Zigzag) */}
        {renderDetailedSection(sections.melamina, false)}
        {renderDetailedSection(sections.drywall, true)}
        {renderDetailedSection(sections.techos, false)}

        {/* --- NUEVA VENTANA: VISIT OUR SHOWROOM (UBICACIÓN) --- */}
        {/* --- VENTANA: VISIT OUR SHOWROOM (UBICACIÓN ACTUALIZADA) --- */}
<section className="page showroom-section" id="contacto">
  <div className="showroom-content fade-in">
    <div className="showroom-header">
      <h1>Visita nuestro Showroom</h1>
      <p>Vive la experiencia de nuestras colecciones en persona y siente la diferencia.</p>
    </div>
    <div className="showroom-grid">
      <div className="showroom-info">
        <h2>Rescate 24 Showroom</h2>
        <div className="info-details">
          {/* Dirección actualizada en el texto */}
          <p className="address">📍 Av. Paseo de la República 4395, Surquillo</p>
          <p className="city">Lima: <a href="tel:+51941943946">941 943 946</a></p>
          <div className="hours-block">
            <p>Lunes – Miércoles : 10:00 am – 10:00 pm</p>
            <p>Jueves : 10:00 am – 11:00 pm</p>
            <p>Viernes : 04:00 pm – 12:00 am</p>
          </div>
        </div>
        {/* Este botón ahora abre la ubicación exacta en una pestaña nueva */}
        <button 
          className="visit-button" 
          onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Av.+Paseo+de+la+Republica+4395,+Surquillo,+Lima', '_blank')}
        >
          Visítanos hoy
        </button>
      </div>
      <div className="showroom-image">
        <img src={imagenCarpinteria} alt="Fachada Showroom" />
      </div>
      {/* El mapa ahora tiene la URL de la nueva dirección */}
      <div 
        className="showroom-map" 
        onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Av.+Paseo+de+la+Republica+4395,+Surquillo,+Lima', '_blank')}
        style={{ cursor: 'pointer' }} // Hace que el usuario sepa que es clickeable
      >
        <iframe
          title="Mapa de ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.118683526017!2d-77.0253457!3d-12.1039861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c869e5d419a9%3A0xc3c90731f25164d1!2sAv.%20P.%C2%BA%20de%20la%20Rep%C3%BAblica%204395%2C%20Surquillo%2015047!5e0!3m2!1ses!2spe!4v1716543210000!5m2!1ses!2spe"
          width="100%" 
          height="100%" 
          style={{ border: 0, pointerEvents: 'none' }} // 'pointerEvents: none' permite que el clic pase al contenedor div
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</section>
        
        <Footer />
      </div>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a href="https://wa.me/+51939966333" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
      </a>
    </div>
  );
}

export default App;