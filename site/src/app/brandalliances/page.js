'use client';
import { useState } from 'react';
import { FiMail, FiPhone, FiUser, FiGlobe, FiUpload, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

export default function BrandAlliances() {
const [formData, setFormData] = useState({
  companyName: '',
  website: '',
  contactName: '',
  email: '',
  phone: '',
  interests: [], // Initialize as array
  companyDescription: '',
  collaborationReason: '',
  eventTypes: [], // Initialize as array
  supportTypes: [], // Initialize as array
  timeframe: '',
  budget: '',
  expectations: '',
  logo: null,
  logoPreview: '',
  additionalMessage: '',
  sendBrochure: false,
  otp: '',
  isEmailVerified: false
});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);


  const eventTypesOptions = [
    'Tech Fests', 'Workshops', 'Hackathons', 
    'Cultural Fests', 'Conferences', 'Exhibitions'
  ];

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData(prev => {
    // If user changes the email, reset isEmailVerified and otp
    if (name === "email") {
      return {
        ...prev,
        [name]: value,
        isEmailVerified: false,
        otp: ''
      };
    }

    if (type === 'checkbox') {
      if (name === 'interests' || name === 'eventTypes' || name === 'supportTypes') {
        const currentArray = Array.isArray(prev[name]) ? prev[name] : [];
        const newArray = checked 
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value);
        return { ...prev, [name]: newArray };
      } else {
        return { ...prev, [name]: checked };
      }
    } else {
      return { ...prev, [name]: value };
    }
  });
};


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or GIF images are allowed');
      return;
    }

    // Create preview
    const preview = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      logo: file,
      logoPreview: preview
    }));
  };


  const [otpError, setOtpError] = useState('');


const sendOtp = async () => {
  setOtpError(''); // Clear previous errors
  try {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email })
    });

    if (!response.ok) {
      const error = await response.json();
      setOtpError(error.message || 'Failed to send OTP');
      throw new Error(error.message || 'Failed to send OTP');
    }

    setShowOtpModal(true);
    toast.success('OTP sent to your email!');
  } catch (error) {
    setOtpError(error.message);
    toast.error(error.message);
    console.error('OTP Error:', error);
  }
};

