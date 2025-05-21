import {
  Plus,
  Download,
  Copy,
  Printer,
  FileText,
  Trash2 as Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const itemsPerPage = 10;

interface Counselor {
  _id: string;
  counselorName: string;
  mobileNo: string;
  email: string;
}

const CounselorData = () => {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/college/counselor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = Array.isArray(response.data)
        ? response.data
        : response.data.Data || [];

      setCounselors(result);
    } catch (error) {
      console.error("Error fetching Counselor:", error);
      setCounselors([]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Counselor?")) return;
    try {
      await axios.delete(`http://localhost:3000/college/counselor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCounselors((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting Counselor:", error);
    }
  };

  const filteredCounselors = counselors.filter((c) =>
    c.counselorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCounselors.length / itemsPerPage);
  const currentData = filteredCounselors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = async () => {
    try {
      const data = filteredCounselors.map(({ counselorName, mobileNo, email }) => ({
        counselorName,
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
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Counselors List", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Sr.No.", "Counselor Name", "Mobile No.", "Email"]],
      body: filteredCounselors.map((item, index) => [
        index + 1,
        item.counselorName,
        item.mobileNo,
        item.email,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [99, 88, 159] },
    });

    doc.save("Counselors.pdf");
  };

  const csvData = [
    ["Sr.No.", "Counselor Name", "Mobile No.", "Email"],
    ...filteredCounselors.map((item, index) => [
      index + 1,
      item.counselorName,
      item.mobileNo,
      item.email,
    ]),
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Counselors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={() => (window.location.href = "/counselorform")}
          className="w-full sm:w-auto bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Counselor
        </button>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:flex gap-2 mb-4">
        <button
          onClick={handleCopy}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          <span>{copySuccess ? "Copied!" : "Copy"}</span>
        </button>

        <CSVLink
          data={csvData}
          filename="counselors.csv"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> CSV
        </CSVLink>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> PDF
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr.No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell ">Counselor Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell  ">Mobile</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell ">Email</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell  ">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item._id} className="border-t">
                  <td className="p-2 text-center hidden sm:table-cell">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.counselorName}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.mobileNo}</td>
                  <td className="p-2 text-center hidden md:table-cell">{item.email}</td>
                  <td className="p-2 text-center hidden md:table-cell">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className=" text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                  No counselors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#63589F] text-white hover:bg-[#7468B7]"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#63589F] text-white hover:bg-[#7468B7]"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CounselorData;
