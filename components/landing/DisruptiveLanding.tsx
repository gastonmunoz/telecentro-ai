import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import Marquee from './Marquee';
import BentoGrid from './BentoGrid';
import CustomCursor from '../CustomCursor';
import { AppSection } from '../../types';

interface DisruptiveLandingProps {
  onNavigate?: (section: AppSection) => void;
}

const DisruptiveLanding: React.FC<DisruptiveLandingProps> = ({ onNavigate }) => {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Disable default cursor only on desktop
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      document.body.style.cursor = 'none';
      setShowCursor(true);
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const marqueeItems = [
    'Telecentro.AI',
    'Inteligencia Artificial',
    'WiFi 7',
    'Velocidad Pura',
    'Innovación',
    'Tecnología',
  ];

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'hsl(210, 79%, 7%)' }}>
      {showCursor && <CustomCursor />}
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onNavigate={onNavigate} />
        
        <Marquee items={marqueeItems} direction="left" speed={30} />
        
        <BentoGrid onNavigate={onNavigate} />
        
        <Marquee items={marqueeItems.reverse()} direction="right" speed={35} />
        
        {/* Footer Section */}
        <motion.footer
          className="min-h-screen flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8"
              style={{
                background: 'linear-gradient(135deg, hsl(226, 98%, 64%) 0%, hsl(196, 100%, 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              El Futuro
              <br />
              Está Acá
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Llevando el futuro a tu hogar desde hace 30 años. Ahora potenciado por IA.
            </motion.p>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default DisruptiveLanding;

