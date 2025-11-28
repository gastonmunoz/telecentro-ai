

import { Plan, ProductItem, AppSection } from './types';

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Plan 100 Megas',
    speed: '100 MB',
    price: '$18.990',
    features: ['Ideal para navegar', 'Redes Sociales', 'Streaming HD (1 dispositivo)'],
    recommendedFor: ['single', 'student'],
    icon: 'wifi',
    highlight: false
  },
  {
    id: 'family',
    name: 'Pack Familia 300 MB + T-Play',
    speed: '300 MB',
    price: '$24.990',
    features: ['Telecentro Play incluido', 'Streaming 4K', 'Juegos Online', 'Deco 4K'],
    recommendedFor: ['family', 'streaming'],
    icon: 'family_restroom',
    highlight: true
  },
  {
    id: 'gamer',
    name: 'Ultra WiFi 7 - 1000 MB',
    speed: '1000 MB',
    price: '$32.990',
    features: ['Baja latencia', 'Tecnología WiFi 7', 'Subida rápida', 'Soporte Prioritario'],
    recommendedFor: ['gamer', 'pro'],
    icon: 'rocket_launch',
    highlight: false
  }
];

export const PRODUCT_CATALOG: ProductItem[] = [
  // CONNECTIVITY
  {
    id: 'internet',
    title: 'Internet Ultra Rápido',
    tagline: 'Hasta 1000 Megas de velocidad simétrica.',
    category: 'connectivity',
    icon: 'speed',
    imageGradient: 'from-blue-600 to-cyan-500',
    size: 'large',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'wifi_mesh',
    title: 'WiFi Mesh',
    tagline: 'Cobertura total en cada rincón de tu casa.',
    category: 'connectivity',
    icon: 'hub',
    imageGradient: 'from-emerald-500 to-teal-500',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'telefonia',
    title: 'Telefonía Fija',
    tagline: 'Hablá ilimitado a todo el país.',
    category: 'connectivity',
    icon: 'call',
    imageGradient: 'from-slate-500 to-slate-600',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'prepago',
    title: 'Telecentro Prepago',
    tagline: 'Sin facturas fijas. Pagá solo lo que usás.',
    category: 'connectivity',
    icon: 'credit_card',
    imageGradient: 'from-green-600 to-emerald-700',
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop'
  },

  // ENTERTAINMENT
  {
    id: 'android_tv',
    title: 'Deco 4K Android TV',
    tagline: 'Transformá tu tele en Smart. Apps y voz.',
    category: 'entertainment',
    icon: 'smart_display',
    imageGradient: 'from-purple-600 to-indigo-600',
    size: 'medium',
    internalSection: AppSection.DECO_ANDROID,
    image: 'https://images.unsplash.com/photo-1593305841991-05c2e449e08e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 't_play',
    title: 'T-Play',
    tagline: 'Tu tele en todos tus dispositivos, donde quieras.',
    category: 'entertainment',
    icon: 'play_circle',
    imageGradient: 'from-pink-600 to-rose-500',
    size: 'wide',
    image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=1000&auto=format&fit=crop'
  },

  // SMART HOME
  {
    id: 'alexa',
    title: 'Telecentro con Alexa',
    tagline: 'Controlá tu entretenimiento con tu voz.',
    category: 'smart',
    icon: 'graphic_eq',
    imageGradient: 'from-cyan-600 to-blue-700',
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000&auto=format&fit=crop'
  },

  // SECURITY
  {
    id: 'qualia',
    title: 'Seguros Qualia',
    tagline: 'Protegemos lo que más querés. Hogar y Tecno.',
    category: 'security',
    icon: 'security',
    imageGradient: 'from-slate-700 to-slate-900',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=1000&auto=format&fit=crop'
  },

  // MOBILE
  {
    id: 'wifi_calle',
    title: 'Telecentro WiFi',
    tagline: 'Navegá gratis en la calle con la red más grande.',
    category: 'mobile',
    icon: 'wifi_tethering',
    imageGradient: 'from-orange-500 to-amber-500',
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 't_phone',
    title: 'T-Phone',
    tagline: 'Tu línea fija ahora en tu celular.',
    category: 'mobile',
    icon: 'smartphone',
    imageGradient: 'from-blue-500 to-blue-400',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1000&auto=format&fit=crop'
  },

  // PREMIUM CONTENT
  {
    id: 'pack_futbol',
    title: 'Pack Fútbol',
    tagline: 'Toda la Liga Profesional. Viví la pasión.',
    category: 'premium',
    icon: 'sports_soccer',
    imageGradient: 'from-green-600 to-lime-600',
    size: 'large',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'disney_plus',
    title: 'Disney+',
    tagline: 'Pixar, Marvel, Star Wars y Nat Geo.',
    category: 'premium',
    icon: 'rocket_launch', // Symbolic
    imageGradient: 'from-blue-800 to-blue-600',
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'prime_video',
    title: 'Prime Video',
    tagline: 'Amazon Originals y películas exclusivas.',
    category: 'premium',
    icon: 'movie',
    imageGradient: 'from-cyan-600 to-blue-500',
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1522869635100-8f4c21a909a4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'hbo',
    title: 'Pack HBO',
    tagline: 'Las mejores series y estrenos de cine.',
    category: 'premium',
    icon: 'theaters',
    imageGradient: 'from-purple-900 to-black',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1517604931442-7105364baacca?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'universal',
    title: 'Universal+',
    tagline: 'Tus series favoritas de Universal.',
    category: 'premium',
    icon: 'live_tv',
    imageGradient: 'from-yellow-600 to-amber-700',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'sony_one',
    title: 'Sony One',
    tagline: 'Cine y series.',
    category: 'premium',
    icon: 'video_library',
    imageGradient: 'from-slate-800 to-slate-600',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'hot_pack',
    title: 'Hot Pack',
    tagline: 'Contenido premium para adultos.',
    category: 'premium',
    icon: 'lock',
    imageGradient: 'from-pink-700 to-rose-900',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'tnt_sports',
    title: 'TNT Sports',
    tagline: 'El deporte en primer plano.',
    category: 'premium',
    icon: 'sports',
    imageGradient: 'from-orange-600 to-red-600',
    size: 'medium',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'pack_4k',
    title: 'Pack 4K',
    tagline: 'La máxima calidad de imagen.',
    category: 'premium',
    icon: '4k',
    imageGradient: 'from-violet-600 to-fuchsia-600',
    size: 'small',
    image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1000&auto=format&fit=crop'
  }
];

