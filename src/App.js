import React, { useState, useEffect } from 'react';
import './App.css';

// --- COMPONENTES EXTERNOS ---
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- ACTIVOS (Asegúrate que las rutas sean correctas) ---
import fondo from './assets/mierda.jpg'; 
import logo from './assets/logo.png';
import imagenCarpinteria from './assets/mueble1.jpg';
import melamina1 from './assets/melamina1.png';
import melamina2 from './assets/melamina2.png';
import melamina3 from './assets/melamina3.jpg';

// --- ICONOS ---
import {
  FaHammer, FaPalette, FaLayerGroup, FaHourglassHalf, FaFacebook, FaInstagram,
  FaLeaf, FaShieldAlt, FaTools, FaRulerCombined, FaHardHat, FaSun, FaBars, FaTimes
} from 'react-icons/fa';

// --- CONFIGURACIÓN GLOBAL ---
const WHATSAPP_NUMBER = "51939966333"; 
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// --- COMPONENTE FOOTER ---
function Footer() {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="footer-overlay"></div>
      <div className="footer-container">
        <div className="footer-column branding-col">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p className="copyright">© 2024 Corporation CAD</p>
          <p className="credits">Optimizado por <a href="https://www.linkedin.com/in/cristopher-meneses/" className="empresa-web" target="_blank" rel="noopener noreferrer">Cristopher Meneses</a></p>
        </div>
        <div className="footer-column">
          <h3>Servicios</h3>
          <ul>
            <li><a href="#melamina">Melamina & Diseño</a></li>
            <li><a href="#drywall">Drywall & Estructuras</a></li>
            <li><a href="#techos">Techos Sol y Sombra</a></li>
            <li><a href="#contacto">Gasfitería y Electricidad</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contacto</h3>
          <ul>
            <li>📍 Av. Paseo de la República 4395, Surquillo</li>
            <li>📧 overaoracio@rescatte24peru.com</li>
            <li>📞 +51 939 966 333</li>
          </ul>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- CONFIGURACIÓN DEL CARRUSEL (Autoplay Activado) ---
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,          // Velocidad de la transición (1 segundo)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // ✅ IMPORTANTE: Activa el movimiento automático
    autoplaySpeed: 3000,  // ✅ IMPORTANTE: Cambia cada 3 segundos
    arrows: false,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)', 
  };

  // Datos de secciones
  const sections = {
    melamina: {
      id: 'melamina',
      title: 'Muebles de Melamina',
      headline: 'Diseño funcional y estética moderna para tu hogar.',
      images: [melamina1, melamina2, melamina3],
      features: [
        { icon: <FaLayerGroup />, title: 'Materiales Premium', description: 'Melamina de alta densidad, anti-rayaduras y texturas realistas.' },
        { icon: <FaPalette />, title: 'Diseño Personalizado', description: 'Muebles 100% a medida adaptados a la arquitectura de tu espacio.' },
        { icon: <FaShieldAlt />, title: 'Acabados Duraderos', description: 'Cantos de PVC de alto tránsito y herrajes con cierre suave.' }
      ]
    },
    drywall: {
      id: 'drywall',
      title: 'Estructuras en Drywall',
      headline: 'Soluciones constructivas versátiles, rápidas y limpias.',
      images: [melamina2, melamina3, melamina1],
      features: [
        { icon: <FaHardHat />, title: 'Obra Rápida', description: 'Construcción en seco que reduce tiempos de entrega en un 50%.' },
        { icon: <FaRulerCombined />, title: 'Diseño Flexible', description: 'Cielos rasos, tabiquería curva, hornacinas y muebles empotrados.' },
        { icon: <FaLeaf />, title: 'Aislamiento', description: 'Incorporación de lana de fibra de vidrio para confort térmico y acústico.' }
      ]
    },
    techos: {
      id: 'techos',
      title: 'Techos Sol y Sombra',
      headline: 'Disfruta de tus exteriores con estilo y protección.',
      images: [melamina3, melamina1, melamina2],
      features: [
        { icon: <FaSun />, title: 'Protección UV', description: 'Policarbonato alveolar o sólido que filtra el 99% de rayos UV.' },
        { icon: <FaTools />, title: 'Estructura Robusta', description: 'Madera selecta (Pumaquiro, Huayruro) o metal con pintura epóxica.' },
        { icon: <FaRulerCombined />, title: 'Estética', description: 'Diseños minimalistas o rústicos que valorizan tu terraza.' }
      ]
    }
  };

  // Scroll Navbar Logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fade In Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Renderizado de Sección Detallada
  const renderDetailedSection = (data, isImageRight) => (
    <section className="page detailed-section" id={data.id}>
      <div className={`detailed-container fade-in ${isImageRight ? 'reverse-layout' : ''}`}>
        
        {/* Columna Carrusel */}
        <div className="detailed-carousel-col">
          <div className="carousel-wrapper-shadow">
            {/* ✅ AQUÍ ESTÁ EL COMPONENTE SLIDER QUE HACE LA TRANSICIÓN */}
            <Slider {...sliderSettings}>
              {data.images.map((img, i) => (
                <div key={i} className="carousel-slide-item">
                  <img src={img} alt={`${data.title} ${i}`} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Columna Texto */}
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
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="elegant-button">
            Cotizar ahora
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="navbar-container">
           <div className="nav-logo-area">
             <a href="#inicio">CAD</a>
           </div>
           <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
             {mobileMenuOpen ? <FaTimes /> : <FaBars />}
           </div>
           <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
             <li onClick={() => setMobileMenuOpen(false)}><a href="#inicio">Inicio</a></li>
             <li onClick={() => setMobileMenuOpen(false)}><a href="#melamina">Melamina</a></li>
             <li onClick={() => setMobileMenuOpen(false)}><a href="#drywall">Drywall</a></li>
             <li onClick={() => setMobileMenuOpen(false)}><a href="#techos">Techos</a></li>
             <li onClick={() => setMobileMenuOpen(false)}><a href="#contacto">Contacto</a></li>
             <li className="nav-cta">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Cotizar</a>
             </li>
           </ul>
        </div>
      </nav>

      <div className="scroll-container">
        {/* HERO */}
        <section className="page page1" id="inicio">
          <div className="overlay"></div>
          <div className="logo-container fade-in">
            <img src={logo} alt="Rescate 24 Logo" className="logo" />
            <h2 className="hero-slogan">Diseño y Construcción de Alto Nivel</h2>
          </div>
        </section>

        {/* QUALITY */}
        <section className="page page-quality fade-in">
          <div className="quality-content">
            <div className="quality-header">
              <h1>Excelencia en cada Detalle</h1>
              <p className="quality-subtitle">Combinamos artesanía tradicional con tecnología moderna.</p>
            </div>
            <div className="quality-grid">
              <div className="quality-item"><FaHammer className="quality-icon" /><h3>Maestría</h3><p>Técnicos especialistas certificados.</p></div>
              <div className="quality-item"><FaPalette className="quality-icon" /><h3>Diseño</h3><p>Proyectos visualizados en 3D.</p></div>
              <div className="quality-item"><FaLayerGroup className="quality-icon" /><h3>Materiales</h3><p>Insumos de marcas reconocidas.</p></div>
              <div className="quality-item"><FaHourglassHalf className="quality-icon" /><h3>Puntualidad</h3><p>Respetamos cronogramas de obra.</p></div>
            </div>
          </div>
        </section>
        
        {/* COLLECTIONS */}
        <section className="page collections-section fade-in">
          <div className="collections-content">
            <div className="collections-header">
              <h1>Nuestras Especialidades</h1>
            </div>
            <div className="collections-grid">
                <a href="#melamina" className="collection-card">
                  <div className="collection-image-wrapper"><img src={melamina1} alt="Melamina" /></div>
                  <h3>MELAMINA</h3>
                </a>
                <a href="#drywall" className="collection-card">
                  <div className="collection-image-wrapper"><img src={melamina2} alt="Drywall" /></div>
                  <h3>DRYWALL</h3>
                </a>
                <a href="#techos" className="collection-card">
                  <div className="collection-image-wrapper"><img src={melamina3} alt="Techos" /></div>
                  <h3>TECHOS</h3>
                </a>
            </div>
          </div>
        </section>

        {/* SECCIONES DETALLADAS CON CARRUSEL */}
        {renderDetailedSection(sections.melamina, false)}
        {renderDetailedSection(sections.drywall, true)}
        {renderDetailedSection(sections.techos, false)}

        {/* --- SHOWROOM / CONTACTO (MAPA RESTAURADO) --- */}
        {/* ... dentro de App.js ... */}

<section className="page showroom-section" id="contacto">
  <div className="showroom-content fade-in">
    <div className="showroom-header">
      <h1>Visitanos </h1>
      <p>Agenda una cita y recibe asesoría personalizada.</p>
    </div>
    
    {/* GRID DE 3 ELEMENTOS */}
    <div className="showroom-grid">
      
      {/* 1. INFORMACIÓN */}
      <div className="showroom-info">
        <h2>CARPINTERIA A DOMICILIO</h2>
        <div className="info-details">
          <p className="address">📍 Av. Paseo de la República 4395, Surquillo</p>
          <p className="city">Lima: <a href="tel:+51941943946" style={{color:'#000', fontWeight:'bold'}}>941 943 946</a></p>
          <div className="hours-block">
            <p>Lunes – Miércoles : 10:00 am – 10:00 pm</p>
            <p>Jueves : 10:00 am – 11:00 pm</p>
            <p>Viernes : 04:00 pm – 12:00 am</p>
          </div>
        </div>
        <button 
          className="visit-button" 
          onClick={() => window.open('https://maps.app.goo.gl/TusCoordenadasReales', '_blank')}
        >
          Visítanos hoy
        </button>
      </div>

      {/* 2. IMAGEN (CENTRO) */}
      <div className="showroom-image">
        <img src={imagenCarpinteria} alt="Interior Showroom" />
      </div>

      {/* 3. MAPA (DERECHA) - RESTAURADO */}
      <div 
        className="showroom-map" 
        onClick={() => window.open('https://maps.app.goo.gl/TusCoordenadasReales', '_blank')}
      >
        <iframe
          title="Mapa de ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.666996347029!2d-77.02796542431718!3d-12.066453142271296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c89360e75555%3A0x66c82343a4193856!2sAv.%20Paseo%20de%20la%20Rep%C3%BAblica%204395%2C%20Surquillo%2015047!5e0!3m2!1ses!2spe!4v1709230000000!5m2!1ses!2spe" 
          width="100%" 
          height="100%" 
          style={{ border: 0, pointerEvents: 'none' }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>

    </div>
  </div>
</section>
        
        <Footer />
      </div>

      {/* WHATSAPP FLOAT */}
      <a href={WHATSAPP_LINK} className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    </div>
  );
}

export default App;