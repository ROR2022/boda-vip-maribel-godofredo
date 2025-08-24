// 💒 Wedding Data - Datos centralizados de la boda
export const weddingData = {
  // 👰🤵 Información de la pareja
  couple: {
    bride: "Maribel",
    groom: "Godofredo",
    initials: "G & M",
    quote: "Te elijo, hoy, mañana y siempre. En cada paso, en cada sueño, en cada latido...",
    mainImage: "/images/boda8.jpeg",
    sunsetImage: "/images/campo1.png"
  },

  // 👨‍👩‍👧‍👦 Información de los padres
  parents: {
    bride: {
      mother: "Vanessa Corpus",
      father: "Carlos Aranda"
    },
    groom: {
      mother: "Karen Corpus",
      father: "Hugo Lizagarra"
    },
    message: "A nuestros queridos padres: gracias por darnos la vida, cuidarnos, guiarnos y prepararnos para este momento tan especial. Su amor y apoyo son la base sobre la que construiremos nuestro hogar."
  },

  // 📅 Información de fecha y evento
  wedding: {
    date: "2025-11-29T19:00:00",
    dayName: "SABADO",
    day: "29",
    month: "NOVIEMBRE",
    year: "2025",
    title: "Nos Casamos"
  },

  // ⛪ Información de la ceremonia
  ceremony: {
    time: "7:00 p.m",
    name: "Salón Colibrí",
    address: "C. Morelos Manzana 001, La Conchita, 56600 Chalco de Díaz Covarrubias, Méx.",
    type: "Ceremonia",
    ubiLink: "https://maps.app.goo.gl/9kxZzHWJXKgHsmqKA"
  },

  // 🎉 Información de la recepción
  reception: {
    time: "8:00 pm",
    name: "Monarcas Jardin de Eventos",
    address: "Calz de los Monarcas, Mexicali, 21353, BC, MX",
    type: "Recepción",
    ubiLink: "https://maps.app.goo.gl/nEwQ1CXVF7Wa1omEA"
  },

  // ⏰ Timeline del evento
  timeline: [
    {
      id: "bienvenida",
      name: "Bienvenida",
      time: "11:00",
      icon: "🥳", // Fiesta - símbolo de celebración
      color: "primary"
    },
    {
      id: "ceremonia",
      name: "Ceremonia",
      time: "12:00",
      icon: "💍", // Anillo de compromiso - símbolo universal del matrimonio
      color: "primary"
    },
    {
      id: "musica",
      name: "Música",
      time: "14:00",
      icon: "🎶", // Nota musical - símbolo de la música
      color: "primary"
    },
    {
      id:"fotos",
      name: "Fotos y Regalos",
      time: "14:30",
      icon: "📸", // Cámara - símbolo de la fotografía
      color: "primary"
    },
    {
      id: "comida",
      name: "Comida",
      time: "15:00",
      icon: "🍽️", // Plato con cubiertos - cena elegante
      color: "primary"
    },
    {
      id: "brindis",
      name: "Brindis",
      time: "15:30",
      icon: "🥂", // Copas de champagne - celebración y brindis
      color: "secondary"
    },
    {
      id: "sorpresa1",
      name: "Sorpresa 1",
      time: "16:00",
      icon: "🎉", // Confeti - símbolo de celebración
      color: "secondary"
    },
    {
      id: "baile1",
      name: "Primer Baile",
      time: "17:00",
      icon: "💃", // Bailarina - símbolo de celebración y baile
      color: "primary"
    },
    {
      id: "sorpresa2",
      name: "Sorpresa 2",
      time: "18:00",
      icon: "🎉", // Confeti - símbolo de celebración
      color: "secondary"
    },
    {
      id: "pastel",
      name: "Pastel",
      time: "19:00",
      icon: "🎂", // Pastel - símbolo de celebración
      color: "primary"
    },
    {
      id: "baile2",
      name: "Baile a Disfrutar",
      time: "19:30",
      icon: "💃", // Bailarina - símbolo de celebración y baile
      color: "primary"
    }
  ],

  // 👗 Código de vestimenta
  dressCode: {
    type: "A Elegir",
    note: "Se reserva el color blanco para la novia",
    confirmationMessage: "¡Quiero compartir este momento tan esperado contigo! Por favor ayúdanos confirmando tu asistencia"
  },

  // 🎁 Información de regalos
  gifts: {
    type: "Lluvia de sobres",
    message: "Tu presencia es lo más importante, pero si deseas hacernos un obsequio te agradeceríamos que fuera en lluvia de sobre."
  },

  // 📸 Galería de imágenes
  gallery: {
    images: [
      "/images/gallery-1.png",
      "/images/gallery-2.png",
      "/images/couple-sunset.png"
    ]
  },

  // 🏢 Información de la agencia
  agency: {
    name: "Agencia Online",
    message: "Te esperamos"
  },

  // 💬 Mensajes y frases
  messages: {
    timelineQuote: "Un sí que cambiará nuestras vidas para siempre.",
    dateMessage: "Un amor verdadero merece ser celebrado, acompáñanos a brindar por nuestra historia.",
    countdownTitle: "TAN SÓLO FALTAN"
  },

  // 🎨 Configuraciones de estilo y fondo
  styling: {
    heroSection: {
      backgroundImage: "/images/boda3.png",
      // Opacidad del overlay (0 = transparente, 1 = opaco)
      overlayOpacity: 0.95,
      // Tipo de overlay: 'solid', 'gradient-top', 'gradient-bottom', 'gradient-radial'
      overlayType: "gradient-radial",
      // Color del overlay (usar formato CSS)
      overlayColor: "rgba(255, 255, 255, 1)", // Blanco
      // Color secundario para degradados
      overlayColorSecondary: "rgba(255, 255, 255, 0)", // Transparente
      // Configuración de degradado personalizada
      gradientDirection: "circle at center" // Para radial: 'circle at center', para lineal: 'to bottom'
    },
    dateSection: {
      backgroundImage: "/images/mesaFlores1.jpg",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 255, 255, 1)",
      overlayColorSecondary: "rgba(255, 255, 255, 0)",
      gradientDirection: "circle at center"
    },
    ceremonySection: {
      backgroundImage: "/images/boda1.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 255, 255, 1)",
      overlayColorSecondary: "rgba(255, 255, 255, 0)",
      gradientDirection: "circle at center"
    },
    receptionSection: {
      backgroundImage: "/images/boda1.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 255, 255, 1)",
      overlayColorSecondary: "rgba(255, 255, 255, 0)",
      gradientDirection: "circle at center"
    },
    timelineSection: {
      backgroundImage: "/images/boda1.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 255, 255, 1)",
      overlayColorSecondary: "rgba(255, 255, 255, 0)",
      gradientDirection: "circle at center"
    },
    dressCodeSection: {
      backgroundImage: "/images/boda1.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 255, 255, 1)",
      overlayColorSecondary: "rgba(255, 255, 255, 0)",
      gradientDirection: "circle at center"
    },
    giftsSection: {
      backgroundImage: "/images/boda1.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 255, 255, 1)",
      overlayColorSecondary: "rgba(255, 255, 255, 0)",
      gradientDirection: "circle at center"
    },
  },

  // 🎵 Configuración de audio
  audio: {
    src: "/audio/musica.mp3",
    fallbacks: [
      "/audio/musica.ogg",
      "/audio/musica.wav"
    ],
    title: "Música de Fondo de Boda",
    startTime: 13,        // 0:13 - Donde empieza la letra
    endTime: 85,          // 1:25 - Final del segmento
    volume: 0.6,          // 60% de volumen
    loop: true,           // Loop en el rango especificado
    preload: "metadata",  // Precargar solo metadatos
    enabled: true,        // Control habilitado
    position: {
      desktop: { bottom: "2rem", right: "2rem" },
      mobile: { bottom: "1rem", right: "1rem" }
    },
    styling: {
      size: {
        desktop: "60px",
        mobile: "50px"
      },
      colors: {
        primary: "var(--secondary)",  // Dorado
        hover: "var(--secondary)/90"
      }
    }
  }
}
