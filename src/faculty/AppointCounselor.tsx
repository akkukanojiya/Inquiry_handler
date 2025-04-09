import { EyeIcon, PenBoxIcon } from "lucide-react";

 const AppointCounselor =()=>{

    const data = [
        { id: 1, name: "Aakash", role: "Admin" },
        { id: 2, name: "Suresh", role: "Editor" },
        { id: 3, name: "Harshil", role: "Developer" },
        { id: 4, name: "Jaimin", role: "Developer" },
        { id: 5, name: "Harsh", role: "BDE" },
        { id: 6, name: "harsh", role: "intern" },
      ];


      
  const handleAction = (id: number) => {
    alert(`Action triggered for ID: ${id}`);
  };
    return(
        <>
         <div className="p-4">
      {/* Breadcrumb and Inquiry Button */}
      <div className="flex justify-between items-center mb-4">
          <nav className="text-sm">
            <ol className="list-reset flex text-gray-600">
              <li><a href="#" className="hover:text-gray-900"> Appoint Counselor</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-900">Appoint Counselor Table</li>
            </ol>
          </nav>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
          />
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-100 text-sm sm:text-base">
            <tr>
              {/* <th className="px-2 sm:px-4 py-2 border">Form No.</th> */}
              <th className="px-2 sm:px-4 py-2 border">Form No.</th>
              <th className="px-2 sm:px-4 py-2 border">Date</th>
              <th className="px-2 sm:px-4 py-2 border">Full Name</th>
              <th className="px-2 sm:px-4 py-2 border">Mobile No.</th>
              <th className="px-2 sm:px-4 py-2 border"> Parents Mobile No.</th>
              <th className="px-2 sm:px-4 py-2 border">Appointed Counselor</th>
              <th className="px-2 sm:px-4 py-2 border">Appoint</th>
              <th className="px-2 sm:px-4 py-2 border">Actions</th>
              {/* <th className="px-2 sm:px-4 py-2 border">Counselor</th> */}
              {/* <th className="px-2 sm:px-4 py-2 border">Status</th> */}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 text-sm sm:text-base">
                {/* <td className="px-2 sm:px-4 py-2 border text-center">{item.id}</td> */}
                <td className="px-2 sm:px-4 py-2 border text-center"></td>
                <td className="px-2 sm:px-4 py-2 border"></td>
                <td className="px-2 sm:px-4 py-2 border"></td>
                <td className="px-2 sm:px-4 py-2 border"></td>
                <td className="px-2 sm:px-4 py-2 border"></td>
                <td className="px-2 sm:px-4 py-2 border"></td>
                <td className="px-2 sm:px-4 py-2 border">
                <button
                      onClick={() => handleAction(item.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      <PenBoxIcon/>
                    </button>
                </td>
                <td className="px-2 sm:px-4 py-2 border">
                <button
                      onClick={() => handleAction(item.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      <EyeIcon/>
                    </button>
                </td>
                 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </>
    )
 }

 export default AppointCounselor;