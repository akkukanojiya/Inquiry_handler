import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';
import { AiOutlineClockCircle, } from 'react-icons/ai';
import { MdVerified } from "react-icons/md";
interface Document {
  url: string;
  uploadedAt: string;
  verified: boolean;
}

interface StudentDocument {
  _id: string;
  studentId: {
    _id: string;
    fullName: string;
  };
  sscMarksheet?: Document;
  hscMarksheet?: Document;
  leavingCertificate?: Document;
  passportPhoto?: Document;
  adharCard?: Document;
  digitalSignature?: Document;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ViewDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDocuments();
  }, []);

  const fetchStudentDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage.');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:3000/student/documents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      

      if (response.data.success) {
        setDocuments(response.data.data);
      } else {
        console.error('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDocumentLink = (doc?: Document, label?: string) => {
    if (doc) {
      const isImage = /\.(jpeg|jpg|png|webp|pdf)$/i.test(doc.url);

      return (
        <div className="flex flex-col gap-2">
          {isImage ? (
            <img
              src={doc.url}
              alt={label}
              className="w-40 h-32 object-cover rounded-md border shadow-sm"
              loading="lazy"
            />
          ) : (
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline break-words hover:text-indigo-800 transition-colors"
            >
              {label}
            </a>
          )}
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-700 font-medium text-sm">{label}</span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${doc.verified ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'
                }`}
              title={doc.verified ? 'Document Verified' : 'Document Not Verified'}
            >
              {doc.verified ? 'Verified' : 'Pending'}
            </span>
          </div>
          <a
            href={doc.url}
            download
            className="mt-2 inline-flex items-center gap-2 text-white bg-[#63589F] px-3 py-1.5 rounded-md shadow-md text-sm"
          >
            <Download className="w-4 h-4" /> Download
          </a>
        </div>
      );
    } else {
      return (
        <div className="text-red-500 font-semibold italic select-none">{label} Not Uploaded</div>
      );
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center md:text-left">
        Student Documents
      </h1>

      {loading ? (
        <div className="flex justify-center items-center space-x-2 text-gray-600">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
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
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="text-lg font-medium">Loading documents...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div
                key={doc._id}
                className="flex flex-col md:flex-row gap-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 p-6 bg-white"
              >
                <div className="flex-shrink-0 w-full md:w-64 flex flex-col gap-4">
                  <h2
                    className="text-xl font-semibold text-gray-800 text-center md:text-left"
                    title={doc.studentId.fullName}
                  >
                    {doc.studentId.fullName}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    {doc.status === 'verified' && (
                      <MdVerified  className="text-green-600 w-5 h-5" title="Verified" />
                    )}
                    {doc.status === 'pending' && (
                      <AiOutlineClockCircle className="text-yellow-500 w-5 h-5" title="Pending" />
                    )}


                    <span
                      className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${doc.status === 'verified'
                          ? 'bg-green-600'
                          : doc.status === 'pending'
                            ? 'bg-yellow-500'
                            : 'bg-red-600'
                        }`}
                      title={`Status: ${doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}`}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
                  {renderDocumentLink(doc.sscMarksheet, 'SSC Marksheet')}
                  {renderDocumentLink(doc.hscMarksheet, 'HSC Marksheet')}
                  {renderDocumentLink(doc.leavingCertificate, 'Leaving Certificate')}
                  {renderDocumentLink(doc.passportPhoto, 'Passport Photo')}
                  {renderDocumentLink(doc.adharCard, 'Adhar Card')}
                  {renderDocumentLink(doc.digitalSignature, 'Digital Signature')}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg italic">
              No documents found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewDocuments;
