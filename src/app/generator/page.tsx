"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import "../history/historyPage.css"

interface GeneratorParams {
  language: string;
  faceModel: string;
  keyingModel: string;
  sizeType: 'list' | 'background' | 'custom';
  presetSize: string;
  backgroundColor: 'white' | 'blue' | 'red' | 'lightgrey';
}

export default function GeneratorPage() {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<GeneratorParams>({
    language: 'en',
    faceModel: 'face',
    keyingModel: 'modnet',
    sizeType: 'list',
    presetSize: '1x1',
    backgroundColor: 'white'
  });

  const handleFile = (file: File) => {
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB in bytes
    
    if (file.size > MAX_SIZE) {
      alert("File size must be less than 50MB");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }
    
    setSelectedImage(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleParamChange = (key: keyof GeneratorParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert('Please upload an image first');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('params', JSON.stringify(params));

      // Log the parameters and image details
      console.log('Generation Parameters:', {
        params,
        imageDetails: {
          name: selectedImage.name,
          type: selectedImage.type,
          size: `${(selectedImage.size / (1024 * 1024)).toFixed(2)} MB`
        }
      });
      // Log FormData entries (for debugging)
      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(`${key}:`, value instanceof File ? {
          name: value.name,
          type: value.type
        } : value);
      });

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const result = await response.json();
      // Handle the result - show the generated image
      // or redirect to a results page
      console.log(result);
      
    } catch (error) {
      console.error('Error generating photo:', error);
      alert('Failed to generate photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileContainer">
      <aside className="leftSidebar">
          <div style={{marginTop: 100}}></div>
          <button className="icon active" onClick={() => router.push('/generator')}>
              <i className="fas fa-house" />
          </button>
          <button className="icon" onClick={() => router.push('/profile')}>
              <i className="fa-solid fa-grip" />
          </button>
          <button className="icon" onClick={() => router.push('/history')}>
              <i className="fas fa-file-alt" />
          </button>
      </aside>

      <div className="min-h-screen bg-background p-8" style={{backgroundColor: "#f1f4f7"}}>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-foreground">
            ID PHOTO GENERATOR
          </h1>

          {/* Main content grid - Image Upload and Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left panel - Image Upload */}
            <div 
              className={`border-2 border-dashed rounded-lg p-8 ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center justify-center h-64">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <>
                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">Drop Image Here</p>
                    <p className="text-sm text-gray-500 mt-2">-or-</p>
                    <p className="text-sm text-gray-500">Click to Upload</p>
                  </>
                )}
              </div>
            </div>

            {/* Right panel - Preview */}
            <div className="border-2 border-gray-300 rounded-lg p-8">
              <div className="flex items-center justify-center h-64">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Controls and Examples Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side - Controls */}
            <div className="space-y-4">
              {/* Model Selection Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Language</label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white"
                    value={params.language}
                    onChange={(e) => handleParamChange('language', e.target.value)}
                  >
                    <option value="en">en</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Face Detection Model</label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white"
                    value={params.faceModel}
                    onChange={(e) => handleParamChange('faceModel', e.target.value)}
                  >
                    <option value="face">Face++ (Online API)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Keying Models</label>
                  <select 
                    className="w-full p-2 border rounded-lg bg-white"
                    value={params.keyingModel}
                    onChange={(e) => handleParamChange('keyingModel', e.target.value)}
                  >
                    <option value="modnet">modnet</option>
                  </select>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">ID Photo Size Selection</label>
                <div className="flex gap-4">
                  {['list', 'background', 'custom'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="radio" 
                        name="sizeType"
                        value={type}
                        checked={params.sizeType === type}
                        onChange={(e) => handleParamChange('sizeType', e.target.value as 'list' | 'background' | 'custom')}
                        className="mr-2" 
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preset Size */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Preset Size</label>
                <select 
                  className="w-full p-2 border rounded-lg bg-white"
                  value={params.presetSize}
                  onChange={(e) => handleParamChange('presetSize', e.target.value)}
                >
                  <option value="1x1">1" x 1"</option>
                </select>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Background Color</label>
                <div className="flex gap-4">
                  {['white', 'blue', 'red', 'lightgrey'].map((color) => (
                    <label key={color} className="flex items-center">
                      <input 
                        type="radio" 
                        name="backgroundColor"
                        value={color}
                        checked={params.backgroundColor === color}
                        onChange={(e) => handleParamChange('backgroundColor', e.target.value as 'white' | 'blue' | 'red' | 'lightgrey')}
                        className="mr-2" 
                      />
                      <span className="capitalize">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button 
                className={`w-full py-3 rounded-lg transition-colors ${
                  selectedImage && !isLoading
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
                onClick={handleGenerate}
                disabled={!selectedImage || isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>

            {/* Right Side - Examples */}
            <div className="border rounded-lg p-4">
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-gray-700">Examples</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-2">
                  <img
                    src="/images/exampleImage/test3.jpeg"
                    alt="Example ID Photo 1"
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
                <div className="border rounded-lg p-2">
                  <img
                    src="/images/exampleImage/test4.jpg"
                    alt="Example ID Photo 2"
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}