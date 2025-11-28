import React, { useState } from 'react';
import { fileToGenerativePart, generateVeoVideo } from '../services/geminiService';

const VeoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<{ base64: string, mimeType: string } | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showKeyBtn, setShowKeyBtn] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const base64 = await fileToGenerativePart(file);
      setImageFile({ base64, mimeType: file.type });
    }
  };

  const handleGenerate = async () => {
    // Check if key is selected (Veo requires paid key)
    if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setShowKeyBtn(true);
        setError('Se requiere una llave de API paga para usar Veo.');
        return;
      }
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);
    setShowKeyBtn(false);

    try {
      const url = await generateVeoVideo(prompt, imageFile?.base64 || null, imageFile?.mimeType || null);
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      const msg = err.message || JSON.stringify(err);
      if (msg.includes('Requested entity was not found')) {
        setShowKeyBtn(true);
        setError('La llave de API seleccionada no es válida o no tiene acceso. Por favor seleccioná otra.');
      } else {
        setError("Error generando video. " + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectKey = async () => {
    if ((window as any).aistudio) {
      try {
        await (window as any).aistudio.openSelectKey();
        setShowKeyBtn(false);
        setError(null);
        alert('Llave seleccionada. ¡Hacé click en Generar Video de nuevo!');
      } catch (e) {
        console.error("Key selection failed", e);
      }
    }
  };

  return (
    <div className="bg-black text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-50 pointer-events-none"></div>
      
      {/* Controls */}
      <div className="relative z-10 p-8 md:w-1/2 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-purple-400">movie_filter</span>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Telecentro Veo Studio
          </h2>
        </div>
        <p className="text-gray-300">
          Creá videos increíbles para tus redes sociales a partir de una foto usando la potencia de Veo.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">1. Subí una foto (Opcional)</label>
            <div className="relative group">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
              <div className={`border-2 border-dashed rounded-xl p-4 flex items-center justify-center gap-3 transition-colors ${imageFile ? 'border-green-500 bg-green-500/10' : 'border-gray-600 group-hover:border-purple-500'}`}>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-purple-400">
                  {imageFile ? 'check_circle' : 'upload_file'}
                </span>
                <span className="text-sm text-gray-300">
                  {imageFile ? 'Imagen cargada' : 'Arrastrá o clickeá para subir'}
                </span>
              </div>
            </div>
          </div>

          <div>
             <label className="block text-sm text-gray-400 mb-2">2. Describí tu video</label>
             <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Un gato cyberpunk corriendo por Buenos Aires..."
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-purple-500 focus:outline-none resize-none h-24"
             />
          </div>

          {showKeyBtn ? (
            <div className="p-4 bg-yellow-900/50 rounded-xl border border-yellow-700">
              <p className="text-yellow-200 text-sm mb-3">Esta función requiere acceso a Google Cloud.</p>
              <button onClick={handleSelectKey} className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-lg transition">
                Seleccionar API Key
              </button>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="block text-center text-xs text-yellow-400 mt-2 hover:underline">
                Ver documentación de facturación
              </a>
            </div>
          ) : (
             <button 
              onClick={handleGenerate} 
              disabled={loading || (!prompt && !imageFile)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Generando (esto demora unos minutos)...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Generar Video
                </>
              )}
            </button>
          )}
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative z-10 md:w-1/2 bg-gray-900 flex items-center justify-center min-h-[400px]">
        {videoUrl ? (
          <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain max-h-[500px]" />
        ) : (
           <div className="text-center text-gray-600 p-8">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-20">videocam_off</span>
             <p>El video generado aparecerá acá en formato 16:9.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default VeoStudio;