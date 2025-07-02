import connectToDB from '@/lib/db';
import Event from '@/models/Event';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    await connectToDB();
    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedEvent) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update event' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await connectToDB();
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}