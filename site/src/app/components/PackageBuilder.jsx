import { useState } from 'react';
export default function PackageBuilder({ selectedServices }) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  
  const handleBookNow = async () => {
    if (!clientName || !clientEmail) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: selectedServices.map(s => s._id),
          clientName,
          clientEmail
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Booking successful! We will contact you shortly.');
        window.location.href = '/bookings';
      } else {
        throw new Error(data.error || 'Booking failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Your Custom Package</h2>
      {selectedServices.length > 0 ? (
        <>
          <ul className="mb-4">
            {selectedServices.map(service => (
              <li key={service._id} className="flex justify-between py-2 border-b">
                <span>{service.name}</span>
                <span>${service.price}</span>
              </li>
            ))}
          </ul>
          
          <div className="mb-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">Total: ${totalPrice}</span>
            <button 
              onClick={handleBookNow}
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select services to build your package</p>
      )}
    </div>
  );
}