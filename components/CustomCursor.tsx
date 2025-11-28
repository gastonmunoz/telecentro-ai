import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsClickable(true);
        setIsHovering(true);
      } else {
        setIsClickable(false);
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsClickable(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-white transition-all duration-300 ${
            isHovering ? 'scale-0' : 'scale-100'
          }`}
        />
      </motion.div>

      {/* Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isClickable ? 20 : 12),
          y: mousePosition.y - (isClickable ? 20 : 12),
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
      >
        <div
          className={`rounded-full border-2 border-white transition-all duration-300 ${
            isClickable
              ? 'w-10 h-10 border-opacity-100'
              : isHovering
              ? 'w-8 h-8 border-opacity-50'
              : 'w-6 h-6 border-opacity-30'
          }`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;

