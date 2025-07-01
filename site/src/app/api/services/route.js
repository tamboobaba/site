import dbConnect from '@/app/lib/dbConnect';
import Service from '@/app/models/Service';

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return Response.json(services);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const service = new Service(data);
    const savedService = await service.save();
    
    return Response.json(savedService, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}