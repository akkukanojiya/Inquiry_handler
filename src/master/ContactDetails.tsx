import { useState, useEffect } from "react";
import axios from "axios";
import { Copy, Download, FileText, Printer, Trash2 } from "lucide-react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const MasterContactDetails = () => {
  const [data, setData] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const rowsPerPage = 3;

  const fetchData = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/masterAdmin/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const receivedData = response.data;

      if (Array.isArray(receivedData)) {
        setData(receivedData);
      } else if (receivedData && Array.isArray(receivedData.contact)) {
        setData(receivedData.contact);
      } else if (receivedData && typeof receivedData === "object") {
        const values = Object.values(receivedData).flat();
        if (Array.isArray(values)) {
          setData(values as Contact[]);
        } else {
          console.error("Invalid data structure", receivedData);
          setData([]);
        }
      } else {
        console.error("Invalid data format", receivedData);
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch contact data.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found");
      return;
    }

    axios
      .delete(`http://localhost:3000/masterAdmin/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);

        const lastPage = Math.ceil(updatedData.length / rowsPerPage);
        if (currentPage > lastPage) {
          setCurrentPage(lastPage);
        }

        alert("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        alert("Failed to delete item");
      });
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Inquiry List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [["Sr. No.", "Name", "Email", "Subject", "Message"]],
        body: filteredData.map((item, index) => [
          index + 1,
          item.name,
          item.email,
          item.subject,
          item.message,
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
    ["Sr. No.", "Name", "Email", "Subject", "Message"],
    ...filteredData.map((item, index) => [
      index + 1,
      item.name,
      item.email,
      item.subject,
      item.message,
    ]),
  ];

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-gray-500">Loading...</div>}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <nav className="text-sm">
          <ol className="list-reset flex text-gray-600">
            <li>
              <span className="hover:text-gray-900">Contact Details</span>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">Master</li>
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

      <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4">
        <button
          onClick={handleCopy}
          className="bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">{copySuccess ? "Copied!" : "Copy"}</span>
        </button>

        <CSVLink
          data={csvData}
          filename="inquiry-list.csv"
          className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">CSV</span>
        </CSVLink>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Sr. No.", "Name", "Email", "Subject", "Message", "Action"].map((heading) => (
                <th key={heading} className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-4">No data found</td></tr>
            ) : (
              currentRows.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 text-sm sm:text-base">
                  <td className="p-2 text-center hidden sm:table-cell">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.name}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.email}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.subject}</td>
                  <td className="p-2 text-center hidden sm:table-cell">{item.message}</td>
                  <td className="p-2 text-center hidden sm:table-cell">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#63589F] rounded text-white disabled:opacity-50 hover:bg-[#7468B7]"
        >
          Prev
        </button>
        <span className="px-3 py-1 bg-[#63589F] text-white rounded">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#63589F] rounded text-white disabled:opacity-50 hover:bg-[#7468B7]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MasterContactDetails;
