import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const documentFields = [
  { label: "SSC Marksheet", field: "sscMarksheet" },
  { label: "HSC Marksheet", field: "hscMarksheet" },
  { label: "Leaving Certificate", field: "leavingCertificate" },
  { label: "Passport Photo", field: "passportPhoto" },
  { label: "Aadhar Card", field: "adharCard" },
  { label: "Digital Signature", field: "digitalSignature" },
];

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({});

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fieldName]: file }));
      setStatuses((prev) => ({ ...prev, [fieldName]: "Ready to upload ⏳" }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, fieldName: string) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFiles((prev) => ({ ...prev, [fieldName]: droppedFile }));
      setStatuses((prev) => ({ ...prev, [fieldName]: "Ready to upload ⏳" }));
    }
  };

  const handleClear = (fieldName: string) => {
    setFiles((prev) => ({ ...prev, [fieldName]: null }));
    setStatuses((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleUploadAll = async () => {
    const formData = new FormData();
    const token = localStorage.getItem("token");

    Object.keys(files).forEach((field) => {
      if (files[field]) {
        formData.append(field, files[field] as File);
      }
    });

    try {
      const response = await axios.post("http://localhost:3000/student/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 201 || response.status === 200) {
        const successStatuses = Object.keys(files).reduce((acc, field) => {
          acc[field] = "Uploaded ✅";
          return acc;
        }, {} as { [key: string]: string });

        setStatuses(successStatuses);
        toast.success("Documents uploaded successfully! ✅");
        console.log(successStatuses);
      } else {
        throw new Error("Upload failed");
      }

    } catch (error: any) {
      console.error("Upload error:", error);

      let errorMessage = "Document upload failed ❌";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);

      const errorStatuses = Object.keys(files).reduce((acc, field) => {
        acc[field] = "Error ❌";
        return acc;
      }, {} as { [key: string]: string });

      setStatuses(errorStatuses);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md font-sans">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Upload Student Documents
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentFields.map(({ label, field }) => (
          <div key={field} className="border p-4 rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-gray-700">{label}</label>
              {files[field] && (
                <button
                  onClick={() => handleClear(field)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div
              onDrop={(e) => handleDrop(e, field)}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-100 transition cursor-pointer"
            >
              <p className="text-sm text-gray-500">
                {files[field] ? "Drop to replace file" : `Drag & drop ${label} here`}
              </p>
            </div>

            <input
              type="file"
              onChange={(e) => handleFileInput(e, field)}
              className="mt-2 text-sm text-gray-600"
            />

            {files[field] && (
              <div className="mt-2 text-sm flex justify-between items-center">
                <span className="truncate text-gray-700">{files[field]?.name}</span>
                <span
                  className={`ml-4 ${
                    statuses[field]?.includes("✅")
                      ? "text-green-600"
                      : statuses[field]?.includes("❌")
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {statuses[field]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleUploadAll}
          className="bg-[#63589F] text-white font-semibold py-2 px-6 rounded-md"
        >
          Upload All Documents
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
