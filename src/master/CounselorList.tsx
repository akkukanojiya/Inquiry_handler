import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Copy, Download, FileText, Printer, Trash2 } from "lucide-react";

interface Counselor {
  _id: string;
  username: string;
  counselorName: string;
  email: string;
  mobileNo: string;

}

const MasterCounselorList = () => {
  const [data, setData] = useState<Counselor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [copySuccess, setCopySuccess] = useState(false);
  const rowsPerPage = 5;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/masterAdmin/counselor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", res.data);

      // If response is an object with counselors key: { counselors: [...] }
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else if (Array.isArray(res.data.counselor)) {
        setData(res.data.counselor);
      } else {
        console.error("Invalid data format received from API");
        setData([]); // fallback
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setData([]); // fallback
    }
  };

  const deleteCounselor = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/masterAdmin/counselor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // refresh list
    } catch (err) {
      console.error("Failed to delete counselor:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    (item.username ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );



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
      console.error("Failed to copy data:", err);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Counselor List", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Sr. No.", "Counselor Name", "Mobile", "Email", "College"]],
      body: filteredData.map((item, index) => [
        index + 1,
        item.username,
        item.counselorName,
        item.mobileNo,
        item.email,

      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [99, 88, 159] },
    });

    doc.save("counselor-list.pdf");
  };

  const csvData = [
    ["Sr. No.", "Conselor Name", "Mobile", "Email", "College"],
    ...filteredData.map((item, index) => [
      index + 1,
      item.username,
      item.counselorName,
      item.mobileNo,
      item.email,

    ]),
  ];

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <nav className="text-sm">
          <ol className="list-reset flex text-gray-600">
            <li><a href="#" className="hover:text-gray-900">Counselor List</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">Counselors</li>
          </ol>
        </nav>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
        />
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4">
        <button
          onClick={handleCopy}
          className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copySuccess ? "Copied!" : "Copy"}
        </button>

        <CSVLink
          data={csvData}
          filename="counselor-list.csv"
          className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          CSV
        </CSVLink>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr. No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Counselor Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Mobile</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Email</th>

              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 text-sm">
                <td className="p-2 text-center hidden sm:table-cell">{indexOfFirstRow + index + 1}</td>

                <td className="p-2 text-center hidden sm:table-cell">{item.counselorName}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.mobileNo}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.email}</td>

                <td className="p-2 text-center hidden sm:table-cell">
                  <button
                    onClick={() => deleteCounselor(item._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
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

export default MasterCounselorList;
