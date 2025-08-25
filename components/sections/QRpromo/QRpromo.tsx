"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { QrCode, Camera, Users, Sparkles } from "lucide-react";

// Paleta VIP Mexicana - Consistente con otros componentes
const VIP_COLORS = {
  verdeEsmeralda: "#0D6B4B",
  rojoVino: "#8B1C26",
  dorado: "#C2A878",
  marfil: "#F8F5F0",
  marfilSuave: "#FAF7F2",
  verdeOscuro: "#0A5A3C",
  verdeBosque: "#6B8C5A",
  rojoCardenal: "#7A1B24",
  oroAntiguo: "#B8A070",
};

/**
 * Componente para mostrar un código QR promocional con diseño VIP mexicano
 * Este componente se encarga de renderizar un código QR
 * que los usuarios pueden escanear para acceder a la galería colaborativa.
 */
const QRpromo = () => {
  const [isCelular, setIsCelular] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const classNames = "flex font-script justify-center items-center text-5xl md:text-6xl font-light mb-6 leading-tight";

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (viewportWidth < 768) {
      setIsCelular(true);
    } else {
      setIsCelular(false);
    }
  }, [viewportWidth]);

  return (
    <section
      className="py-16 px-4 relative overflow-hidden bg-mexican"
      style={
        {
          //background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 50%, ${VIP_COLORS.marfil} 100%)`,
        }
      }
    >
      <Image
        src="/images/marco2b.png"
        fill
        style={{ objectFit: 'cover' }}
        alt="Fondo decorativo"
      />
      {/* Elementos decorativos VIP */}
      {/* <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: VIP_COLORS.verdeEsmeralda }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: VIP_COLORS.rojoVino }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full"
          style={{ backgroundColor: VIP_COLORS.dorado }}
        ></div>
      </div> */}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Badge */}
        <div style={{ display: "none" }} className="text-center mb-8">
          <div
            className="inline-block text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-xl border-2"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.rojoVino})`,
              borderColor: `${VIP_COLORS.dorado}40`,
            }}
          >
            <QrCode size={16} className="inline mr-2" />
            Acceso Rápido a la Galería
          </div>
        </div>

        {/* Contenido Principal */}
        <div
          style={{
            fontFamily: "cursive",
          }}
          className="flex flex-col items-center justify-center gap-12 bg-slate-100 rounded-2xl p-2"
        >
          {/* Sección de Texto */}
          <div className="flex-1 text-center lg:text-left">
            {/* Título Superior */}
            <div className="mb-4">
              <p
                className="flex justify-center text-2xl font-medium tracking-wide uppercase"
                style={{
                  width: "300px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontFamily: "cursive"
                  //border: `3px solid ${VIP_COLORS.dorado}80`,
                }}
              >
                Nuestra Boda
              </p>
            </div>

            {/* Nombres de los Novios */}
            <h1
              className={isCelular ? `${classNames} flex-col` : classNames}
              style={{
                color: VIP_COLORS.verdeEsmeralda,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Godofredo
              <span style={{ color: VIP_COLORS.dorado }}>&</span>
              <span
                className=" text-4xl md:text-5xl font-normal"
                style={{ color: VIP_COLORS.rojoVino }}
              >
                Maribel
              </span>
            </h1>

            <h2
              className="flex justify-center items-center text-2xl font-semibold mb-4"
              style={{ color: VIP_COLORS.verdeOscuro }}
            >
              Sábado 29 de Noviembre 2025
            </h2>

            {/* Descripción */}
            <div
              className="p-6 rounded-2xl border-2 mb-6"
              style={{
                display: "none",
                background: `linear-gradient(135deg, ${VIP_COLORS.marfilSuave} 0%, ${VIP_COLORS.marfil} 100%)`,
                borderColor: `${VIP_COLORS.dorado}60`,
              }}
            >
              <p
                className="text-lg leading-relaxed mb-4"
                style={{ color: VIP_COLORS.verdeBosque }}
              >
                Escanea el código QR para acceder a nuestra
                <strong
                  className="font-semibold"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  {" "}
                  galería colaborativa
                </strong>{" "}
                y comparte tus mejores momentos con nosotros.
              </p>

              {/* Iconos de funciones */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div
                  className="flex items-center gap-2"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  <Camera
                    size={16}
                    style={{ color: VIP_COLORS.verdeEsmeralda }}
                  />
                  <span>Sube fotos</span>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  <Users size={16} style={{ color: VIP_COLORS.rojoVino }} />
                  <span>Ve momentos</span>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  <Sparkles size={16} style={{ color: VIP_COLORS.dorado }} />
                  <span>Comparte alegría</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div
              className="flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.verdeBosque})`,
              }}
            >
              📱 Escanea y participa
            </div>
          </div>

          {/* Sección del QR */}
          <div className="">
            <div
              className="p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.marfil}, ${VIP_COLORS.marfilSuave})`,
                border: `3px solid ${VIP_COLORS.dorado}80`,
              }}
            >
              {/* Marco decorativo del QR */}
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}10, ${VIP_COLORS.rojoVino}10)`,
                  border: `2px solid ${VIP_COLORS.dorado}40`,
                }}
              >
                <Image
                  src="/images/qrCode.png"
                  alt="Código QR - Galería Colaborativa Boda Godofredo & Maribel"
                  width={220}
                  height={220}
                  className="rounded-xl shadow-md"
                  style={{
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                  }}
                />
              </div>

              {/* Etiqueta del QR */}
              <div className="text-center mt-4">
                <p
                  className="text-sm font-semibold"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  📸 Galería Colaborativa
                </p>
                <p
                  className="text-xs opacity-75 mt-1"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  Comparte tus momentos especiales
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/gallery">
          <div
            style={{
              display:'flex',
              maxWidth: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="mt-8 flex justify-center border-2 rounded-2xl border-cyan-600 bg-slate-300 py-2"
          >
            <span
              className="text-sm font-semibold"
              style={{ color: VIP_COLORS.verdeOscuro }}
            >
              Ir a la Galería Colaborativa
            </span>
          </div>
        </Link>
        {/* Instrucciones adicionales */}
        <div style={{ display: "none" }} className="text-center mt-12">
          <div
            className="inline-block p-4 rounded-xl border-2"
            style={{
              backgroundColor: `${VIP_COLORS.dorado}20`,
              borderColor: `${VIP_COLORS.dorado}60`,
              color: VIP_COLORS.verdeOscuro,
            }}
          >
            <p className="text-sm">
              💡 <strong>Tip:</strong> También puedes acceder directamente desde
              el menú de navegación
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRpromo;
