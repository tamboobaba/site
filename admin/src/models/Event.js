import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  websiteLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;