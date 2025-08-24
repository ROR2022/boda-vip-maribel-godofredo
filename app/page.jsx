"use client"

import { useState, useEffect } from "react"

//import Navigation from "../components/navigation"
import HeroSection from "../components/sections/HeroSection"
//import ParentsSection from "../components/sections/ParentsSection"
import DateSection from "../components/sections/DateSection"
import CeremonySection from "../components/sections/CeremonySection"
import TimelineSection from "../components/sections/TimelineSection"
import DressCodeSection from "../components/sections/DressCodeSection"
//import GallerySection from "../components/sections/GallerySection"
import AudioPlayer from "../components/AudioPlayer"
import BasicCTA from "../components/sections/BasicCTA"
import InvitationEnvelope from "../components/sections/InvitationEnvelope"
import WelcomeMessage from "../components/sections/InvitationWelcome"
import { PremiumGallery } from "@/components/sections/PremiumGallery"
import CustomInvitations from "@/components/sections/CustomInvitations/components/CustomInvitations"

export default function WeddingInvitation() {
  const [isOpenInvitation, setIsOpenInvitation] = useState(false);
  const [isWelcomeMessageVisible, setIsWelcomeMessageVisible] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpenInvitation(true);
    setIsWelcomeMessageVisible(true);
  };

  const handleContinue = () => {
    setIsWelcomeMessageVisible(false);
  };

  // 🚀 Cargar script de testing VIP
  useEffect(() => {
    // Importar y ejecutar tests VIP solo en el lado del cliente
    if (typeof window !== 'undefined') {
      import('../utils/vipTests.js')
        .then(() => {
          console.log('🎭 VIP Testing Suite cargado correctamente');
        })
        .catch((error) => {
          console.warn('⚠️ Error cargando VIP Tests:', error);
        });
    }
  }, []);

  if(!isOpenInvitation) {
    return (
      <InvitationEnvelope onOpen={handleOpenInvitation} />
    )
  }

  if (isWelcomeMessageVisible) {
    return <WelcomeMessage onContinue={handleContinue} />
  }

  // Main Invitation Section
  // 🎨 Fondo limpio para permitir fondos individuales por sección
  return (
    <div className="min-h-screen">
      {/* 🎭 Elementos de decoración VIP */}
      {/* <DecorationElement /> */}
      
      {/* 📱 Navegación VIP */}
      {/* <Navigation /> */}
      
      {/* 🏆 Secciones principales con paleta mexicana */}
      <HeroSection />
      {/* <ParentsSection /> */}
      <DateSection />
      <CeremonySection />
      {/* <ReceptionSection /> */}
      <TimelineSection />
      <PremiumGallery />
      
      <DressCodeSection />
      {/* <GiftsSection /> */}
      {/* <GallerySection /> */}
      <CustomInvitations />
      <BasicCTA />
      
      {/* 🎵 Reproductor de audio VIP con efectos tricolor */}
      <AudioPlayer />
    </div>
  )
}
