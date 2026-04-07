/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Plus, 
  Minus, 
  ArrowRight,
  Menu,
  X,
  Search,
  Globe,
  Award,
  ShieldCheck,
  Clock,
  Settings,
  Droplets,
  Zap,
  Recycle,
  FileText,
  MessageSquare,
  Send
} from 'lucide-react';

// --- Components ---

const Logo = ({ className = "" }) => (
  <div className={`flex flex-col items-center group cursor-pointer ${className}`}>
    <div className="relative flex items-center mb-1">
      <span className="text-[#7a1a2a] font-serif text-4xl font-black tracking-tight leading-none">MANGALAM</span>
      <span className="text-[#7a1a2a] text-[10px] font-bold absolute -top-1 -right-5">TM</span>
    </div>
    <div className="w-full flex items-center justify-center relative h-10">
      {/* Horizontal Lines */}
      <div className="absolute top-1 left-0 right-0 flex items-center justify-center h-[4px]">
        <div className="bg-black h-full w-[42%]" />
        <div className="w-[16%]" /> {/* Gap for vertical line */}
        <div className="bg-black h-full w-[42%]" />
      </div>
      
      {/* Vertical Divider */}
      <div className="w-[5px] h-full bg-[#7a1a2a] z-10 -mt-2" />
      
      {/* Subtext */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0">
        <span className="text-black font-sans text-2xl font-black tracking-tighter leading-none">HDPE</span>
        <span className="text-black font-sans text-2xl font-black tracking-tighter leading-none">PIPES</span>
      </div>
    </div>
  </div>
);

const Navbar = ({ isSticky = false, onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`w-full z-[100] transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 bg-white shadow-md py-2' : 'relative bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div onClick={() => onNavigate('home')}>
          <Logo className={isSticky ? 'scale-75 origin-left' : 'scale-90 origin-left'} />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('about')}
            className={`font-medium text-sm transition-colors ${currentView === 'about' ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'}`}
          >
            About Us
          </button>
          <button 
            onClick={() => onNavigate('products')}
            className={`font-medium text-sm transition-colors ${currentView === 'products' ? 'text-blue-900' : 'text-gray-700 hover:text-blue-900'}`}
          >
            Products
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className={`bg-blue-900 text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-blue-800 transition-colors ${currentView === 'contact' ? 'ring-2 ring-blue-900 ring-offset-2' : ''}`}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="text-left text-gray-700 font-medium">About Us</button>
              <button onClick={() => { onNavigate('products'); setIsMenuOpen(false); }} className="text-left text-gray-700 font-medium">Products</button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigate('contact');
                }}
                className="bg-blue-900 text-white px-6 py-3 rounded-md font-semibold text-center"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl cursor-none aspect-square bg-gray-100 shadow-inner"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        animate={{ scale: isHovering ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        referrerPolicy="no-referrer"
      />
      
      {/* Custom Cursor / Magnifier */}
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute pointer-events-none z-30 w-48 h-48 rounded-full border-4 border-white shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                backgroundSize: '400%',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Hover to zoom
      </div>
    </div>
  );
};

