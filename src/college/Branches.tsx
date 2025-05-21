import { useEffect, useState } from "react";
import { Plus, Trash2, Download, Copy, Printer, FileText } from "lucide-react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

interface Branch {
  _id: string;
  branchName: string;
  course: {
    courseName: string;
  } | null;
  seats: number;
  remaining_seats: number;
  filled_seats: string;
}

const itemsPerPage = 10;

const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:3000/college/branch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = Array.isArray(response.data.branches) ? response.data.branches : [];
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches([]);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/college/branch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBranches();
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const filteredBranches = branches.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const currentData = filteredBranches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCopy = async () => {
    try {
      const data = filteredBranches.map(({ branchName, course, seats, remaining_seats }) => ({
        branchName,
        courseName: course?.courseName || "N/A",
        seats,
        remaining_seats,
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
      doc.setFontSize(16);
      doc.text("Branches List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
      autoTable(doc, {
        startY: 30,
        head: [["Sr.No.", "Branch", "Course", "Seats", "Remaining Seats,","filled_seats"]],
        body: filteredBranches.map((item, index) => [
          index + 1,
          item.branchName,
          item.course?.courseName || "N/A",
          item.seats,
          item.remaining_seats,
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 88, 159] },
      });
      doc.save("Branches.pdf");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const csvData = [
    ["Sr.No.", "Branch", "Course", "Seats", "Remaining Seats","filled_seats"],
    ...filteredBranches.map((item, index) => [
      index + 1,
      item.branchName,
      item.course?.courseName || "N/A",
      item.seats,
      item.remaining_seats,
    ]),
  ];

  return (
    <div className="p-4">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search Branches..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F]"
        />
        <button
          onClick={() => (window.location.href = "/branchesform")}
          className="bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Branch
        </button>
      </div>

      {/* Export */}
      <div className="grid grid-cols-2 sm:flex gap-2 mb-4">
        <button onClick={handleCopy} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2">
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">{copySuccess ? "Copied!" : "Copy"}</span>
        </button>
        <CSVLink
          data={csvData}
          filename="Branches.csv"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" /> <span className="hidden sm:inline">CSV</span>
        </CSVLink>
        <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2">
          <Download className="w-4 h-4" /> <span className="hidden sm:inline">PDF</span>
        </button>
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
          <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr.No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Branch</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Course</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Seats</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Remaining</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Filled Seats</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="p-2 text-center hidden sm:table-cell">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.branchName}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.course?.courseName || "N/A"}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.seats}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.remaining_seats}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.filled_seats}</td>
                  <td className="p-2 text-center hidden sm:table-cell">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">No Branches found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#63589F] text-white hover:bg-[#7468B7]"}`}
          >
            Previous
          </button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#63589F] text-white hover:bg-[#7468B7]"}`}
          >
            Next
          </button>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .overflow-x-auto, .overflow-x-auto * {
            visibility: visible;
          }
          .overflow-x-auto {
            position: absolute;
            left: 0;
            top: 0;
          }
          button, .pagination {
            display: none;
          }
          .hidden {
            display: table-cell !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Branches;
