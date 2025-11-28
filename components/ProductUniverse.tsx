

import React, { useState } from 'react';
import { PRODUCT_CATALOG } from '../constants';
import { AppSection } from '../types';

interface ProductUniverseProps {
  onNavigate: (section: AppSection) => void;
}

const ProductUniverse: React.FC<ProductUniverseProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProducts = filter === 'all' 
    ? PRODUCT_CATALOG 
    : PRODUCT_CATALOG.filter(p => p.category === filter);

  // Helper for Bento grid classes
  const getSizeClasses = (size: string) => {
    switch(size) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'wide': return 'md:col-span-2 md:row-span-1';
      case 'medium': return 'md:col-span-1 md:row-span-2'; // Tall
      default: return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div className="bg-black min-h-screen pb-20 relative overflow-hidden">
      
      {/* Tech Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Header with Dark Glows */}
      <div className="relative pt-24 pb-12 px-6 text-center z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-900/40 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-purple-900/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        <h2 className="relative z-10 text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Productos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Telecentro</span>
        </h2>
        <p className="relative z-10 text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Arquitectura de conectividad, entretenimiento y seguridad unificada.
        </p>

        {/* Filter Tabs - Dark Pill Style */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-12">
          {[
            { id: 'all', label: 'Todo' },
            { id: 'connectivity', label: 'Conectividad' },
            { id: 'entertainment', label: 'Entretenimiento' },
            { id: 'premium', label: 'Packs Premium' },
            { id: 'smart', label: 'Smart Home' },
            { id: 'mobile', label: 'Móvil' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${
                filter === cat.id 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'bg-black/50 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white backdrop-blur-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => product.internalSection ? onNavigate(product.internalSection) : alert(`Ir a página de ${product.title} (Simulado)`)}
              className={`
                ${getSizeClasses(product.size)}
                group relative overflow-hidden rounded-[2rem] cursor-pointer 
                bg-zinc-900/50 border border-zinc-800 backdrop-blur-md
                hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl
              `}
            >
              {/* Background Mock Image */}
              {product.image && (
                <div className="absolute inset-0 z-0">
                   <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10 group-hover:via-black/70 transition-colors duration-500`}></div>
                   <img src={product.image} alt={product.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                </div>
              )}

              {/* Internal Glow on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.imageGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-10`}></div>
              
              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                  <div className={`
                    p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-lg
                    transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500
                  `}>
                    <span className="material-symbols-outlined text-3xl">{product.icon}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <span className="material-symbols-outlined text-zinc-300 group-hover:text-black transition-colors text-lg">
                      arrow_outward
                    </span>
                  </div>
                </div>

                <div>
                   <h3 className="text-2xl font-bold text-white leading-none mb-3 group-hover:translate-x-1 transition-transform duration-300 shadow-black drop-shadow-lg">
                     {product.title}
                   </h3>
                   <p className="text-zinc-300 text-sm font-medium line-clamp-2 group-hover:text-white transition-colors drop-shadow-md">
                     {product.tagline}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-24 text-center pb-12">
        <p className="text-zinc-500 text-sm mb-4">Sujeto a disponibilidad técnica y geográfica.</p>
        <button className="px-8 py-3 rounded-full border border-zinc-800 text-zinc-400 text-sm hover:text-white hover:border-zinc-600 transition-all">
            Ver términos y condiciones completos
        </button>
      </div>

    </div>
  );
};

export default ProductUniverse;