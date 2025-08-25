# 📋 Guía de Configuración de Cloudinary para Boda VIP

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y configura las siguientes variables:

```bash
# Backend Configuration
CLOUDINARY_CLOUD_NAME=tu_cloud_name_real
CLOUDINARY_API_KEY=tu_api_key_real
CLOUDINARY_API_SECRET=tu_api_secret_real
CLOUDINARY_UPLOAD_PRESET=boda_vip_preset

# Frontend Configuration (Public)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name_real
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=boda_vip_preset
```

### 2. Configurar Upload Preset en Cloudinary

1. Ve a tu dashboard de Cloudinary
2. Navega a Settings > Upload
3. Crea un nuevo Upload Preset llamado `boda_vip_preset`
4. Configura las siguientes opciones:

#### 📸 Configuración Recomendada del Preset:

```json
{
  "name": "boda_vip_preset",
  "unsigned": true,
  "mode": "upload",
  "folder": "boda-vip-maribel-godofredo",
  "allowed_formats": ["jpg", "jpeg", "png", "webp"],
  "max_file_size": 10485760,
  "quality": "auto:good",
  "format": "auto",
  "transformation": [
    {
      "width": 1920,
      "height": 1080,
      "crop": "limit",
      "quality": "auto:good",
      "format": "auto"
    }
  ],
  "eager": [
    {
      "width": 800,
      "height": 600,
      "crop": "fit",
      "quality": "auto:good",
      "format": "auto"
    },
    {
      "width": 200,
      "height": 200,
      "crop": "fill",
      "quality": "auto:eco",
      "format": "auto"
    }
  ],
  "tags": ["boda", "vip", "invitados"],
  "context": {
    "source": "wedding-gallery",
    "event": "boda-maribel-godofredo"
  }
}
```

## 🎯 Características del Sistema Híbrido

### ✅ Funcionalidades Implementadas

1. **Detección Automática de Sistema**
   - Prioriza Cloudinary cuando está configurado
   - Fallback automático al sistema original
   - Indicadores visuales del sistema activo

2. **Upload Híbrido**
   - Subida simultánea o secuencial
   - Progress tracking independiente
   - Manejo de errores por sistema

3. **Galería Unificada**
   - Muestra fotos de ambos sistemas
   - Filtrado por fuente de almacenamiento
   - URLs optimizadas automáticamente

4. **Optimizaciones de Cloudinary**
   - Compresión automática
   - Formatos adaptativos (WebP, AVIF)
   - Responsive images
   - CDN global

### 🔄 Modos de Operación

#### Modo Cloudinary (Recomendado)
- ☁️ Almacenamiento en la nube
- 🚀 CDN global para carga rápida
- 📱 Optimización automática por dispositivo
- 🔧 Transformaciones en tiempo real

#### Modo Local (Fallback)
- 📁 Almacenamiento en servidor
- 🛠️ Compresión con Sharp
- 💾 Control total de archivos
- 🔒 Datos en tu infraestructura

#### Modo Híbrido (Por Defecto)
- 🎯 Lo mejor de ambos mundos
- ⚡ Cambio automático según disponibilidad
- 📊 Estadísticas de uso por fuente
- 🔄 Migración gradual de datos

## 🧪 Testing del Sistema

### 1. Verificar Configuración

```bash
# Verificar que las variables estén configuradas
echo $CLOUDINARY_CLOUD_NAME
echo $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# Verificar la conexión (desde el navegador)
# Ir a: https://res.cloudinary.com/[TU_CLOUD_NAME]/image/upload/sample.jpg
```

### 2. Test de Upload

1. Subir una foto usando el FotoUploader
2. Verificar el indicador de sistema (☁️ Cloudinary / 📁 Local)
3. Comprobar que aparece en la galería
4. Verificar las optimizaciones automáticas

### 3. Test de Fallback

1. Configurar mal el cloud name temporalmente
2. Intentar subir una foto
3. Verificar que cambia automáticamente al sistema local
4. Restaurar la configuración

## 🚨 Troubleshooting

### Error: "Cloudinary not configured"
- ✅ Verificar variables de entorno
- ✅ Comprobar que el preset existe
- ✅ Verificar que el preset es unsigned

### Error: "Upload failed"
- ✅ Verificar límites de tamaño de archivo
- ✅ Comprobar formatos permitidos
- ✅ Revisar logs del navegador

### Error: "Images not loading"
- ✅ Verificar CORS en Cloudinary
- ✅ Comprobar la URL de transformación
- ✅ Verificar que las imágenes existen

## 📊 Métricas Recomendadas

### KPIs del Sistema
- 📈 Tiempo de carga de imágenes
- 💾 Uso de bandwidth
- 🎯 Tasa de éxito de uploads
- 🔄 Distribución de uso (Local vs Cloud)

### Monitoreo de Cloudinary
- 📊 Transformaciones utilizadas
- 💰 Costos de usage
- 🌍 Distribución geográfica
- ⚡ Performance del CDN

## 🎨 Personalización

### Transformaciones Personalizadas
```javascript
// Ejemplo de transformación para eventos específicos
const weddingTransformation = 'w_800,h_600,c_fill,q_auto:good,f_auto,e_improve,e_auto_color';
```

### Metadatos Personalizados
```javascript
const metadata = {
  uploaderName: 'Juan Pérez',
  eventMoment: 'Ceremonia',
  uploadDate: new Date().toISOString(),
  eventId: 'boda-maribel-godofredo'
};
```

## 🚀 Próximos Pasos

### Fase 3: Optimizaciones Avanzadas
- [ ] Implementar caching inteligente
- [ ] Añadir progressive loading
- [ ] Optimizar para dispositivos móviles
- [ ] Implementar análisis de engagement

### Fase 4: Funcionalidades Avanzadas
- [ ] Reconocimiento facial (opcional)
- [ ] Tags automáticos con AI
- [ ] Filtros artísticos
- [ ] Compartir en redes sociales

---

## 📝 Notas de Desarrollo

**Versión Sistema:** Híbrido v1.0  
**Fecha:** Agosto 2025  
**Compatibilidad:** Next.js 15.2.4, Cloudinary v2  
**Status:** ✅ Producción Ready  

---

*💡 Tip: El sistema está diseñado para funcionar sin configuración de Cloudinary, pero las mejoras de performance son significativas cuando se configura correctamente.*
