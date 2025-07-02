import connectToDB from '@/lib/db';
import BrandAlliance from '@/models/BrandAlliance';

export async function GET() {
  try {
    await connectToDB();
    const requests = await BrandAlliance.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(requests), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch requests' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}