'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiCalendar, FiMapPin, FiLink } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    organization: '',
    location: '',
    websiteLink: '',
    imageUrl: '',
    date: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Event name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.organization.trim()) errors.organization = 'Organization is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.websiteLink.trim()) errors.websiteLink = 'Website link is required';
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image is required';
    if (!formData.date) errors.date = 'Date is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setIsAdding(false);
    setFormData({
      name: event.name,
      description: event.description,
      organization: event.organization,
      location: event.location,
      websiteLink: event.websiteLink,
      imageUrl: event.imageUrl,
      date: event.date.split('T')[0]
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      name: '',
      description: '',
      organization: '',
      location: '',
      websiteLink: '',
      imageUrl: '',
      date: ''
    });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const method = isAdding ? 'POST' : 'PUT';
      const url = isAdding ? '/api/events' : `/api/events/${editingId}`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save event');
      }

      toast.success(isAdding ? 'Event added successfully!' : 'Event updated successfully!');
      fetchEvents();
      handleCancel();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete event');
      }

      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // CLOUDINARY IMAGE UPLOAD HANDLER
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataImg = new FormData();
    formDataImg.append('file', file);
    formDataImg.append('upload_preset', 'events_unsigned'); // <-- replace with your preset

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dbpbt92hq/image/upload',
        {
          method: 'POST',
          body: formDataImg,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        setFormErrors((prev) => ({ ...prev, imageUrl: '' }));
        toast.success('Image uploaded!');
      } else {
        throw new Error('Image upload failed');
      }
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading && !events.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-white p-2 sm:p-4 md:p-8">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-6xl mx-auto">
          {/* Header and Add Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Events</h1>
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingId(null);
                setFormData({
                  name: '',
                  description: '',
                  organization: '',
                  location: '',
                  websiteLink: '',
                  imageUrl: '',
                  date: ''
                });
              }}
              className="w-full md:w-auto min-h-[44px] min-w-[44px] bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center justify-center gap-2"
              disabled={isAdding || editingId}
            >
              <FiPlus /> Add Event
            </button>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-gray-900/50 border border-white/10 rounded-lg p-4 sm:p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">
                  {isAdding ? 'Add New Event' : 'Edit Event'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-white min-h-[44px] min-w-[44px]"
                >
                  <FiX size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.name ? 'border-red-500' : 'border-white/10'} rounded px-4 py-3 pl-10`}
                        placeholder="Enter event name"
                      />
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        🎉
                      </div>
                    </div>
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                  </div>

                  {/* Organization Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.organization ? 'border-red-500' : 'border-white/10'} rounded px-4 py-3 pl-10`}
                        placeholder="Enter organization name"
                      />
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        🏢
                      </div>
                    </div>
                    {formErrors.organization && <p className="mt-1 text-sm text-red-500">{formErrors.organization}</p>}
                  </div>

                  {/* Description Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description (max 15 words) *</label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.description ? 'border-red-500' : 'border-white/10'} rounded px-4 py-3 pl-10`}
                        rows={3}
                        maxLength={100}
                        placeholder="Brief description of the event"
                      />
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        📝
                      </div>
                    </div>
                    {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/100 characters</p>
                  </div>

                  {/* Location Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.location ? 'border-red-500' : 'border-white/10'} rounded px-4 py-3 pl-10`}
                        placeholder="Enter event location"
                      />
                      <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {formErrors.location && <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>}
                  </div>

                  {/* Date Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.date ? 'border-red-500' : 'border-white/10'} rounded px-4 py-3 pl-10`}
                      />
                      <FiCalendar className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {formErrors.date && <p className="mt-1 text-sm text-red-500">{formErrors.date}</p>}
                  </div>

                  {/* Website Link Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Website Link *</label>
                    <div className="relative">
                      <input
                        type="url"
                        name="websiteLink"
                        value={formData.websiteLink}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-800 border ${formErrors.websiteLink ? 'border-red-500' : 'border-white/10'} rounded px-4 py-3 pl-10`}
                        placeholder="https://example.com"
                      />
                      <FiLink className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {formErrors.websiteLink && <p className="mt-1 text-sm text-red-500">{formErrors.websiteLink}</p>}
                  </div>

                  {/* Image Upload Field */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Image *</label>
                    <div className="relative flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full bg-gray-800 border border-white/10 rounded px-4 py-3"
                        disabled={uploadingImage}
                      />
                      {uploadingImage && <span className="text-yellow-400">Uploading...</span>}
                    </div>
                    {formErrors.imageUrl && <p className="mt-1 text-sm text-red-500">{formErrors.imageUrl}</p>}
                  </div>
                </div>

                {/* Image Preview */}
                {formData.imageUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Image Preview</label>
                    <div className="relative w-full h-40 sm:h-48 bg-gray-800 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={formData.imageUrl}
                        alt="Event preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-event.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="min-h-[44px] min-w-[44px] px-4 py-2 border border-white/20 rounded hover:bg-white/10 flex items-center gap-2 justify-center"
                  >
                    <FiX /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] min-w-[44px] px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 flex items-center gap-2 justify-center"
                    disabled={uploadingImage}
                  >
                    <FiSave /> {isAdding ? 'Add Event' : 'Update Event'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events Table (Desktop) and Cards (Mobile) */}
          <div className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No events found</p>
                <button
                  onClick={() => setIsAdding(true)}
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center gap-2 mx-auto min-h-[44px] min-w-[44px]"
                >
                  <FiPlus /> Create Your First Event
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium">Event</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Organization</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Location</th>
                        <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {events.map((event) => (
                        <tr key={event._id} className="hover:bg-gray-800/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden border border-white/10">
                                <img
                                  src={event.imageUrl}
                                  alt={event.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.src = '/placeholder-event.jpg';
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-medium">{event.name}</div>
                                <div className="text-sm text-gray-400 line-clamp-1">{event.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">{event.organization}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm whitespace-nowrap">
                              {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">{event.location}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(event)}
                                className="min-h-[44px] min-w-[44px] p-2 text-yellow-400 hover:text-yellow-300 rounded-full hover:bg-yellow-400/10"
                                title="Edit"
                              >
                                <FiEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(event._id)}
                                className="min-h-[44px] min-w-[44px] p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-red-400/10"
                                title="Delete"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile Cards */}
                <div className="block md:hidden divide-y divide-white/10">
                  {events.map((event) => (
                    <div key={event._id} className="flex flex-col gap-2 p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={event.imageUrl}
                          alt={event.name}
                          className="h-14 w-14 rounded-md object-cover border border-white/10"
                          onError={(e) => { e.target.src = '/placeholder-event.jpg'; }}
                        />
                        <div>
                          <div className="font-semibold">{event.name}</div>
                          <div className="text-xs text-gray-400">{event.organization}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">{event.description}</div>
                      <div className="flex flex-wrap text-xs gap-2 mt-2">
                        <span className="flex items-center gap-1"><FiCalendar /> {new Date(event.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><FiMapPin /> {event.location}</span>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="min-h-[44px] min-w-[44px] p-2 text-yellow-400 hover:text-yellow-300 rounded-full hover:bg-yellow-400/10"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="min-h-[44px] min-w-[44px] p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-red-400/10"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
