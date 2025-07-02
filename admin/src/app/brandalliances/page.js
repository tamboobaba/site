'use client';
import { useState, useEffect } from 'react';
import { FiDownload, FiEye, FiSearch, FiTrash2, FiFileText, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Navbar} from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function BrandAlliancesAdmin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/brandalliances');
      if (!res.ok) throw new Error('Failed to fetch requests');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(request =>
    request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    
    try {
      const response = await fetch(`/api/brandalliances/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete request');

      toast.success('Request deleted successfully');
      fetchRequests();
    } catch (error) {
      toast.error(error.message);
    }
  };


  // Fetch the user's public IP address using ipify
async function getPublicIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch (err) {
    return 'Unavailable';
  }
}

const generateAllUsersPDF = async (requests) => {
  const userIP = await getPublicIP();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Theme colors
  const primaryColor = [34, 41, 47];
  const accentColor = [245, 158, 11];
  const bluishSectionHeader = [10, 35, 75];
  const margin = 16;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Watermark
  function addWatermark(doc, pageWidth, pageHeight) {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({opacity: 0.10}));
    doc.setFontSize(60);
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'bold');
    doc.text('Tamboo Baba', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
    doc.restoreGraphicsState();
  }

  // --- Watermark on first page
  addWatermark(doc, pageWidth, pageHeight);

  // --- Title
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text('Brand Alliances - All Requests', pageWidth / 2, 18, { align: 'center' });

  // --- Subtle gold line
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(1);
  doc.line(margin, 24, pageWidth - margin, 24);

  let y = 32;

  // --- Table Data ---
  const headers = [
    "S. No.",
    "Company Name", "Contact Name", "Email", "Phone", "Website", "Budget"
  ];
  // , "Timeframe"
  const rows = (requests || []).map((req, idx) => [
    idx + 1,
    req.companyName || "",
    req.contactName || "",
    req.email || "",
    String(req.phone || ""),
    req.website || "",
    req.budget || ""
    // req.timeframe || ""
  ]);

  // --- Table ---
  autoTable(doc, {
    startY: y,
    head: [headers],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: bluishSectionHeader, textColor: 255, fontStyle: 'bold' },
    bodyStyles: { textColor: primaryColor, font: 'times', fontSize: 11 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: margin, right: margin },
    styles: { font: 'times', fontSize: 11, cellPadding: 2 },
    didDrawPage: () => addWatermark(doc, pageWidth, pageHeight)
  });

  // --- Footer with all details and confidential alert ---
  const footerY = pageHeight - 32;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100);
  const footerLines = [
    'Website: www.tamboobaba.com',
    'Office: Ludhiana',
    'Confidential Data – Generated for Tamboo Baba Office Use Only',
    `Generated on: ${new Date().toLocaleString()}`,
    `IP Address: ${userIP}`
  ];
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    footerLines.forEach((line, idx) => {
      doc.text(line, margin, footerY + idx * 5);
    });
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
  }

  doc.save('brand-alliances-all-requests.pdf');
};








const generatePDF = async (request) => {
  const userIP = await getPublicIP(); // <-- fetch IP here

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Colors and layout
  const primaryColor = [34, 41, 47];
  const accentColor = [245, 158, 11];
  const bluishSectionHeader = [10, 35, 75];
  const sectionBg = [245, 245, 245];
  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const usableWidth = pageWidth - 2 * margin;
  let y = 20;
  const lineHeight = 8;

  // Watermark function for use in didDrawPage
  function addWatermark(doc, pageWidth, pageHeight) {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({opacity: 0.10}));
    doc.setFontSize(60);
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'bold');
    doc.text('Tamboo Baba', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
    doc.restoreGraphicsState();
  }

  // Helper: Section header
  const addSectionHeader = (text) => {
    if (y > pageHeight - 20) { 
      doc.addPage(); 
      y = 20; 
    }
    doc.setFillColor(...bluishSectionHeader);
    doc.setTextColor(255,255,255);
    doc.setFont('times', 'bolditalic');
    doc.rect(margin, y, usableWidth, 10, 'F');
    doc.text(text, margin + 4, y + 7);
    y += 13;
    doc.setTextColor(...primaryColor);
    doc.setFont('times', 'normal');
  };

  // Helper: Wrapped text with page break
  const addWrappedText = (text, fontSize = 11, fontStyle = 'normal') => {
    doc.setFontSize(fontSize);
    doc.setFont('times', fontStyle);
    const split = doc.splitTextToSize(text, usableWidth);
    for (let line of split) {
      if (y > pageHeight - 20) { 
        doc.addPage(); 
        y = 20; 
      }
      doc.text(line, margin, y);
      y += 6;
    }
    doc.setFont('times', 'normal');
  };

  // --- First page watermark ---
  addWatermark(doc, pageWidth, pageHeight);

  // Logos
  doc.addImage('/hero-image.png', 'PNG', margin, 10, 30, 15);
  if (request.logo) {
    let logoData = request.logo;
    if (!logoData.startsWith('data:')) {
      try {
        const response = await fetch(request.logo);
        const blob = await response.blob();
        logoData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        logoData = null;
      }
    }
    if (logoData) {
      doc.addImage(
        logoData,
        'PNG',
        pageWidth - margin - 30,
        10,
        30,
        15
      );
    }
  }

  // Title
  doc.setFont('times', 'bolditalic');
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text('Brand Alliance Request', pageWidth / 2, 22, { align: 'center' });

  // Subtle gold line
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(1);
  doc.line(margin, 28, pageWidth - margin, 28);

  y = 35;

  // --- Company Info Section ---
  doc.setFontSize(25);
  addSectionHeader('Company Information');
  y += 10;

  // Company Name: Highlight (bold, dark blue, no background)
  doc.setFontSize(13);
  doc.setFont('times', 'bold');
  doc.setTextColor(...bluishSectionHeader);
  doc.text(`Company Name: ${request.companyName}`, margin, y);
  y += 10;

  // The rest (not highlighted)
  doc.setFontSize(11);
  doc.setFont('times', 'normal');
  doc.setTextColor(...primaryColor);
  addWrappedText(`Contact Person: ${request.contactName}`);
  addWrappedText(`Email: ${request.email}`);
  addWrappedText(`Phone: ${request.phone || 'Not provided'}`);
  addWrappedText(`Website: ${request.website || 'Not provided'}`);

  // --- Areas of Interest Table ---
  addSectionHeader('Areas of Interest');
  autoTable(doc, {
    startY: y,
    head: [['Area']],
    body: (request.interests || []).map((interest) => [interest]),
    theme: 'grid',
    headStyles: { fillColor: accentColor, textColor: 255, fontStyle: 'bold' },
    bodyStyles: { fillColor: sectionBg, textColor: primaryColor },
    alternateRowStyles: { fillColor: [255,255,255] },
    margin: { left: margin, right: margin },
    styles: { font: 'times', fontSize: 11, cellPadding: 2 },
    didDrawPage: (data) => {
      addWatermark(doc, pageWidth, pageHeight);
      y = data.cursor.y + 10;
    }
  });

  // --- Event Interests Table ---
  addSectionHeader('Event Interests');
  autoTable(doc, {
    startY: y,
    head: [['Event Type']],
    body: (request.eventTypes || []).map((event) => [event]),
    theme: 'grid',
    headStyles: { fillColor: accentColor, textColor: 255, fontStyle: 'bold' },
    bodyStyles: { fillColor: sectionBg, textColor: primaryColor },
    alternateRowStyles: { fillColor: [255,255,255] },
    margin: { left: margin, right: margin },
    styles: { font: 'times', fontSize: 11, cellPadding: 2 },
    didDrawPage: (data) => {
      addWatermark(doc, pageWidth, pageHeight);
      y = data.cursor.y + 10;
    }
  });

  // --- Support Offered Table ---
  addSectionHeader('Support Offered');
  autoTable(doc, {
    startY: y,
    head: [['Support Type']],
    body: (request.supportTypes || []).map((support) => [support]),
    theme: 'grid',
    headStyles: { fillColor: accentColor, textColor: 255, fontStyle: 'bold' },
    bodyStyles: { fillColor: sectionBg, textColor: primaryColor },
    alternateRowStyles: { fillColor: [255,255,255] },
    margin: { left: margin, right: margin },
    styles: { font: 'times', fontSize: 11, cellPadding: 2 },
    didDrawPage: (data) => {
      addWatermark(doc, pageWidth, pageHeight);
      y = data.cursor.y + 10;
    }
  });

  // --- Additional Info ---
  addSectionHeader('Additional Information');
  y += 5;
  addWrappedText(`Budget: ${request.budget || 'Not specified'}`);
  addWrappedText(`Timeframe: ${request.timeframe || 'Not specified'}`);
  addWrappedText(`Expectations: ${request.expectations || 'Not specified'}`);
  addWrappedText(`Additional Message: ${request.additionalMessage || 'Not provided'}`);

  // --- Company Description ---
  addSectionHeader('Company Description');
  y += 5;
  addWrappedText(request.companyDescription || 'Not provided', 11, 'italic');

  // --- Collaboration Reason ---
  addSectionHeader('Collaboration Reason');
  y += 5;
  addWrappedText(request.collaborationReason || 'Not provided', 11, 'italic');

  // --- Brochure ---
  addSectionHeader('Brochure Requested');
  y += 5;
  addWrappedText(`Asked for Brochure: ${request.sendBrochure === true ? 'Yes' : 'No'}`);

  // --- Footer with all details and confidential alert ---
  if (y > pageHeight - 50) { 
    doc.addPage(); 
    y = 20; 
    addWatermark(doc, pageWidth, pageHeight); 
  }
  y = pageHeight - 45;
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100);
  const footerLines = [
    'Website: www.tamboobaba.com',
    'Office: Ludhiana',
    'Confidential Data – Generated for Tamboo Baba Office Use Only',
    `Generated on: ${new Date().toLocaleString()}`,
    `IP Address: ${userIP}`  ];
  footerLines.forEach((line, index) => {
    doc.text(line, margin, y + index * 6);
  });

  // --- Page numbers ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
  }

  doc.save(`brand-alliance-${request.companyName}.pdf`);
};


return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-white p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-yellow-400">Brand Alliance Requests</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => generateAllUsersPDF(requests)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-semibold shadow transition w-full md:w-auto"
              >
                <FiDownload className="inline-block" />
                Download All Requests PDF
              </button>
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="bg-gray-800 border border-white/10 rounded-lg pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : (
            <>
              {/* Table (Desktop) */}
              <div className="hidden md:block bg-gray-900/50 border border-white/10 rounded-xl overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left">Company</th>
                      <th className="px-4 md:px-6 py-3 text-left">Contact</th>
                      <th className="px-4 md:px-6 py-3 text-left">Email</th>
                      <th className="px-4 md:px-6 py-3 text-left">Interests</th>
                      <th className="px-4 md:px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredRequests.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-800/50">
                        <td className="px-4 md:px-6 py-4 break-words">{request.companyName}</td>
                        <td className="px-4 md:px-6 py-4 break-words">{request.contactName}</td>
                        <td className="px-4 md:px-6 py-4 break-words">{request.email}</td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {request.interests.map((interest, i) => (
                              <span key={i} className="bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded text-xs break-words">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsModalOpen(true);
                              }}
                              className="p-2 text-blue-400 hover:text-blue-300 rounded-full hover:bg-blue-400/10"
                              title="View Details"
                            >
                              <FiEye />
                            </button>
                            <button
                              onClick={() => generatePDF(request)}
                              className="p-2 text-green-400 hover:text-green-300 rounded-full hover:bg-green-400/10"
                              title="Download PDF"
                            >
                              <FiDownload />
                            </button>
                            <button
                              onClick={() => handleDelete(request._id)}
                              className="p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-red-400/10"
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
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    No brand alliance requests found
                  </div>
                )}
              </div>

              {/* Card View (Mobile) */}
              <div className="block md:hidden">
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    No brand alliance requests found
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  {filteredRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-gray-900/50 border border-white/10 rounded-xl p-4 flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-yellow-400 text-base">{request.companyName}</div>
                          <div className="text-sm text-gray-300">{request.contactName}</div>
                          <div className="text-xs text-gray-400 break-all">{request.email}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-blue-400 hover:text-blue-300 rounded-full hover:bg-blue-400/10"
                            title="View Details"
                          >
                            <FiEye />
                          </button>
                          <button
                            onClick={() => generatePDF(request)}
                            className="p-2 text-green-400 hover:text-green-300 rounded-full hover:bg-green-400/10"
                            title="Download PDF"
                          >
                            <FiDownload />
                          </button>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-red-400/10"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {request.interests.map((interest, i) => (
                          <span key={i} className="bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded text-xs break-words">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Request Detail Modal */}
        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4 sm:p-6 max-w-full sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                <h2 className="text-lg sm:text-xl font-bold text-yellow-400">
                  {selectedRequest.companyName}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white self-end"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p><span className="text-gray-400">Name:</span> {selectedRequest.contactName}</p>
                    <p><span className="text-gray-400">Email:</span> {selectedRequest.email}</p>
                    <p><span className="text-gray-400">Phone:</span> {selectedRequest.phone || 'Not provided'}</p>
                    <p><span className="text-gray-400">Website:</span> {selectedRequest.website || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Collaboration Details</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p><span className="text-gray-400">Budget:</span> {selectedRequest.budget || 'Not specified'}</p>
                    <p><span className="text-gray-400">Timeframe:</span> {selectedRequest.timeframe || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Areas of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.interests.map((interest, i) => (
                    <span key={i} className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs sm:text-sm break-words">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Support Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.supportTypes.map((support, i) => (
                    <span key={i} className="bg-green-400/10 text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm break-words">
                      {support}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Company Description</h3>
                <p className="text-gray-300 text-sm sm:text-base">{selectedRequest.companyDescription}</p>
              </div>

              {selectedRequest.collaborationReason && (
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Reason for Collaboration</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{selectedRequest.collaborationReason}</p>
                </div>
              )}

              {selectedRequest.additionalMessage && (
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Additional Message</h3>
                  <p className="text-gray-300 text-sm sm:text-base">{selectedRequest.additionalMessage}</p>
                </div>
              )}

              {selectedRequest.logo && (
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Company Logo</h3>
                  <img
                    src={selectedRequest.logo}
                    alt={`${selectedRequest.companyName} logo`}
                    className="max-w-xs max-h-32 object-contain"
                  />
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => generatePDF(selectedRequest)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                  <FiDownload /> Download PDF
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/20 rounded hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}