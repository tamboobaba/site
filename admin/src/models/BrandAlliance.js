import mongoose from 'mongoose';

const brandAllianceSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  website: String,
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  interests: [String],
  companyDescription: { type: String, required: true },
  collaborationReason: String,
  eventTypes: [String],
  supportTypes: [String],
  timeframe: String,
  budget: String,
  expectations: String,
  logo: String,
  additionalMessage: String,
  sendBrochure: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const BrandAlliance = mongoose.models.BrandAlliance || mongoose.model('BrandAlliance', brandAllianceSchema);

export default BrandAlliance;