const verifyOtp = async () => {
  setOtpError(''); // Clear previous errors
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: formData.email,
        otp: formData.otp 
      })
    });

    if (!response.ok) {
      const error = await response.json();
      setOtpError(error.message || 'Invalid OTP');
      throw new Error(error.message || 'Invalid OTP');
    }

    setFormData(prev => ({ ...prev, isEmailVerified: true }));
    setShowOtpModal(false);
    setOtpError('');
    toast.success('Email verified successfully!');
  } catch (error) {
    setOtpError(error.message);
    toast.error(error.message);
    console.error('Verification Error:', error);
  }
};
const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.isEmailVerified) {
        throw new Error('Please verify your email first');
      }

      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'logo' && value) {
          formPayload.append('file', value);
        } else if (key !== 'logoPreview' && key !== 'otp' && key !== 'isEmailVerified') {
          if (Array.isArray(value)) {
            value.forEach(item => formPayload.append(key, item));
          } else {
            formPayload.append(key, value);
          }
        }
      });

      const response = await fetch('/api/brand-alliances', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Submission failed');
      }
      

      toast.success('Submission successful! We will contact you soon.');
      setSubmissionSuccess(true);
      toast.success('Submission successful! We will contact you soon.');
      setShowSuccessModal(true);

      setTimeout(() => setSubmissionSuccess(false), 25000);

      // Reset form
      setFormData({
        companyName: '',
        website: '',
        contactName: '',
        email: '',
        phone: '',
        interests: [],
        companyDescription: '',
        collaborationReason: '',
        eventTypes: [],
        supportTypes: [],
        timeframe: '',
        budget: '',
        expectations: '',
        logo: null,
        logoPreview: '',
        additionalMessage: '',
        sendBrochure: false,
        otp: '',
        isEmailVerified: false
      });
    } catch (error) {
      toast.error(error.message);
      console.error('Submission Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      {otpError && (
  <div className="text-red-500 mt-2">{otpError}</div>
)}
      {/* "min-h-screen bg-gradient-to-br from-yellow-900 via-gray-950 to-black text-white py-12 px-4 sm:px-6 lg:px-8" */}
      <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Tamboo Baba Logo"
            width={128}
            height={128}
            className="w-32 h-32 object-contain mb-2 drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 0 8px #FFD600)' }}
          />

          {/* <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide mb-1">
            Tamboo Baba
          </h1>
          <p className="text-gray-400 text-lg font-medium">Brand Alliances</p> */}
        </div>

      <div className="max-w-4xl mx-auto bg-gray-900/50 border border-white/10 rounded-xl p-6 sm:p-8 shadow-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-yellow-400">Brand</span> Alliances
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Let&apos create something extraordinary together. Fill out this form to explore partnership opportunities.
          </p>
        </div>

        {submissionSuccess && (
            <div className="mb-6 flex items-center justify-center gap-2 text-green-400 text-lg font-semibold">
              <FiCheck className="text-2xl" /> Request submitted successfully!
            </div>
          )}




        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Contact Information */}
          <div className="space-y-6 p-6 bg-gray-800/30 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company/Brand Name <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 pl-10"
                    required
                  />
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    🏢
                  </div>
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Website or Social Media Handles
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 pl-10"
                    placeholder="https:// or @username"
                  />
                  <FiGlobe className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Person&apos Name <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 pl-10"
                    required
                  />
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Email with Verification */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Email <span className="text-yellow-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 pl-10"
                    required
                  />
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                {formData.email && !formData.isEmailVerified && (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="mt-2 text-sm text-yellow-400 hover:text-yellow-300"
                  >
                    Verify Email
                  </button>
                )}
                {formData.isEmailVerified && (
                  <div className="mt-2 text-sm text-green-400 flex items-center gap-1">
                    <FiCheck /> Email verified
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3 pl-10"
                  />
                  <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Collaboration Interest */}
          <div className="space-y-6 p-6 bg-gray-800/30 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
              Collaboration Interest
            </h2>

            {/* Type of Interest */}
            <div>
              <label className="block text-sm font-medium mb-3">
                What are you interested in? <span className="text-yellow-400">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Sponsorship', 'Event Partnership', 'Product Collaboration', 
                  'Media/Publicity Collaboration', 'Speaker Opportunities', 'Custom Proposal'].map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="interests"
                      value={option}
                      checked={formData.interests.includes(option)}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/20 rounded"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tell us briefly about your company and what you do <span className="text-yellow-400">*</span>
              </label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
                required
              />
            </div>

            {/* Collaboration Reason */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Why do you want to collaborate with us?
              </label>
              <textarea
                name="collaborationReason"
                value={formData.collaborationReason}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
              />
            </div>

            {/* Event Types */}
            <div>
              <label className="block text-sm font-medium mb-3">
                What type of events are you most interested in?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eventTypesOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="eventTypes"
                      value={option}
                      checked={formData.eventTypes.includes(option)}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/20 rounded"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Support Details */}
          <div className="space-y-6 p-6 bg-gray-800/30 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
              Support Details
            </h2>

            {/* Support Types */}
            <div>
              <label className="block text-sm font-medium mb-3">
                What kind of support are you offering?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Monetary Sponsorship', 'In-kind (products/services)', 'Cross-promotion', 
                  'Venue/logistics', 'Guest Speakers/Workshops', 'Other'].map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="supportTypes"
                      value={option}
                      checked={formData.supportTypes.includes(option)}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/20 rounded"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Is there a specific timeframe or event you&aposre targeting?
              </label>
              <input
                type="text"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
                placeholder="E.g., Q2 2024, Summer Campaign, etc."
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Do you have a budget in mind for sponsorship (Enter in ₹ if applicable)?
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
                placeholder="E.g., $5,000 - $10,000 or Range"
              />
            </div>

            {/* Expectations */}
            <div>
              <label className="block text-sm font-medium mb-2">
                What do you expect in return from us?
              </label>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
                placeholder="Brand visibility, product placement, etc."
              />
            </div>
          </div>

          {/* Section 4: Additional Information */}
          <div className="space-y-6 p-6 bg-gray-800/30 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
              Additional Information
            </h2>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Company Logo (optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-white/10 rounded-lg hover:bg-gray-700/50 transition">
                    <FiUpload className="text-gray-300" />
                    <span className="text-gray-300">
                      {formData.logo ? formData.logo.name : 'Choose File'}
                    </span>
                  </div>
                  <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                {formData.logo && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, logo: null }))}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                JPEG, PNG or GIF (Max 5MB)
              </p>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Any additional message or proposal you&aposd like to share?
              </label>
              <textarea
                name="additionalMessage"
                value={formData.additionalMessage}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
              />
            </div>

            {/* Brochure Request */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="sendBrochure"
                checked={formData.sendBrochure}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/20 rounded"
              />
              <label className="ml-3 text-sm text-gray-300">
                Would you like us to send you our sponsorship brochure/deck?
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
                type="submit"
                disabled={isSubmitting || !formData.isEmailVerified}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  isSubmitting || !formData.isEmailVerified
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
              >
                {isSubmitting && (
                  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
              </button>

            {!formData.isEmailVerified && (
              <p className="mt-2 text-sm text-red-400">
                Please verify your email before submitting
              </p>
            )}
          </div>
        </form>
      </div>

      {/* OTP Verification Modal */}
{showOtpModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 border border-white/10 rounded-xl p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Verify Your Email</h3>
        <button onClick={() => setShowOtpModal(false)} className="text-gray-400 hover:text-white">
          <FiX size={24} />
        </button>
      </div>
      <p className="text-gray-300 mb-4">
        We&aposve sent a 6-digit OTP to <span className="font-medium">{formData.email}</span>. Please enter it below:
      </p>
      {/* Show OTP Error Here */}
      {otpError && (
        <div className="mb-4 text-red-400 font-semibold text-center">{otpError}</div>
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">OTP Code</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            maxLength={6}
            className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-3"
            placeholder="Enter 6-digit code"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowOtpModal(false)}
            className="px-4 py-2 border border-white/20 rounded hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={verifyOtp}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  </div>
)}



{/* submissionSuccessful modal */}

{showSuccessModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-gray-900 border border-yellow-400 rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
      <div className="flex flex-col items-center">
        <FiCheck className="text-green-400 text-5xl mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-yellow-400">Request Submitted!</h2>
        <p className="text-gray-200 mb-6">
          Thank you for your interest. We have received your request and will contact you soon.
        </p>
        <button
          onClick={() => setShowSuccessModal(false)}
          className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}