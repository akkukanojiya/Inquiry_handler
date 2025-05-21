import {
  Trash2,
  Download,
  Copy,
  Printer,
  FileText,
  Eye,
  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { Link } from "react-router-dom";

const itemsPerPage = 10;

interface Enquiry {
  _id: string,
  formNo: string,
  fullName: string,
  mobileNo: string,
  parentsMobileNo: string,
  address: string,
  board: string,
  schoolName: string,
  referenceName: string,
  priority_one: string,
  priority_two: string,
  priority_three: string,

  formFillBy: {
    _id: string,
    facultyName: string,

    email: string,
    mobileNo: string,
    password: string,
  }

  status: string,
  admissionCategory: string,
  seatNo: string,
  result: string,
  college: {
    _id: string,
    username: string,
    collegeName: string,
    email: string,
    mobileNo: string,
    password: string,
    role: string,

  },
  email: string,
  password: string,
  date: string,
  category: string,
  aadharNo: string,
  dateOfBirth: string,
  counselorName: {
    _id: string,
    username: string,
    counselorName: string,
    mobileNo: string,
    email: string,
    password: string,

  }
};


const DataTable = () => {
  const [enquiry, setEnquiry] = useState<Enquiry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [showModalData, setShowModalData] = useState<Enquiry | null>(null);
  const [editModalData, setEditModalData] = useState<Enquiry | null>(null);
  const [editStatus, setEditStatus] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEnquiry();
  }, []);

  const fetchEnquiry = async () => {
    try {
      const response = await axios.get("http://localhost:3000/college/inquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);


      const result = Array.isArray(response.data)
        ? response.data
        : response.data.inquiries
        || [];

      setEnquiry(result);
    } catch (error) {
      console.error("Error fetching Enquiry:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/college/inquiry/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnquiry((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting Enquiry:", error);
    }
  };

  const handleCopy = async () => {
    try {
      const data = enquiry.map((item) => ({
        fullName: item.fullName,
        mobileNo: item.mobileNo,
        email: item.email,
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
    doc.text("Enquiries List", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Sr.No.", "Full Name", "Mobile No.", "Email"]],
      body: enquiry.map((item, index) => [
        index + 1,
        item.fullName,
        item.mobileNo,
        item.email,
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [99, 88, 159] },
    });

    doc.save("Enquiries.pdf");
  };

  const csvData = [
    ["Sr.No.", "Full Name", "Mobile No.", "Email"],
    ...enquiry.map((item, index) => [
      index + 1,
      item.fullName,
      item.mobileNo,
      item.email,
    ]),
  ];

  const handleEditSubmit = async () => {
    if (!editModalData) return;

    try {
      await axios.patch(
        `http://localhost:3000/college/inquiry/${editModalData._id}`,
        { ...editModalData, status: editStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEnquiry();
      setEditModalData(null);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const filteredEnquiry = enquiry.filter((e) =>
    e.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEnquiry.length / itemsPerPage);
  const currentData = filteredEnquiry.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={handleCopy} className="bg-gray-600 text-white px-3 py-1 rounded">
          <Copy className="inline w-4 h-4" /> {copySuccess ? "Copied!" : "Copy"}
        </button>
        <CSVLink
          data={csvData}
          filename="enquiries.csv"
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          <FileText className="inline w-4 h-4" /> CSV
        </CSVLink>
        <button onClick={exportPDF} className="bg-red-600 text-white px-3 py-1 rounded">
          <Download className="inline w-4 h-4" /> PDF
        </button>
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-3 py-1 rounded">
          <Printer className="inline w-4 h-4" /> Print
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Sr.No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Full Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Mobile No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Email</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Status</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Form Filled By</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Counselor Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="p-2 text-center hidden sm:table-cell">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.fullName}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.mobileNo}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.email}</td>
                <td className="p-2 text-center hidden sm:table-cell">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.status}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.formFillBy?.facultyName}</td>
                <td className="p-2 text-center hidden sm:table-cell">{item.counselorName?.counselorName}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => setShowModalData(item)} className="text-blue-600">
                    <Eye className="w-5 h-5" />
                  </button>
                  <Link
                    to={`/editinquiryform/${item._id}`}
                    state={{ inquiry: item }}
                    className="text-green-600"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-2 py-1 border rounded"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-2 py-1 border rounded"
        >
          Next
        </button>
      </div>

      {/* Show Modal */}
    {showModalData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#4B3C9A] mb-6 border-b pb-3">
        Inquiry Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm sm:text-base text-gray-700">
        <div><b>Form No:</b> {showModalData.formNo}</div>
        <div><b>Full Name:</b> {showModalData.fullName}</div>
        <div><b>Mobile No:</b> {showModalData.mobileNo}</div>
        <div><b>Parent's Mobile No:</b> {showModalData.parentsMobileNo}</div>
        <div className="sm:col-span-2"><b>Address:</b> {showModalData.address}</div>
        <div><b>Board:</b> {showModalData.board}</div>
        <div><b>School Name:</b> {showModalData.schoolName}</div>
        <div><b>Reference Name:</b> {showModalData.referenceName}</div>
        <div><b>Priority One:</b> {showModalData.priority_one?.branchName || showModalData.priority_one}</div>
        <div><b>Priority Two:</b> {showModalData.priority_two?.branchName || showModalData.priority_two}</div>
        <div><b>Priority Three:</b> {showModalData.priority_three?.branchName || showModalData.priority_three}</div>
        <div><b>Status:</b> {showModalData.status}</div>
        <div><b>Admission Category:</b> {showModalData.admissionCategory}</div>
        <div><b>Seat No:</b> {showModalData.seatNo}</div>
        <div><b>Result:</b> {showModalData.result}</div>
        <div><b>Email:</b> {showModalData.email}</div>
        <div><b>Password:</b> {showModalData.password}</div>
        <div><b>Date:</b> {new Date(showModalData.date).toLocaleDateString()}</div>
        <div><b>Category:</b> {showModalData.category}</div>
        <div><b>Aadhar No:</b> {showModalData.aadharNo}</div>
        <div><b>Date of Birth:</b> {showModalData.dateOfBirth}</div>
      </div>

      {/* Faculty Section */}
      <h3 className="text-xl font-semibold mt-8 text-[#4B3C9A] border-b pb-2">Faculty Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm sm:text-base text-gray-700">
        <div><b>Name:</b> {showModalData.formFillBy?.facultyName}</div>
      </div>

      {/* Counselor Section */}
      <h3 className="text-xl font-semibold mt-8 text-[#4B3C9A] border-b pb-2">Counselor Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm sm:text-base text-gray-700">
        <div><b>Name:</b> {showModalData.counselorName?.counselorName}</div>
      </div>

      {/* College Section */}
      <h3 className="text-xl font-semibold mt-8 text-[#4B3C9A] border-b pb-2">College Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm sm:text-base text-gray-700">
        <div><b>Name:</b> {showModalData.college?.collegeName}</div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => setShowModalData(null)}
          className="px-6 py-2 bg-[#4B3C9A] text-white font-medium rounded-lg hover:bg-[#382e75] transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}






      {/* Edit Modal */}
      {editModalData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Inquiry</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm">Status</span>
                <input
                  className="mt-1 block w-full border p-2 rounded"
                  type="text"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditModalData(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
