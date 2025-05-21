import { Plus, Trash2, Download, Copy, Printer, FileText, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

// Define Faculty interface
interface Faculty {
  _id: string;
  facultyName: string;
  mobileNo: string;
  email: string;
}

const itemsPerPage = 10;

const Faculties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [faculties, setFaculties] = useState<Faculty[]>([]); // Use Faculty[] type
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);
// const [showModalData, setShowModalData] = useState<Faculty | null>(null);
   
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:3000/college/faculty", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = Array.isArray(response.data)
        ? response.data
        : response.data.Data || [];

      setFaculties(result);
    } catch (error) {
      console.error("Error fetching faculties:", error);
      setFaculties([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const currentData = filteredFaculties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      await axios.delete(`http://localhost:3000/college/faculty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFaculties((prev) => prev.filter((faculty) => faculty._id !== id));
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleCopy = async () => {
    try {
      const data = filteredFaculties.map(({ facultyName, mobileNo, email }) => ({
        facultyName,
        mobileNo,
        email,
      }));
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy data:", err);
    }
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("Faculties List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [["Sr.No.", "Faculty Name", "Mobile No.", "Email"]],
        body: filteredFaculties.map((item, index) => [
          index + 1,
          item.facultyName,
          item.mobileNo,
          item.email,
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 88, 159] },
      });

      doc.save("Faculties.pdf");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const csvData = [
    ["Sr.No.", "Faculty Name", "Mobile No.", "Email"],
    ...filteredFaculties.map((item, index) => [
      index + 1,
      item.facultyName,
      item.mobileNo,
      item.email,
    ]),
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4">
        <input
          type="text"
          placeholder="Search Faculties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={() => (window.location.href = "/facultiesform")}
          className="w-full sm:w-auto bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] transition-colors flex items-center justify-center sm:justify-start gap-2"
        >
          <Plus className="w-5 h-5" /> Add Faculties
        </button>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4">
        <button
          onClick={handleCopy}
          className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">{copySuccess ? "Copied!" : "Copy"}</span>
        </button>

        <CSVLink
          data={csvData}
          filename="faculties.csv"
          className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">CSV</span>
        </CSVLink>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr.No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Faculty Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell ">Mobile</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell  ">Email</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">Loading...</td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="p-2 text-center hidden sm:table-cell">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.facultyName}</td>
                  <td className="p-2 text-center hidden sm:table-cell ">{item.mobileNo}</td>
                  <td className="p-2 text-center hidden sm:table-cell ">{item.email}</td>
                  <td className="p-2 text-center hidden sm:table-cell">
                  {/* <button onClick={() => setShowModalData(item)} className="text-blue-600">
                    <Eye size={20} />
                  </button> */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                  No Faculties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center mt-4 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className="px-3 py-1 text-sm text-white bg-[#63589F] rounded-md hover:bg-[#7468B7]"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className="px-3 py-1 text-sm text-white bg-[#63589F] rounded-md hover:bg-[#7468B7]"
            >
              Next
            </button>
          </div>
        </div>
      )}



       {/* Show Modal */}
       {/* {showModalData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-xl text-[#63589F] font-bold mb-6">Faculty Details</h2>
            <ul className="space-y-2">
              <li><b>Full Name:</b> {showModalData.facultyName}</li>
              <li><b>Mobile No:</b> {showModalData.mobileNo}</li>
              <li><b>Email:</b> {showModalData.email}</li>
               
            </ul>
            <button onClick={() => setShowModalData(null)} className="mt-4 px-4 py-2 bg-[#63589F] text-white rounded">
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Faculties;
