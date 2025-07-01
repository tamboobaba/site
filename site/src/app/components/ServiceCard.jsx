'use client';
import { useState } from 'react';
export default function ServiceCard({ service, selected, onToggle }) {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        selected ? 'ring-4 ring-yellow-500' : ''
      }`}
    >
      <div className="bg-black h-48 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <h3 className="text-white text-2xl font-bold z-10 px-4 text-center">
          {service.name}
        </h3>
      </div>
      
      <div className="bg-white p-6">
        <p className="text-gray-600 mb-4 min-h-[60px]">
          {service.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl text-gray-900">
            ${service.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => onToggle(service)}
            className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
              selected 
                ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {selected ? 'Selected ✓' : 'Add to Package'}
          </button>
        </div>
      </div>
      
      {selected && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          Selected
        </div>
      )}
    </div>
  );
}