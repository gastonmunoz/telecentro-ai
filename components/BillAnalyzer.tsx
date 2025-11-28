import React, { useState } from 'react';
import { fileToGenerativePart, analyzeBill } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const BillAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (selectedFile: File) => {
    setLoading(true);
    setAnalysis('');
    setFile(selectedFile);
    setFileType(selectedFile.type);
    
    try {
      const base64 = await fileToGenerativePart(selectedFile);
      
      // Para PDFs, crear URL para vista previa
      if (selectedFile.type === 'application/pdf') {
        const pdfUrl = URL.createObjectURL(selectedFile);
        setImage(pdfUrl);
      } else {
        setImage(`data:${selectedFile.type};base64,${base64}`);
      }
      
      const result = await analyzeBill(base64, selectedFile.type);
      setAnalysis(result || "No se pudo analizar la factura.");
    } catch (error) {
      console.error(error);
      setAnalysis("Hubo un error al procesar el documento. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-800 flex flex-col min-h-[600px] relative">
      
      {/* Matrix Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
         <div className="absolute top-0 -left-1/4 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <div className="p-8 md:p-10 border-b border-zinc-800 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-black/40 backdrop-blur-md">
         <div>
            <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
              <span className="text-green-500 material-symbols-outlined text-4xl">document_scanner</span>
              Factura Inteligente
            </h2>
            <p className="text-zinc-400 max-w-lg">
              Auditoría automática de costos mediante visión artificial. Explica y desglosa cada concepto de tu factura.
            </p>
         </div>
         <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${loading ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' : 'border-green-500/50 text-green-500 bg-green-500/10'}`}>
            {loading ? 'ANALIZANDO...' : 'SISTEMA ACTIVO'}
         </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row relative z-10">
        
        {/* Upload Zone */}
        <div className="p-8 md:w-5/12 bg-black border-r border-zinc-800 flex flex-col">
           <div 
             className={`flex-grow border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300 ${
               dragActive ? 'border-green-500 bg-green-500/10' : 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
             } ${image ? 'border-none p-0' : ''}`}
             onDragEnter={handleDrag}
             onDragLeave={handleDrag}
             onDragOver={handleDrag}
             onDrop={handleDrop}
           >
             {image ? (
               <div className="relative w-full h-full rounded-xl overflow-hidden group flex flex-col">
                 {fileType === 'application/pdf' ? (
                   <>
                     <iframe
                       src={image}
                       className="flex-grow w-full border-0 rounded-t-xl"
                       title="Vista previa PDF"
                     />
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => {
                           setImage(null);
                           setFile(null);
                           setFileType('');
                           if (fileType === 'application/pdf' && image.startsWith('blob:')) {
                             URL.revokeObjectURL(image);
                           }
                         }} 
                         className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-500 transition"
                       >
                         Eliminar
                       </button>
                     </div>
                   </>
                 ) : (
                   <>
                     <img src={image} alt="Factura" className="w-full h-full object-contain opacity-80" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => {
                           setImage(null);
                           setFile(null);
                           setFileType('');
                         }} 
                         className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-500 transition"
                       >
                         Eliminar
                       </button>
                     </div>
                   </>
                 )}
               </div>
             ) : (
               <>
                 <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-4xl text-green-500">upload_file</span>
                 </div>
                 <p className="text-white font-bold text-lg mb-2">Arrastrá el documento</p>
                 <p className="text-zinc-500 text-sm mb-6">PDF, JPG, PNG soportados</p>
                 <label className="cursor-pointer bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition">
                   Explorar Archivos
                   <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleChange} />
                 </label>
               </>
             )}
           </div>
        </div>

        {/* Results Zone */}
        <div className="p-8 md:w-7/12 bg-zinc-900/50 relative flex flex-col">
          {loading && (
             <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                   <div className="h-full bg-green-500 animate-[progress_0.5s_linear_infinite]"></div>
                </div>
                <p className="font-mono text-green-500 text-sm animate-pulse">EXTRAYENDO DATOS...</p>
             </div>
          )}

          {analysis ? (
             <div className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-green-400 font-mono text-xs">
                   <span className="material-symbols-outlined text-sm">terminal</span>
                   <span>ANÁLISIS COMPLETO</span>
                </div>
                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar prose prose-invert prose-green max-w-none">
                   <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
             </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-700">
               <span className="material-symbols-outlined text-8xl mb-4 opacity-10">description</span>
               <p className="font-mono text-sm">NO DATA FOUND</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BillAnalyzer;