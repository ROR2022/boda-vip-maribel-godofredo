// 👗 DressCodeSection - Sección de código de vestimenta y confirmación

import React from 'react'
import { Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { weddingData } from '../../data/weddingData'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'
import { PiCoatHanger } from "react-icons/pi";
import Image from 'next/image'


export default function DressCodeSection() {
  const { dressCode } = weddingData
  const { confirmAttendance } = useWhatsApp()

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig('dressCode')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  )

  return (
    <section
      ref={sectionRef}
      id="dresscode"
      className="py-20 relative overflow-hidden bg-mexican"
      style={{
        //background: 'linear-gradient(135deg, var(--color-rojo-vino) 0%, var(--color-marfil) 50%, var(--color-verde-esmeralda) 100%)',
        position: 'relative',
        zIndex: 5000,
        ...animationStyle
      }}
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-dorado/50 animate-pulse"></div>
        <div className="absolute bottom-12 left-12 w-28 h-28 rounded-full bg-marfil/60"></div>
        <div className="absolute top-1/3 left-1/2 w-24 h-24 rounded-full bg-rojo-vino/40"></div>
      </div>

      <div className='flex justify-center mb-4'>
          <Image
            src="/images/decoration1a1.png"
            alt="Fecha"
            width={200}
            height={100}
          />
        </div>

            <div 
        style={{
          animation: 'bounce1 2s ease 0s 1 normal forwards'
        }}
        className="container mx-auto px-4 bg-gradient-to-br from-marfil/90 to-marfil-suave/90 p-8 rounded-3xl border-2 border-dorado/40 shadow-2xl relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-6xl font-light mb-8 ">
             Código de Vestimenta
          </h2>

          <div className="bg-gradient-to-br from-marfil to-marfil-suave border-2 border-dorado/30 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center text-6xl text-dorado mb-4">
                <span>👗 </span>
                <PiCoatHanger />
              </div>
              <h3 className="text-3xl font-bold text-verde-esmeralda mb-3">
                 {dressCode.type}
              </h3>
              <p className="text-lg text-rojo-vino/80">
                ✨ {dressCode.note}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rojo-vino/10 via-marfil to-verde-esmeralda/10 rounded-2xl p-8 border-2 border-dorado/30 shadow-xl">
            <h3 className="text-3xl font-bold text-verde-esmeralda mb-6">
              💌 Confirma tu asistencia
            </h3>
            <p className="text-xl text-rojo-vino/80 mb-6">
              {dressCode.confirmationMessage}
            </p>
            <Button
              onClick={confirmAttendance}
              size="lg"
              className="bg-gradient-to-r from-verde-esmeralda via-dorado to-rojo-vino hover:bg-gradient-to-l text-white rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-dorado/30 text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              📱 Confirmar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