const ProductCarousel = () => {
  const images = [
    "https://picsum.photos/seed/pipe1/800/800",
    "https://picsum.photos/seed/pipe2/800/800",
    "https://picsum.photos/seed/pipe3/800/800",
    "https://picsum.photos/seed/pipe4/800/800",
    "https://picsum.photos/seed/pipe5/800/800",
    "https://picsum.photos/seed/pipe6/800/800",
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative group">
        <ZoomableImage src={images[activeIdx]} alt={`Product image ${activeIdx + 1}`} />
        
        <button 
          onClick={() => setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button 
          onClick={() => setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${activeIdx === idx ? 'border-blue-900 ring-2 ring-blue-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </button>
        ))}
      </div>
    </div>
  );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
      <button 
        className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-50 text-blue-900' : 'bg-gray-50 text-gray-400'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Pages ---

const AboutPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-12"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">Leading the Way in <span className="text-blue-900">HDPE Innovation</span></h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Established in 1995, Mangalam HDPE Pipes has grown from a small manufacturing unit to one of South India's most trusted names in the piping industry. We specialize in high-performance piping solutions for agriculture, infrastructure, and industrial applications.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-3xl font-bold text-blue-900 mb-2">25+</h4>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Years Experience</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-blue-900 mb-2">500+</h4>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Projects Completed</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/about1/800/800" alt="Factory" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-blue-900 text-white p-8 rounded-3xl shadow-xl max-w-xs">
            <p className="text-lg font-bold mb-2">"Quality is not an act, it is a habit."</p>
            <p className="text-sm text-blue-200">- Our Founding Principle</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12 mb-24">
        {[
          { title: "Our Mission", icon: <Award className="w-8 h-8" />, desc: "To provide sustainable and high-quality piping solutions that empower infrastructure development across the nation." },
          { title: "Our Vision", icon: <Globe className="w-8 h-8" />, desc: "To be the global leader in HDPE manufacturing, recognized for our commitment to innovation, quality, and environmental stewardship." },
          { title: "Our Values", icon: <ShieldCheck className="w-8 h-8" />, desc: "Integrity, excellence, and customer-centricity are at the heart of everything we do at Mangalam." },
        ].map((item, i) => (
          <div key={i} className="p-10 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 mb-8">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProductsPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-12"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Product <span className="text-blue-900">Catalogue</span></h1>
        <p className="text-gray-500 text-lg">Explore our comprehensive range of high-density polyethylene solutions designed for durability and performance.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "HDPE Water Pipes", img: "https://picsum.photos/seed/p1/600/400", tags: ["Potable Water", "BIS Certified"], desc: "High-pressure pipes for drinking water distribution systems." },
          { title: "Agriculture Coils", img: "https://picsum.photos/seed/p2/600/400", tags: ["Irrigation", "Flexible"], desc: "Long-length coils ideal for drip and sprinkler irrigation systems." },
          { title: "Industrial Ducting", img: "https://picsum.photos/seed/p3/600/400", tags: ["Chemical Resistant", "PN16"], desc: "Heavy-duty pipes for aggressive chemical transport and industrial waste." },
          { title: "PLB Duct Pipes", img: "https://picsum.photos/seed/p4/600/400", tags: ["Telecom", "Optical Fiber"], desc: "Permanently Lubricated ducts for fiber optic cable protection." },
          { title: "HDPE Fittings", img: "https://picsum.photos/seed/p5/600/400", tags: ["Electrofusion", "Butt Fusion"], desc: "Complete range of couplers, elbows, and tees for secure joints." },
          { title: "Custom Solutions", img: "https://picsum.photos/seed/p6/600/400", tags: ["Tailored", "Engineering"], desc: "Specialized piping solutions manufactured to your specific project requirements." },
        ].map((product, i) => (
          <div key={i} className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all flex flex-col">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-blue-900 uppercase tracking-wider shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{product.desc}</p>
              <button className="w-full py-4 rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10">
                View Specifications
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ContactPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-12"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">Get in <span className="text-blue-900">Touch</span></h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Have questions about our products or need a custom quote? Our team of experts is here to help you find the perfect piping solution for your project.
          </p>

          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Our Headquarters</h4>
                <p className="text-gray-500 leading-relaxed">
                  123 Industrial Estate, Phase II<br />
                  Peenya, Bangalore - 560058<br />
                  Karnataka, India
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Contact Numbers</h4>
                <p className="text-gray-500 leading-relaxed">
                  Sales: +91 98765 43210<br />
                  Support: +91 80 2345 6789
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Email Addresses</h4>
                <p className="text-gray-500 leading-relaxed">
                  Sales: sales@mangalamhdpe.com<br />
                  General: info@mangalamhdpe.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-bold text-gray-900">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-bold text-gray-900">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-bold text-red-600">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                <select className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all">
                  <option>Product Inquiry</option>
                  <option>Custom Quote</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Message</label>
              <textarea rows={5} placeholder="Tell us about your project requirements..." className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all resize-none"></textarea>
            </div>

            <button className="w-full bg-blue-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-3">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isSticky, setIsSticky] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  // Track the currently open FAQ item (null means all collapsed)
  const [openFaq, setOpenFaq] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsSticky(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const manufacturingSteps = [
    { title: "Raw Material", icon: <Settings className="w-5 h-5" />, content: "High-Grade Raw Material Selection", desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.", bullets: ["PE100 grade material", "Optimal molecular weight distribution"] },
    { title: "Extrusion", icon: <Zap className="w-5 h-5" />, content: "Advanced Extrusion Technology", desc: "Our state-of-the-art extrusion lines ensure uniform wall thickness and smooth internal surfaces for maximum flow efficiency.", bullets: ["Precision temperature control", "Automated thickness monitoring"] },
    { title: "Cooling", icon: <Droplets className="w-5 h-5" />, content: "Controlled Cooling Process", desc: "Multi-stage vacuum cooling tanks stabilize the pipe dimensions and ensure structural integrity during the solidification phase.", bullets: ["Uniform cooling rates", "Stress-free pipe formation"] },
    { title: "Sizing", icon: <Globe className="w-5 h-5" />, content: "Precision Sizing & Calibration", desc: "High-precision sizing sleeves and vacuum calibration units guarantee that every pipe meets strict dimensional tolerances.", bullets: ["Laser-guided calibration", "Real-time diameter tracking"] },
    { title: "Quality Control", icon: <ShieldCheck className="w-5 h-5" />, content: "Rigorous Quality Testing", desc: "Every batch undergoes comprehensive testing for pressure resistance, impact strength, and material density in our certified labs.", bullets: ["Hydrostatic pressure tests", "Carbon black dispersion analysis"] },
    { title: "Marking", icon: <FileText className="w-5 h-5" />, content: "Traceable Product Marking", desc: "Automated inkjet printers apply permanent marking with batch numbers, production dates, and technical specs for full traceability.", bullets: ["Permanent laser marking", "Standardized identification codes"] },
    { title: "Cutting", icon: <X className="w-5 h-5" />, content: "Clean & Precise Cutting", desc: "Planetary cutting machines ensure square, burr-free ends that are ready for immediate installation and fusion welding.", bullets: ["Automated length measurement", "Dust-free cutting technology"] },
    { title: "Packaging", icon: <Recycle className="w-5 h-5" />, content: "Secure Packaging & Storage", desc: "Pipes are carefully coiled or bundled and protected for transport to ensure they arrive at the job site in perfect condition.", bullets: ["UV-protected packaging", "Efficient logistics handling"] },
  ];

  const faqs = [
    { title: "What is the purpose of a laser cutter for sheet metal?", content: "It is designed to cut various types of sheet metal with precision, allowing for intricate designs and shapes that are essential in manufacturing processes." },
    { title: "What are the benefits of using aluminum tubing in manufacturing?", content: "Aluminum tubing offers high strength-to-weight ratio, excellent corrosion resistance, and superior thermal conductivity, making it ideal for aerospace, automotive, and HVAC applications." },
    { title: "How is aluminum tubing produced?", content: "Aluminum tubing is typically produced through extrusion or drawing processes, where heated aluminum billets are forced through a die to create the desired shape and size." },
    { title: "What are the common applications of aluminum tubing?", content: "Common applications include heat exchangers, structural frames, fuel lines, and decorative architectural elements due to its versatility and aesthetic appeal." },
    { title: "Can aluminum tubing be customized?", content: "Yes, aluminum tubing can be customized in terms of alloy composition, diameter, wall thickness, and length to meet specific engineering requirements." },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sticky Header */}
      <AnimatePresence>
        {isSticky && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-[100]"
          >
            <Navbar isSticky onNavigate={handleNavigate} currentView={currentView} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div key="home">
            {/* Hero Section */}
            <motion.section 
              ref={heroRef} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
            >
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8">
          <span>Products</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">Premium HDPE Pipes</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Carousel */}
          <ProductCarousel />

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                <Award className="w-3.5 h-3.5" /> BIS Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                <ShieldCheck className="w-3.5 h-3.5" /> ISO Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                <Globe className="w-3.5 h-3.5" /> CE Certified
              </span>
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] mb-6">
                Premium HDPE Pipes & Coils for Modern Infrastructure
              </h1>
              <ul className="space-y-4">
                {[
                  "Leak-Proof Fusion Joints",
                  "Chemical Resistance",
                  "50+ Year Service Life",
                  "Flexible Installation"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center text-white">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="flex flex-col gap-1 mb-6">
                <span className="text-sm text-gray-500 font-medium">Price Range</span>
                <span className="text-3xl font-bold text-gray-900">₹4,80,000 - 7,90,000</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-orange-50 p-3 rounded-lg border border-orange-100"
                >
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-orange-800 mb-1">Shipping</span>
                  <span className="text-sm font-bold text-orange-900">6-12 days</span>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-yellow-50 p-3 rounded-lg border border-yellow-100"
                >
                  <span className="block text-[10px] uppercase tracking-wider font-bold text-yellow-800 mb-1">Returns</span>
                  <span className="text-sm font-bold text-yellow-900">7 days return</span>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                >
                  Get Custom Quote
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  View Technical Specs <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Trusted By Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-16 border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Trusted by Hundreds of Companies Globally</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
            {["EUROFLEX", "EUROFLEX", "EUROFLEX", "EUROFLEX", "EUROFLEX", "EUROFLEX"].map((logo, i) => (
              <div key={i} className="text-2xl font-black tracking-tighter text-gray-900">{logo}</div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Manufacturing Process Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gray-50/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Advanced HDPE Pipe Manufacturing Process</h2>
            <p className="text-gray-500 leading-relaxed">
              Our state-of-the-art extrusion technology ensures consistent quality, optimal material properties, and dimensional accuracy in every pipe we manufacture.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            {/* Stepper Header */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 bg-gray-50/50 relative">
              {manufacturingSteps.map((step, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 min-w-[140px] px-6 py-5 flex items-center justify-center gap-2 font-bold text-sm transition-all relative z-10 ${activeStep === idx ? 'text-blue-900 bg-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] transition-colors ${activeStep === idx ? 'bg-blue-900 border-blue-900 text-white' : 'border-gray-200 text-gray-400'}`}>
                    {idx + 1}
                  </span>
                  {step.title}
                  {activeStep === idx && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-900" />
                  )}
                </button>
              ))}
              {/* Progress Track */}
              <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full" />
            </div>

            {/* Stepper Content */}
            <div className="p-8 lg:p-12 grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900">
                      {manufacturingSteps[activeStep].icon}
                    </div>
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Step {activeStep + 1} of {manufacturingSteps.length}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{manufacturingSteps[activeStep].content}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {manufacturingSteps[activeStep].desc}
                  </p>
                  <ul className="space-y-4">
                    {manufacturingSteps[activeStep].bullets.map((bullet, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center gap-3 text-gray-700 font-semibold"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-900" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={`img-${activeStep}`}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group/img"
                >
                  <img 
                    src={`https://picsum.photos/seed/process-${activeStep}/1200/900`} 
                    alt={manufacturingSteps[activeStep].title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover/img:opacity-100 translate-y-4 group-hover/img:translate-y-0 transition-all">
                    <button 
                      onClick={() => setActiveStep(prev => (prev === 0 ? manufacturingSteps.length - 1 : prev - 1))}
                      className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-900" />
                    </button>
                    <button 
                      onClick={() => setActiveStep(prev => (prev === manufacturingSteps.length - 1 ? 0 : prev + 1))}
                      className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-900" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built to Last. Engineered to Perform.</h2>
            <p className="text-gray-500 leading-relaxed">
              From bulk bags to technical threads, Meera delivers precision solutions for every stage of your packaging process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Superior Chemical Resistance", icon: <Droplets className="text-blue-600" />, desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments." },
              { title: "Exceptional Flexibility & Durability", icon: <Recycle className="text-blue-600" />, desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments." },
              { title: "Leak-Proof Fusion Welding", icon: <Zap className="text-blue-600" />, desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments." },
              { title: "Cost-Effective Long-Term Solution", icon: <Settings className="text-blue-600" />, desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments." },
              { title: "Environmentally Sustainable", icon: <Globe className="text-blue-600" />, desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments." },
              { title: "Certified Quality Assurance", icon: <ShieldCheck className="text-blue-600" />, desc: "HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won't corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments." },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-blue-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
              Request a Quote
            </button>
          </div>
        </div>
      </motion.section>

      {/* Technical Specs Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-[#0f172a] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-bold mb-6">Technical Specifications at a Glance</h2>
            <p className="text-gray-400 leading-relaxed">
              Comprehensive performance data demonstrating our commitment to quality and engineering excellence.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Parameter</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-400">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["Pipe Diameter Range", "20mm to 1600mm (3/4\" to 63\")"],
                  ["Pressure Ratings", "PN 2.5, PN 4, PN 6, PN 8, PN 10, PN 12.5, PN 16"],
                  ["Standard Dimension Ratio", "SDR 33, SDR 26, SDR 21, SDR 17, SDR 13.6, SDR 11"],
                  ["Operating Temperature", "-40C to +80C (-40F to +176F)"],
                  ["Service Life", "50+ Years (at 20 degrees C, PN 10)"],
                  ["Material Density", "0.95 - 0.96 g/cm3"],
                  ["Certification Standards", "IS 5984, ISO 4427, ASTM D3035"],
                  ["Joint Type", "Butt Fusion, Electrofusion, Mechanical"],
                  ["Coil Lengths", "Up to 100m (for smaller diameters)"],
                  ["Country of Origin", "🇮🇳 India"],
                ].map(([param, spec], i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-5 font-semibold text-gray-300">{param}</td>
                    <td className="px-8 py-5 text-gray-400">{spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 font-bold hover:bg-white/10 transition-all">
              <Download className="w-5 h-5" /> Download Full Technical Datasheet
            </button>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-gray-50/50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted Performance. Proven Results.</h2>
            <p className="text-gray-500 leading-relaxed">
              From innovative Two-For-One Twisters to specialized heat setting machines, we deliver complete solutions for modern textile manufacturing.
            </p>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="min-w-[350px] md:min-w-[450px] bg-white p-10 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 snap-center">
                <div className="text-blue-900 mb-8">
                  <MessageSquare className="w-10 h-10 fill-current opacity-20" />
                </div>
                <p className="text-xl font-medium text-gray-800 leading-relaxed mb-10 italic">
                  "The durability and performance of Meera's fishnet processing equipment has significantly improved our marine product quality. Excellent support for specialized applications."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Carlos Mendoza</h5>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Operations Manager</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Piping Solutions Portfolio</h2>
            <p className="text-gray-500 leading-relaxed">
              From innovative Two-For-One Twisters to specialized heat setting machines, we deliver complete solutions for modern textile manufacturing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "HDPE Fittings & Accessories", img: "https://picsum.photos/seed/fit1/600/400", desc: "Complete range of electrofusion and butt fusion fittings, including elbows, tees, reducers, and couplers for seamless pipe connections." },
              { title: "Professional Installation Services", img: "https://picsum.photos/seed/fit2/600/400", desc: "Expert installation and fusion welding services ensuring optimal system performance, compliance with standards, and long-term reliability." },
              { title: "PE-RT Heating Pipes", img: "https://picsum.photos/seed/fit3/600/400", desc: "Polyethylene of Raised Temperature resistance pipes ideal for underfloor heating, radiator connections, and hot water applications." },
            ].map((item, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{item.desc}</p>
                  <button className="w-full py-3 rounded-xl bg-gray-50 text-blue-900 font-bold hover:bg-blue-900 hover:text-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-100">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Didn't find what <span className="text-blue-900">you're looking for?</span></h4>
              <p className="text-gray-500 font-medium">Talk to our experts for custom solutions and tailored guidance.</p>
            </div>
            <button className="bg-blue-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
              <Phone className="w-5 h-5" /> Talk to an Expert
            </button>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 bg-gray-50/30"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently <span className="text-blue-900">Asked Questions</span></h2>
          
          <div className="mb-16">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i}
                title={faq.title}
                content={faq.content}
                isOpen={openFaq === i}
                onClick={() => { setOpenFaq(openFaq === i ? null : i); }}
              />
            ))}
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Want us to email the entire catalogue?</h3>
              <p className="text-gray-500 font-medium">Enter your email and an expert will share the catalogue with you.</p>
            </div>
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all min-w-[300px]"
              />
              <button className="bg-blue-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all whitespace-nowrap">
                Request Catalogue
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-950 rounded-[40px] overflow-hidden relative">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 skew-x-[-20deg] translate-x-1/4 pointer-events-none" />
            
            <div className="relative z-10 p-8 lg:p-20 grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Ready to Transform Your Textile Manufacturing?</h2>
                <p className="text-blue-100/70 text-lg mb-12 max-w-md">
                  Get a personalized consultation and quote for machinery solutions tailored to your specific production requirements.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Call Us Directly</p>
                      <p className="text-xl font-bold">+91-XXX-XXX-XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Email Support</p>
                      <p className="text-xl font-bold">info@meeraind.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-8">Contact Us Today</h4>
                <form className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  <input type="text" placeholder="Company Name" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  <input type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  <div className="flex gap-4">
                    <select className="px-4 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all">
                      <option>+91</option>
                    </select>
                    <input type="tel" placeholder="Phone Number" className="flex-1 px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all" />
                  </div>
                  <button className="w-full bg-blue-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                    Request Custom Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
          </motion.div>
        )}
        {currentView === 'about' && <AboutPage key="about" />}
        {currentView === 'products' && <ProductsPage key="products" />}
        {currentView === 'contact' && <ContactPage key="contact" />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
            <div className="col-span-2 lg:col-span-1">
              <div onClick={() => handleNavigate('home')}>
                <Logo className="scale-100 origin-left mb-12" />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Premium HDPE Pipes & Fittings Manufacturer in South India. Delivering quality since 1995.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-900 hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-900 hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-900 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-900 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-gray-900 mb-8">About Us</h5>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><button onClick={() => handleNavigate('about')} className="hover:text-blue-900">Our Story</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-blue-900">Manufacturing</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-blue-900">Quality Standards</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-blue-900">Certifications</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-gray-900 mb-8">Categories</h5>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">Packaging Solutions</button></li>
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">Fishnet Manufacturing</button></li>
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">Technical Textiles</button></li>
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">Infrastructure</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-gray-900 mb-8">Products</h5>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">HDPE Pipes</button></li>
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">PPMF Tapes</button></li>
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">Twister Machines</button></li>
                <li><button onClick={() => handleNavigate('products')} className="hover:text-blue-900">Heating Pipes</button></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h5 className="font-bold text-gray-900 mb-8">Contact</h5>
              <ul className="space-y-6">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-blue-900 shrink-0" />
                  <button onClick={() => handleNavigate('contact')} className="text-sm font-medium text-gray-500 text-left hover:text-blue-900 transition-colors">123 Industrial Estate, Phase II, Peenya, Bangalore - 560058</button>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-blue-900 shrink-0" />
                  <button onClick={() => handleNavigate('contact')} className="text-sm font-medium text-gray-500 text-left hover:text-blue-900 transition-colors">+91 98765 43210</button>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-blue-900 shrink-0" />
                  <button onClick={() => handleNavigate('contact')} className="text-sm font-medium text-gray-500 text-left hover:text-blue-900 transition-colors">info@mangalamhdpe.com</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Copyright © 2025 Mangalam HDPE Pipes | All Rights Reserved</p>
            <div className="flex gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-900">Privacy Policy</a>
              <a href="#" className="hover:text-blue-900">Terms of Service</a>
              <a href="#" className="hover:text-blue-900">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
