// ⏰ TimelineSection - Sección de cronograma del evento

import React from 'react'
import Image from 'next/image'
import { weddingData } from '../../data/weddingData'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'

export default function TimelineSection() {
  const { timeline, messages } = weddingData

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig('timeline')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  )
 //background: 'linear-gradient(135deg, var(--color-rojo-vino) 0%, var(--color-marfil) 50%, var(--color-verde-esmeralda) 100%)',
  return (
    <section
      ref={sectionRef}
      style={{
        //background: 'linear-gradient(135deg, var(--color-rojo-vino) 0%, var(--color-marfil) 50%, var(--color-verde-esmeralda) 100%)',
        position: 'relative',
        ...animationStyle
      }}
      id="timeline" 
      className="py-20 relative overflow-hidden bg-mexican"
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-16 right-16 w-30 h-30 rounded-full bg-verde-esmeralda/40 animate-pulse"></div>
        <div className="absolute bottom-16 left-16 w-26 h-26 rounded-full bg-dorado/50"></div>
        <div className="absolute top-1/3 left-1/3 w-22 h-22 rounded-full bg-marfil/60"></div>
      </div>

      <div 
        style={{
          animation: 'bounce1 2s ease 0s 1 normal forwards'
        }}
        className="container mx-auto px-4 rounded-3xl border-2 border-dorado/40 shadow-2xl relative z-10"
      >
        <div className='flex justify-center mb-4'>
          <Image
            src="/images/decoration1a1.png"
            alt="Fecha"
            width={200}
            height={100}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-full relative">
                <Image
                  src="/images/godo3.jpg"
                  alt="Celebración"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-light text-center mb-8 bg-gradient-to-r from-rojo-vino via-dorado to-verde-esmeralda bg-clip-text text-transparent">
                ⏰ Cronograma
              </h2>
              
              {timeline.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-5 bg-gradient-to-r from-marfil/50 to-marfil-suave/50 rounded-xl hover:from-marfil/70 hover:to-marfil-suave/70 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-dorado/20"
                  style={{
                    animation: `slideInRight 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div 
                    className="w-16 h-16 bg-gradient-to-r from-dorado to-rojo-vino rounded-full flex items-center justify-center shadow-lg border-2 border-marfil/30 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full"></div>
                    <span 
                      className="text-2xl filter drop-shadow-sm relative z-10 text-white"
                      role="img" 
                      aria-label={item.name}
                    >
                      {item.icon}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-semibold text-verde-esmeralda">
                        🎉 {item.name}
                      </h3>
                      <span className="text-lg font-medium text-rojo-vino/80">
                        ⏰ {item.time}
                      </span>
                    </div>
                    
                    <p className="text-rojo-vino/70 text-sm leading-relaxed">
                      ✨ {item.description}
                    </p>
                  </div>
                  
                  <div className="hidden md:block w-2 h-2 bg-dorado opacity-60 rounded-full"></div>
                </div>
              ))}

              <div className="text-center mt-8 p-6 bg-gradient-to-r from-verde-esmeralda/10 via-marfil to-rojo-vino/10 rounded-lg border border-dorado/20 shadow-lg">
                <p className="text-lg italic text-rojo-vino/80">
                  💝 &ldquo;{messages.timelineQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
