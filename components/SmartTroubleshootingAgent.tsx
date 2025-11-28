import React, { useState, useEffect } from 'react';
import { troubleshootNetworkIssue } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface TroubleshootingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  action?: string;
  result?: string;
  autoFixable: boolean;
}

interface DiagnosticResult {
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  steps: TroubleshootingStep[];
  autoResolved: boolean;
  needsHumanSupport: boolean;
}

const SmartTroubleshootingAgent: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [userDescription, setUserDescription] = useState('');
  const [autoFixEnabled, setAutoFixEnabled] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  // Simular escaneo de red
  const simulateNetworkScan = async () => {
    setIsScanning(true);
    setCurrentStep(-1);
    setDiagnostic(null);
    setAnalysis('');
    setScanProgress(0);

    // Simular progreso de escaneo
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setScanProgress(i);
    }

    // Simular detección de problemas
    const detectedIssues = [
      { name: 'Latencia elevada', severity: 'medium' as const, confidence: 85 },
      { name: 'Packet loss intermitente', severity: 'low' as const, confidence: 72 },
      { name: 'Velocidad por debajo del plan', severity: 'high' as const, confidence: 90 }
    ];

    // Generar pasos de troubleshooting
    const steps: TroubleshootingStep[] = [
      {
        id: '1',
        title: 'Verificar conexión del módem',
        description: 'Comprobando estado de las luces del módem',
        status: 'pending',
        autoFixable: false
      },
      {
        id: '2',
        title: 'Reiniciar módem remotamente',
        description: 'Intentando reinicio automático del módem',
        status: 'pending',
        action: 'Reiniciar módem',
        autoFixable: true
      },
      {
        id: '3',
        title: 'Optimizar configuración de red',
        description: 'Ajustando parámetros de QoS y canales WiFi',
        status: 'pending',
        action: 'Optimizar red',
        autoFixable: true
      },
      {
        id: '4',
        title: 'Verificar interferencias',
        description: 'Analizando canales WiFi cercanos',
        status: 'pending',
        autoFixable: false
      }
    ];

    setDiagnostic({
      issue: detectedIssues[0].name,
      severity: detectedIssues[0].severity,
      confidence: detectedIssues[0].confidence,
      steps,
      autoResolved: false,
      needsHumanSupport: false
    });

    setIsScanning(false);
  };

  const handleStartDiagnosis = async () => {
    if (!userDescription.trim() && !diagnostic) {
      await simulateNetworkScan();
      return;
    }

    setIsScanning(true);
    setCurrentStep(-1);
    setAnalysis('');

    try {
      const issueData = {
        userDescription: userDescription || 'Problema detectado automáticamente',
        detectedIssues: diagnostic ? [diagnostic.issue] : [],
        networkMetrics: {
          speed: Math.floor(Math.random() * 800) + 100,
          latency: Math.floor(Math.random() * 30) + 10,
          packetLoss: Math.random() * 3
        }
      };

      const result = await troubleshootNetworkIssue(JSON.stringify(issueData));
      setAnalysis(result || "No se pudo generar el diagnóstico.");

      // Parsear resultado para actualizar steps
      if (diagnostic) {
        const updatedSteps = diagnostic.steps.map((step, index) => {
          if (index === 0) {
            return { ...step, status: 'success' as const, result: 'Conexión estable' };
          }
          return step;
        });
        setDiagnostic({ ...diagnostic, steps: updatedSteps });
      }
    } catch (error) {
      console.error(error);
      setAnalysis("Hubo un error al procesar el diagnóstico. Intentá de nuevo.");
    } finally {
      setIsScanning(false);
    }
  };

  const executeStep = async (stepIndex: number) => {
    if (!diagnostic) return;

    const step = diagnostic.steps[stepIndex];
    if (!step.autoFixable || !autoFixEnabled) {
      setCurrentStep(stepIndex);
      return;
    }

    // Simular ejecución automática
    const updatedSteps = diagnostic.steps.map((s, idx) => {
      if (idx === stepIndex) {
        return { ...s, status: 'running' as const };
      }
      return s;
    });
    setDiagnostic({ ...diagnostic, steps: updatedSteps });
    setCurrentStep(stepIndex);

    // Simular tiempo de ejecución
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simular resultado (80% éxito)
    const success = Math.random() > 0.2;
    const finalSteps = updatedSteps.map((s, idx) => {
      if (idx === stepIndex) {
        return {
          ...s,
          status: success ? ('success' as const) : ('failed' as const),
          result: success ? 'Problema resuelto automáticamente' : 'Requiere intervención manual'
        };
      }
      return s;
    });

    setDiagnostic({ ...diagnostic, steps: finalSteps });

    // Si fue exitoso, continuar con el siguiente paso
    if (success && stepIndex < diagnostic.steps.length - 1) {
      setTimeout(() => executeStep(stepIndex + 1), 1000);
    } else if (!success) {
      setDiagnostic(prev => prev ? { ...prev, needsHumanSupport: true } : null);
    }
  };

  const handleAutoFix = async () => {
    if (!diagnostic) return;

    setCurrentStep(0);
    for (let i = 0; i < diagnostic.steps.length; i++) {
      await executeStep(i);
      if (diagnostic.steps[i].status === 'failed') break;
    }

    // Verificar si se resolvió todo
    const allResolved = diagnostic.steps.every(s => s.status === 'success' || s.status === 'skipped');
    if (allResolved) {
      setDiagnostic(prev => prev ? { ...prev, autoResolved: true } : null);
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical': 
        return {
          gradient: 'from-red-600 to-orange-600',
          border: 'border-red-500/30'
        };
      case 'high': 
        return {
          gradient: 'from-orange-500 to-yellow-500',
          border: 'border-orange-500/30'
        };
      case 'medium': 
        return {
          gradient: 'from-yellow-500 to-amber-500',
          border: 'border-yellow-500/30'
        };
      default: 
        return {
          gradient: 'from-blue-500 to-cyan-500',
          border: 'border-blue-500/30'
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return 'check_circle';
      case 'failed': return 'error';
      case 'running': return 'sync';
      case 'skipped': return 'skip_next';
      default: return 'radio_button_unchecked';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'running': return 'text-blue-400 animate-spin';
      case 'skipped': return 'text-zinc-500';
      default: return 'text-zinc-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            MOTOR DE SOLUCIÓN AUTOMÁTICA
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
            Solución Automática
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Se arregla solo. La IA detecta el problema y lo soluciona sin que tengas que hacer nada.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel: Input & Controls */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Problem Description */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400">bug_report</span>
                Describí el Problema
              </h3>
              <textarea
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
                placeholder="Ej: Internet lento, se corta la conexión, no puedo ver Netflix..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 resize-none h-32"
              />
            </div>

            {/* Arreglo Automático */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-white mb-1">Arreglo Automático</h3>
                  <p className="text-xs text-zinc-400">Se arregla solo activado</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoFixEnabled}
                    onChange={(e) => setAutoFixEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
              <p className="text-xs text-zinc-500">
                Cuando está activado, el agente intentará resolver problemas automáticamente sin tu intervención.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleStartDiagnosis}
                disabled={isScanning}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-xl font-black text-lg shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">search</span>
                {isScanning ? 'REVISANDO...' : 'INICIAR REVISIÓN'}
                {isScanning && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}
              </button>

              {diagnostic && !diagnostic.autoResolved && autoFixEnabled && (
                <button
                  onClick={handleAutoFix}
                  disabled={currentStep >= 0}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-black text-lg shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">auto_fix_high</span>
                  ARREGLAR AUTOMÁTICAMENTE
                </button>
              )}
            </div>

            {/* Scan Progress */}
            {isScanning && scanProgress > 0 && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-zinc-400">REVISANDO CONEXIÓN...</span>
                  <span className="text-xs font-mono text-orange-400">{scanProgress}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Diagnostic Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Issue Card */}
            {diagnostic && (() => {
              const severityStyles = getSeverityStyles(diagnostic.severity);
              return (
                <div className={`bg-gradient-to-br ${severityStyles.gradient}/20 border ${severityStyles.border} rounded-2xl p-6 backdrop-blur-sm`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs font-mono text-zinc-400 uppercase mb-2">
                        PROBLEMA DETECTADO
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">{diagnostic.issue}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-zinc-400">
                          Severidad: <span className="text-white font-bold capitalize">{diagnostic.severity}</span>
                        </span>
                        <span className="text-zinc-400">
                          Confianza: <span className="text-white font-bold">{diagnostic.confidence}%</span>
                        </span>
                      </div>
                    </div>
                    {diagnostic.autoResolved && (
                      <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-bold">
                        RESUELTO
                      </div>
                    )}
                    {diagnostic.needsHumanSupport && (
                      <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-xs font-bold">
                        REQUIERE SOPORTE
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Pasos de Solución */}
            {diagnostic && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-400">list</span>
                  Pasos de Solución
                </h3>
                <div className="space-y-4">
                  {diagnostic.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`bg-zinc-950 border rounded-xl p-4 transition-all ${
                        step.status === 'success' ? 'border-green-500/50 bg-green-500/5' :
                        step.status === 'failed' ? 'border-red-500/50 bg-red-500/5' :
                        step.status === 'running' ? 'border-orange-500/50 bg-orange-500/5' :
                        'border-zinc-800'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'success' ? 'bg-green-500/20' :
                          step.status === 'failed' ? 'bg-red-500/20' :
                          step.status === 'running' ? 'bg-orange-500/20' :
                          'bg-zinc-800'
                        }`}>
                          <span className={`material-symbols-outlined ${getStatusColor(step.status)}`}>
                            {getStatusIcon(step.status)}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-white">{step.title}</h4>
                            {step.autoFixable && (
                              <span className="text-xs px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 font-mono">
                                AUTO
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 mb-2">{step.description}</p>
                          {step.result && (
                            <div className={`mt-2 p-2 rounded-lg text-xs ${
                              step.status === 'success' ? 'bg-green-500/10 text-green-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {step.result}
                            </div>
                          )}
                          {step.action && step.status === 'pending' && (
                            <button
                              onClick={() => executeStep(index)}
                              className="mt-2 text-xs text-orange-400 hover:text-orange-300 font-bold"
                            >
                              {step.action} →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Analysis */}
            {analysis && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-orange-400 text-3xl">psychology</span>
                  <div>
                    <h3 className="text-xl font-black text-white">Análisis Inteligente</h3>
                    <p className="text-zinc-400 text-sm">Generado por Gemini Pro</p>
                  </div>
                </div>
                <div className="prose prose-invert prose-orange max-w-none">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!diagnostic && !isScanning && !analysis && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
                <span className="material-symbols-outlined text-8xl text-zinc-800 mb-4 block">support_agent</span>
            <h3 className="text-xl font-black text-white mb-2">Listo para Revisar</h3>
            <p className="text-zinc-500 mb-6">
              Describí tu problema o hacé clic en "INICIAR REVISIÓN" para que revise tu conexión automáticamente.
            </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartTroubleshootingAgent;

