import { motion } from 'framer-motion';
import { useRef } from 'react';
import { 
  Wifi, 
  Brain, 
  Receipt, 
  Router
} from 'lucide-react';
import { AppSection } from '../../types';

interface BentoCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  size: 'small' | 'medium' | 'large' | 'wide';
  section?: AppSection;
}

interface BentoGridProps {
  onNavigate?: (section: AppSection) => void;
}

const cards: BentoCard[] = [
  {
    id: '1',
    title: 'Revisar Ambiente',
    description: 'Sacale una foto a tu ambiente. La IA detecta obstáculos y te dice dónde poner el módem.',
    icon: <Wifi className="w-8 h-8" />,
    gradient: 'from-green-500/20 to-emerald-500/20',
    size: 'large',
    section: AppSection.WIFI_SCANNER,
  },
  {
    id: '2',
    title: 'Elegir Plan',
    description: 'Tu plan ideal, calculado por IA.',
    icon: <Brain className="w-8 h-8" />,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    size: 'wide',
    section: AppSection.QUIZ,
  },
  {
    id: '3',
    title: 'Análisis de Factura',
    description: 'Subí tu factura y entendé cada concepto al instante.',
    icon: <Receipt className="w-8 h-8" />,
    gradient: 'from-green-500/20 to-teal-500/20',
    size: 'medium',
    section: AppSection.BILL_ANALYZER,
  },
  {
    id: '4',
    title: 'Revisar Módem',
    description: 'Diagnóstico en tiempo real mediante video.',
    icon: <Router className="w-8 h-8" />,
    gradient: 'from-purple-500/20 to-pink-500/20',
    size: 'medium',
    section: AppSection.MODEM_GUIDE,
  },
];

const BentoGrid: React.FC<BentoGridProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-4 text-white">
          Potencia Invisible.
        </h2>
        <p className="text-xl text-white/60">
          Herramientas nativas impulsadas por Gemini Pro.
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-6"
      >
        {cards.map((card, index) => (
          <BentoCard 
            key={card.id} 
            card={card} 
            index={index} 
            sizeClasses={getSizeClasses(card.size)}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  );
};

interface BentoCardProps {
  card: BentoCard;
  index: number;
  sizeClasses: string;
  onNavigate?: (section: AppSection) => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ card, index, sizeClasses, onNavigate }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${sizeClasses}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => card.section && onNavigate?.(card.section)}
      style={{
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glassmorphism Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/10`}
      />
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        <div>
          <div className="mb-4 text-white/80">{card.icon}</div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{card.title}</h3>
        </div>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">{card.description}</p>
      </div>

      {/* Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"
        style={{
          boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
        }}
        whileHover={{
          boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
        }}
      />
    </motion.div>
  );
};

export default BentoGrid;

