

import React, { useState, useEffect } from 'react';
import SmartQuiz from './components/SmartQuiz';
import RoomScanner from './components/RoomScanner';
import ChatBot from './components/ChatBot';
import ModemGuide from './components/ModemGuide';
import DecoAndroid from './components/DecoAndroid';
import ProductUniverse from './components/ProductUniverse';
import BillAnalyzer from './components/BillAnalyzer';
import NetworkPredictor from "./components/NetworkPredictor";
import SmartTroubleshootingAgent from "./components/SmartTroubleshootingAgent";
import DisruptiveLanding from "./components/landing/DisruptiveLanding";
import { AppSection } from "./types";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(
    AppSection.HOME
  );
  const [scrolled, setScrolled] = useState(false);
  const [isAiMenuOpen, setIsAiMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (section: AppSection) => {
    setActiveSection(section);
    setIsAiMenuOpen(false); // Close menu on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-black selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      {/* Floating Dynamic Header - Hidden on Disruptive Landing */}
      {activeSection !== AppSection.DISRUPTIVE_LANDING && (
        <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "glass-dark py-3" : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigateTo(AppSection.HOME)}
            >
              <span className="material-symbols-outlined text-3xl text-white group-hover:text-blue-400 transition-colors">
                hub
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                Telecentro<span className="text-blue-500">.AI</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <button
                onClick={() => navigateTo(AppSection.CATALOG)}
                className="hover:text-white transition-colors"
              >
                Productos
              </button>
              <button
                onClick={() => navigateTo(AppSection.QUIZ)}
                className="hover:text-white transition-colors"
              >
                Planes
              </button>

              {/* AI Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 hover:text-white transition-colors py-2"
                  onMouseEnter={() => setIsAiMenuOpen(true)}
                >
                  Telecentro.AI{" "}
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </button>

                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-2 transition-all duration-200 transform origin-top-left ${
                    isAiMenuOpen || "group-hover:block hidden"
                  } `}
                  onMouseLeave={() => setIsAiMenuOpen(false)}
                >
                  <button
                    onClick={() => navigateTo(AppSection.MODEM_GUIDE)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-zinc-800 text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-purple-400">
                      router
                    </span>
                    <div>
                      <div className="text-white font-bold">Revisar Módem</div>
                      <div className="text-xs text-zinc-500">
                        Diagnóstico por video
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigateTo(AppSection.WIFI_SCANNER)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-zinc-800 text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-blue-400">
                      center_focus_weak
                    </span>
                    <div>
                      <div className="text-white font-bold">Revisar WiFi</div>
                      <div className="text-xs text-zinc-500">
                        Optimizá tu señal
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigateTo(AppSection.QUIZ)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-zinc-800 text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-pink-400">
                      psychology
                    </span>
                    <div>
                      <div className="text-white font-bold">Elegir Plan</div>
                      <div className="text-xs text-zinc-500">Tu plan ideal</div>
                    </div>
                  </button>
                  <button
                    onClick={() => navigateTo(AppSection.BILL_ANALYZER)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-zinc-800 text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-green-400">
                      receipt_long
                    </span>
                    <div>
                      <div className="text-white font-bold">
                        Análisis de Factura
                      </div>
                      <div className="text-xs text-zinc-500">
                        Entendé tu factura
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </nav>

            <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-xs hover:bg-slate-200 transition transform hover:scale-105">
              Sucursal Virtual
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {/* === DISRUPTIVE LANDING PAGE === */}
        {activeSection === AppSection.DISRUPTIVE_LANDING && (
          <DisruptiveLanding />
        )}

        {/* === LANDING PAGE (Apple Style) === */}
        {activeSection === AppSection.HOME && (
          <div className="bg-black text-white -mt-24">
            {/* HERO: Cinematic AI Reveal */}
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-20 animate-pulse-slow"></div>
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-10"></div>
              </div>

              <div className="relative z-10 max-w-5xl mx-auto space-y-6">
                <div className="animate-fade-in-up">
                  <h2 className="text-blue-400 font-semibold tracking-widest text-sm uppercase mb-4">
                    Inteligencia Artificial Integrada
                  </h2>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-4">
                    La solución exacta
                    <br />
                    para tu hogar.
                  </h1>
                </div>

                <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light animate-fade-in-up delay-100 leading-relaxed">
                  Encontrá los productos adecuados acá. Tecnología, velocidad y
                  entretenimiento diseñados a tu medida.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                  <button
                    onClick={() => navigateTo(AppSection.QUIZ)}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
                  >
                    Elegir mi Plan
                  </button>
                  <button
                    onClick={() => navigateTo(AppSection.CATALOG)}
                    className="px-8 py-4 glass text-white hover:bg-white/10 rounded-full font-bold text-lg transition-all"
                  >
                    Ver Productos
                  </button>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <span className="material-symbols-outlined text-3xl">
                  keyboard_arrow_down
                </span>
              </div>
            </section>

            {/* SECTION 2: AI TOOLS BENTO GRID (Disruptive Layout) */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Potencia Invisible.
                </h2>
                <p className="text-slate-400 text-lg">
                  Herramientas nativas impulsadas por Gemini Pro.
                </p>
              </div>

              {/* Grid Updated for 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
                {/* Card 1: WiFi Scanner (Tall - Left) */}
                <div
                  onClick={() => navigateTo(AppSection.WIFI_SCANNER)}
                  className="group md:col-span-1 md:row-span-2 rounded-[2rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"
                    alt="Living Room"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />

                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <span className="material-symbols-outlined text-4xl text-green-400 mb-4">
                      center_focus_weak
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Revisar Ambiente
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      Sacale una foto a tu ambiente. La IA detecta obstáculos y
                      te dice dónde poner el módem.
                    </p>
                  </div>
                </div>

                {/* Card 2: Quiz (Wide - Top Right) */}
                <div
                  onClick={() => navigateTo(AppSection.QUIZ)}
                  className="group md:col-span-2 md:row-span-1 rounded-[2rem] bg-blue-600 relative overflow-hidden cursor-pointer flex flex-col md:flex-row items-center justify-between p-8 md:p-12"
                >
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-blue-900/80 z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
                      alt="AI Quiz"
                      className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="z-10 relative max-w-md">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Elegir Plan.
                    </h3>
                    <p className="text-blue-100 text-lg">
                      Tu plan ideal, calculado por IA.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[120px] text-white opacity-20 absolute -right-4 -bottom-4 rotate-12 group-hover:scale-110 transition-transform duration-500 z-10">
                    psychology
                  </span>
                </div>

                {/* Card 3: Bill Analyzer (Mid Center) */}
                <div
                  onClick={() => navigateTo(AppSection.BILL_ANALYZER)}
                  className="group md:col-span-1 md:row-span-1 rounded-[2rem] bg-zinc-800 border border-zinc-700 relative overflow-hidden cursor-pointer hover:border-green-500/50 transition-colors p-8"
                >
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-zinc-900/90 z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1554224154-260327c00c4b?q=80&w=1000&auto=format&fit=crop"
                      alt="Bill Analysis"
                      className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative z-10">
                    <span className="material-symbols-outlined text-4xl text-green-400 mb-4">
                      receipt_long
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Factura Inteligente
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      Subí tu factura y entendé cada concepto al instante.
                    </p>
                  </div>
                </div>

                {/* Card 4: Modem Check (Replaces Veo - Mid Right) */}
                <div
                  onClick={() => navigateTo(AppSection.MODEM_GUIDE)}
                  className="group md:col-span-1 md:row-span-1 rounded-[2rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden cursor-pointer hover:border-purple-500/50 transition-colors p-8"
                >
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1644088374478-4f687068249d?q=80&w=1000&auto=format&fit=crop"
                      alt="Modem Technology"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative z-10">
                    <span className="material-symbols-outlined text-4xl text-purple-400 mb-4">
                      router
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Modem AI
                    </h3>
                    <p className="text-zinc-200 text-sm">
                      Diagnóstico en tiempo real mediante video.
                    </p>
                  </div>
                </div>

                {/* Card 5: Catalog (Wide - Bottom) */}
                <div
                  onClick={() => navigateTo(AppSection.CATALOG)}
                  className="group md:col-span-3 md:row-span-1 rounded-[2rem] bg-zinc-100 relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] p-8 flex items-center justify-between"
                >
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-white/80 z-10"></div>
                    <img
                      src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop"
                      alt="Smart City"
                      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="relative z-20 max-w-lg">
                    <h3 className="text-3xl font-bold text-black mb-2">
                      Ecosistema Completo.
                    </h3>
                    <p className="text-zinc-600 font-medium">
                      Desde WiFi 7 hasta Packs Premium. Explorá el futuro.
                    </p>
                  </div>
                  <div className="relative z-20 flex gap-4 pr-10">
                    <span className="material-symbols-outlined text-5xl text-black">
                      speed
                    </span>
                    <span className="material-symbols-outlined text-5xl text-black">
                      smart_display
                    </span>
                    <span className="material-symbols-outlined text-5xl text-black">
                      security
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-black absolute bottom-8 right-8 group-hover:translate-x-1 transition-transform z-20">
                    arrow_forward
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 3: PRODUCT SHOWCASE (Heavy Hardware Feel) */}
            <section className="bg-zinc-950 py-32 border-t border-zinc-900">
              <div className="max-w-7xl mx-auto px-6">
                {/* Feature Block: WiFi 7 */}
                <div className="mb-32 flex flex-col md:flex-row items-center gap-16">
                  <div className="flex-1 space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                      WiFi 7.
                      <br />
                      Velocidad Pura.
                    </h2>
                    <p className="text-xl text-zinc-400 leading-relaxed">
                      La latencia es cosa del pasado. Diseñado para gaming
                      profesional, VR y streaming 8K simultáneo.
                    </p>
                    <ul className="space-y-4 text-zinc-300 font-medium">
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-500">
                          speed
                        </span>{" "}
                        1000 Megas Simétricos
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-500">
                          bolt
                        </span>{" "}
                        Latencia Ultra Baja
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-500">
                          router
                        </span>{" "}
                        Router de última generación incluido
                      </li>
                    </ul>
                    <button
                      onClick={() => navigateTo(AppSection.QUIZ)}
                      className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-2 group"
                    >
                      Ver planes compatibles{" "}
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20"></div>
                    <div className="relative z-10 bg-gradient-to-b from-zinc-800 to-black p-1 rounded-3xl border border-zinc-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                      <div className="bg-black rounded-[20px] overflow-hidden h-96 flex items-center justify-center relative">
                        {/* Abstract Router Graphic */}
                        <div className="w-32 h-64 bg-zinc-900 rounded-lg border border-zinc-800 relative shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                        </div>
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                          {[...Array(36)].map((_, i) => (
                            <div
                              key={i}
                              className="border border-blue-500/30"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Block: Deco Android (Reversed) */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                  <div className="flex-1 space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                      Deco 4K.
                      <br />
                      Tu tele, Smart.
                    </h2>
                    <p className="text-xl text-zinc-400 leading-relaxed">
                      Android TV integrado. Hablale a tu control remoto, instalá
                      apps y mirá tus series favoritas en la máxima definición
                      posible.
                    </p>
                    <div className="flex gap-4">
                      <span className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-300">
                        4K UHD
                      </span>
                      <span className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-300">
                        Google Assistant
                      </span>
                      <span className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-300">
                        Chromecast
                      </span>
                    </div>
                    <button
                      onClick={() => navigateTo(AppSection.DECO_ANDROID)}
                      className="text-purple-400 font-bold hover:text-purple-300 flex items-center gap-2 group"
                    >
                      Explorar Deco 4K{" "}
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-purple-500 blur-[100px] opacity-20"></div>
                    <img
                      src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1000"
                      alt="TV Interface"
                      className="relative z-10 rounded-3xl shadow-2xl border border-zinc-800 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SECTION: CATALOG */}
        {activeSection === AppSection.CATALOG && (
          <ProductUniverse onNavigate={navigateTo} />
        )}

        {/* SECTION: QUIZ */}
        {activeSection === AppSection.QUIZ && (
          <section className="py-12 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4">
              <SmartQuiz />
            </div>
          </section>
        )}

        {/* SECTION: WIFI SCANNER */}
        {activeSection === AppSection.WIFI_SCANNER && (
          <section className="py-12 bg-black min-h-screen text-white">
            <div className="max-w-6xl mx-auto px-4">
              <RoomScanner />
            </div>
          </section>
        )}

        {/* SECTION: MODEM GUIDE */}
        {activeSection === AppSection.MODEM_GUIDE && (
          <section className="py-12 bg-zinc-950 min-h-screen text-white">
            <div className="max-w-6xl mx-auto px-4">
              <ModemGuide />
            </div>
          </section>
        )}

        {/* SECTION: BILL ANALYZER (NEW) */}
        {activeSection === AppSection.BILL_ANALYZER && (
          <section className="py-12 bg-black min-h-screen text-white">
            <div className="max-w-6xl mx-auto px-4">
              <BillAnalyzer />
            </div>
          </section>
        )}

        {/* SECTION: NETWORK PREDICTOR */}
        {activeSection === AppSection.NETWORK_PREDICTOR && (
          <section className="py-12 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4">
              <NetworkPredictor />
            </div>
          </section>
        )}

        {/* SECTION: SMART TROUBLESHOOTING AGENT */}
        {activeSection === AppSection.TROUBLESHOOTING_AGENT && (
          <section className="py-12 bg-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4">
              <SmartTroubleshootingAgent />
            </div>
          </section>
        )}

        {/* SECTION: DECO ANDROID */}
        {activeSection === AppSection.DECO_ANDROID && (
          <section className="min-h-screen bg-black">
            <DecoAndroid />
          </section>
        )}
      </main>

      {/* Global AI Assistant - Hidden on Disruptive Landing */}
      {activeSection !== AppSection.DISRUPTIVE_LANDING && <ChatBot />}

      {/* Footer - Hidden on Disruptive Landing */}
      {activeSection !== AppSection.DISRUPTIVE_LANDING && (
        <footer className="bg-black text-zinc-500 py-16 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-2xl text-zinc-300">
                  hub
                </span>
                <span className="text-lg font-bold text-white">Telecentro</span>
              </div>
              <p className="text-sm">
                Llevando el futuro a tu hogar desde hace 30 años. Ahora
                potenciado por IA.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Servicios
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Internet WiFi 7
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Televisión 4K
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Telefonía Fix
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Soporte
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Sucursal Virtual
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Botón de arrepentimiento
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Defensa al Consumidor
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs">© 2024 Telecentro S.A. Argentina.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 cursor-pointer text-white">
                X
              </span>
              <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 cursor-pointer text-white">
                Ig
              </span>
              <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 cursor-pointer text-white">
                Fb
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
