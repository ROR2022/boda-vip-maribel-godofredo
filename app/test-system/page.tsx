'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, Cloud, Server, Camera, Image as ImageIcon } from 'lucide-react';

// Componente de prueba del sistema híbrido
const HybridSystemTest: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, 'pending' | 'success' | 'error' | 'testing'>>({
    cloudinaryConfig: 'pending',
    localSystem: 'pending',
    apiEndpoints: 'pending',
    uploadTest: 'pending',
    galleryTest: 'pending'
  });

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const updateTestResult = (test: string, result: 'success' | 'error' | 'testing') => {
    setTestResults(prev => ({ ...prev, [test]: result }));
  };

  // Test de configuración de Cloudinary
  const testCloudinaryConfig = async () => {
    updateTestResult('cloudinaryConfig', 'testing');
    addLog('Verificando configuración de Cloudinary...');

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error('Variables de entorno no configuradas');
      }

      // Verificar acceso al endpoint de Cloudinary
      const testUrl = `https://res.cloudinary.com/${cloudName}/image/upload/sample.jpg`;
      const response = await fetch(testUrl, { method: 'HEAD' });
      
      if (response.ok) {
        addLog('✅ Cloudinary configurado correctamente');
        updateTestResult('cloudinaryConfig', 'success');
      } else {
        throw new Error('No se pudo acceder a Cloudinary');
      }
    } catch (error) {
      addLog(`❌ Error Cloudinary: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      updateTestResult('cloudinaryConfig', 'error');
    }
  };

  // Test del sistema local
  const testLocalSystem = async () => {
    updateTestResult('localSystem', 'testing');
    addLog('Verificando sistema local...');

    try {
      // Verificar que las APIs locales respondan
      const response = await fetch('/api/fotos-galeria', { method: 'GET' });
      
      if (response.ok) {
        addLog('✅ Sistema local funcionando');
        updateTestResult('localSystem', 'success');
      } else {
        throw new Error(`API local error: ${response.status}`);
      }
    } catch (error) {
      addLog(`❌ Error sistema local: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      updateTestResult('localSystem', 'error');
    }
  };

  // Test de endpoints API
  const testApiEndpoints = async () => {
    updateTestResult('apiEndpoints', 'testing');
    addLog('Verificando endpoints API...');

    const endpoints = [
      '/api/upload-fotos',
      '/api/upload-fotos-cloudinary',
      '/api/fotos-galeria',
      '/api/fotos-galeria-cloudinary'
    ];

    try {
      let successCount = 0;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, { method: 'GET' });
          if (response.status === 405 || response.ok) {
            // 405 es esperado para GET en endpoints POST
            successCount++;
            addLog(`✅ Endpoint activo: ${endpoint}`);
          } else {
            addLog(`⚠️ Endpoint inactivo: ${endpoint} (${response.status})`);
          }
        } catch {
          addLog(`❌ Error endpoint: ${endpoint}`);
        }
      }

      if (successCount === endpoints.length) {
        updateTestResult('apiEndpoints', 'success');
        addLog('✅ Todos los endpoints están activos');
      } else {
        updateTestResult('apiEndpoints', 'error');
        addLog(`❌ Solo ${successCount}/${endpoints.length} endpoints activos`);
      }
    } catch (error) {
      updateTestResult('apiEndpoints', 'error');
      addLog(`❌ Error verificando endpoints: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  // Test de upload (simulación)
  const testUploadSimulation = async () => {
    updateTestResult('uploadTest', 'testing');
    addLog('Simulando proceso de upload...');

    try {
      // Crear un archivo de prueba (1x1 pixel PNG)
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(0, 0, 1, 1);
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error('No se pudo crear archivo de prueba');
        }

        const formData = new FormData();
        formData.append('file', blob, 'test.png');
        formData.append('metadata', JSON.stringify({
          uploaderName: 'Sistema Test',
          eventMoment: 'Prueba',
          uploadDate: new Date().toISOString()
        }));

        // Intentar upload con Cloudinary primero
        try {
          const cloudinaryResponse = await fetch('/api/upload-fotos-cloudinary', {
            method: 'POST',
            body: formData
          });

          if (cloudinaryResponse.ok) {
            addLog('✅ Upload Cloudinary exitoso');
            updateTestResult('uploadTest', 'success');
            return;
          }
        } catch {
          addLog('⚠️ Upload Cloudinary falló, probando local...');
        }

        // Fallback al sistema local
        try {
          const localResponse = await fetch('/api/upload-fotos', {
            method: 'POST',
            body: formData
          });

          if (localResponse.ok) {
            addLog('✅ Upload local exitoso (fallback)');
            updateTestResult('uploadTest', 'success');
          } else {
            throw new Error('Upload local también falló');
          }
        } catch {
          addLog('❌ Ambos sistemas de upload fallaron');
          updateTestResult('uploadTest', 'error');
        }
      }, 'image/png');

    } catch (error) {
      addLog(`❌ Error en test de upload: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      updateTestResult('uploadTest', 'error');
    }
  };

  // Test de galería
  const testGallery = async () => {
    updateTestResult('galleryTest', 'testing');
    addLog('Verificando sistema de galería...');

    try {
      // Test galería local
      const localResponse = await fetch('/api/fotos-galeria');
      const localData = await localResponse.json();
      addLog(`📁 Fotos locales encontradas: ${localData.photos?.length || 0}`);

      // Test galería Cloudinary
      const cloudinaryResponse = await fetch('/api/fotos-galeria-cloudinary');
      const cloudinaryData = await cloudinaryResponse.json();
      addLog(`☁️ Fotos Cloudinary encontradas: ${cloudinaryData.photos?.length || 0}`);

      const totalPhotos = (localData.photos?.length || 0) + (cloudinaryData.photos?.length || 0);
      addLog(`📸 Total de fotos en el sistema: ${totalPhotos}`);

      updateTestResult('galleryTest', 'success');
    } catch (error) {
      addLog(`❌ Error en test de galería: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      updateTestResult('galleryTest', 'error');
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    addLog('🚀 Iniciando tests del sistema híbrido...');
    await testCloudinaryConfig();
    await testLocalSystem();
    await testApiEndpoints();
    await testUploadSimulation();
    await testGallery();
    addLog('✅ Tests completados');
  };

  const getIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'error': return <XCircle className="text-red-500" size={20} />;
      case 'testing': return <Loader2 className="text-blue-500 animate-spin" size={20} />;
      default: return <AlertCircle className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Sistema Híbrido - Panel de Pruebas
            </h1>
            <p className="text-gray-600">
              Verificación completa del sistema de fotos (Local + Cloudinary)
            </p>
          </div>

          {/* Botón de test general */}
          <div className="text-center mb-8">
            <button
              onClick={runAllTests}
              className="bg-gradient-to-r from-green-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              🧪 Ejecutar Todos los Tests
            </button>
          </div>

          {/* Resultados de tests */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Sistemas</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Cloud size={20} className="text-blue-500" />
                  <span>Configuración Cloudinary</span>
                </div>
                {getIcon(testResults.cloudinaryConfig)}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Server size={20} className="text-green-500" />
                  <span>Sistema Local</span>
                </div>
                {getIcon(testResults.localSystem)}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ImageIcon size={20} className="text-purple-500" />
                  <span>Endpoints API</span>
                </div>
                {getIcon(testResults.apiEndpoints)}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Funcionalidades</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Camera size={20} className="text-orange-500" />
                  <span>Sistema de Upload</span>
                </div>
                {getIcon(testResults.uploadTest)}
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ImageIcon size={20} className="text-indigo-500" />
                  <span>Sistema de Galería</span>
                </div>
                {getIcon(testResults.galleryTest)}
              </div>
            </div>
          </div>

          {/* Logs */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
            <div className="flex items-center mb-2">
              <span className="text-green-300">💻 System Logs</span>
            </div>
            {logs.length === 0 ? (
              <div className="text-gray-500">No hay logs aún. Ejecuta los tests para ver la información.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>

          {/* Tests individuales */}
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={testCloudinaryConfig}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors duration-200"
            >
              <Cloud size={24} className="text-blue-500 mb-2" />
              <div className="font-medium">Test Cloudinary</div>
              <div className="text-sm text-gray-600">Verificar configuración</div>
            </button>

            <button
              onClick={testLocalSystem}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors duration-200"
            >
              <Server size={24} className="text-green-500 mb-2" />
              <div className="font-medium">Test Local</div>
              <div className="text-sm text-gray-600">Verificar servidor</div>
            </button>

            <button
              onClick={testApiEndpoints}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors duration-200"
            >
              <ImageIcon size={24} className="text-purple-500 mb-2" />
              <div className="font-medium">Test APIs</div>
              <div className="text-sm text-gray-600">Verificar endpoints</div>
            </button>

            <button
              onClick={testUploadSimulation}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors duration-200"
            >
              <Camera size={24} className="text-orange-500 mb-2" />
              <div className="font-medium">Test Upload</div>
              <div className="text-sm text-gray-600">Simular subida</div>
            </button>

            <button
              onClick={testGallery}
              className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors duration-200"
            >
              <ImageIcon size={24} className="text-indigo-500 mb-2" />
              <div className="font-medium">Test Galería</div>
              <div className="text-sm text-gray-600">Verificar fotos</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HybridSystemTest;
