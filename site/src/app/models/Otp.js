import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    index: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} is not a valid email address!`
    }
  },
  otp: { 
    type: String, 
    required: true 
  },
  expiresAt: { 
    type: Date, 
    required: true,
    index: { expires: '15m' } // Auto-delete after 15 minutes
  },
  attempts: {
    type: Number,
    default: 0,
    max: 5
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Prevent duplicate OTPs for the same email
otpSchema.index({ email: 1 }, { unique: true });

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema);

export default Otp;