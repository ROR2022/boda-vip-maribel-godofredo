# 🎵 Plan de Implementación - Control de Audio para Invitación de Boda

## 📋 Especificaciones Definidas

### **🎯 Requisitos del Cliente:**
- ✅ **Activación:** Manual (sin autoplay)
- ✅ **Controles:** Solo Play/Pause (sin control de volumen)
- ✅ **Posición:** Esquina inferior derecha (fixed)
- ✅ **Animaciones:** Sutiles y elegantes
- ✅ **Reproducción:** Desde 0:13 hasta 1:25 (72 segundos) en loop

### **🎵 Configuración de Audio:**
- **Archivo:** `/public/audio/musica.mp3`
- **Inicio:** 13 segundos
- **Final:** 85 segundos (1:25)
- **Duración del loop:** 72 segundos
- **Comportamiento:** Loop continuo en el rango especificado

---

## 🏗️ **Arquitectura de la Solución**

```
🎵 Audio Control System
├── 📊 data/weddingData.js
│   └── Configuración de audio (tiempo, ruta, etc.)
├── 🎣 hooks/useAudioPlayer.js
│   └── Lógica de reproducción con time range
├── 🎛️ components/AudioPlayer.jsx
│   └── Control visual fijo en esquina
└── 📱 app/page.jsx
    └── Integración del componente
```

---

## 🚀 **PLAN DE IMPLEMENTACIÓN**

### **FASE 1: Configuración de Datos** (10 min)

#### 1.1 Agregar configuración de audio en weddingData.js
```javascript
audio: {
  src: "/audio/musica.mp3",
  title: "Música de Fondo",
  startTime: 13,        // Inicio en segundos (0:13)
  endTime: 85,          // Final en segundos (1:25)
  volume: 0.6,          // Volumen por defecto
  enabled: true,        // Habilitar control
  position: "bottom-right"
}
```

---

### **FASE 2: Hook de Audio Personalizado** (20 min)

#### 2.1 Crear `hooks/useAudioPlayer.js`
**Funcionalidades:**
- ✅ Control de reproducción manual
- ✅ Manejo de tiempo específico (0:13 - 1:25)
- ✅ Loop automático en el rango
- ✅ Estados: playing, paused, loading, error
- ✅ Funciones: play(), pause(), toggle()

**Lógica de Time Range:**
```javascript
// Cuando llegue a endTime (1:25), volver a startTime (0:13)
audio.ontimeupdate = () => {
  if (audio.currentTime >= endTime) {
    audio.currentTime = startTime
  }
}
```

---

### **FASE 3: Componente Visual** (25 min)

#### 3.1 Crear `components/AudioPlayer.jsx`
**Características:**
- ✅ Botón circular fijo (bottom-right)
- ✅ Iconos Play/Pause animados sutilmente
- ✅ Colores del tema (secondary/gold)
- ✅ Hover effects elegantes
- ✅ Transiciones suaves
- ✅ Responsive (móvil y desktop)

**Estilos CSS:**
```css
.audio-player {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: gradient(gold);
  box-shadow: elegant;
  transition: all 0.3s ease;
}
```

---

### **FASE 4: Integración Principal** (10 min)

#### 4.1 Integrar en `app/page.jsx`
- ✅ Importar AudioPlayer
- ✅ Posicionar como componente fijo
- ✅ Manejo de estado global
- ✅ Evitar conflictos con otros elementos

---

### **FASE 5: Testing y Refinamiento** (15 min)

#### 5.1 Pruebas funcionales
- ✅ Verificar rango de tiempo correcto
- ✅ Probar loop seamless
- ✅ Testing en móvil y desktop
- ✅ Verificar no interferencia con navegación
- ✅ Performance y memoria

---

## 🎨 **Especificaciones de Diseño**

### **🎛️ Estados del Botón:**

#### **Estado Paused (Default):**
```css
- Icono: ▶️ (Play)
- Color: Gold gradient
- Tamaño: 60px x 60px
- Shadow: Sutil
- Hover: Ligero scale (1.05)
```

#### **Estado Playing:**
```css
- Icono: ⏸️ (Pause)
- Color: Gold gradient más intenso
- Indicador: Sutil pulse animation
- Hover: Mantenido
```

### **🎨 Paleta de Colores:**
- **Primary:** Verde salvia (#A8CBA0)
- **Secondary:** Dorado (#D4AF37) ← **Para el audio player**
- **Background:** Blanco con overlay

### **📱 Responsive Breakpoints:**
- **Desktop:** 60px x 60px, bottom: 2rem, right: 2rem
- **Tablet:** 55px x 55px, bottom: 1.5rem, right: 1.5rem  
- **Mobile:** 50px x 50px, bottom: 1rem, right: 1rem

---

## 🔧 **Implementación Técnica Detallada**

### **🎵 Hook `useAudioPlayer`:**
```javascript
export const useAudioPlayer = (audioConfig) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const audioRef = useRef(null)

  // Inicializar audio con configuración
  // Manejo de time range
  // Funciones de control
  // Cleanup al desmount

  return { isPlaying, isLoading, error, play, pause, toggle }
}
```

### **🎛️ Componente `AudioPlayer`:**
```javascript
export default function AudioPlayer() {
  const { audio } = weddingData
  const { isPlaying, toggle } = useAudioPlayer(audio)

  return (
    <button 
      onClick={toggle}
      className="audio-player-btn"
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}
```

---

## 📊 **Configuración Final en weddingData.js**

```javascript
// 🎵 Configuración de audio
audio: {
  src: "/audio/musica.mp3",
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
```

---

## ✅ **Checklist de Implementación**

### **Preparación**
- [ ] Verificar archivo de audio en `/public/audio/musica.mp3`
- [ ] Confirmar que el dev server está corriendo
- [ ] Backup de archivos principales

### **Fase 1: Datos**
- [ ] Agregar configuración de audio en `weddingData.js`
- [ ] Verificar integración con datos existentes

### **Fase 2: Hook**
- [ ] Crear `hooks/useAudioPlayer.js`
- [ ] Implementar lógica de time range (0:13 - 1:25)
- [ ] Agregar manejo de estados
- [ ] Testing del hook aislado

### **Fase 3: Componente**
- [ ] Crear `components/AudioPlayer.jsx`
- [ ] Implementar estilos responsive
- [ ] Agregar animaciones sutiles
- [ ] Integrar iconos de Play/Pause

### **Fase 4: Integración**
- [ ] Importar en `app/page.jsx`
- [ ] Posicionar como fixed element
- [ ] Verificar z-index correcto

### **Fase 5: Testing**
- [ ] Probar reproducción desde 0:13
- [ ] Verificar loop a 1:25 → 0:13
- [ ] Testing en móvil y desktop
- [ ] Verificar performance
- [ ] Testing de accesibilidad

---

## 🚨 **Consideraciones Técnicas**

### **🔊 Audio Policy:**
- **No autoplay** - Usuario debe activar manualmente
- **Graceful fallback** - Si falla, mostrar estado de error
- **Memory management** - Limpiar audio al desmontar

### **📱 Cross-browser:**
- **Safari:** Verificar compatibilidad de audio
- **Chrome:** Política de autoplay
- **Firefox:** Manejo de time ranges
- **Mobile browsers:** Touch interactions

### **⚡ Performance:**
- **Lazy loading** - Audio carga solo cuando se necesita
- **Debounce** - Evitar clicks rápidos
- **Cleanup** - Pausa automática al cambiar de página

---

## 🎯 **Resultado Esperado**

Un control de audio elegante y funcional que:

1. **🎵 Reproduce** solo el segmento 0:13 - 1:25 en loop
2. **🎛️ Control manual** - Usuario decide cuándo activar
3. **🎨 Diseño elegante** - Integrado con el tema de boda
4. **📱 Responsive** - Funciona en todos los dispositivos
5. **♿ Accesible** - Soporte para screen readers
6. **⚡ Optimizado** - No afecta performance de la página

---

**⏱️ Tiempo Total Estimado:** 80 minutos
**🎯 Prioridad:** Alta - Mejora significativa de UX
**📋 Estado:** Listo para implementar

---

*Plan creado: Agosto 18, 2025*
*Especificaciones confirmadas por el cliente*
