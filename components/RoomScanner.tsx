import React, { useState } from 'react';
import { fileToGenerativePart, analyzeRoomForWiFi } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const RoomScanner: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoading(true);
      setAnalysis('');
      try {
        const base64 = await fileToGenerativePart(file);
        setImage(`data:${file.type};base64,${base64}`);
        const result = await analyzeRoomForWiFi(base64, file.type);
        setAnalysis(result || "No se pudo generar un análisis.");
      } catch (error) {
        console.error(error);
        setAnalysis("Hubo un error al procesar la imagen. Intentá de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-800 flex flex-col md:flex-row min-h-[600px] relative">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Left Panel: Scanner Interface */}
      <div className="relative z-10 p-8 md:w-5/12 bg-black/50 border-r border-zinc-800 flex flex-col justify-center">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            Vision AI V.2.0
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">WiFi <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Coverage Scan</span></h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Nuestra IA analiza la geometría y materiales de tu habitación para calcular la propagación de señal óptima.
          </p>
        </div>
        
        <label className="group cursor-pointer relative overflow-hidden bg-white text-black font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1 text-center flex items-center justify-center gap-3">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="material-symbols-outlined relative z-10">center_focus_strong</span>
          <span className="relative z-10">Escanear Ambiente</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
        
        <p className="text-xs text-zinc-600 mt-6 text-center font-mono">
          SECURE UPLOAD // ENCRYPTED ANALYSIS
        </p>
      </div>

      {/* Right Panel: Display & Results */}
      <div className="relative z-10 p-8 md:w-7/12 bg-black flex flex-col">
        {image ? (
          <div className="flex-grow flex flex-col h-full">
            {/* Image Preview Container */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900 mb-6 group h-64 flex-shrink-0">
               <img src={image} alt="Room" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
               <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
               {/* Scanning Overlay Animation */}
               {loading && (
                 <div className="absolute inset-0 z-10 bg-gradient-to-b from-blue-500/20 to-transparent w-full h-2 animate-[scan_2s_ease-in-out_infinite] border-b border-blue-400 box-content"></div>
               )}
            </div>

            {loading && (
              <div className="flex-grow flex flex-col items-center justify-center text-blue-500 font-mono text-sm">
                 <div className="flex gap-1 mb-2">
                   <div className="w-1 h-8 bg-blue-500 animate-[soundwave_1s_infinite]"></div>
                   <div className="w-1 h-8 bg-blue-500 animate-[soundwave_1.2s_infinite]"></div>
                   <div className="w-1 h-8 bg-blue-500 animate-[soundwave_0.8s_infinite]"></div>
                 </div>
                 CALCULANDO OBSTÁCULOS...
              </div>
            )}

            {/* Analysis Result */}
            {analysis && (
              <div className="flex-grow overflow-y-auto bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-inner prose prose-invert prose-sm max-w-none custom-scrollbar">
                 <h3 className="text-blue-400 font-mono text-xs border-b border-zinc-800 pb-2 mb-4 uppercase flex justify-between">
                   <span>Reporte de Ingeniería</span>
                   <span>ID: {Math.floor(Math.random() * 9999)}</span>
                 </h3>
                 <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-3xl m-4 bg-zinc-900/20">
             <span className="material-symbols-outlined text-7xl mb-4 opacity-20">grid_on</span>
             <p className="font-mono text-sm">ESPERANDO DATOS VISUALES...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomScanner;