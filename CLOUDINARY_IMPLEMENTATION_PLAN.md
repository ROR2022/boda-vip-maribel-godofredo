# 🚀 Plan de Implementación Detallado: Migración a Cloudinary

## 📋 **Resumen Ejecutivo**

Este plan detalla la migración completa del sistema de almacenamiento de imágenes desde el filesystem local de Vercel hacia Cloudinary, manteniendo toda la funcionalidad existente mientras se mejora la performance, confiabilidad y escalabilidad.

---

## 🎯 **Objetivos del Proyecto**

### **Objetivos Primarios**
- ✅ Eliminar dependencia de Sharp y problemas de despliegue
- ✅ Almacenamiento persistente y confiable de imágenes
- ✅ Mejorar performance con CDN global
- ✅ Mantener toda la funcionalidad existente

### **Objetivos Secundarios**
- 🎨 Agregar transformaciones avanzadas de imagen
- 📱 Optimización automática por dispositivo
- 🔍 Funcionalidades de zoom y visualización mejorada
- 📊 Analytics de uso de imágenes

---

## ⏱️ **Timeline del Proyecto**

| Fase | Duración | Descripción |
|------|----------|-------------|
| **Fase 1** | 1 día | Configuración inicial y setup |
| **Fase 2** | 2 días | Migración del backend API |
| **Fase 3** | 2 días | Actualización del frontend |
| **Fase 4** | 1 día | Testing y optimización |
| **Fase 5** | 1 día | Despliegue y monitoreo |
| **Total** | **7 días** | Implementación completa |

---

## 📦 **Fase 1: Configuración Inicial (Día 1)**

### **1.1 Setup de Cloudinary**
```bash
# Crear cuenta en cloudinary.com
# Plan recomendado: Free tier (25GB/25K transformaciones)
```

**Tareas:**
- [ ] Crear cuenta en Cloudinary
- [ ] Configurar cloud name único
- [ ] Obtener API credentials
- [ ] Configurar upload presets
- [ ] Definir estructura de carpetas

### **1.2 Instalación de Dependencias**
```bash
npm install cloudinary
npm install @types/cloudinary # Para TypeScript
```

### **1.3 Configuración de Variables de Entorno**
```env
# .env.local
CLOUDINARY_CLOUD_NAME=boda-vip-maribel-godofredo
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
CLOUDINARY_UPLOAD_PRESET=boda_vip_preset

# .env.example (para documentación)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### **1.4 Configuración de Upload Preset en Cloudinary**
```json
{
  "name": "boda_vip_preset",
  "unsigned": false,
  "folder": "boda-maribel-godofredo",
  "transformation": [
    {
      "quality": "auto:good",
      "fetch_format": "auto"
    }
  ],
  "allowed_formats": ["jpg", "jpeg", "png", "webp"],
  "max_file_size": 10000000,
  "tags": ["boda", "invitados", "maribel-godofredo"]
}
```

---

## 🔧 **Fase 2: Migración del Backend (Días 2-3)**

### **2.1 Crear Utilidad de Cloudinary**
**Archivo:** `lib/cloudinary.ts`
```typescript
import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Tipos para TypeScript
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
}

// Configuraciones de transformación
export const TRANSFORMATIONS = {
  thumbnail: { width: 300, height: 300, crop: 'fill', quality: 'auto:good' },
  compressed: { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' },
  gallery: { width: 800, height: 600, crop: 'fit', quality: 'auto:good' },
};
```

### **2.2 Crear Nuevas Funciones de Upload**
**Archivo:** `lib/uploadToCloudinary.ts`
```typescript
import cloudinary, { CloudinaryUploadResult, TRANSFORMATIONS } from './cloudinary';

export interface UploadOptions {
  folder?: string;
  tags?: string[];
  context?: Record<string, string>;
  transformation?: object;
}

export const uploadImageToCloudinary = async (
  buffer: Buffer,
  fileName: string,
  options: UploadOptions = {}
): Promise<{
  original: CloudinaryUploadResult;
  compressed: string;
  thumbnail: string;
}> => {
  try {
    // Upload original
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: `${options.folder || 'uploads'}/${Date.now()}_${fileName}`,
          tags: options.tags || [],
          context: options.context || {},
          transformation: options.transformation,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryUploadResult);
        }
      ).end(buffer);
    });

    // Generar URLs con transformaciones
    const compressedUrl = cloudinary.url(uploadResult.public_id, TRANSFORMATIONS.compressed);
    const thumbnailUrl = cloudinary.url(uploadResult.public_id, TRANSFORMATIONS.thumbnail);

    return {
      original: uploadResult,
      compressed: compressedUrl,
      thumbnail: thumbnailUrl,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};
