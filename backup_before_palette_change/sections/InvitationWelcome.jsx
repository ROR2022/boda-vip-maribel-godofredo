"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"

export default function WelcomeMessage({ onContinue }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    setIsVisible(false)
    setTimeout(onContinue, 500)
  }

  return (
    <div 
    style={{
        backgroundImage: `url('/images/marco1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}
    className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floral elements */}
     {/*  <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <Image
          src="/placeholder.svg?height=256&width=256"
          alt="Decoración floral"
          width={256}
          height={256}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 opacity-30">
        <Image
          src="/placeholder.svg?height=256&width=256"
          alt="Decoración floral"
          width={256}
          height={256}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-30">
        <Image
          src="/placeholder.svg?height=256&width=256"
          alt="Decoración floral"
          width={256}
          height={256}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30">
        <Image
          src="/placeholder.svg?height=256&width=256"
          alt="Decoración floral"
          width={256}
          height={256}
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Main content card */}
      <div
        className={`relative z-10 max-w-2xl mx-auto transition-all duration-1000 ${
          isVisible ? "" : ""
        }`}
      >
        <div className=" p-12 text-center text-slate-400">
          {/* Heart icon */}
          <div className="mb-8">
            <Heart className="w-16 h-16 mx-auto text-slate-400" />
          </div>

          {/* Decorative line */}
          <div className="mb-8">
            <svg className="w-32 h-4 mx-auto text-secondary" viewBox="0 0 128 16" fill="none">
              <path
                d="M2 8C20 2 40 14 64 8C88 2 108 14 126 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Main message */}
          <div className="space-y-6 mb-8">
            <p className="text-xl leading-relaxed">
              Después de vivir grandes experiencias juntos, decidimos ser más felices.
            </p>

            <p className="text-lg leading-relaxed">
              Comenzamos una nueva etapa en nuestras vidas y no sería posible celebrar nuestra boda civil sin la compañía de
              nuestra familia y nuestros mejores amigos.
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className=" bg-emerald-900 text-primary px-8 py-3 rounded-full font-medium hover:bg-emerald-600 transition-colors duration-300 shadow-lg"
          >
            Continuar
          </button>
        </div>
      </div>

      {/* Bottom decorative image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 opacity-20">
        <Image
          src="/placeholder.svg?height=128&width=400"
          alt="Manos románticas"
          width={400}
          height={128}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  )
}
