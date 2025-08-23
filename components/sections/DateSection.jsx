// 📅 DateSection - Sección de fecha y countdown

import React from 'react'
import CountdownTimer from '../countdown-timer'
import { weddingData } from '../../data/weddingData'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'
import Image from 'next/image'

export default function DateSection() {
  const { wedding, messages } = weddingData

  // Configurar animación de scroll con fallback de carga inmediata
  const animationConfig = getAnimationConfig('date')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    'fadeIn', // Animación más suave
    animationConfig.delay,
    true // Carga inmediata como fallback
  )

  return (
    <section 
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, var(--color-rojo-vino) 0%, var(--color-marfil) 50%, var(--color-verde-esmeralda) 100%)",
        position: 'relative',
        ...animationStyle
      }}
      id="date" 
      className="py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-16 left-16 w-28 h-28 rounded-full bg-dorado animate-ping"></div>
        <div className="absolute bottom-16 right-16 w-24 h-24 rounded-full bg-marfil/50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-verde-esmeralda/30"></div>
      </div>

      <div 
        style={{
          willChange: 'transform, opacity'
        }}
        className="container mx-auto px-4 p-8 rounded-3xl bg-gradient-to-br from-marfil/85 to-marfil-suave/85 border-2 border-dorado/40 shadow-2xl relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xl text-rojo-vino/80 italic font-medium">
            {messages.dateMessage}
          </p>

          <h2 className="font-script text-6xl bg-gradient-to-r from-rojo-vino via-dorado to-verde-esmeralda bg-clip-text text-transparent">
            📅 FECHA ESPECIAL
          </h2>

          <div className="bg-gradient-to-r from-verde-esmeralda/15 via-marfil to-rojo-vino/15 rounded-3xl p-12 max-w-md mx-auto border-2 border-dorado/40 shadow-xl">
            <div className="text-2xl font-medium text-verde-esmeralda mb-2">
              🗓️ {wedding.dayName}
            </div>
            <div className='flex justify-center gap-3'>
              <div>
                <Image
                  src="/images/decoration1a.png"
                  alt="Fecha"
                  width={100}
                  height={100}
                />
              </div>
              <div className="text-8xl font-bold mb-2">
                
                {wedding.day}
              </div>
              <div>
                <Image
                  src="/images/decoration1b.png"
                  alt="Fecha"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="text-2xl font-medium text-rojo-vino/80 mb-2">
              {wedding.month}
            </div>
            <div className="text-3xl font-medium text-verde-esmeralda">
              {wedding.year}
            </div>
          </div>

          <h3 className="font-script text-4xl text-dorado">
            ⏰ {messages.countdownTitle}
          </h3>

          <div className="bg-gradient-to-r from-rojo-vino/10 via-marfil to-verde-esmeralda/10 rounded-2xl p-6 border-2 border-dorado/30 shadow-lg">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  )
}
