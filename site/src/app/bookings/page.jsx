'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">My Bookings</h1>
          
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map(booking => (
                <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">Booking #{booking._id.slice(-6).toUpperCase()}</h3>
                      <p className="text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()} • 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </p>
                    </div>
                    <span className="text-2xl font-bold">${booking.totalPrice}</span>
                  </div>
                  
                  {booking.clientName && (
                    <p className="mt-2">
                      <span className="font-medium">Client:</span> {booking.clientName}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Services Included:</h4>
                    <ul className="space-y-2">
                      {booking.services.map(service => (
                        <li key={service._id} className="flex justify-between">
                          <span>{service.name}</span>
                          <span>${service.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No bookings yet. Create a package to get started!</p>
          )}
        </div>
      </div>
    </>
  );
}