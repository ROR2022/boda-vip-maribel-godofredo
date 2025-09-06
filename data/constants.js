// 📞 Constants - Configuraciones y constantes del proyecto

// 📱 Números de teléfono +52 1 55 4214 2715
export const PHONE_NUMBERS = {
  rsvp: "525542142715" // Reemplazar con el número real de WhatsApp
}

// 📍 Ubicaciones para Google Maps
export const LOCATIONS = {
  ceremony: "Calz de los Monarcas 140, Villas del Rey Segunda Etapa, 21354 Mexicali, B.C.",
  reception: "Calz de los Monarcas 140, Villas del Rey Segunda Etapa, 21354 Mexicali, B.C."
}

// 💬 Templates de mensajes para WhatsApp
export const WHATSAPP_MESSAGES = {
  rsvp: "¡Hola! Confirmo mi asistencia a la boda de Maribel y Godofredo el 29 de Noviembre de 2025."
}

// 🎨 Configuraciones de tema - Paleta VIP Mexicana
export const THEME_CONFIG = {
  colors: {
    // Colores principales tricolor mexicano
    primary: "verde-esmeralda", // #0D6B4B
    secondary: "rojo-vino", // #8B1C26
    background: "marfil", // #F8F5F0
    
    // Acentos premium
    accent: "dorado", // #C2A878
    muted: "verde-suave", // #556B2F
    neutral: "taupe", // #D2B48C
    
    // Para compatibilidad con código existente
    "sage-green": "verde-esmeralda", 
    gold: "dorado"
  },
  gradients: {
    principal: "var(--gradient-principal)",
    secundario: "var(--gradient-secundario)",
    fondo: "var(--gradient-fondo)",
    vip: "var(--gradient-vip)"
  },
  fonts: {
    script: "Playfair Display",
    body: "Open Sans"
  }
}

// 📱 Configuraciones de navegación
export const NAVIGATION_SECTIONS = [
  { id: "home", label: "Inicio" },
  { id: "parents", label: "Padres" },
  { id: "date", label: "Fecha" },
  { id: "ceremony", label: "Ceremonia" },
  { id: "reception", label: "Recepción" },
  { id: "timeline", label: "Cronograma" },
  { id: "dresscode", label: "Vestimenta" },
  { id: "gifts", label: "Regalos" },
  { id: "gallery", label: "Galería" }
]

// 🖼️ Rutas de imágenes
export const IMAGE_PATHS = {
  couple: {
    main: "/images/couple-main.png",
    sunset: "/images/couple-sunset.png"
  },
  decorative: {
    floralBorder: "/images/floral-border.png",
    celebration: "/images/celebration.png"
  },
  gallery: [
    "/images/gallery-1.png",
    "/images/gallery-2.png"
  ]
}

// ⚙️ Configuraciones de la aplicación
export const APP_CONFIG = {
  title: "Itzel & Carlos - Invitación de Boda",
  description: "Te invitamos a celebrar nuestro amor - 13 de Septiembre 2025",
  language: "es"
}
