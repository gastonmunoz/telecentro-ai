import React from 'react';
import { Plan } from '../types';

interface PlanCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col transition-all duration-500 hover:scale-[1.02] border ${plan.highlight ? 'bg-zinc-900 border-blue-500/50 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]' : 'bg-black border-zinc-800 hover:border-zinc-700'}`}>
      
      {/* Highlight Badge */}
      {plan.highlight && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-lg">
            RECOMENDADO
          </div>
        </div>
      )}

      {/* Glow Effect */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[80px] opacity-20 pointer-events-none ${plan.highlight ? 'bg-blue-500' : 'bg-zinc-500'}`}></div>
      
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div>
           <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
           {plan.highlight && <span className="text-blue-400 text-xs tracking-wider uppercase font-semibold">Best Choice</span>}
        </div>
        <div className={`p-3 rounded-2xl ${plan.highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
          <span className="material-symbols-outlined text-3xl">{plan.icon}</span>
        </div>
      </div>

      <div className="relative z-10 mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black text-white tracking-tighter">{plan.speed}</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
           <span className="text-2xl font-medium text-zinc-400">{plan.price}</span>
           <span className="text-sm text-zinc-600">/mes</span>
        </div>
      </div>

      <div className="relative z-10 space-y-4 mb-8 flex-grow border-t border-zinc-800 pt-6">
        {plan.features.map((feat, idx) => (
          <li key={idx} className="flex items-start group/item">
            <span className={`material-symbols-outlined text-lg mr-3 mt-0.5 ${plan.highlight ? 'text-blue-500' : 'text-zinc-600 group-hover/item:text-zinc-400'}`}>check</span>
            <span className="text-zinc-400 text-sm group-hover/item:text-zinc-200 transition-colors">{feat}</span>
          </li>
        ))}
      </div>

      <button
        onClick={() => onSelect(plan)}
        className={`relative z-10 w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all ${
          plan.highlight 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
            : 'bg-white text-black hover:bg-zinc-200'
        }`}
      >
        LO QUIERO
      </button>
    </div>
  );
};

export default PlanCard;