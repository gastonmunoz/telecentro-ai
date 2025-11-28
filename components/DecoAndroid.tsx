import React from 'react';

const DecoAndroid: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        
        {/* HERO */}
        <div className="px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-sm font-semibold tracking-wide uppercase">Nueva Tecnología</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            Deco 4K <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Android TV</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
            Más que un decodificador, transformá tu televisor en un auténtico Smart TV.
            Un universo de posibilidades a tu alcance.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">apps</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Centro de Entretenimiento</h3>
              <p className="text-slate-400">
                Acceso a más de <strong className="text-white">5.000 aplicaciones</strong> a través de Play Store. Juegos, música, noticias y más.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">mic</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Google Assistant</h3>
              <p className="text-slate-400">
                Controlá la TV con tu voz. Buscá películas, pausá series o preguntá el clima sin tocar el control.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">cast</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Chromecast Integrado</h3>
              <p className="text-slate-400">
                Transmití lo que quieras desde tu celular, tablet o notebook directamente a la pantalla grande.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">headphones</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Bluetooth</h3>
              <p className="text-slate-400">
                Conectá tus auriculares inalámbricos para escuchar sin molestar, o usá tu gamepad para jugar.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group md:col-span-2 lg:col-span-2">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">4k</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">TV en Vivo & 4K UHD</h3>
                  <p className="text-slate-400 mb-4">
                    Accedé a toda la programación, <strong>pausá y retrocedé en vivo</strong>. Disfrutá de la máxima definición de imagen.
                  </p>
                  <button className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1">
                    Ver grilla de canales <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="flex-1 bg-black/40 rounded-xl p-4 border border-white/5 w-full">
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">En Vivo</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-mono text-red-400">REC</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                    <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
                    <div className="flex gap-2 mt-4 justify-center">
                        <span className="material-symbols-outlined text-slate-500 hover:text-white cursor-pointer">skip_previous</span>
                        <span className="material-symbols-outlined text-white hover:text-blue-400 cursor-pointer">pause_circle</span>
                        <span className="material-symbols-outlined text-slate-500 hover:text-white cursor-pointer">skip_next</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APPS SECTION */}
        <div className="bg-gradient-to-b from-slate-900 to-black py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Todo el streaming en un solo lugar</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'Universal+', offer: '1er mes invitado', icon: 'theaters' },
                { name: 'Prime Video', offer: '1er mes invitado', icon: 'local_shipping' }, // shipping icon as proxy for Prime logo
                { name: 'Disney+', offer: 'Disponible', icon: 'rocket' },
                { name: 'Apple TV', offer: 'Disponible', icon: 'tv' },
                { name: 'Mercado Play', offer: 'Incluido', icon: 'shopping_bag' },
              ].map((app, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-slate-800 transition-colors border border-white/5 group relative overflow-hidden">
                  <span className="material-symbols-outlined text-5xl mb-3 text-slate-400 group-hover:text-white transition-colors">{app.icon}</span>
                  <span className="font-bold text-lg mb-1">{app.name}</span>
                  {app.offer && (
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      app.offer.includes('invitado') ? 'bg-green-500/20 text-green-400' : 
                      app.offer.includes('Incluido') ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-slate-400'
                    }`}>
                      {app.offer}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-8">
              * Aplica a plataformas seleccionadas. Luego del primer mes, se renueva con costo. Ver condiciones en la web.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">¿Querés vivir la experiencia Android TV?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Elegí el Plan que necesitás y sumale el Deco 4K para transformar tu entretenimiento.
            </p>
            <button 
                onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:bg-slate-100 hover:scale-105 transition-all"
            >
                Quiero mi Deco 4K
            </button>
        </div>

      </div>
    </div>
  );
};

export default DecoAndroid;