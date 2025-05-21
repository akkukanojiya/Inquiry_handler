import { Plus, Trash2, Download, Copy, Printer, FileText } from "lucide-react";
import { useEffect, useState,useRef  } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const itemsPerPage = 10;

interface College {
  id: number;
  collegeName: string;
  mobileNo: string;
  email: string;
}

const MasterCollegeList = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [collegeList, setCollegeList] = useState<College[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      try {
        const res = await axios.get("http://localhost:3000/masterAdmin/college", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data) ? res.data : res.data.colleges || [];
        setCollegeList(data);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };
    fetchColleges();
  }, []);

  const filteredColleges = collegeList.filter((college) =>
    college.collegeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);
  const currentData = filteredColleges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this college?")) {
      axios
        .delete(`http://localhost:3000/masterAdmin/college/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setCollegeList((prev) => prev.filter((item) => item.id !== id)))
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const handleCopy = async () => {
    try {
      const data = filteredColleges.map(({ collegeName, mobileNo, email }) => ({
        collegeName,
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
    doc.setFontSize(16).text("College List", 14, 15);
    doc.setFontSize(10).text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [["Sr.No.", "College Name", "Mobile No.", "Email"]],
      body: filteredColleges.map((item, index) => [
        index + 1,
        item.collegeName,
        item.mobileNo,
        item.email,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [99, 88, 159] },
    });
    doc.save("CollegeList.pdf");
  };

  const csvData = [
    ["Sr.No.", "College Name", "Mobile No.", "Email"],
    ...filteredColleges.map((item, index) => [
      index + 1,
      item.collegeName,
      item.mobileNo,
      item.email,
    ]),
  ];

  return (
    <div className="p-4">
      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search colleges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={() => (window.location.href = "/mastercollegeform")}
          className="w-full sm:w-auto bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add College
        </button>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:flex gap-2 mb-4">
        <button onClick={handleCopy} className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2">
          <Copy className="w-4 h-4" />
          {copySuccess ? "Copied!" : "Copy"}
        </button>
        <CSVLink data={csvData} filename="colleges.csv" className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
          <FileText className="w-4 h-4" /> CSV
        </CSVLink>
        <button onClick={exportPDF} className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 flex items-center gap-2">
          <Download className="w-4 h-4" /> PDF
        </button>
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow" id="print-area" ref={tableRef}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" >
          <thead className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-center text-xs font-bold text-black uppercase">Sr.No.</th>
              <th className="px-4 py-2 text-center text-xs font-bold text-black uppercase">College Name</th>
              <th className="px-4 py-2 text-center text-xs font-bold text-black uppercase">Mobile</th>
              <th className="px-4 py-2 text-center text-xs font-bold text-black uppercase">Email</th>
              <th className="px-4 py-2 text-center text-xs font-bold text-black uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr
                  key={item.id}
                  className="flex flex-col md:table-row border-b md:border-0"
                >
                  <td className="px-4 py-2 before:content-['Sr.No.'] md:before:content-none before:font-bold md:text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 before:content-['College Name'] md:before:content-none before:font-bold md:text-center">
                    {item.collegeName}
                  </td>
                  <td className="px-4 py-2 before:content-['Mobile'] md:before:content-none before:font-bold md:text-center">
                    {item.mobileNo}
                  </td>
                  <td className="px-4 py-2 before:content-['Email'] md:before:content-none before:font-bold md:text-center">
                    {item.email}
                  </td>
                  <td className="px-4 py-2 md:text-center">
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 dark:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">No colleges found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#63589F] text-white hover:bg-[#7468B7]"}`}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-[#63589F] text-white hover:bg-[#7468B7]"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MasterCollegeList;
