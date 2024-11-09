"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "../history/historyPage.css"


export default function GeneratorPage() {
  const router = useRouter();

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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center h-64">
                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500">Drop Image Here</p>
                <p className="text-sm text-gray-500 mt-2">-or-</p>
                <p className="text-sm text-gray-500">Click to Upload</p>
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
                  <select className="w-full p-2 border rounded-lg bg-white">
                    <option value="en">en</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Face Detection Model</label>
                  <select className="w-full p-2 border rounded-lg bg-white">
                    <option value="face">Face++ (Online API)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Keying Models</label>
                  <select className="w-full p-2 border rounded-lg bg-white">
                    <option value="modnet">modnet</option>
                  </select>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">ID Photo Size Selection</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="size" className="mr-2" defaultChecked />
                    <span>Size List</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="size" className="mr-2" />
                    <span>Background Only</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="size" className="mr-2" />
                    <span>Custom (px)</span>
                  </label>
                </div>
              </div>

              {/* Preset Size */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Preset Size</label>
                <select className="w-full p-2 border rounded-lg bg-white">
                  <option value="1x1">1" x 1"</option>
                </select>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Background Color</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="color" className="mr-2" defaultChecked />
                    <span>White</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="color" className="mr-2" />
                    <span>Blue</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="color" className="mr-2" />
                    <span>Red</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="color" className="mr-2" />
                    <span>Light Grey</span>
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Generate
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
                    src="/example1.jpg"
                    alt="Example ID Photo 1"
                    className="w-full h-auto object-cover aspect-[3/4]"
                  />
                </div>
                <div className="border rounded-lg p-2">
                  <img
                    src="/example2.jpg"
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