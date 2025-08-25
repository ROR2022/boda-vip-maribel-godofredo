// 🖼️ API Endpoint - Galería de fotos desde Cloudinary
// GET /api/fotos-galeria-cloudinary

import { NextRequest, NextResponse } from 'next/server';
import cloudinary, { generateOptimizedUrl, validateCloudinaryConfig } from '@/lib/cloudinary';

// Interfaz para foto de la galería
interface GalleryPhoto {
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
    gallery: string;
    modal: string;
  };
  metadata: {
    width: number;
    height: number;
    format: string;
  };
}

// Interfaz para estadísticas de la galería
interface GalleryStats {
  totalPhotos: number;
  filteredPhotos: number;
  totalUploads: number;
  uploaders: string[];
  eventMoments: string[];
  lastUpdate: string | null;
  dateRange: {
    first: string | null;
    last: string | null;
  };
  totalSize: number;
}

// Interfaz para paginación
interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Función para construir la expresión de búsqueda de Cloudinary
const buildSearchExpression = (filters: {
  eventMoment?: string;
  uploader?: string;
  dateFrom?: string;
  dateTo?: string;
}): string => {
  let expression = 'folder:boda-maribel-godofredo AND resource_type:image';
  
  // Filtrar por momento del evento
  if (filters.eventMoment && filters.eventMoment !== 'all') {
    expression += ` AND context.eventMoment="${filters.eventMoment}"`;
  }
  
  // Filtrar por uploader
  if (filters.uploader && filters.uploader !== 'all') {
    expression += ` AND context.uploaderName="${filters.uploader}"`;
  }

  // Filtrar por fecha (si se proporciona)
  if (filters.dateFrom) {
    expression += ` AND created_at>="${filters.dateFrom}"`;
  }

  if (filters.dateTo) {
    expression += ` AND created_at<="${filters.dateTo}"`;
  }

  return expression;
};

// Función para formatear recurso de Cloudinary a foto de galería
const formatCloudinaryResource = (resource: any): GalleryPhoto => {
  const context = resource.context || {};
  
  return {
    id: resource.public_id,
    originalName: context.original_filename || resource.filename || 'imagen',
    cloudinaryId: resource.public_id,
    uploadedAt: resource.created_at,
    uploaderName: context.uploaderName || 'Anónimo',
    eventMoment: context.eventMoment || 'general',
    comment: context.comment || '',
    size: resource.bytes || 0,
    type: `image/${resource.format}`,
    urls: {
      original: resource.secure_url,
      compressed: generateOptimizedUrl(resource.public_id, 'compressed'),
      thumbnail: generateOptimizedUrl(resource.public_id, 'thumbnail'),
      gallery: generateOptimizedUrl(resource.public_id, 'gallery'),
      modal: generateOptimizedUrl(resource.public_id, 'modal'),
    },
    metadata: {
      width: resource.width || 0,
      height: resource.height || 0,
      format: resource.format || 'unknown',
    },
  };
};

// Función para generar estadísticas de la galería
const generateGalleryStats = (photos: GalleryPhoto[], totalCount: number): GalleryStats => {
  const uploaders = [...new Set(photos.map(photo => photo.uploaderName))];
  const eventMoments = [...new Set(photos.map(photo => photo.eventMoment))];
  const dates = photos.map(photo => photo.uploadedAt).filter(Boolean).sort();
  const totalSize = photos.reduce((sum, photo) => sum + photo.size, 0);

  return {
    totalPhotos: totalCount,
    filteredPhotos: photos.length,
    totalUploads: photos.length, // Approximation
    uploaders,
    eventMoments,
    lastUpdate: dates.length > 0 ? dates[dates.length - 1] : null,
    dateRange: {
      first: dates.length > 0 ? dates[0] : null,
      last: dates.length > 0 ? dates[dates.length - 1] : null,
    },
    totalSize,
  };
};

export async function GET(request: NextRequest) {
  console.log('🖼️ Cloudinary gallery request received');

  try {
    // Validar configuración de Cloudinary
    if (!validateCloudinaryConfig()) {
      return NextResponse.json({
        success: false,
        message: 'Configuración de Cloudinary incompleta',
      }, { status: 500 });
    }

    // Obtener parámetros de la URL
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const eventMoment = searchParams.get('eventMoment');
    const uploader = searchParams.get('uploader');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

    console.log('📊 Gallery filters:', { page, limit, eventMoment, uploader, sortBy, sortOrder });

    // Construir expresión de búsqueda
    const searchExpression = buildSearchExpression({
      eventMoment: eventMoment || undefined,
      uploader: uploader || undefined,
    });

    console.log('🔍 Search expression:', searchExpression);

    // Realizar búsqueda en Cloudinary
    const searchResult = await cloudinary.search
      .expression(searchExpression)
      .sort_by(sortBy, sortOrder as 'asc' | 'desc')
      .max_results(limit)
      .with_field('context')
      .with_field('tags')
      .with_field('image_metadata')
      .execute();

    console.log(`📸 Found ${searchResult.total_count} total images, returning ${searchResult.resources.length}`);

    // Formatear resultados
    const photos: GalleryPhoto[] = searchResult.resources.map(formatCloudinaryResource);

    // Generar estadísticas
    const stats = generateGalleryStats(photos, searchResult.total_count);

    // Generar información de paginación
    const pagination: Pagination = {
      page,
      limit,
      total: searchResult.total_count,
      pages: Math.ceil(searchResult.total_count / limit),
      hasNext: page * limit < searchResult.total_count,
      hasPrev: page > 1,
    };

    console.log('✅ Gallery data prepared successfully');

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: `${photos.length} fotos cargadas`,
      data: {
        photos,
        pagination,
        stats,
        filters: {
          eventMoment: eventMoment || 'all',
          uploader: uploader || 'all',
          sortBy,
          sortOrder,
        },
        meta: {
          requestedAt: new Date().toISOString(),
          source: 'cloudinary',
          folder: 'boda-maribel-godofredo',
        },
      },
    });

  } catch (error) {
    console.error('❌ Gallery error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error interno al cargar la galería';

    return NextResponse.json({
      success: false,
      message: 'Error al cargar la galería',
      error: errorMessage,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// Endpoint para obtener información específica de una foto
export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json({
        success: false,
        message: 'Public ID requerido',
      }, { status: 400 });
    }

    // Obtener información detallada de la imagen
    const resource = await cloudinary.api.resource(publicId, {
      image_metadata: true,
      colors: true,
      faces: true,
      quality_analysis: true,
    });

    const detailedPhoto = {
      ...formatCloudinaryResource(resource),
      analysis: {
        colors: resource.colors || [],
        faces: resource.faces || [],
        quality: resource.quality_analysis || null,
        metadata: resource.image_metadata || {},
      },
    };

    return NextResponse.json({
      success: true,
      data: detailedPhoto,
    });

  } catch (error) {
    console.error('❌ Error getting photo details:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al obtener detalles de la foto',
    }, { status: 500 });
  }
}

// Manejar OPTIONS para CORS
export async function OPTIONS() {
  return NextResponse.json(
    { success: true },
    { 
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
