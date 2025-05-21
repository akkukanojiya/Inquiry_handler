import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Copy, Download, FileText, Printer, Trash2 } from "lucide-react";
interface Faculty {
  _id: string;
  facultyName: string;
  mobileNo: string;
  email: string;

}

const MasterFacultyList = () => {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [copySuccess, setCopySuccess] = useState(false);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchFaculty = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/masterAdmin/faculty", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res);
        

        const data = Array.isArray(res.data) ? res.data : res.data.faculty || [];
        setFacultyData(data);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFaculty();
  }, []);

  const filteredData = facultyData.filter((item: any) =>
    item.facultyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      axios
        .delete(`http://localhost:3000/masterAdmin/faculty/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setFacultyData((prev) => prev.filter((item: any) => item._id !== id));
        })
        .catch((err) => console.error("Delete failed:", err));
    }
  };

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
    const doc = new jsPDF();
    doc.text("Faculty List", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["#",  "Faculty Name", "Email", "Mobile No.",  ]],
      body: filteredData.map((item: any, index) => [
        index + 1,
        item.userName,
        item.facultyName,
        item.email,
        item.mobileNo,
        item.password,
      ]),
    });

    doc.save("Faculty-List.pdf");
  };

  const csvData = [
    ["#", "Faculty Name", "Email", "Mobile No.",  ],
    ...filteredData.map((item: any, index) => [
      index + 1,
      item.userName,
      item.facultyName,
      item.email,
      item.mobileNo,
      item.password,
    ]),
  ];

  return (
    <div className="p-4">
      {/* Search & Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <nav className="text-sm">
          <ol className="list-reset flex text-gray-600">
            <li><span className="hover:text-gray-900">Faculty List</span></li>
          </ol>
        </nav>
        <input
          type="text"
          placeholder="Search faculty name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F]"
        />
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4">
        <button
          onClick={handleCopy}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copySuccess ? "Copied!" : "Copy"}
        </button>
        <CSVLink
          data={csvData}
          filename="faculty-list.csv"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          CSV
        </CSVLink>
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr. No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Faculty Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Email</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Mobile No.</th>
              
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((item: any, index) => (
              <tr key={item._id || index} className="hover:bg-gray-50">
                <td className="p-2 text-center hidden sm:table-cell">{indexOfFirstRow + index + 1}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.facultyName}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.email}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.mobileNo}</td>
                
                <td className="p-2 text-center hidden sm:table-cell">
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

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#63589F] rounded text-white disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#63589F] rounded text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MasterFacultyList;
