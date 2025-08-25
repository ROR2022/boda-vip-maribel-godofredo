import { useState, useCallback, useRef } from 'react';
import { UploadState, UploaderFormData, UploadFile } from '../types/upload.types';
import { validateFileList, generateFileId } from '../utils/imageValidation';
import { ERROR_MESSAGES } from '@/components/sections/FotoUploader/constants/upload.constants';

/**
 * Hook híbrido para manejo de subida de archivos
 * Combina Cloudinary y sistema original con fallback automático
 */
export const useHybridUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    files: [],
    uploading: false,
    progress: 0,
    error: null,
    success: false
  });

  const [systemType, setSystemType] = useState<'cloudinary' | 'original' | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Sube archivos usando Cloudinary
   */
  const uploadWithCloudinary = useCallback(async (
    filesToUpload: UploadFile[],
    formData?: UploaderFormData
  ): Promise<boolean> => {
    try {
      console.log('🌩️ Attempting Cloudinary upload...');
      
      const uploadFormData = new FormData();
      
      // Agregar archivos con el nombre correcto que espera la API
      filesToUpload.forEach((fileObj) => {
        uploadFormData.append('files', fileObj.file); // Cambiado de 'file' a 'files'
      });

      // Agregar metadatos opcionales
      if (formData?.uploaderName) {
        uploadFormData.append('uploaderName', formData.uploaderName);
      }
      if (formData?.userName) {
        uploadFormData.append('userName', formData.userName);
      }
      if (formData?.eventMoment) {
        uploadFormData.append('eventMoment', formData.eventMoment);
      }
      if (formData?.comment) {
        uploadFormData.append('comment', formData.comment);
      }

      const response = await fetch('/api/upload-fotos-cloudinary', {
        method: 'POST',
        body: uploadFormData,
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Cloudinary upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Cloudinary upload successful:', result);
      return true;

    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      return false;
    }
  }, []);

  /**
   * Sube archivos usando el sistema original
   */
  const uploadWithOriginal = useCallback(async (
    filesToUpload: UploadFile[],
    formData?: UploaderFormData
  ): Promise<boolean> => {
    try {
      console.log('📁 Using original upload system...');
      
      const uploadFormData = new FormData();
      
      // Agregar archivos
      filesToUpload.forEach((fileObj) => {
        uploadFormData.append('files', fileObj.file);
      });

      // Agregar metadatos opcionales
      if (formData?.uploaderName) {
        uploadFormData.append('uploaderName', formData.uploaderName);
      }
      if (formData?.userName) {
        uploadFormData.append('userName', formData.userName);
      }
      if (formData?.eventMoment) {
        uploadFormData.append('eventMoment', formData.eventMoment);
      }
      if (formData?.comment) {
        uploadFormData.append('comment', formData.comment);
      }

      const response = await fetch('/api/upload-fotos', {
        method: 'POST',
        body: uploadFormData,
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Original upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Original upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Original upload successful:', result);
      return true;

    } catch (error) {
      console.error('❌ Original upload error:', error);
      return false;
    }
  }, []);

  /**
   * Detecta automáticamente el sistema de subida disponible
   */
  const detectUploadSystem = useCallback(async (): Promise<'cloudinary' | 'original'> => {
    try {
      // Verificar si Cloudinary está configurado
      const cloudinaryResponse = await fetch('/api/upload-fotos-cloudinary', {
        method: 'GET'
      });
      
      if (cloudinaryResponse.status === 405) {
        // Método no permitido significa que el endpoint existe
        console.log('☁️ Cloudinary system detected and available');
        return 'cloudinary';
      }
    } catch (error) {
      console.log('📁 Cloudinary not available, using original system');
    }

    return 'original';
  }, []);

  /**
   * Función principal de subida con sistema híbrido
   */
  const uploadFiles = useCallback(async (
    files: FileList | File[],
    formData?: UploaderFormData
  ) => {
    // Reiniciar estado
    setUploadState({
      files: [],
      uploading: true,
      progress: 0,
      error: null,
      success: false
    });

    // Crear AbortController para esta subida
    abortControllerRef.current = new AbortController();

    try {
      // Validar archivos
      const fileArray = Array.from(files);
      
      // Crear FileList mock para validación
      const fileList = {
        ...fileArray,
        item: (index: number) => fileArray[index] || null
      } as FileList;
      
      const validation = validateFileList(fileList);
      
      if (!validation.valid) {
        throw new Error(validation.error || 'Error de validación');
      }

      // Preparar archivos para subida
      const filesToUpload: UploadFile[] = fileArray.map(file => ({
        file,
        id: generateFileId(file),
        preview: URL.createObjectURL(file),
        status: 'pending' as const,
        progress: 0
      }));

      // Actualizar estado con archivos preparados
      setUploadState(prev => ({
        ...prev,
        files: filesToUpload
      }));

      // Detectar sistema disponible
      const detectedSystemType = await detectUploadSystem();
      setSystemType(detectedSystemType);

      let uploadSuccess = false;

      // Intentar subida con Cloudinary primero
      if (detectedSystemType === 'cloudinary') {
        console.log('🌩️ Attempting Cloudinary upload...');
        uploadSuccess = await uploadWithCloudinary(filesToUpload, formData);
        
        // Si Cloudinary falla, hacer fallback al sistema original
        if (!uploadSuccess) {
          console.log('⚠️ Cloudinary failed, falling back to original system...');
          setSystemType('original');
          uploadSuccess = await uploadWithOriginal(filesToUpload, formData);
        }
      } else {
        // Usar sistema original directamente
        console.log('📁 Using original system directly...');
        uploadSuccess = await uploadWithOriginal(filesToUpload, formData);
      }

      if (uploadSuccess) {
        setUploadState(prev => ({
          ...prev,
          uploading: false,
          success: true,
          progress: 100
        }));
      } else {
        throw new Error('All upload systems failed');
      }

      // Limpiar URLs de preview
      filesToUpload.forEach(fileObj => {
        URL.revokeObjectURL(fileObj.preview);
      });

    } catch (error) {
      console.error('❌ Upload error:', error);
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        success: false
      }));
    }
  }, [uploadWithCloudinary, uploadWithOriginal, detectUploadSystem]);

  /**
   * Cancela la subida en progreso
   */
  const cancelUpload = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setUploadState(prev => ({
      ...prev,
      uploading: false,
      error: 'Subida cancelada por el usuario',
      success: false
    }));
  }, []);

  /**
   * Reinicia el estado del hook
   */
  const resetUpload = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setUploadState({
      files: [],
      uploading: false,
      progress: 0,
      error: null,
      success: false
    });
    
    setSystemType(null);
  }, []);

  /**
   * Funciones para cambio manual de sistema (desarrollo)
   */
  const switchToOriginal = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      setSystemType('original');
    }
  }, []);

  const switchToCloudinary = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      setSystemType('cloudinary');
    }
  }, []);

  return {
    uploadState,
    systemType,
    uploadFiles,
    cancelUpload,
    resetUpload,
    // Funciones de desarrollo
    switchToOriginal,
    switchToCloudinary
  };
};