```

### **2.3 Migrar API Route de Upload**
**Archivo:** `app/api/upload-fotos-cloudinary/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '@/lib/uploadToCloudinary';

// Configuración
const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxFiles: 10,
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    // Validaciones
    if (!files || files.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No files provided' 
      }, { status: 400 });
    }

    if (files.length > UPLOAD_CONFIG.maxFiles) {
      return NextResponse.json({ 
        success: false, 
        message: `Maximum ${UPLOAD_CONFIG.maxFiles} files allowed` 
      }, { status: 400 });
    }

    // Procesar archivos
    const uploadResults = [];
    for (const file of files) {
      // Validar tipo de archivo
      if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} not allowed`);
      }

      // Validar tamaño
      if (file.size > UPLOAD_CONFIG.maxFileSize) {
        throw new Error(`File ${file.name} exceeds maximum size`);
      }

      // Convertir a buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Upload a Cloudinary
      const result = await uploadImageToCloudinary(buffer, file.name, {
        folder: 'boda-maribel-godofredo',
        tags: ['boda', 'invitados'],
        context: {
          uploaderName: formData.get('uploaderName') as string || 'Anonymous',
          eventMoment: formData.get('eventMoment') as string || 'general',
          uploadDate: new Date().toISOString(),
        },
      });

      uploadResults.push({
        originalName: file.name,
        size: file.size,
        type: file.type,
        cloudinaryId: result.original.public_id,
        urls: {
          original: result.original.secure_url,
          compressed: result.compressed,
          thumbnail: result.thumbnail,
        },
        metadata: {
          width: result.original.width,
          height: result.original.height,
          format: result.original.format,
        },
      });
    }

    // Guardar metadata (opcional)
    await saveUploadMetadata({
      uploadId: Date.now().toString(),
      files: uploadResults,
      uploaderName: formData.get('uploaderName') as string,
      eventMoment: formData.get('eventMoment') as string,
      comment: formData.get('comment') as string,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `${uploadResults.length} files uploaded successfully`,
      data: {
        uploadId: Date.now().toString(),
        files: uploadResults,
        totalFiles: uploadResults.length,
        totalSize: uploadResults.reduce((sum, file) => sum + file.size, 0),
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Upload failed',
    }, { status: 500 });
  }
}

// Función auxiliar para guardar metadata
async function saveUploadMetadata(metadata: any) {
  // Implementar según necesidades (JSON file, database, etc.)
  console.log('Upload metadata:', metadata);
}
```

### **2.4 Migrar API Route de Galería**
**Archivo:** `app/api/fotos-galeria-cloudinary/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const eventMoment = searchParams.get('eventMoment');
    const uploader = searchParams.get('uploader');

    // Construir query para Cloudinary
    let expression = 'folder:boda-maribel-godofredo AND resource_type:image';
    
    if (eventMoment && eventMoment !== 'all') {
      expression += ` AND context.eventMoment:${eventMoment}`;
    }
    
    if (uploader && uploader !== 'all') {
      expression += ` AND context.uploaderName:${uploader}`;
    }

    // Buscar en Cloudinary
    const result = await cloudinary.search
      .expression(expression)
      .sort_by([['created_at', 'desc']])
      .max_results(limit)
      .with_field('context')
      .with_field('tags')
      .execute();

    // Formatear resultados
    const photos = result.resources.map((resource: any) => ({
      id: resource.public_id,
      originalName: resource.filename || 'unknown',
      cloudinaryId: resource.public_id,
      uploadedAt: resource.created_at,
      uploaderName: resource.context?.uploaderName || 'Anonymous',
      eventMoment: resource.context?.eventMoment || 'general',
      comment: resource.context?.comment || '',
      size: resource.bytes,
      type: `image/${resource.format}`,
      urls: {
        original: resource.secure_url,
        compressed: cloudinary.url(resource.public_id, { 
          width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' 
        }),
        thumbnail: cloudinary.url(resource.public_id, { 
          width: 300, height: 300, crop: 'fill', quality: 'auto:good' 
        }),
      },
      metadata: {
        width: resource.width,
        height: resource.height,
        format: resource.format,
      },
    }));

    return NextResponse.json({
      success: true,
      data: {
        photos,
        pagination: {
          page,
          limit,
          total: result.total_count,
          pages: Math.ceil(result.total_count / limit),
          hasNext: page * limit < result.total_count,
          hasPrev: page > 1,
        },
        stats: {
          totalPhotos: result.total_count,
          filteredPhotos: photos.length,
        },
      },
    });

  } catch (error) {
    console.error('Gallery error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to load gallery',
    }, { status: 500 });
  }
}
```

