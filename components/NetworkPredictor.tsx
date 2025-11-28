import React, { useState, useEffect } from 'react';
import { predictNetworkIssues } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Prediction {
  id: string;
  type: 'warning' | 'critical' | 'info' | 'optimization';
  title: string;
  description: string;
  probability: number;
  timeframe: string;
  action: string;
  severity: 'low' | 'medium' | 'high';
}

interface NetworkMetrics {
  currentSpeed: number;
  averageSpeed: number;
  latency: number;
  packetLoss: number;
  uptime: number;
}

const NetworkPredictor: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    currentSpeed: 0,
    averageSpeed: 0,
    latency: 0,
    packetLoss: 0,
    uptime: 0
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Simular métricas de red (en producción vendrían de una API real)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        currentSpeed: Math.floor(Math.random() * 900) + 100,
        averageSpeed: Math.floor(Math.random() * 800) + 200,
        latency: Math.floor(Math.random() * 20) + 5,
        packetLoss: Math.random() * 2,
        uptime: 99.8 + Math.random() * 0.2
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    setPredictions([]);

    try {
      // Simular datos históricos para el análisis
      const historicalData = {
        timeframe: selectedTimeframe,
        metrics: metrics,
        patterns: {
          peakHours: ['20:00', '21:00', '22:00'],
          lowPerformancePeriods: ['14:00-16:00'],
          deviceCount: 8,
          streamingActivity: 'high'
        }
      };

      const result = await predictNetworkIssues(JSON.stringify(historicalData));
      setAnalysis(result || "No se pudo generar el análisis predictivo.");

      // Parsear predicciones del análisis (en producción sería más estructurado)
      const parsedPredictions = parsePredictionsFromAnalysis(result);
      setPredictions(parsedPredictions);
    } catch (error) {
      console.error(error);
      setAnalysis("Hubo un error al procesar el análisis. Intentá de nuevo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parsePredictionsFromAnalysis = (text: string | null): Prediction[] => {
    if (!text) return [];
    
    // Extraer predicciones del texto markdown (simplificado)
    const predictions: Prediction[] = [];
    const lines = text.split('\n');
    
    let currentPrediction: Partial<Prediction> | null = null;
    
    lines.forEach((line, index) => {
      if (line.includes('**') && line.includes(':')) {
        if (currentPrediction) {
          predictions.push(currentPrediction as Prediction);
        }
        const title = line.replace(/\*\*/g, '').replace(':', '').trim();
        currentPrediction = {
          id: `pred-${index}`,
          title,
          type: title.toLowerCase().includes('crítico') || title.toLowerCase().includes('problema') ? 'critical' : 
                title.toLowerCase().includes('optimización') ? 'optimization' : 'warning',
          severity: title.toLowerCase().includes('crítico') ? 'high' : 
                   title.toLowerCase().includes('importante') ? 'medium' : 'low',
          probability: Math.floor(Math.random() * 40) + 60,
          timeframe: '24-48 horas',
          description: '',
          action: ''
        };
      } else if (currentPrediction && line.trim()) {
        if (!currentPrediction.description) {
          currentPrediction.description = line.trim();
        } else {
          currentPrediction.action = line.trim();
        }
      }
    });
    
    if (currentPrediction) {
      predictions.push(currentPrediction as Prediction);
    }

    // Si no se encontraron predicciones estructuradas, crear algunas genéricas
    if (predictions.length === 0) {
      return [
        {
          id: 'pred-1',
          type: 'warning',
          title: 'Posible degradación de velocidad',
          description: 'Patrones indican que la velocidad puede disminuir durante las horas pico',
          probability: 75,
          timeframe: 'Mañana 20:00-22:00',
          action: 'Considerá usar QoS para priorizar dispositivos críticos',
          severity: 'medium'
        },
        {
          id: 'pred-2',
          type: 'optimization',
          title: 'Oportunidad de optimización',
          description: 'Tu red puede mejorar con un ajuste de configuración',
          probability: 85,
          timeframe: 'Inmediato',
          action: 'Recomendamos actualizar la posición del router',
          severity: 'low'
        }
      ];
    }

    return predictions.slice(0, 5); // Máximo 5 predicciones
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'critical': 
        return {
          gradient: 'from-red-600 to-orange-600',
          border: 'border-red-500/30',
          icon: 'text-red-400',
          iconName: 'warning'
        };
      case 'warning': 
        return {
          gradient: 'from-yellow-500 to-amber-600',
          border: 'border-yellow-500/30',
          icon: 'text-yellow-400',
          iconName: 'info'
        };
      case 'optimization': 
        return {
          gradient: 'from-green-500 to-emerald-600',
          border: 'border-green-500/30',
          icon: 'text-green-400',
          iconName: 'trending_up'
        };
      default: 
        return {
          gradient: 'from-blue-500 to-cyan-600',
          border: 'border-blue-500/30',
          icon: 'text-blue-400',
          iconName: 'lightbulb'
        };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            MOTOR DE PREDICCIÓN
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Aviso de Problemas
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Te avisamos antes de que tengas problemas. La IA analiza cómo usás internet y te alerta cuando algo puede fallar.
          </p>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-zinc-500 text-xs font-mono mb-2">VELOCIDAD ACTUAL</div>
            <div className="text-3xl font-black text-white mb-1">{metrics.currentSpeed}</div>
            <div className="text-xs text-zinc-600">Megas</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-zinc-500 text-xs font-mono mb-2">PROMEDIO</div>
            <div className="text-3xl font-black text-white mb-1">{metrics.averageSpeed}</div>
            <div className="text-xs text-zinc-600">Megas</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-zinc-500 text-xs font-mono mb-2">DEMORA</div>
            <div className="text-3xl font-black text-white mb-1">{metrics.latency}</div>
            <div className="text-xs text-zinc-600">milisegundos</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-zinc-500 text-xs font-mono mb-2">PÉRDIDA DE DATOS</div>
            <div className="text-3xl font-black text-white mb-1">{metrics.packetLoss.toFixed(1)}</div>
            <div className="text-xs text-zinc-600">%</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="text-zinc-500 text-xs font-mono mb-2">TIEMPO ACTIVO</div>
            <div className="text-3xl font-black text-green-400 mb-1">{metrics.uptime.toFixed(1)}</div>
            <div className="text-xs text-zinc-600">%</div>
          </div>
        </div>

        {/* Timeframe Selector & Analyze Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-1">
            {(['24h', '7d', '30d'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                  selectedTimeframe === tf
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tf === '24h' ? 'Últimas 24 horas' : tf === '7d' ? 'Últimos 7 días' : 'Últimos 30 días'}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            <span className="material-symbols-outlined">psychology</span>
            {isAnalyzing ? 'ANALIZANDO...' : 'INICIAR ANÁLISIS'}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            )}
          </button>
        </div>

        {/* Predictions Grid */}
        {predictions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {predictions.map((pred) => {
              const styles = getTypeStyles(pred.type);
              return (
                <div
                  key={pred.id}
                  className={`bg-gradient-to-br ${styles.gradient}/20 border ${styles.border} rounded-2xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-2xl ${styles.icon}`}>
                        {styles.iconName}
                      </span>
                      <div>
                        <div className="text-xs font-mono text-zinc-400 uppercase">{pred.type}</div>
                        <h3 className="text-lg font-black text-white">{pred.title}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{pred.probability}%</div>
                      <div className="text-xs text-zinc-400">probabilidad</div>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{pred.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{pred.timeframe}</span>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                      <div className="text-xs font-mono text-zinc-400 mb-1">ACCIÓN SUGERIDA</div>
                      <div className="text-sm text-white font-medium">{pred.action}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-purple-400 text-3xl">insights</span>
              <div>
                <h2 className="text-2xl font-black text-white">Análisis Predictivo Completo</h2>
                <p className="text-zinc-400 text-sm">Análisis generado por Gemini Pro</p>
              </div>
            </div>
            
            <div className="prose prose-invert prose-purple max-w-none">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && !analysis && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              </div>
              <div className="font-mono text-purple-400 text-sm">
                ANALIZANDO PATRONES...
              </div>
              <div className="text-zinc-600 text-xs max-w-md">
                La IA está procesando datos históricos, métricas actuales y patrones de uso para generar predicciones precisas.
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isAnalyzing && !analysis && predictions.length === 0 && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
            <span className="material-symbols-outlined text-8xl text-zinc-800 mb-4 block">auto_awesome</span>
            <h3 className="text-xl font-black text-white mb-2">Listo para Analizar</h3>
            <p className="text-zinc-500 mb-6">
              Hacé clic en "INICIAR ANÁLISIS" para que la IA revise tu conexión y te avise si puede haber problemas.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NetworkPredictor;

