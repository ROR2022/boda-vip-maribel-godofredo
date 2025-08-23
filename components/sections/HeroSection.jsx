// 🏠 HeroSection - Sección principal/portada VIP con paleta mexicana

import React from 'react'
import { Heart } from 'lucide-react'
import { weddingData } from '../../data/weddingData'

export default function HeroSection() {
  const { couple, wedding, styling } = weddingData
  const { heroSection } = styling

  // Debug: Verificar datos
  console.log('HeroSection datos:', { couple, wedding, heroSection })

  return (
    <section 
      className="min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `url('${'/images/boda8.jpeg'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#F8F5F0',
        position: 'relative'
      }}
    >
      {/* Overlay mexicano tricolor */}
      {/* <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(
            135deg, 
            rgba(13, 107, 75, 0.6) 0%, 
            rgba(248, 245, 240, 0.7) 50%, 
            rgba(139, 28, 38, 0.6) 100%
          )`
        }}
      ></div> */}

      {/* Contenido principal con animaciones VIP */}
      <div 
        className="relative z-20 text-center p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl mx-4 vip-hover-lift"
        style={{
          backgroundColor: '',
          border: '4px solid #C2A878',
          backdropFilter: 'blur(1px)'
        }}
      >
        {/* Decoración superior con banderas mexicanas */}
        <div 
        style={{display:'none'}}
        className="flex justify-center mb-6">
          <div className="flex gap-2 vip-float-mexican">
            <span className="text-3xl">💚</span>
            <span className="text-3xl">🤍</span>
            <span className="text-3xl">❤️</span>
          </div>
        </div>

        {/* Título principal con animación shimmer */}
        <h1 
          className="text-6xl md:text-8xl mb-6 font-bold"
          style={{ 
            color: '#0D6B4B',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {wedding.title}
        </h1>

        {/* Iniciales grandes con gradiente animado */}
        <div 
          className="text-7xl mb-4 font-bold vip-pulse-tricolor"
          style={{ 
            background: `linear-gradient(45deg, #C2A878, #0D6B4B, #8B1C26, #C2A878)`,
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none'
          }}
        >
          {couple.initials}
        </div>

        {/* Nombres de la pareja */}
        <h2 className="flex flex-col text-4xl md:text-5xl mb-8 font-semibold bg-slate-200 bg-opacity-40">
          <span style={{ color: '#0D6B4B' }}>{couple.groom}</span>
          <span 
            className="mx-4 text-6xl"
            style={{ color: '#8B1C26' }}
          > & </span>
          <span style={{ color: '#0D6B4B' }}>{couple.bride}</span>
        </h2>

        {/* Corazón decorativo con animación */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Heart 
              className="w-16 h-16 animate-pulse" 
              style={{ color: '#8B1C26' }}
              fill="currentColor"
            />
            <div 
              className="absolute inset-0 w-16 h-16 rounded-full animate-ping vip-twinkle"
              style={{ backgroundColor: 'rgba(194, 168, 120, 0.3)' }}
            ></div>
          </div>
        </div>

        {/* Frase romántica con fondo VIP */}
        <div 
          className="p-6 rounded-2xl vip-gradient-flow bg-slate-200 bg-opacity-40"
          style={{
            border: '2px solid #C2A878'
          }}
        >
          <p 
            className="text-xl italic max-w-2xl mx-auto font-bold leading-relaxed"
            style={{ color: '#0D6B4B' }}
          >
            &ldquo;{couple.quote}&rdquo;
          </p>
        </div>

        {/* Fecha de la boda con estilo VIP */}
        <div 
          className="mt-8 text-center p-6 rounded-2xl bg-slate-200 bg-opacity-40"
          style={{
            display:'none',
            border: '2px solid rgba(194, 168, 120, 0.5)'
          }}
        >
          <div 
            className="text-2xl font-semibold mb-2"
            style={{ color: '#8B1C26' }}
          >
            {wedding.dayName}
          </div>
          <div 
            className="text-5xl font-bold mb-2"
            style={{ color: '#0D6B4B' }}
          >
            {wedding.day}
          </div>
          <div 
            className="text-3xl font-bold mb-2"
            style={{ color: '#C2A878' }}
          >
            {wedding.month}
          </div>
          <div 
            className="text-2xl font-semibold"
            style={{ color: '#8B1C26' }}
          >
            {wedding.year}
          </div>
        </div>

        {/* Decoración inferior con emojis mexicanos animados */}
        <div 
        style={{display:'none'}}
        className="flex justify-center mt-8 gap-6 text-4xl vip-float-mexican">
          <span style={{ color: '#0D6B4B' }}>🌹</span>
          <span style={{ color: '#C2A878' }}>💎</span>
          <span style={{ color: '#8B1C26' }}>💍</span>
          <span style={{ color: '#C2A878' }}>💎</span>
          <span style={{ color: '#0D6B4B' }}>🌹</span>
        </div>
      </div>
    </section>
  )
}
