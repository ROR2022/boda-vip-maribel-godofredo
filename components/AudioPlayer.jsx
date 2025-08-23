// 🎵 AudioPlayer Component - Reproductor visual fijo con animaciones

"use client"

import { Play, Pause, RotateCcw } from 'lucide-react'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { weddingData } from '@/data/weddingData'

/**
 * Componente de reproductor de audio con posición fija
 * Características:
 * - Posición fija en bottom-right
 * - Botón circular con animaciones sutiles
 * - Control de play/pause únicamente
 * - Diseño responsivo
 */
function AudioPlayer() {
  const {
    isPlaying,
    isLoading,
    error,
    toggle,
    restart,
    progress
  } = useAudioPlayer(weddingData.audio)

  // Si hay error crítico, no mostrar el reproductor
  if (error && !weddingData.audio?.src) {
    return null
  }

  return (
    <div 
      style={{
        zIndex: 6000,

      }}
      className="flex gap-3 justify-center items-center fixed bottom-10 right-10 group bg-slate-200  rounded-2xl p-3 border-2 border-dorado/40 shadow-2xl vip-hover-lift vip-optimized"
    >
      <div
      style={{display:'none'}}
      >
        <h3 
        className="text-verde-esmeralda text-sm font-medium font-serif italic">
          🎵 Nuestra Canción
        </h3>
        </div>
      
      
      <div className="relative"> 
        
        {/* Anillo de progreso VIP */}
        <div className="absolute inset-0 w-14 h-14">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-dorado/30"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-gradient-to-r from-verde-esmeralda to-rojo-vino transition-all duration-300 vip-twinkle"
              style={{
                strokeDasharray: `${2 * Math.PI * 10}`,
                strokeDashoffset: `${2 * Math.PI * 10 * (1 - progress)}`,
              }}
            />
          </svg>
        </div>

        {/* Botón principal */}
                {/* Botón principal VIP */}
        <button
          onClick={toggle}
          disabled={isLoading}
          className="
            relative w-14 h-14 rounded-full 
            bg-slate-400
            hover:from-rojo-vino hover:via-dorado hover:to-verde-esmeralda
            text-white shadow-xl
            transition-all duration-300 
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-dorado/50
            disabled:opacity-70 disabled:cursor-not-allowed
            vip-pulse-tricolor vip-optimized
            group-hover:shadow-2xl
          "
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-center justify-center">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause 
                size={20} 
                className="transform transition-transform duration-200 group-hover:scale-110" 
              />
            ) : (
              <Play 
                size={20} 
                className="ml-0.5 transform transition-transform duration-200 group-hover:scale-110" 
              />
            )}
          </div>
          
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-wedding-gold/50 animate-ping" />
          )}
        </button>

        {/* Tooltip informativo */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none whitespace-nowrap">
          {isLoading ? 'Cargando...' : 
           error ? 'Error de audio' :
           isPlaying ? 'Pausar música' : 'Reproducir música'}
          
          <div className="absolute top-full right-4 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-black/80" />
        </div>

        {/* Indicador de error con botón de reinicio */}
        {error && (
          <div className="absolute -top-2 -right-2 flex items-center gap-1">
            <button
              onClick={restart}
              className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
              title="Reiniciar audio"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioPlayer