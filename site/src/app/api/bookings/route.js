import dbConnect from '@/app/lib/dbConnect';
import Booking from '@/app/models/Booking';
import Service from '@/app/models/Service';

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({})
      .populate('services')
      .sort({ createdAt: -1 });
    return Response.json(bookings);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { services, clientName, clientEmail } = await request.json();
    
    // Calculate total price
    const serviceDocs = await Service.find({ _id: { $in: services } });
    const totalPrice = serviceDocs.reduce((sum, service) => sum + service.price, 0);
    
    const booking = new Booking({
      services,
      totalPrice,
      clientName,
      clientEmail,
      status: 'pending'
    });
    
    const savedBooking = await booking.save();
    await savedBooking.populate('services');
    
    return Response.json(savedBooking, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}