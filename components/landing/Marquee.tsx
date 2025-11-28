import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', speed = 50 }) => {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-8 border-y border-white/10">
      <motion.div
        className="flex gap-8"
        animate={{
          x: direction === 'left' ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-4xl md:text-6xl font-black text-white/20 whitespace-nowrap"
            style={{
              background: 'linear-gradient(90deg, hsl(226, 98%, 64%) 0%, hsl(196, 100%, 50%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;

