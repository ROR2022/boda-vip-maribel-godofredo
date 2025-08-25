// 🖼️ useHybridGallery - Hook híbrido para mostrar fotos de ambos sistemas
// Combina fotos del sistema original y Cloudinary en una sola galería

import { useState, useCallback, useEffect } from 'react';

// Interfaces para la galería híbrida
interface HybridPhoto {
  id: string;
  originalName: string;
  uploaderName: string;
  uploadedAt: string;
  size: number;
  eventMoment: string;
  comment?: string;
  // Paths para sistema original
  paths?: {
    original: string;
    compressed?: string;
    thumbnail?: string;
  };
  // Datos de Cloudinary
  cloudinaryId?: string;
  cloudinaryUrl?: string;
  source: 'original' | 'cloudinary'; // Indicador del sistema de origen
}

interface HybridGalleryStats {
  totalPhotos: number;
  uploaders: string[];
  eventMoments: string[];
  sourceBreakdown: {
    original: number;
    cloudinary: number;
  };
}

interface HybridGalleryFilters {
  eventMoment: string;
  uploader: string;
  source: 'all' | 'original' | 'cloudinary';
}

interface HybridGalleryPagination {
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

interface HybridGalleryState {
  photos: HybridPhoto[];
  loading: boolean;
  error: string | null;
  stats: HybridGalleryStats | null;
  pagination: HybridGalleryPagination | null;
  filters: HybridGalleryFilters;
}

/**
 * Hook para manejar galería híbrida (Original + Cloudinary)
 */
export const useHybridGallery = () => {
  const [state, setState] = useState<HybridGalleryState>({
    photos: [],
    loading: false,
    error: null,
    stats: null,
    pagination: null,
    filters: {
      eventMoment: 'all',
      uploader: 'all',
      source: 'all'
    }
  });

  /**
   * Obtiene fotos del sistema original
   */
  const fetchOriginalPhotos = useCallback(async (): Promise<HybridPhoto[]> => {
    try {
      const response = await fetch('/api/fotos-galeria', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Convertir a formato híbrido
      return (data.photos || []).map((photo: any): HybridPhoto => ({
        id: `original-${photo.id}`,
        originalName: photo.originalName,
        uploaderName: photo.uploaderName || 'Invitado',
        uploadedAt: photo.uploadedAt,
        size: photo.size,
        eventMoment: photo.eventMoment || 'General',
        comment: photo.comment,
        paths: photo.paths,
        source: 'original' as const
      }));
    } catch (error) {
      console.error('Error fetching original photos:', error);
      return [];
    }
  }, []);

  /**
   * Obtiene fotos de Cloudinary
   */
  const fetchCloudinaryPhotos = useCallback(async (): Promise<HybridPhoto[]> => {
    try {
      const response = await fetch('/api/fotos-galeria-cloudinary', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Convertir a formato híbrido
      return (data.photos || []).map((photo: any): HybridPhoto => ({
        id: `cloudinary-${photo.cloudinaryId}`,
        originalName: photo.originalName,
        uploaderName: photo.uploaderName || 'Invitado',
        uploadedAt: photo.uploadedAt,
        size: photo.size,
        eventMoment: photo.eventMoment || 'General',
        comment: photo.comment,
        cloudinaryId: photo.cloudinaryId,
        cloudinaryUrl: photo.cloudinaryUrl,
        source: 'cloudinary' as const
      }));
    } catch (error) {
      console.error('Error fetching Cloudinary photos:', error);
      return [];
    }
  }, []);

  /**
   * Construye estadísticas de la galería híbrida
   */
  const buildStats = useCallback((photos: HybridPhoto[]): HybridGalleryStats => {
    const uploaders = [...new Set(photos.map(p => p.uploaderName))];
    const eventMoments = [...new Set(photos.map(p => p.eventMoment))];
    
    const sourceBreakdown = photos.reduce(
      (acc, photo) => {
        acc[photo.source]++;
        return acc;
      },
      { original: 0, cloudinary: 0 }
    );

    return {
      totalPhotos: photos.length,
      uploaders,
      eventMoments,
      sourceBreakdown
    };
  }, []);

  /**
   * Aplica filtros a las fotos
   */
  const applyFilters = useCallback((photos: HybridPhoto[], filters: HybridGalleryFilters): HybridPhoto[] => {
    return photos.filter(photo => {
      // Filtro por momento del evento
      if (filters.eventMoment !== 'all' && photo.eventMoment !== filters.eventMoment) {
        return false;
      }

      // Filtro por uploader
      if (filters.uploader !== 'all' && photo.uploaderName !== filters.uploader) {
        return false;
      }

      // Filtro por fuente
      if (filters.source !== 'all' && photo.source !== filters.source) {
        return false;
      }

      return true;
    });
  }, []);

  /**
   * Carga fotos de ambos sistemas y las combina
   */
  const loadPhotos = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Obtener fotos de ambos sistemas en paralelo
      const [originalPhotos, cloudinaryPhotos] = await Promise.all([
        fetchOriginalPhotos(),
        fetchCloudinaryPhotos()
      ]);

      // Combinar todas las fotos
      const allPhotos = [...originalPhotos, ...cloudinaryPhotos];
      
      // Ordenar por fecha de subida (más reciente primero)
      allPhotos.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

      // Aplicar filtros
      const filteredPhotos = applyFilters(allPhotos, state.filters);

      // Construir estadísticas
      const stats = buildStats(allPhotos);

      // TODO: Implementar paginación si es necesario
      const pagination: HybridGalleryPagination = {
        page: 1,
        pages: 1,
        hasNext: false,
        hasPrev: false,
        total: filteredPhotos.length
      };

      setState(prev => ({
        ...prev,
        photos: filteredPhotos,
        stats,
        pagination,
        loading: false
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido al cargar fotos'
      }));
    }
  }, [fetchOriginalPhotos, fetchCloudinaryPhotos, state.filters, applyFilters, buildStats]);

