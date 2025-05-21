import { EyeIcon, PenBoxIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { Link } from "react-router-dom";

interface Counselor {
  counselorName: string;
}

interface Branch {
  _id: string;
  branchName: string;
}

interface Inquiry {
  _id: string;
  formNo: string;
  date: string;
  fullName: string;
  dateOfBirth: string;
  mobileNo: string;
  referenceName: string;
  board: string;
  parentsMobileNo: string;
  schoolName: string;
  result: string;
  category: string;
  aadharNo: string;
  admissionCategory: string;
  address: string;
  counselorName: Counselor;
  priority_one: Branch;
  priority_two: Branch;
  priority_three: Branch;
}

const AppointCounselor = () => {
  const [data, setData] = useState<Inquiry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Inquiry | null>(null);

  const itemsPerPage = 10;
  const tableRef = useRef<HTMLTableElement>(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/faculty/inquiry", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const inquiryList = Array.isArray(response.data)
        ? response.data
        : response.data.inquiry || [];

      setData(inquiryList);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleView = (item: Inquiry) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCopy = () => {
    let text = "Form No.\tDate\tFull Name\tMobile No.\tParents Mobile No.\tAppointed Counselor\n";
    data.forEach(item => {
      text += `${item.formNo}\t${item.date}\t${item.fullName}\t${item.mobileNo}\t${item.parentsMobileNo}\t${item.counselorName?.counselorName || "N/A"}\n`;
    });
    navigator.clipboard.writeText(text);
    alert("Table copied to clipboard!");
  };

  const handleCSV = () => {
    const headers = ["Form No.", "Date", "Full Name", "Mobile No.", "Parents Mobile No.", "Appointed Counselor"];
    let csv = headers.join(",") + "\n";
    data.forEach(item => {
      csv += `${item.formNo},${item.date},${item.fullName},${item.mobileNo},${item.parentsMobileNo},${item.counselorName?.counselorName || "N/A"}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "appoint_counselor.csv";
    link.click();
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Form No.", "Date", "Full Name", "Mobile No.", "Parents Mobile No.", "Appointed Counselor"]],
      body: data.map(item => [
        item.formNo,
        item.date,
        item.fullName,
        item.mobileNo,
        item.parentsMobileNo,
        item.counselorName?.counselorName || "N/A",
      ]),
    });
    doc.save("appoint_counselor.pdf");
  };

  const handlePrint = () => {
    if (!tableRef.current) return;
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Appoint Counselor</title></head><body>");
      printWindow.document.write(tableRef.current.outerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };



  const FormRow = ({ label, value }: { label: string; value: string | number | undefined }) => (
    <div className="flex flex-col">
      <label className="text-gray-500 font-medium">{label}</label>
      <div className="bg-gray-100 px-3 py-2 rounded-md mt-1 text-gray-800">{value || "N/A"}</div>
    </div>
  );
  
  return (
    <div className="p-4">
      {/* Search and Breadcrumb */}
      <div className="flex justify-between items-center mb-4">
        <nav className="text-sm">
          <ol className="flex text-gray-600">
            <li><a href="#" className="hover:text-gray-900">Appoint Counselor</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">Appoint Counselor Table</li>
          </ol>
        </nav>
        <input type="text" placeholder="Search..." className="p-2 border rounded-md" />
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3 mb-4">
        <button onClick={handleCopy} className="bg-blue-500 text-white px-3 py-1 rounded">Copy</button>
        <button onClick={handleCSV} className="bg-purple-500 text-white px-3 py-1 rounded">CSV</button>
        <button onClick={handlePDF} className="bg-red-500 text-white px-3 py-1 rounded">PDF</button>
        <button onClick={handlePrint} className="bg-green-500 text-white px-3 py-1 rounded">Print</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Form No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Full Name</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Mobile No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Parents Mobile No.</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Appointed Counselor</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Appoint</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-black uppercase hidden md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{item.formNo}</td>
                  <td className="px-4 py-2 border text-center">{new Date(item.date).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-2 border text-center">{item.fullName}</td>
                  <td className="px-4 py-2 border text-center">{item.mobileNo}</td>
                  <td className="px-4 py-2 border text-center">{item.parentsMobileNo}</td>
                  <td className="px-4 py-2 border text-center">{item.counselorName?.counselorName || "N/A"}</td>
                  <td className="px-4 py-2 border text-center">
                    <Link to={`/appointcounselorform/${item._id}`}>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                        <PenBoxIcon className="w-4 h-4" />
                      </button>
                    </Link>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button onClick={() => handleView(item)} className="bg-green-500 text-white px-3 py-1 rounded">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-4">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="bg-[#63589F] text-white px-4 py-1 rounded disabled:opacity-50">Previous</button>
        <span className="text-[#63589F]">Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="bg-[#63589F] text-white px-4 py-1 rounded disabled:opacity-50">Next</button>
      </div>

      {/* Modal Popup */}
      {showModal && selectedItem && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-5xl relative shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh]">
      
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Inquiry Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-gray-700 text-sm">
        <FormRow label="Form No" value={selectedItem.formNo} />
        <FormRow label="Full Name" value={selectedItem.fullName} />
        <FormRow label="D.O.B." value={new Date(selectedItem.dateOfBirth).toLocaleDateString("en-GB")} />
        <FormRow label="Mobile No" value={selectedItem.mobileNo} />
        <FormRow label="Parents' Mobile No" value={selectedItem.parentsMobileNo} />
        <FormRow label="Counselor Name" value={selectedItem.counselorName?.counselorName || "N/A"} />
        <FormRow label="Board Name" value={selectedItem.board} />
        <FormRow label="School Name" value={selectedItem.schoolName} />
        <FormRow label="Reference Name" value={selectedItem.referenceName} />
        <FormRow label="Date" value={new Date(selectedItem.date).toLocaleDateString("en-GB")} />
        <FormRow label="Admission Category" value={selectedItem.admissionCategory} />
        <FormRow label="Result" value={selectedItem.result} />
        <FormRow label="Category" value={selectedItem.category} />
        <FormRow label="Aadhar No." value={selectedItem.aadharNo} />
        <FormRow label="Address" value={selectedItem.address} />
        <FormRow label="Priority One" value={selectedItem.priority_one?.branchName} />
        <FormRow label="Priority Two" value={selectedItem.priority_two?.branchName} />
        <FormRow label="Priority Three" value={selectedItem.priority_three?.branchName} />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default AppointCounselor;
