'use client';

import { useState } from 'react';
import { useHybridUpload } from '@/components/sections/FotoUploader/hooks/useHybridUpload';

export default function TestUploadPage() {
  const { uploadState, uploadFiles, resetUpload } = useHybridUpload();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Por favor selecciona al menos un archivo');
      return;
    }

    const formData = {
      uploaderName: 'Test User',
      eventMoment: 'ceremonia',
      comment: 'Prueba de registro en MongoDB'
    };

    console.log('🧪 Starting test upload with files:', selectedFiles);
    await uploadFiles(selectedFiles, formData);
  };

  const handleReset = () => {
    resetUpload();
    setSelectedFiles(null);
    if (document.getElementById('fileInput')) {
      document.getElementById('fileInput').value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🧪 Test Upload & MongoDB Registration
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar archivos para prueba:
          </label>
          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {selectedFiles && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Archivos seleccionados:</h3>
            <ul className="text-sm text-gray-600">
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleUpload}
            disabled={!selectedFiles || uploadState.uploading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadState.uploading ? 'Subiendo...' : 'Subir y Registrar'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Estado del upload */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Estado del Upload:</h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Subiendo:</span>{' '}
              <span className={uploadState.uploading ? 'text-blue-600' : 'text-gray-600'}>
                {uploadState.uploading ? 'Sí' : 'No'}
              </span>
            </div>
            
            <div>
              <span className="font-medium">Progreso:</span>{' '}
              <span className="text-gray-600">{uploadState.progress}%</span>
            </div>
            
            <div>
              <span className="font-medium">Éxito:</span>{' '}
              <span className={uploadState.success ? 'text-green-600' : 'text-gray-600'}>
                {uploadState.success ? 'Sí' : 'No'}
              </span>
            </div>
            
            {uploadState.error && (
              <div>
                <span className="font-medium text-red-600">Error:</span>{' '}
                <span className="text-red-600">{uploadState.error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">📋 Instrucciones:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Selecciona una o más imágenes</li>
            <li>2. Haz clic en "Subir y Registrar"</li>
            <li>3. Verifica en la consola del navegador los logs de MongoDB</li>
            <li>4. Revisa la terminal del servidor para ver los logs del backend</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