---

## 🎨 **Fase 3: Actualización del Frontend (Días 4-5)**

### **3.1 Actualizar Hook de Upload**
**Archivo:** `components/sections/FotoUploader/hooks/useCloudinaryUpload.ts`
```typescript
import { useState, useCallback } from 'react';

interface CloudinaryUploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
  uploadedFiles: any[];
}

export const useCloudinaryUpload = () => {
  const [state, setState] = useState<CloudinaryUploadState>({
    uploading: false,
    progress: 0,
    error: null,
    success: false,
    uploadedFiles: [],
  });

  const uploadFiles = useCallback(async (files: File[], metadata: any) => {
    setState(prev => ({ ...prev, uploading: true, error: null, progress: 0 }));

    try {
      const formData = new FormData();
      
      files.forEach(file => formData.append('files', file));
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const xhr = new XMLHttpRequest();
      
      // Progress tracking
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setState(prev => ({ ...prev, progress }));
        }
      });

      const response = await new Promise<Response>((resolve, reject) => {
        xhr.onload = () => resolve(new Response(xhr.response));
        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.open('POST', '/api/upload-fotos-cloudinary');
        xhr.send(formData);
      });

      const result = await response.json();

      if (result.success) {
        setState(prev => ({
          ...prev,
          uploading: false,
          success: true,
          uploadedFiles: result.data.files,
          progress: 100,
        }));
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      setState(prev => ({
        ...prev,
        uploading: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      uploading: false,
      progress: 0,
      error: null,
      success: false,
      uploadedFiles: [],
    });
  }, []);

  return {
    ...state,
    uploadFiles,
    reset,
  };
};
```

### **3.2 Actualizar Hook de Galería**
**Archivo:** `components/sections/DinamicGallery/hooks/useCloudinaryGallery.ts`
```typescript
import { useState, useEffect, useCallback } from 'react';

export interface CloudinaryPhoto {
  id: string;
  originalName: string;
  cloudinaryId: string;
  uploadedAt: string;
  uploaderName: string;
  eventMoment: string;
  comment: string;
  size: number;
  type: string;
  urls: {
    original: string;
    compressed: string;
    thumbnail: string;
  };
  metadata: {
    width: number;
    height: number;
    format: string;
  };
}

// Resto de la implementación similar al hook actual
// pero usando los nuevos endpoints de Cloudinary
```

### **3.3 Crear Componente de Imagen Optimizada**
**Archivo:** `components/CloudinaryImage.tsx`
```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CloudinaryImageProps {
  cloudinaryId: string;
  alt: string;
  width?: number;
  height?: number;
  transformation?: string;
  className?: string;
  priority?: boolean;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  cloudinaryId,
  alt,
  width = 800,
  height = 600,
  transformation,
  className,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  const transformationString = transformation || `w_${width},h_${height},c_fit,q_auto,f_auto`;
  const imageUrl = `${baseUrl}/${transformationString}/${cloudinaryId}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {error ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
};
```

---

## 🧪 **Fase 4: Testing y Optimización (Día 6)**

### **4.1 Plan de Testing**

#### **Testing Unitario**
- [ ] Funciones de upload a Cloudinary
- [ ] Transformaciones de imagen
- [ ] Validaciones de archivos
- [ ] Manejo de errores

#### **Testing de Integración**
- [ ] Flow completo de upload
- [ ] Galería con filtros
- [ ] Performance de carga
- [ ] Fallbacks en caso de errores

#### **Testing de Performance**
- [ ] Tiempo de carga de imágenes
- [ ] Optimización de transformaciones
- [ ] CDN performance
- [ ] Responsive images

### **4.2 Optimizaciones**

#### **Frontend Optimizations**
```typescript
// Lazy loading avanzado
const useIntersectionObserver = (threshold = 0.1) => {
  // Implementation
};

// Image preloading
const preloadImages = (imageUrls: string[]) => {
  // Implementation
};

