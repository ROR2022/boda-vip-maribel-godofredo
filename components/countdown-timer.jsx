"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-09-13T19:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div 
    className="grid grid-cols-2 justify-center items-center gap-6 py-8">
      <div className="text-center vip-float-mexican">
        <div className="w-20 h-20 bg-gradient-to-br from-verde-esmeralda to-dorado rounded-2xl flex items-center justify-center shadow-xl border-2 border-marfil/30 vip-pulse-tricolor">
          <div className="text-3xl font-bold text-white vip-shimmer">{timeLeft.days}</div>
        </div>
        <div className="text-sm text-rojo-vino/80 font-medium mt-2">📅 DÍAS</div>
      </div>
      
      
      
      <div className="text-center vip-float-mexican" style={{ animationDelay: '0.5s' }}>
        <div className="w-20 h-20 bg-gradient-to-br from-rojo-vino to-dorado rounded-2xl flex items-center justify-center shadow-xl border-2 border-marfil/30 vip-pulse-tricolor">
          <div className="text-3xl font-bold text-white vip-shimmer">{timeLeft.hours}</div>
        </div>
        <div className="text-sm text-verde-esmeralda/80 font-medium mt-2">⏰ HORAS</div>
      </div>
      
      
      
      <div className="text-center vip-float-mexican" style={{ animationDelay: '1s' }}>
        <div className="w-20 h-20 bg-gradient-to-br from-dorado to-verde-esmeralda rounded-2xl flex items-center justify-center shadow-xl border-2 border-marfil/30 vip-pulse-tricolor">
          <div className="text-3xl font-bold text-white vip-shimmer">{timeLeft.minutes}</div>
        </div>
        <div className="text-sm text-rojo-vino/80 font-medium mt-2">⏳ MINUTOS</div>
      </div>
      
      
      
      <div className="text-center vip-float-mexican" style={{ animationDelay: '1.5s' }}>
        <div className="w-20 h-20 bg-gradient-to-br from-verde-esmeralda to-rojo-vino rounded-2xl flex items-center justify-center shadow-xl border-2 border-marfil/30 vip-pulse-tricolor">
          <div className="text-3xl font-bold text-white vip-shimmer">{timeLeft.seconds}</div>
        </div>
        <div className="text-sm text-verde-esmeralda/80 font-medium mt-2">⚡ SEGUNDOS</div>
      </div>
    </div>
  )
}
