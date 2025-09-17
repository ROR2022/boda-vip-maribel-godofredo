// ⛪ CeremonySection - Sección de información de la ceremonia

import React from "react";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { weddingData } from "../../data/weddingData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationConfig } from "@/data/animationConfig";

export default function CeremonySection() {
  const { ceremony, couple } = weddingData;

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig("ceremony");
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 5000,
        ...animationStyle,
      }}
      id="ceremony"
      className="py-20 relative overflow-hidden bg-mexican"
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-verde-esmeralda"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-rojo-vino"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-dorado"></div>
      </div>

      <div
        style={{
          animation: "bounce1 1.5s ease 0s 1 normal forwards",
          willChange: "transform, opacity",
          position: "relative",
          zIndex: 4000,
        }}
        className="container mx-auto px-4 p-8 rounded-3xl border-2 border-dorado/30 shadow-2xl"
      >
        <div
          style={{
            position: "relative",
            zIndex: 4000,
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full flex justify-center items-center h-96 rounded-2xl shadow-lg overflow-hidden">
              <Image
                src='/images/godo2.jpg'
                alt="Pareja al atardecer"
                fill
                className="object-cover "
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 4000,
              }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2
                  style={{ display: "none" }}
                  className="font-script text-4xl text-secondary mb-4"
                >
                  ITINERARIO
                </h2>
                <h3
                  style={{ display: "none" }}
                  className="font-script text-5xl text-foreground mb-6"
                >
                  {ceremony.type}
                </h3>

                <div
                  style={{
                    position: "relative",
                    zIndex: 4000,
                  }}
                  className="space-y-4"
                >
                  <div className="text-8xl text-black font-script mb-4">
                    {couple.initials}
                  </div>
                  <h4 className="text-2xl font-bold text-black">
                    🏛️ {ceremony.name}
                  </h4>
                  <div className="flex items-center justify-center gap-2 text-rojo-vino/80">
                    <Clock className="w-6 h-6 text-dorado" />
                    <span className="text-2xl font-medium">
                      {ceremony.time}
                    </span>
                  </div>
                  <p className="text-verde-esmeralda/70">📍 {ceremony.address}</p>

                  <Button
                    style={{
                      position: "relative",
                      zIndex: 5000,
                    }}
                    onClick={() => window.open(ceremony.ubiLink, "_blank")}
                    className="bg-slate-800 text-white hover:text-black rounded-full px-8 py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-dorado/30"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    🗺️ Ir al mapa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
