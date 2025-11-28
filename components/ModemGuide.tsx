
import React, { useState, useRef } from 'react';
import { fileToGenerativePart, diagnoseModemIssue } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface LightInfo {
  id: string;
  label: string;
  status: 'ok' | 'issue' | 'loading';
  description: string;
  action: string;
}

const MODEM_LIGHTS: Record<string, LightInfo[]> = {
  'POWER': [
    { id: 'p_on', label: 'Encendida (Fija)', status: 'ok', description: 'El módem recibe energía correctamente.', action: 'Todo en orden.' },
    { id: 'p_off', label: 'Apagada', status: 'issue', description: 'El módem no tiene corriente.', action: 'Chequeá que el cable de alimentación esté bien enchufado.' }
  ],
  'DS': [
    { id: 'ds_on', label: 'Encendida (Fija)', status: 'ok', description: 'Recibiendo datos (Downstream) correctamente.', action: 'Todo en orden.' },
    { id: 'ds_blink', label: 'Parpadeando', status: 'loading', description: 'Buscando frecuencia de bajada.', action: 'Si persiste más de 5 min, reiniciá el módem.' }
  ],
  'US': [
    { id: 'us_on', label: 'Encendida (Fija)', status: 'ok', description: 'Enviando datos (Upstream) correctamente.', action: 'Todo en orden.' },
    { id: 'us_blink', label: 'Parpadeando', status: 'loading', description: 'Buscando frecuencia de subida.', action: 'Verificá que el cable coaxil esté bien ajustado.' }
  ],
  'ONLINE': [
    { id: 'online_on', label: 'Encendida (Fija)', status: 'ok', description: 'Conexión a internet establecida.', action: '¡A navegar!' },
    { id: 'online_off', label: 'Apagada', status: 'issue', description: 'Sin conexión IP.', action: 'Contactá a soporte técnico si el reinicio no funciona.' }
  ],
  'WIFI': [
    { id: 'wifi_blink', label: 'Parpadeando', status: 'ok', description: 'Tráfico de datos inalámbrico activo.', action: 'Es normal cuando usás internet.' },
    { id: 'wifi_off', label: 'Apagada', status: 'issue', description: 'Red WiFi desactivada.', action: 'Ingresá a la Sucursal Virtual para activarla.' }
  ]
};

