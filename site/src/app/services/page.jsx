'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import ServiceCard from '@/app/components/ServiceCard';
import PackageBuilder from '@/app/components/PackageBuilder';

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s._id === service._id) 
        ? prev.filter(s => s._id !== service._id) 
        : [...prev, service]
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Customize your perfect event solution by selecting the services you need
            </p>
          </div>

          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <>
              <PackageBuilder selectedServices={selectedServices} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {services.map(service => (
                  <ServiceCard 
                    key={service._id} 
                    service={service}
                    selected={selectedServices.some(s => s._id === service._id)}
                    onToggle={toggleService}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}