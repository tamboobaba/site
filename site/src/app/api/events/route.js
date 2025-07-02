import dbConnect from '@/app/lib/dbConnect';
import Event from '@/app/models/Event';

export async function GET() {
  try {
    await dbConnect();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Sets time to 00:00:00

    const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
      console.error("❌ Error fetching events:", error); // Add this
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
