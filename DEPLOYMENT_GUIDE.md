# 🚀 Instrucciones de Despliegue en Vercel

## Configuraciones aplicadas para Sharp en Vercel:

### 1. **Configuración de Next.js** ✅ YA APLICADO
- Agregado `serverComponentsExternalPackages: ['sharp']` en `next.config.mjs`
- Configurado `outputFileTracing: true` para optimizar el bundle

### 2. **Configuración de Vercel** ✅ YA APLICADO
- Creado `vercel.json` con tiempos extendidos para APIs de upload
- Configurado timeout de 60 segundos para procesamiento de imágenes

### 3. **Código defensivo** ✅ YA APLICADO
- Importación condicional de Sharp en las rutas API
- Fallback automático cuando Sharp no esté disponible

## 📋 Pasos para desplegar:

### Opción A: Desde la interfaz web de Vercel
1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Las configuraciones se aplicarán automáticamente

### Opción B: Desde CLI de Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio del proyecto
vercel

# Para producción
vercel --prod
```

## 🔧 Variables de entorno (si las necesitas):
En el dashboard de Vercel, agrega estas variables si planeas usar funcionalidades adicionales:
- `NEXT_PUBLIC_APP_URL`: URL de tu aplicación
- Cualquier otra API key que uses

## 🎯 Verificación post-despliegue:
1. Testa el upload de fotos: `/api/upload-fotos`
2. Testa la galería: `/api/fotos-galeria`
3. Verifica que las imágenes se muestren correctamente

## 🚨 Troubleshooting común:
- Si hay errores de Sharp, el sistema usará fallback automático
- Los archivos se guardarán sin compresión si Sharp falla
- Revisa los logs en el dashboard de Vercel para debugging

## 📝 Notas importantes:
- Vercel tiene límites de tamaño de archivo (10MB max por defecto)
- Los archivos se almacenan en el filesystem de Vercel (temporal)
- Para producción, considera usar almacenamiento externo como AWS S3 o Cloudinary
