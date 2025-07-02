import connectToDB from '@/lib/db';
import BrandAlliance from '@/models/BrandAlliance';

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    await BrandAlliance.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}