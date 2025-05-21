import axios from 'axios';
import { Copy, Download, Eye, FileText, PenBoxIcon, Pencil, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RiStickyNoteAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
interface InquiryConf {
  _id: string;
  formNo: string;
  fullName: string;
  mobileNo: string;
  parentsMobileNo: string;
  formFillBy: string | { _id: string; facultyName: string };
  email: string;
  priority_one: string;
  priority_two: string;
  priority_three: string;
  status: string;
  date: string;
  referenceName: string;
  confirmBranch: string;
  remarks?: string;
  remarksData?: {
    _id: string;
    remarks: string;
    date: string;
  }[];
}

 
const InquiryConformation = () => {
  const token = localStorage.getItem("token");
  const [inquiryConformations, setInquiryConformations] = useState<InquiryConf[]>([]);
  const [showModalData, setShowModalData] = useState<InquiryConf | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");


  const itemsPerPage = 10;

  useEffect(() => {
    fetchAppointedInquiries();
  }, []);

  const fetchAppointedInquiries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/counselor/showAppointedInquiries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = Array.isArray(response.data) ? response.data : response.data.inquiries || [];
      setInquiryConformations(result);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setInquiryConformations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleAppointedInquiry = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/counselor/showAppointedInquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(id);

      const [inquiryDetails, remarksArray] = response.data.inquiries;
      const result: InquiryConf = {
        ...inquiryDetails,
        remarksData: remarksArray,
      };

      setShowModalData(result);
    } catch (error) {
      console.error("Error fetching single inquiry:", error);
    }
  };


  const filteredInquiries = inquiryConformations.filter((item) =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // const handleAction = (id: string) => {
  //   alert(`Action triggered for ID: ${id}`);
  // };

  // buttons 
  const handleCopy = async () => {
    try {
      const data = filteredInquiries.map(({ formNo,fullName,parentsMobileNo, mobileNo, email,status }) => ({
        formNo,
        fullName,
        parentsMobileNo,
        mobileNo,
        email,
        status,
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
      doc.text("InquiryConformation List", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      autoTable(doc, {
        startY: 30,
        head: [["Sr.No.", "Full Name", "Mobile No.", "Email"]],
        body: filteredInquiries.map((item, index) => [
          index + 1,
          item.formNo,
          item.fullName,
          item.mobileNo,
          item.parentsMobileNo,
          item.email,
          item.status,
        ]),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [99, 88, 159] },
      });

      doc.save("InquiryConformation.pdf");
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const csvData = [
    ["Sr.No.", "Full Name", "Mobile No.", "Email"],
    ...filteredInquiries.map((item, index) => [
      index + 1,
      item.formNo,
      item.fullName,
      item.parentsMobileNo,
      item.mobileNo,
      item.email,
      item.status,
    ]),
  ];


  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
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
            filename="faculties.csv"
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

        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-xs sm:text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Form No.</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Date</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Name</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Mobile No.</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Form Filled By</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Confirm Branch</th>
                  {/* <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Conformation</th> */}
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Remarks</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-2 text-center hidden sm:table-cell">{item.formNo || "N/A"}</td>
                    <td className="p-2 text-center hidden sm:table-cell">{item.date ? new Date(item.date).toLocaleDateString("en-GB") : "N/A"}</td>
                    <td className="p-2 text-center hidden sm:table-cell">{item.fullName}</td>
                    <td className="p-2 text-center hidden sm:table-cell">{item.mobileNo}</td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      {typeof item.formFillBy === "string"
                        ? item.formFillBy
                        : item.formFillBy?.facultyName || "N/A"}
                    </td>
                    {/* <td className="px-4 py-2 border">{item.confirmBranch || "N/A"}</td> */}
                    <td className="px-3 py-2 border text-center">
                      <Link to={`/conformationform/${item._id}`}>
                        <button className="text-green-600">
                          <PenBoxIcon size={20} />
                        </button>
                      </Link>
                    </td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      <Link to={`/addremarks/${item._id}`}>
                        <button className="text-yellow-600">
                          <RiStickyNoteAddLine size={20} />
                        </button>
                      </Link>
                    </td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      <div className="flex justify-center gap-2">

                        <button onClick={() => fetchSingleAppointedInquiry(item._id)} className="text-blue-600">
                          <Eye size={20} />
                        </button>
                        <Link
                          to={`/editconformation/${item._id}`}
                          state={{ inquiry: item }}
                          className="text-green-600"
                        >
                          <Pencil size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#63589F] text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#63589F] text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModalData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-slideIn shadow-2xl">
            <h2 className="text-2xl text-[#63589F] font-bold mb-6 border-b pb-2">Student Inquiry Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><b>Full Name:</b> {showModalData.fullName}</div>
              <div><b>Mobile No:</b> {showModalData.mobileNo}</div>
              <div><b>Parent's Mobile No:</b> {showModalData.parentsMobileNo}</div>
              <div><b>Email:</b> {showModalData.email}</div>
              <div className="col-span-1 sm:col-span-2">
                <b>Form Filled By:</b>{" "}
                {typeof showModalData.formFillBy === 'string'
                  ? showModalData.formFillBy
                  : showModalData.formFillBy.facultyName}
              </div>
              <div><b>Priority 1:</b> {showModalData.priority_one?.branchName ?? "N/A"}</div>
              <div><b>Priority 2:</b> {showModalData.priority_two?.branchName ?? "N/A"}</div>
              <div><b>Priority 3:</b> {showModalData.priority_three?.branchName ?? "N/A"}</div>
              <div><b>Confirm Branch:</b> {showModalData.confirmBranch}</div>
              
              <div><b>Reference Name:</b> {showModalData.referenceName}</div>
              <div><b>Status:</b> <span className="capitalize text-[#63589F] font-medium">{showModalData.status}</span></div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 border-b mb-4 pb-1">Remarks</h3>
              {showModalData.remarksData && showModalData.remarksData.length > 0 ? (
                <ul className="space-y-4">
                  {showModalData.remarksData.map((remark) => (
                    <li key={remark._id} className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                      <p className="mb-1"><b>Remarks:</b> {remark.remarks}</p>
                      <p className="text-xs text-gray-600">
                        <b>Date:</b> {new Date(remark.date).toLocaleDateString("en-GB")}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No remarks available</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModalData(null)}
                className="px-5 py-2 bg-[#63589F] text-white rounded-lg hover:bg-[#574b8e] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InquiryConformation;
