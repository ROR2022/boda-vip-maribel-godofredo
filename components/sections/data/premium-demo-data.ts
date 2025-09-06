import { basicDemoData } from './basic-demo-data'

// Datos demo para el paquete premium de quinceañera
export const premiumDemoData = {
  // Heredar todos los datos del básico
  ...basicDemoData,
  
  // Sobreescribir información demo con datos premium
  demo: {
    badge: "🌟 DEMO - Paquete Premium ($499)",
    description: "¡La más solicitada! - Incluye música, galería y padrinos",
    features: [
      ...basicDemoData.demo.features,
      "Música personalizada",
      "Galería de fotos", 
      "Lista de padrinos"
    ],
    cta: {
      title: "¿Te encanta el paquete Premium?",
      subtitle: "El más solicitado - Incluye TODAS las características esenciales + 3 premium exclusivas",
      buttonText: "Contratar Paquete Premium - $499",
      link: "/#pricing"
    }
  },
  
  // Configuración de música premium
  music: {
    title: "Música Especial",
    track: "/music/noCrezcas.mp3",
    autoplay: false, // Por UX, mejor no autoplay automático
    loop: true,
    description: "Música personalizada para tu evento"
  },
  
  // Información completa de invitación (característica premium)
  invitation: {
    title: "INVITACIÓN ESPECIAL",
    message: "Acompáñanos a celebrar",
    subtitle: "Mis XV años",
    blessing: "con la bendición de Dios y mis padres:",
    celebrant: basicDemoData.event.celebrant,
    parents: basicDemoData.event.parents,
    decorativeMessage: "Te esperamos en este día tan especial"
  },
  
  // Lista de padrinos (característica premium NUEVA)
  padrinos: [
    { 
      role: "Padrinos de Honor", 
      names: ["Carlos Rivera González", "María Elena Sosa Martínez"],
      description: "Quienes han sido como segundos padres"
    },
    { 
      role: "Padrinos del Vestido", 
      names: ["Roberto González Silva", "Ana Isabel Martínez López"],
      description: "Por hacer realidad mi vestido soñado"
    },
    { 
      role: "Padrinos del Ramo", 
      names: ["Luis Alberto Hernández", "Carmen Rosa López Vega"],
      description: "Por las flores más hermosas"
    },
    { 
      role: "Padrinos de la Música", 
      names: ["Jorge Eduardo Ramírez", "Sofía Alejandra Torres"],
      description: "Por llenar de melodía mi celebración"
    },
    { 
      role: "Padrinos del Vals", 
      names: ["Fernando José García", "Lucía Mercedes Herrera"],
      description: "Por hacer mágico mi primer vals"
    },
    { 
      role: "Padrinos de las Flores", 
      names: ["Miguel Ángel Ruiz", "Rosa María Jiménez"],
      description: "Por decorar este día especial"
    }
  ],
  
  // Galería de fotos (característica premium)
  gallery: {
    title: "Galería de Recuerdos",
    subtitle: "Momentos especiales",
    description: "Una colección de nuestras fotos favoritas preparándonos para este gran día",
    images: [
      {
        src: "/images/g&m-histo6.jpeg",
        alt: "Sesión fotográfica 0",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m-names4.jpeg",
        alt: "Sesión fotográfica 00",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      { 
        src: "/images/g&m1.jpg", 
        alt: "Sesión fotográfica 1", 
        caption: "Momentos Inolvidables",
        category: "preparacion"
      },
      { 
        src: "/images/g&m2.jpg", 
        alt: "Sesión fotográfica 2", 
        caption: "Momentos Inolvidables",
        category: "vestido"
      },
      { 
        src: "/images/g&m3.jpg", 
        alt: "Sesión fotográfica 3", 
        caption: "Momentos Inolvidables",
        category: "alegria"
      },
      { 
        src: "/images/g&m4.jpg", 
        alt: "Sesión fotográfica 4", 
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m5.jpg",
        alt: "Sesión fotográfica 5",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m6.jpg",
        alt: "Sesión fotográfica 6",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m7.jpg",
        alt: "Sesión fotográfica 7",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m8.jpg",
        alt: "Sesión fotográfica 8",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m9.jpg",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m10.jpg",
        alt: "Sesión fotográfica 10",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/dosEstrellas.png",
        alt: "Sesión fotográfica 0",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/crecian.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      { 
        src: "/images/g&m11.jpg", 
        alt: "Sesión fotográfica 1", 
        caption: "Momentos Inolvidables",
        category: "preparacion"
      },
      { 
        src: "/images/g&m12.jpg", 
        alt: "Sesión fotográfica 2", 
        caption: "Momentos Inolvidables",
        category: "vestido"
      },
      { 
        src: "/images/g&m13.jpg", 
        alt: "Sesión fotográfica 3", 
        caption: "Momentos Inolvidables",
        category: "alegria"
      },
      {
        src: "/images/separadas.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      { 
        src: "/images/g&m14.jpg", 
        alt: "Sesión fotográfica 4", 
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m15.jpg",
        alt: "Sesión fotográfica 5",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m16.jpg",
        alt: "Sesión fotográfica 6",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/despues.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m17.jpg",
        alt: "Sesión fotográfica 7",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m18.jpg",
        alt: "Sesión fotográfica 8",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m19.jpg",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/tarde.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m20.jpg",
        alt: "Sesión fotográfica 10",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      { 
        src: "/images/g&m21.jpg", 
        alt: "Sesión fotográfica 1", 
        caption: "Momentos Inolvidables",
        category: "preparacion"
      },
      { 
        src: "/images/g&m22.jpg", 
        alt: "Sesión fotográfica 2", 
        caption: "Momentos Inolvidables",
        category: "vestido"
      },
      {
        src: "/images/y.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      { 
        src: "/images/g&m23.jpg", 
        alt: "Sesión fotográfica 3", 
        caption: "Momentos Inolvidables",
        category: "alegria"
      },
      { 
        src: "/images/g&m24.jpg", 
        alt: "Sesión fotográfica 4", 
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m25.jpg",
        alt: "Sesión fotográfica 5",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/despues2.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m26.jpg",
        alt: "Sesión fotográfica 6",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m27.jpg",
        alt: "Sesión fotográfica 7",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/g&m28.jpg",
        alt: "Sesión fotográfica 8",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
      {
        src: "/images/porFin.png",
        alt: "Sesión fotográfica 9",
        caption: "Momentos Inolvidables",
        category: "celebracion"
      },
    ]
  },
  
  // Mensaje final personalizado (característica premium)
  thankYou: {
    title: "¡Gracias por ser parte de uno de los mejores días de mi vida!",
    personalMessage: "Cada uno de ustedes tiene un lugar especial en mi corazón, y no puedo imaginar esta celebración sin su presencia.",
    message: "Con todo mi cariño:",
    signature: "Isabella María",
    footer: {
      year: "2024",
      name: "ISABELLA MARÍA XV",
      company: "BY INVITACIONES WEB MX",
      rights: "ALL RIGHTS RESERVED",
      cta: {
        question: "¿TIENES UN EVENTO EN PUERTA?",
        action: "DISEÑA CON NOSOTROS TU INVITACIÓN WEB DIGITAL.",
        linkText: "AQUÍ",
        link: "/"
      }
    }
  },
  
  // Configuración premium adicional
  premium: {
    hasMusic: true,
    hasGallery: true,
    hasPadrinos: true,
    hasFullInvitation: true,
    hasPersonalizedThankYou: true,
    badge: "PREMIUM",
    color: "from-purple-600 to-pink-600"
  }
}

export type PremiumDemoData = typeof premiumDemoData 