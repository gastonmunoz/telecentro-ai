import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppSection } from '../../types';

interface HeroSectionProps {
  onNavigate?: (section: AppSection) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const words = ['La solución', 'exacta', 'para tu', 'hogar.'];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Gradients Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(226, 98%, 64%) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-25"
          style={{
            background: 'radial-gradient(circle, hsl(196, 100%, 50%) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-block mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
          variants={wordVariants}
        >
          <span className="text-sm font-medium text-white/80 tracking-wider">
            INTELIGENCIA ARTIFICIAL INTEGRADA
          </span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8">
          {words.map((word, index) => (
            <motion.h1
              key={index}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none"
              variants={wordVariants}
              whileHover={{ scale: 1.05, x: 5 }}
              style={{
                background: 'linear-gradient(135deg, hsl(226, 98%, 64%) 0%, hsl(196, 100%, 50%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <motion.p
          className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          variants={wordVariants}
        >
          Encontrá los productos adecuados acá. Tecnología, velocidad y entretenimiento diseñados a tu medida.
        </motion.p>

        <motion.div variants={wordVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(226, 98%, 64%) 0%, hsl(196, 100%, 50%) 100%)',
              boxShadow: '0 0 40px rgba(41, 121, 255, 0.5)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(41, 121, 255, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.(AppSection.QUIZ)}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              Elegir mi Plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.(AppSection.CATALOG)}
          >
            Ver Productos
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

