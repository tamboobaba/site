import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['website', 'design', 'vendor', 'marketing', 'registration', 'sponsorship'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better performance
serviceSchema.index({ name: 'text', description: 'text' });
serviceSchema.index({ category: 1 });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;