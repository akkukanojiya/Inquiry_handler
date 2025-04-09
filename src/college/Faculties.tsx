import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const Faculty = [
    { id: 1, name: "Charlie", mobile: "1234567890", email: "charlie@example.com" },
    { id: 2, name: "Max", mobile: "0987654321", email: "max@example.com" },
    { id: 3, name: "Bella", mobile: "1112223334", email: "bella@example.com" },
    { id: 4, name: "John", mobile: "4445556667", email: "john@example.com" },
    { id: 5, name: "Sara", mobile: "7778889990", email: "sara@example.com" },
    { id: 6, name: "Mike", mobile: "1239876543", email: "mike@example.com" },
];

const itemsPerPage = 4;

const Faculties = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFaculty = Faculty.filter((counselor) =>
        counselor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
    const currentData = filteredFaculty.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (id: number) => alert(`Delete triggered for ID: ${id}`);

    const Pagination = () => (
        <div className="flex justify-end items-center mt-4 space-x-2">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded-md transition ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#63589F] text-white hover:bg-[#D1AFE8]'}`}
                aria-label="Previous Page"
            >
                Prev
            </button>
            <span className="px-4 py-2 border rounded-md">{currentPage} / {totalPages}</span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded-md transition ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#63589F] text-white hover:bg-[#D1AFE8]'}`}
                aria-label="Next Page"
            >
                Next
            </button>
        </div>
    );
    return (
        <>
            <div className="p-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                    <nav className="text-sm">
                        <ol className="list-reset flex text-gray-600">
                            <li><a href="#" className="hover:text-gray-900">Faculty</a></li>
                            <li><span className="mx-2">/</span></li>
                            <li className="text-gray-900">Data Table</li>
                        </ol>
                    </nav>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
                            aria-label="Search Facultys"
                        />
                        <button
                            onClick={() => window.location.href = '/facultiesform'}
                            className="bg-[#63589F] text-white px-4 py-2 rounded hover:bg-[#D1AFE8] transition flex items-center gap-1"
                            aria-label="Add Faculty"
                        >
                            <Plus /> Add Faculty
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100 text-sm sm:text-base">
                            <tr>
                                <th className="px-4 py-2 border text-center">Sr.No.</th>
                                <th className="px-4 py-2 border">Faculty Name</th>
                                <th className="px-4 py-2 border">Mobile No.</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 text-sm sm:text-base">
                                        <td className="px-4 py-2 border text-center">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-4 py-2 border">{item.name}</td>
                                        <td className="px-4 py-2 border">{item.mobile}</td>
                                        <td className="px-4 py-2 border">{item.email}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                aria-label={`Delete ${item.name}`}
                                            >
                                                <Trash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-4">No Facultys found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && <Pagination />}
            </div>
        </>
    )
}
export default Faculties;