const ModemGuide: React.FC = () => {
  // Default to AI tab to prioritize the "Analyzer" feature
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');
  const [selectedLight, setSelectedLight] = useState<string | null>(null);
  
  // AI State
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setDiagnosis('');
      
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleDiagnose = async () => {
    if (!file) return;
    setLoading(true);
    setDiagnosis('');
    
    try {
      const base64 = await fileToGenerativePart(file);
      const result = await diagnoseModemIssue(base64, file.type);
      setDiagnosis(result || "No pudimos diagnosticar el problema. Intentá de nuevo.");
    } catch (error) {
      console.error(error);
      setDiagnosis("Ocurrió un error al conectar con el servicio de IA. Verificá tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-800 flex flex-col min-h-[650px] relative">
      {/* Decorative Background */}
       <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
       <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Tabs */}
      <div className="flex bg-black/50 backdrop-blur-md border-b border-zinc-800 p-2 gap-2 relative z-10">
        <button 
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 rounded-xl font-bold text-center transition-all ${activeTab === 'ai' ? 'bg-zinc-800 text-white shadow-lg border border-purple-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-sm text-purple-400">analytics</span>
          Diagnóstico Inteligente
        </button>
        <button 
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-3 rounded-xl font-bold text-center transition-all ${activeTab === 'manual' ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-sm">touch_app</span>
          Guía Manual
        </button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row relative z-10">
        
        {/* AI MODE (DEFAULT) */}
        {activeTab === 'ai' && (
           <>
            <div className="p-8 md:w-1/2 bg-black/40 flex flex-col justify-center border-r border-zinc-800">
               <div className="mb-10 text-center">
                 <div className="inline-block p-4 rounded-full bg-purple-500/10 mb-4 animate-pulse-slow">
                    <span className="material-symbols-outlined text-4xl text-purple-400">smart_toy</span>
                 </div>
                 <h2 className="text-3xl font-black text-white mb-4">Modem Analyzer</h2>
                 <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                   Nuestra IA visual detecta el estado de tu servicio en segundos.
                 </p>
                 <ul className="text-left mt-6 space-y-3 text-zinc-500 text-sm max-w-xs mx-auto">
                    <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-purple-500 text-xs">check</span> Analiza luces de estado</li>
                    <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-purple-500 text-xs">check</span> Soporta video y foto</li>
                    <li className="flex gap-2 items-center"><span className="material-symbols-outlined text-purple-500 text-xs">check</span> Diagnóstico en tiempo real</li>
                 </ul>
               </div>
               
               <label className="group cursor-pointer block w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-8 text-center transition-all hover:scale-[1.02]">
                  <span className="material-symbols-outlined text-3xl mb-3 text-purple-500 group-hover:scale-110 transition-transform">cloud_upload</span>
                  <span className="block font-bold text-white mb-1">Subir Video o Foto</span>
                  <span className="text-xs text-zinc-500">Soporta JPG, PNG, MP4</span>
                  <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
               </label>
            </div>

            <div className="p-8 md:w-1/2 bg-zinc-900/60 flex flex-col">
              {file ? (
                <div className="flex flex-col h-full">
                  <div className="relative rounded-2xl overflow-hidden bg-black border border-zinc-800 mb-6 max-h-56 flex-shrink-0 group shadow-2xl">
                     {file.type.startsWith('video/') ? (
                       <video src={preview || ''} controls className="w-full h-full object-contain" />
                     ) : (
                       <img src={preview || ''} alt="Modem" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                     )}
                     <button onClick={() => { setFile(null); setPreview(null); setDiagnosis(''); }} className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors backdrop-blur-sm z-20">
                        <span className="material-symbols-outlined text-xs">close</span>
                     </button>
                  </div>

                  {!diagnosis && !loading && (
                     <button 
                       onClick={handleDiagnose}
                       className="w-full py-4 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                     >
                       <span className="material-symbols-outlined">analytics</span>
                       Analizar Ahora
                     </button>
                  )}

                  {loading && (
                    <div className="flex-grow flex flex-col items-center justify-center text-purple-400 font-mono text-xs">
                      <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-purple-500 animate-[progress_1s_ease-in-out_infinite]"></div>
                      </div>
                      <p className="animate-pulse">PROCESANDO SECUENCIA...</p>
                    </div>
                  )}

                  {diagnosis && (
                    <div className="flex-grow overflow-y-auto bg-black/30 p-4 rounded-xl border border-purple-500/20 prose prose-invert prose-sm custom-scrollbar">
                      <h3 className="text-purple-400 font-bold text-xs uppercase mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
                        Resultado del Análisis
                      </h3>
                      <ReactMarkdown>{diagnosis}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-700">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-20">video_file</span>
                    <p className="text-xs font-mono">SIN SEÑAL DE ENTRADA</p>
                </div>
              )}
            </div>
           </>
        )}

        {/* MANUAL MODE */}
        {activeTab === 'manual' && (
          <>
            <div className="p-10 md:w-1/2 bg-black flex flex-col items-center justify-center relative border-r border-zinc-800">
              <h2 className="text-zinc-400 text-sm uppercase tracking-widest mb-8 font-semibold">
                Seleccioná un indicador
              </h2>

              {/* Modem Visualization */}
              <div className="relative bg-zinc-950 w-56 h-[400px] rounded-3xl border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center py-10 gap-8">
                 <div className="text-zinc-700 font-black text-xl tracking-widest">DOCSIS 3.1</div>

                 <div className="flex flex-col gap-6 w-full px-8">
                   {Object.keys(MODEM_LIGHTS).map((key) => (
                     <button
                       key={key}
                       onClick={() => setSelectedLight(key)}
                       className={`group flex items-center justify-between w-full focus:outline-none transition-all duration-300 ${selectedLight === key ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                     >
                       <span className={`text-xs font-bold transition-colors ${selectedLight === key ? 'text-white' : 'text-zinc-500'}`}>{key}</span>
                       <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all duration-300
                          ${selectedLight === key ? 'bg-green-400 shadow-[0_0_15px_4px_rgba(34,197,94,0.6)]' : 'bg-green-900'}
                       `}></div>
                     </button>
                   ))}
                 </div>
                 
                 {/* Bottom grill */}
                 <div className="mt-auto w-full px-8 flex gap-1 justify-center opacity-20">
                    {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-8 bg-zinc-500 rounded-full"></div>)}
                 </div>
              </div>
            </div>

            <div className="p-8 md:w-1/2 bg-zinc-900 flex flex-col">
              {selectedLight ? (
                <div className="animate-fade-in h-full flex flex-col">
                   <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-800">
                     <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                     <h3 className="text-2xl font-bold text-white">Indicador {selectedLight}</h3>
                   </div>
                   
                   <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
                     {MODEM_LIGHTS[selectedLight].map((info) => (
                       <div key={info.id} className="bg-black/50 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                            {info.status === 'ok' && <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>}
                            {info.status === 'issue' && <span className="material-symbols-outlined text-red-500 text-xl">error</span>}
                            {info.status === 'loading' && <span className="material-symbols-outlined text-yellow-500 text-xl">sync</span>}
                            <h4 className="font-bold text-zinc-200">{info.label}</h4>
                          </div>
                          <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{info.description}</p>
                          <div className="text-sm bg-blue-500/10 text-blue-400 p-3 rounded-lg font-medium border border-blue-500/20">
                            Recomendación: {info.action}
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                  <span className="material-symbols-outlined text-5xl mb-4 opacity-30">touch_app</span>
                  <p className="text-sm uppercase tracking-widest">Esperando selección</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ModemGuide;
