import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Copy, Download,  FileText, Printer, Trash2 } from "lucide-react";
import axios from "axios";

interface CollegeRequest {
  _id: string;
  collegeName: string;
  email: string;
  faculty: string;
  branch: string;
  course: string;
}

const MasterCollegeRequest = () => {
  const [data, setData] = useState<CollegeRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rowsPerPage = 3;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3000/masterAdmin/request", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Debugging: log to check what response.data is
      console.log("API Response:", response.data);
  
      // Adjust this line depending on your backend response structure
      setData(Array.isArray(response.data) ? response.data : response.data.reqCollege
    ); 
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/masterAdmin/request/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the request.");
    }
  };

  const filteredData = data && Array.isArray(data)
  ? data.filter(item =>
      item?.collegeName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(filteredData, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("College Request List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [["Sr. No.", "College Name", "Email", "Faculties", "Branches", "Courses"]],
        body: filteredData.map((item, index) => [
          index + 1,
          item.collegeName || "",
          item.email || "",
          item.faculty || "",
          item.branch || "",
          item.course || "",
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 88, 159] },
      });

      doc.save("College-Requests.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
    }
  };

  const csvData = [
    ["Sr. No.", "College Name", "Email", "Faculties", "Branches", "Courses"],
    ...filteredData.map((item, index) => [
      index + 1,
      item.collegeName || "",
      item.email || "",
      item.faculty || "",
      item.branch || "",
      item.course || "",
    ]),
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-4">
        <nav className="text-sm">
          <ol className="flex text-gray-600">
            <li><a href="#"> Master College Requests</a></li>
            <li className="mx-2">/</li>
            <li className="text-gray-900">College Requests</li>
          </ol>
        </nav>
        <input
          type="text"
          placeholder="Search by college name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#63589F]"
        />
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4">
        <button onClick={handleCopy} className="bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">{copySuccess ? "Copied!" : "Copy"}</span>
        </button>
        <CSVLink
          data={csvData}
          filename="college-requests.csv"
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">CSV</span>
        </CSVLink>
        <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr. No.</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">College Name</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Faculties</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Branches</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Courses</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {currentRows.map((item, index) => (
                <tr key={item._id}>
                  <td className="p-2 text-center hidden sm:table-cell">{indexOfFirstRow + index + 1}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.collegeName}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.email}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.faculty}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.branch}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.course}</td>
                  <td className="p-2 text-center hidden sm:table-cell">
                    {/* <button className="text-green-600 hover:text-green-800 mr-2">
                      <EyeIcon className="w-5 h-5" />
                    </button> */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#63589F] text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#63589F] text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Print-only Styles */}
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

export default MasterCollegeRequest;