  /**
   * Actualiza filtros y recarga fotos
   */
  const setFilters = useCallback((newFilters: Partial<HybridGalleryFilters>) => {
    setState(prev => {
      const updatedFilters = { ...prev.filters, ...newFilters };
      return { ...prev, filters: updatedFilters };
    });
  }, []);

  /**
   * Refresca la galería
   */
  const refresh = useCallback(() => {
    loadPhotos();
  }, [loadPhotos]);

  /**
   * Obtiene la URL optimizada para mostrar una foto
   */
  const getPhotoDisplayUrl = useCallback((photo: HybridPhoto, size: 'thumbnail' | 'compressed' | 'original' = 'compressed'): string => {
    if (photo.source === 'cloudinary' && photo.cloudinaryId) {
      // Construir URL de Cloudinary con transformaciones
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        console.warn('Cloudinary cloud name not configured');
        return '/placeholder.jpg';
      }

      const transformations = {
        thumbnail: 'w_200,h_200,c_fill,q_auto:good,f_auto',
        compressed: 'w_800,h_600,c_fit,q_auto:good,f_auto',
        original: 'q_auto:best,f_auto'
      };

      return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations[size]}/${photo.cloudinaryId}`;
    } else {
      // Usar sistema original
      return photo.paths?.[size] || photo.paths?.original || '/placeholder.jpg';
    }
  }, []);

  // Cargar fotos al montar y cuando cambien los filtros
  useEffect(() => {
    loadPhotos();
  }, [state.filters.eventMoment, state.filters.uploader, state.filters.source]);

  return {
    photos: state.photos,
    loading: state.loading,
    error: state.error,
    stats: state.stats,
    pagination: state.pagination,
    filters: state.filters,
    setFilters,
    refresh,
    getPhotoDisplayUrl
  };
};
