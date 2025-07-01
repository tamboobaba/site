import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  clientName: {
    type: String,
    trim: true
  },
  clientEmail: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;