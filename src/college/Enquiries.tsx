import { useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Copy, Download, FileText, Printer } from "lucide-react";

const DataTable = () => {
  const data = [
    { id: 1, name: "Aakash", role: "Admin" },
    { id: 2, name: "Suresh", role: "Editor" },
    { id: 3, name: "Harshil", role: "Developer" },
    { id: 4, name: "Jaimin", role: "Developer" },
    { id: 5, name: "Harsh", role: "BDE" },
    { id: 6, name: "harsh", role: "intern" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const rowsPerPage = 3;

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Export handlers
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(filteredData, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy data:", err);
    }
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add title and date
      doc.setFontSize(16);
      doc.text("Inquiry List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
      
      autoTable(doc, {
        startY: 30,
        head: [["Sr. No.", "Form No.", "Date", "Course", "Name", "Mobile No.", "Form Filled By", "Counselor", "Status"]],
        body: filteredData.map((item, index) => [
          index + 1,
          "",
          "",
          "",
          item.name,
          "",
          "",
          "",
          "",
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 88, 159] },
      });
      
      doc.save("Inquiry-List.pdf");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const csvData = [
    ["Sr. No.", "Form No.", "Date", "Course", "Name", "Mobile No.", "Form Filled By", "Counselor", "Status"],
    ...filteredData.map((item, index) => [
      index + 1,
      "",
      "",
      "",
      item.name,
      "",
      "",
      "",
      "",
    ]),
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <nav className="text-sm">
          <ol className="list-reset flex text-gray-600">
            <li><a href="#" className="hover:text-gray-900">All Inquiry</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">Inquiry Table</li>
          </ol>
        </nav>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
        />
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
          filename="inquiry-list.csv"
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
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Sr. No.</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Form No.</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Course</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Mobile No.</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Form Filled By</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Counselor</th>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 text-sm sm:text-base">
                <td className="px-2 sm:px-4 py-2 text-center">{item.id}</td>
                <td className="px-2 sm:px-4 py-2 text-center"></td>
                <td className="px-2 sm:px-4 py-2"></td>
                <td className="px-2 sm:px-4 py-2"></td>
                <td className="px-2 sm:px-4 py-2">{item.name}</td>
                <td className="px-2 sm:px-4 py-2"></td>
                <td className="px-2 sm:px-4 py-2"></td>
                <td className="px-2 sm:px-4 py-2"></td>
                <td className="px-2 sm:px-4 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#63589F] rounded text-white disabled:opacity-50 hover:bg-[#7468B7] transition-colors"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#63589F] rounded text-white disabled:opacity-50 hover:bg-[#7468B7] transition-colors"
        >
          Next
        </button>
      </div>

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
        }
      `}</style>
    </div>
  );
};

export default DataTable;