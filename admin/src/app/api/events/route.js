import connectToDB from '@/lib/db';
import Event from '@/models/Event';

export async function GET() {
  try {
    await connectToDB();
    
    // Get only future events, sorted by date (ascending)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today

        const events = await Event.find({ 
        date: { $gte: today } 
        }).sort({ date: 1 });
    
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.description || !body.organization || 
        !body.location || !body.websiteLink || !body.imageUrl || !body.date) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    await connectToDB();
    
    const newEvent = new Event({
      name: body.name,
      description: body.description,
      organization: body.organization,
      location: body.location,
      websiteLink: body.websiteLink,
      imageUrl: body.imageUrl,
      date: new Date(body.date)
    });
    
    const savedEvent = await newEvent.save();
    
    return new Response(JSON.stringify(savedEvent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return new Response(JSON.stringify({ error: 'Failed to create event' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}