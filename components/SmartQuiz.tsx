import React, { useState } from 'react';
import { QuizState, Plan } from '../types';
import { PLANS } from '../constants';
import PlanCard from './PlanCard';

const SmartQuiz: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    step: 0,
    usage: [],
    devices: 0,
    dwellingType: 'apartment',
    floors: 1,
    streaming: false
  });
  const [result, setResult] = useState<Plan | null>(null);

  const handleUsageToggle = (use: string) => {
    setState(prev => ({
      ...prev,
      usage: prev.usage.includes(use) 
        ? prev.usage.filter(u => u !== use)
        : [...prev.usage, use]
    }));
  };

  const calculateRecommendation = () => {
    const isGamer = state.usage.includes('gaming');
    const isHeavyStreamer = state.usage.includes('streaming_4k');
    const manyDevices = state.devices > 5;

    let recommendedPlan = PLANS.find(p => p.id === 'basic');

    if (isGamer || (manyDevices && isHeavyStreamer)) {
      recommendedPlan = PLANS.find(p => p.id === 'gamer');
    } else if (state.devices > 2 || state.streaming) {
      recommendedPlan = PLANS.find(p => p.id === 'family');
    }

    setResult(recommendedPlan || PLANS[0]);
    setState(prev => ({ ...prev, step: 4 }));
  };

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

  return (
    <div className="max-w-5xl mx-auto">
      
      {state.step < 4 && (
        <div className="mb-12">
          {/* Minimalist Progress */}
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{ width: `${((state.step + 1) / 4) * 100}%` }}
            />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-center text-white tracking-tight leading-tight">
            {state.step === 0 && <span className="animate-fade-in-up">¿Cuál es tu <span className="text-blue-500">objetivo</span>?</span>}
            {state.step === 1 && <span className="animate-fade-in-up">Carga de <span className="text-purple-500">Dispositivos</span></span>}
            {state.step === 2 && <span className="animate-fade-in-up">Tu <span className="text-green-500">Espacio</span></span>}
            {state.step === 3 && <span className="animate-fade-in-up">Consumo de <span className="text-pink-500">Streaming</span></span>}
          </h2>
        </div>
      )}

      <div className="min-h-[400px] flex flex-col justify-center">
        {/* STEP 0: USAGE */}
        {state.step === 0 && (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { id: 'wfh', label: 'Home Office', icon: 'work' },
                { id: 'gaming', label: 'Gaming Pro', icon: 'sports_esports' },
                { id: 'streaming_4k', label: 'Cine 4K', icon: 'movie' },
                { id: 'social', label: 'Redes / Ocio', icon: 'thumb_up' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleUsageToggle(item.id)}
                  className={`group p-8 rounded-2xl border transition-all duration-300 flex items-center gap-6 text-left ${
                    state.usage.includes(item.id) 
                      ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800'
                  }`}
                >
                  <span className={`material-symbols-outlined text-4xl transition-colors ${state.usage.includes(item.id) ? 'text-blue-400' : 'text-zinc-600 group-hover:text-white'}`}>{item.icon}</span>
                  <div>
                    <span className="block text-xl font-bold">{item.label}</span>
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Seleccionar</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
               <button 
                onClick={nextStep} 
                disabled={state.usage.length === 0} 
                className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: DEVICES */}
        {state.step === 1 && (
          <div className="animate-fade-in-up text-center max-w-2xl mx-auto w-full">
            <div className="mb-12 relative">
               <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800">
                 {state.devices}
               </span>
               <p className="text-zinc-500 uppercase tracking-widest mt-4">Dispositivos Conectados</p>
            </div>
            
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={state.devices} 
              onChange={(e) => setState(prev => ({ ...prev, devices: parseInt(e.target.value) }))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-400 transition-all"
            />
            
            <div className="flex justify-between mt-16">
              <button onClick={prevStep} className="text-zinc-500 hover:text-white transition px-6 py-2">Atrás</button>
              <button onClick={nextStep} className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition">Siguiente</button>
            </div>
          </div>
        )}

        {/* STEP 2: DWELLING */}
        {state.step === 2 && (
          <div className="animate-fade-in-up max-w-3xl mx-auto w-full">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => setState(prev => ({ ...prev, dwellingType: 'apartment' }))}
                className={`p-10 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 ${state.dwellingType === 'apartment' ? 'bg-zinc-800 border-white text-white' : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
              >
                <span className="material-symbols-outlined text-5xl">apartment</span>
                <span className="font-bold text-lg">Departamento</span>
              </button>
              <button
                onClick={() => setState(prev => ({ ...prev, dwellingType: 'house' }))}
                className={`p-10 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 ${state.dwellingType === 'house' ? 'bg-zinc-800 border-white text-white' : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
              >
                <span className="material-symbols-outlined text-5xl">house</span>
                <span className="font-bold text-lg">Casa</span>
              </button>
            </div>
            
            {state.dwellingType === 'house' && (
              <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 flex items-center justify-between mb-8 animate-fade-in">
                <label className="text-zinc-300 font-medium">Cantidad de plantas (Pisos)</label>
                <div className="flex gap-2">
                   {[1, 2, 3].map(num => (
                     <button
                        key={num}
                        onClick={() => setState(prev => ({ ...prev, floors: num }))}
                        className={`w-10 h-10 rounded-lg font-bold border ${state.floors === num ? 'bg-white text-black border-white' : 'bg-black text-zinc-500 border-zinc-700'}`}
                     >
                       {num}
                     </button>
                   ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={prevStep} className="text-zinc-500 hover:text-white transition px-6 py-2">Atrás</button>
              <button onClick={nextStep} className="px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition">Siguiente</button>
            </div>
          </div>
        )}

         {/* STEP 3: STREAMING */}
         {state.step === 3 && (
          <div className="animate-fade-in-up max-w-3xl mx-auto w-full">
            <div className="grid grid-cols-2 gap-6 mb-12">
               <button
                onClick={() => { setState(prev => ({ ...prev, streaming: true })); calculateRecommendation(); }}
                className="group p-10 rounded-3xl border border-zinc-800 bg-black hover:bg-zinc-900 hover:border-pink-500 transition-all text-center"
              >
                <span className="material-symbols-outlined text-5xl mb-4 text-zinc-600 group-hover:text-pink-500 transition-colors">check_circle</span>
                <div className="font-bold text-xl text-white">Sí, Ultra HD</div>
                <p className="text-sm text-zinc-500 mt-2">Netflix, YouTube, Disney+ 4K</p>
              </button>
              <button
                 onClick={() => { setState(prev => ({ ...prev, streaming: false })); calculateRecommendation(); }}
                 className="group p-10 rounded-3xl border border-zinc-800 bg-black hover:bg-zinc-900 hover:border-zinc-500 transition-all text-center"
              >
                <span className="material-symbols-outlined text-5xl mb-4 text-zinc-600 group-hover:text-zinc-300 transition-colors">cancel</span>
                <div className="font-bold text-xl text-white">Uso Básico</div>
                <p className="text-sm text-zinc-500 mt-2">Navegación y redes sociales</p>
              </button>
            </div>
             <div className="flex justify-start">
              <button onClick={prevStep} className="text-zinc-500 hover:text-white transition px-6 py-2">Atrás</button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {state.step === 4 && result && (
          <div className="animate-fade-in-up text-center w-full">
            <div className="mb-12">
               <div className="inline-block p-4 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mb-6">
                 <span className="material-symbols-outlined text-4xl">verified</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Match Confirmado.</h2>
               <p className="text-zinc-400 max-w-lg mx-auto text-lg">
                 Diseñado para tu ecosistema digital.
               </p>
               
               {(state.dwellingType === 'house' && state.floors > 1) && (
                 <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-xl text-yellow-200 text-sm inline-flex items-center gap-3">
                   <span className="material-symbols-outlined">lightbulb</span>
                   <span>Detectamos varios pisos. Agregá un <strong>WiFi Mesh</strong> al carrito.</span>
                 </div>
               )}
            </div>
            
            <div className="max-w-sm mx-auto transform hover:scale-105 transition-transform duration-500">
              <PlanCard plan={result} onSelect={() => alert('¡Agregado al carrito!')} />
            </div>

            <button 
              onClick={() => { setState(prev => ({ ...prev, step: 0 })); setResult(null); }}
              className="mt-12 text-zinc-500 font-medium hover:text-white transition-colors"
            >
              Reiniciar configuración
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default SmartQuiz;