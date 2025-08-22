# 🎵 Audio Directory

## Archivo Requerido

Para que el reproductor de audio funcione correctamente, necesitas colocar tu archivo de música en esta carpeta:

**Archivo esperado:** `musica.mp3`

### Especificaciones del Audio

- **Formato:** MP3 (recomendado para compatibilidad web)
- **Rango de reproducción:** 0:13 - 1:25 (configurado para loop automático)
- **Volumen:** 60% (configurable en `data/weddingData.js`)
- **Calidad recomendada:** 128-192 kbps para balance entre calidad y tamaño

### Configuración Actual

El sistema está configurado para:
- ✅ Activación manual (usuario debe hacer clic)
- ✅ Controles simples (solo play/pause)
- ✅ Posición fija (bottom-right)
- ✅ Animaciones sutiles
- ✅ Loop automático en rango específico
- ✅ Diseño responsivo

### Cómo Agregar tu Música

1. Coloca tu archivo MP3 en esta carpeta
2. Nómbralo exactamente: `musica.mp3`
3. El reproductor aparecerá automáticamente en la esquina inferior derecha
4. Los usuarios podrán activarlo manualmente

### Personalización

Para cambiar configuraciones, edita el archivo:
`data/weddingData.js` → sección `audio`
