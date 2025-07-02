import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  organization: String,
  location: String,
  websiteLink: String,
  imageUrl: String,
  date: Date
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
