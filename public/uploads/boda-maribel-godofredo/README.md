# 📸 Sistema de Storage - Fotos de Boda VIP

## 📁 Estructura de Directorios

```
public/uploads/boda-maribel-godofredo/
├── fotos/                          # Fotos organizadas por fecha
│   └── YYYY-MM-DD/                 # Carpeta por día de upload
│       ├── original/               # Archivos originales sin modificar
│       └── compressed/             # Versiones comprimidas (.webp)
├── thumbnails/                     # Miniaturas para preview
│   └── YYYY-MM-DD/                 # Organizadas por fecha
├── metadata/                       # Metadatos y registros
│   └── uploads.json               # Registro de todos los uploads
└── logs/                          # Logs del sistema
    └── upload-history.log         # Historial de uploads
```

## 📋 Formato de Metadata

### uploads.json
```json
[
  {
    "id": "upload_1724518800000_abc123def",
    "timestamp": "2025-08-24T15:00:00.000Z",
    "date": "2025-08-24",
    "uploaderName": "María González",
    "eventMoment": "Durante la ceremonia",
    "comment": "Momento especial del intercambio de anillos",
    "totalFiles": 3,
    "totalSize": 15728640,
    "userAgent": "Mozilla/5.0...",
    "files": [
      {
        "id": "1724518800000_xyz789abc_imagen1",
        "originalName": "IMG_20250824_150000.jpg",
        "fileName": "1724518800000_xyz789abc_img_20250824_150000.jpg",
        "size": 5242880,
        "type": "image/jpeg",
        "uploadedAt": "2025-08-24T15:00:30.000Z",
        "uploaderName": "María González",
        "eventMoment": "Durante la ceremonia", 
        "comment": "Momento especial del intercambio de anillos",
        "paths": {
          "original": "/uploads/boda-maribel-godofredo/fotos/2025-08-24/original/1724518800000_xyz789abc_img_20250824_150000.jpg",
          "compressed": "/uploads/boda-maribel-godofredo/fotos/2025-08-24/compressed/1724518800000_xyz789abc_img_20250824_150000.webp",
          "thumbnail": "/uploads/boda-maribel-godofredo/thumbnails/2025-08-24/1724518800000_xyz789abc_img_20250824_150000_thumb.webp"
        }
      }
    ]
  }
]
```

## 🔧 Configuración del Sistema

### Límites y Restricciones
- **Formatos permitidos**: JPG, PNG, WEBP
- **Tamaño máximo por archivo**: 10MB
- **Máximo archivos por upload**: 10
- **Dimensiones máximas**: 2000x2000px
- **Calidad de compresión**: 85%

### Procesamiento Automático
1. **Validación**: Verificar formato y tamaño
2. **Almacenamiento original**: Guardar archivo sin modificar
3. **Compresión**: Crear versión optimizada en WEBP
4. **Thumbnail**: Generar miniatura 300x300px
5. **Metadata**: Registrar información del upload
6. **Logging**: Registrar actividad en logs

## 🚀 Endpoints API

### POST /api/upload-fotos
Sube nuevas fotos al sistema

**Body (multipart/form-data):**
- `file`: File[] - Archivos a subir
- `uploaderName`: string (opcional) - Nombre del usuario
- `userName`: string (opcional) - Alias del usuario  
- `eventMoment`: string (opcional) - Momento del evento
- `comment`: string (opcional) - Comentario adicional

**Respuesta:**
```json
{
  "success": true,
  "message": "3 fotos subidas exitosamente",
  "data": {
    "uploadId": "upload_1724518800000_abc123def",
    "totalFiles": 3,
    "files": [...],
    "timestamp": "2025-08-24T15:00:00.000Z"
  }
}
```

### GET /api/fotos-galeria
Obtiene fotos de la galería colaborativa

**Query Parameters:**
- `page`: number (default: 1) - Página de resultados
- `limit`: number (default: 50) - Fotos por página
- `eventMoment`: string (opcional) - Filtrar por momento
- `uploader`: string (opcional) - Filtrar por uploader

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "photos": [...],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 25,
      "pages": 1,
      "hasNext": false,
      "hasPrev": false
    },
    "stats": {
      "totalPhotos": 25,
      "totalUploads": 8,
      "uploaders": ["María", "Juan", "Anonymous"],
      "eventMoments": ["Antes", "Durante", "Después"]
    }
  }
}
```

## 🔒 Seguridad

### Validaciones Implementadas
- **Tipo MIME**: Verificación estricta de formatos
- **Tamaño de archivo**: Límite de 10MB por archivo
- **Cantidad de archivos**: Máximo 10 por upload
- **Sanitización**: Nombres de archivo limpiados
- **Timeout**: Límite de tiempo por upload

### Consideraciones de Storage
- Los archivos se almacenan en `public/uploads/` y son accesibles vía web
- Las rutas son predecibles pero contienen timestamps y randoms
- No hay autenticación requerida para visualizar (diseño intencional)
- Los logs registran IP y User-Agent para tracking básico

## 🎯 Casos de Uso

### Upload de Invitados
1. Invitado accede a la sección FotoUploader
2. Selecciona fotos de su dispositivo
3. Opcionalmente agrega su nombre y comentario
4. Sistema procesa y almacena automáticamente
5. Fotos aparecen en la galería colaborativa

### Visualización en Galería
1. Sistema consulta `/api/fotos-galeria`
2. Muestra fotos mezcladas con galería principal
3. Permite filtrar por momento del evento
4. Muestra atribución al uploader

## 📊 Mantenimiento

### Limpieza Automática (Futuro)
- Implementar limpieza de archivos antiguos
- Comprimir logs periódicamente
- Optimizar metadata para mejor performance

### Monitoreo
- Revisar logs de upload regularmente
- Monitorear uso de disco
- Verificar integridad de archivos almacenados

---

**Creado**: 2025-08-24  
**Versión**: 1.0  
**Sistema**: Boda VIP Maribel & Godofredo