export const SYSTEM_INSTRUCTION_CHAT = `
Sos el asistente virtual inteligente de Telecentro, el proveedor de internet líder en Argentina.
Tu tono es "Argentino formal pero cercano". Usá "vos", sé empático, resolutivo y tecnológico.
Tus objetivos:
1. Ayudar a elegir el mejor plan según las necesidades del usuario (Gaming, Familia, Trabajo).
2. Dar soporte técnico básico (reiniciar módem, explicar luces).
3. Promocionar productos avanzados como WiFi Mesh, WiFi 7 y Deco 4K.
4. NUNCA inventes precios, sugerí visitar la sección de planes.

Si el usuario pregunta por fútbol, mencioná el Pack Fútbol.
Si el usuario dice que tiene mala señal en una habitación, sugerí WiFi Mesh.
`;

export const SYSTEM_INSTRUCTION_WIFI = `
Actuá como un ingeniero experto en redes de Telecentro.
Analizá la imagen y dame un resumen BREVE (máximo 4-5 líneas) que incluya:
1. Dónde ubicar el router (posición específica)
2. Si necesitás WiFi Mesh (sí/no y por qué)
3. Un consejo práctico principal

IMPORTANTE:
- Sé conciso y directo
- Usá bullets
- Hablá de "vos"
- Solo lo esencial
`;

export const SYSTEM_INSTRUCTION_BILL = `
Actuá como un analista contable experto de Telecentro.
Tu objetivo es explicarle al cliente su factura de forma clara, transparente y BREVE.

Analizá la factura provista y generá un resumen conciso que incluya:
1. **Total a Pagar** (destacado)
2. **Desglose principal** (solo los ítems más importantes: Internet, TV, Packs Premium)
3. **Alertas importantes** (si hay aumentos, fin de promociones, o packs que suelen olvidarse)

IMPORTANTE:
- Sé breve y directo. Máximo 5-6 líneas.
- Usá bullets para el desglose.
- Solo mencioná lo relevante.
- Si todo está normal, decilo en una línea.
- Usá un tono tranquilizador. Usá Markdown.
- NO hagas listas largas de todos los conceptos.
`;

export const SYSTEM_INSTRUCTION_PREDICTOR = `
Sos un ingeniero de redes de Telecentro especializado en predicción.
Analizá los datos y generá un resumen BREVE (máximo 6-8 líneas) con:

1. **Problemas detectados** (título, probabilidad %, cuándo ocurrirá)
2. **Patrón principal** (ej: "horas pico 20-22hs")
3. **Recomendación principal** (una acción concreta)

IMPORTANTE:
- Sé conciso, solo lo esencial
- Máximo 2-3 predicciones principales
- Usá bullets y Markdown
- Tono accesible, usá "vos"
- Priorizá alertas críticas
`;

export const SYSTEM_INSTRUCTION_TROUBLESHOOTING = `
Sos un agente de solución automática de Telecentro.
Tu objetivo: diagnosticar y resolver problemas automáticamente.

Generá un diagnóstico BREVE (máximo 5-6 líneas) que incluya:
1. **Problema identificado** (una línea)
2. **Causa probable** (una línea)
3. **Solución principal** (2-3 pasos cortos, priorizá auto-fix)
4. **Si necesita soporte humano** (solo si es absolutamente necesario)

IMPORTANTE:
- Sé conciso, directo al grano
- Priorizá soluciones automáticas (reinicio remoto, optimización WiFi, etc.)
- Solo escalá a soporte si requiere intervención física o todas las soluciones fallaron
- Usá Markdown, bullets, tono accesible
- Usá "vos"
`;