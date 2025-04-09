import { Plus, Trash2, Download, Copy, Printer, FileText } from "lucide-react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const counselors = [
  { id: 1, name: "Charlie", mobile: "1234567890", email: "charlie@example.com" },
  { id: 2, name: "Max", mobile: "0987654321", email: "max@example.com" },
  { id: 3, name: "Bella", mobile: "1112223334", email: "bella@example.com" },
  { id: 4, name: "John", mobile: "4445556667", email: "john@example.com" },
  { id: 5, name: "Sara", mobile: "7778889990", email: "sara@example.com" },
  { id: 6, name: "Mike", mobile: "1239876543", email: "mike@example.com" },
];

const itemsPerPage = 4;

const MasterCollegeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const filteredCounselors = counselors.filter((counselor) =>
    counselor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCounselors.length / itemsPerPage);
  const currentData = filteredCounselors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => alert(`Delete triggered for ID: ${id}`);

  const handleCopy = async () => {
    try {
      const data = filteredCounselors.map(({ name, mobile, email }) => ({
        name,
        mobile,
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
      doc.text("Counselors List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
      
      autoTable(doc, {
        startY: 30,
        head: [["Sr.No.", "College Name", "Mobile No.", "Email", ]],
        body: filteredCounselors.map((item, index) => [
          index + 1,
          item.name,
          item.mobile,
          item.email,
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 88, 159] },
      });
      
      doc.save("Counselors.pdf");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const csvData = [
    ["Sr.No.", "College Name", "Mobile No.", "Email"],
    ...filteredCounselors.map((item, index) => [
      index + 1,
      item.name,
      item.mobile,
      item.email,
    ]),
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4">
        <input
          type="text"
          placeholder="Search counselors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={() => (window.location.href = "/mastercollegeform")}
          className="w-full sm:w-auto bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] transition-colors flex items-center justify-center sm:justify-start gap-2"
        >
          <Plus className="w-5 h-5" /> Add College
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
          filename="counselors.csv"
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
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black dark:text-black uppercase tracking-wider">Sr.No.</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black dark:text-black uppercase tracking-wider">College Name</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black dark:text-black uppercase tracking-wider hidden sm:table-cell">Mobile</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black dark:text-black uppercase tracking-wider hidden md:table-cell">Email</th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black dark:text-black uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.name}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden sm:table-cell">{item.mobile}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden md:table-cell">{item.email}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                  No Colleges found
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
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-3 sm:px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#63589F] text-white hover:bg-[#7468B7]"
              } transition-colors`}
            >
              Previous
            </button>
            <span className="px-3 sm:px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-3 sm:px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#63589F] text-white hover:bg-[#7468B7]"
              } transition-colors`}
            >
              Next
            </button>
          </div>
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

export default MasterCollegeList;