import { Edit, Eye, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

const InquiryConformation = () => {
    const data = [
        { id: 1, name: "Aakash", role: "Admin" },
        { id: 2, name: "Suresh", role: "Editor" },
        { id: 3, name: "Harshil", role: "Developer" },
        { id: 4, name: "Jaimin", role: "Developer" },
        { id: 5, name: "Harsh", role: "BDE" },
        { id: 6, name: "harsh", role: "intern" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleAction = (id: number) => {
        alert(`Action triggered for ID: ${id}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="p-4">
            {/* Breadcrumb and Inquiry Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <nav className="text-sm">
                    <ol className="list-reset flex text-gray-600">
                        <li><a href="#" className="hover:text-gray-900">Inquiry Conformation</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-900">Inquiry Conformation</li>
                    </ol>
                </nav>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-auto p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-xs sm:text-sm md:text-base">
                    {/* Table Header */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 sm:px-4 py-2 border">Form No.</th>
                            <th className="px-2 sm:px-4 py-2 border">Date</th>
                            <th className="px-2 sm:px-4 py-2 border">Name</th>
                            <th className="px-2 sm:px-4 py-2 border">Mobile No.</th>
                            <th className="px-2 sm:px-4 py-2 border">Form Filled By</th>
                            <th className="px-2 sm:px-4 py-2 border">Confirm Branch</th>
                            <th className="px-2 sm:px-4 py-2 border">Coformation</th>
                            <th className="px-2 sm:px-4 py-2 border">Remarks</th>
                            <th className="px-2 sm:px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-2 sm:px-4 py-2 border text-center">{item.id}</td>
                                <td className="px-2 sm:px-4 py-2 border text-center"></td>
                                <td className="px-2 sm:px-4 py-2 border">{item.name}</td>
                                <td className="px-2 sm:px-4 py-2 border"></td>
                                <td className="px-2 sm:px-4 py-2 border">{item.role}</td>
                                <td className="px-2 sm:px-4 py-2 border"></td>
                                <td className="px-2 sm:px-4 py-2 border"></td>
                                <td className="px-2 sm:px-4 py-2 border"></td>
                                <td className="px-2 sm:px-4 py-2 border">
                                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                                        <button
                                            onClick={() => handleAction(item.id)}
                                            className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-green-600 transition"
                                        >
                                            <Eye/>
                                        </button>
                                        <button
                                            onClick={() => handleAction(item.id)}
                                            className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-yellow-600 transition"
                                        >
                                            <Edit/>
                                        </button>
                                        <button
                                            onClick={() => handleAction(item.id)}
                                            className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            <Trash2Icon/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#63589F] text-white rounded disabled:opacity-50"
                >         
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[#63589F] text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default InquiryConformation;