// Progressive loading
const useProgressiveImage = (src: string, placeholder: string) => {
  // Implementation
};
```

#### **Backend Optimizations**
- Configurar auto-tagging en Cloudinary
- Implementar caching de metadata
- Optimizar queries de búsqueda
- Configurar webhooks para sincronización

---

## 🚀 **Fase 5: Despliegue y Monitoreo (Día 7)**

### **5.1 Preparación para Despliegue**

#### **Variables de Entorno en Vercel**
```bash
# Configurar en Vercel Dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=boda_vip_preset
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

#### **Actualizar next.config.mjs**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... configuración existente
  images: {
    domains: ['res.cloudinary.com'],
    // Remover unoptimized: true para usar Next.js Image optimization
  },
  // Remover serverExternalPackages: ['sharp'] ya no es necesario
};
```

### **5.2 Plan de Migración**

#### **Estrategia de Blue-Green Deployment**
1. **Mantener endpoints actuales** funcionando
2. **Desplegar nuevos endpoints** de Cloudinary
3. **Testing en producción** con usuarios limitados
4. **Switch gradual** de usuarios
5. **Deprecar endpoints antiguos** una vez confirmado

#### **Migration Script** (opcional)
```typescript
// scripts/migrateToCloudinary.ts
// Script para migrar imágenes existentes a Cloudinary
// si hay datos importantes que preservar
```

### **5.3 Monitoreo y Analytics**

#### **Métricas a Monitorear**
- [ ] Tiempo de upload promedio
- [ ] Tasa de éxito de uploads
- [ ] Performance de carga de galería
- [ ] Uso de bandwidth de Cloudinary
- [ ] Errores y excepciones

#### **Dashboard de Cloudinary**
- Configurar alertas de uso
- Monitorear transformaciones
- Revisar reports de performance

---

## 📚 **Documentación y Capacitación**

### **6.1 Documentación Técnica**
- [ ] README actualizado con nuevas variables de entorno
- [ ] Documentación de APIs de Cloudinary
- [ ] Guía de troubleshooting
- [ ] Guía de optimización de imágenes

### **6.2 Documentación de Usuario**
- [ ] Guía para invitados sobre upload de fotos
- [ ] Límites y recomendaciones de archivos
- [ ] FAQ sobre funcionalidades de la galería

---

## 💰 **Estimación de Costos**

### **Desarrollo**
- **7 días de desarrollo** × tu tarifa diaria

### **Operación (mensual)**
- **Plan Gratuito Cloudinary**: $0 (hasta 25GB/25K transformaciones)
- **Plan Paid** (si excede): Desde $99/mes
- **Estimado para una boda**: Dentro del plan gratuito

### **ROI Estimado**
- **Eliminación de problemas de Sharp**: Invaluable
- **Mejor performance**: Mayor satisfacción de usuarios
- **Escalabilidad**: Preparado para múltiples bodas

---

## ✅ **Checklist de Finalización**

### **Backend**
- [ ] Cloudinary configurado y funcionando
- [ ] APIs de upload migradas
- [ ] APIs de galería migradas
- [ ] Validaciones implementadas
- [ ] Manejo de errores completo

### **Frontend**
- [ ] Componentes actualizados para Cloudinary
- [ ] Hooks migrados
- [ ] Optimizaciones de performance
- [ ] UI/UX mantenido o mejorado

### **Testing**
- [ ] Tests unitarios pasando
- [ ] Tests de integración pasando
- [ ] Performance testing completado
- [ ] Testing en dispositivos móviles

### **Despliegue**
- [ ] Variables de entorno configuradas
- [ ] Despliegue en Vercel exitoso
- [ ] Monitoring configurado
- [ ] Documentación completada

### **Post-Despliegue**
- [ ] Smoke tests en producción
- [ ] Monitoreo de errores activo
- [ ] Feedback de usuarios recopilado
- [ ] Optimizaciones post-launch implementadas

---

## 🆘 **Plan de Contingencia**

### **Si Cloudinary falla durante el evento:**
1. **Rollback rápido** a la versión anterior
2. **Endpoints de fallback** usando filesystem
3. **Notificación inmediata** a usuarios
4. **Plan de recuperación** de datos

### **Si se excede el plan gratuito:**
1. **Monitoring de uso** en tiempo real
2. **Alertas automáticas** al 80% de límite
3. **Plan de upgrade** pre-autorizado
4. **Optimización** de transformaciones

---

## 📞 **Contactos y Recursos**

### **Recursos Técnicos**
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/api-reference/next/image)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

### **Soporte**
- **Cloudinary Support**: support@cloudinary.com
- **Vercel Support**: support@vercel.com

---

*Este plan puede ajustarse según los requerimientos específicos y feedback durante la implementación.*
