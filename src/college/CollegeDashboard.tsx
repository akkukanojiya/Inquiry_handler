import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from 'lucide-react';

interface InquiryData {
  courseName: string;
  courseId: string;
  inquiryCount: number;
}

interface BranchData {
  branchName: string;
  course: string;
  branchId: string;
  studentCount: number;
}

const colorClasses = [
  "from-pink-500 to-red-400",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
  "from-blue-400 to-cyan-500",
  "from-purple-500 to-violet-600",
  "from-indigo-500 to-blue-700",
];

const CollegeDashboard = () => {
  const [departments, setDepartments] = useState<InquiryData[]>([]);
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/college/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data;
        console.log("Dashboard response:", res.data);

        if (Array.isArray(data.courseWiseInquiry)) {
          setDepartments(data.courseWiseInquiry);
        }

        if (Array.isArray(data.branchWiseStudents)) {
          setBranches(data.branchWiseStudents);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDepartments([]);
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/masterlogin");
    }
  }, [navigate]);

  return (
    <>
      <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
        {/* Header Card */}
        <div className="bg-[#d8f4f6] rounded-lg shadow-lg hover:shadow-xl transition p-6 relative">
          <div className="p-3 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-white absolute top-4 right-4">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Course Wise Inquiries
            </h3>
          </div>
        </div>

        {/* Inquiry Cards */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Inquiry Statistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-gray-500">Loading...</div>
            ) : departments.length === 0 ? (
              <div className="col-span-full text-gray-500">No data available</div>
            ) : (
              departments.map((dept, index) => {
                const color = colorClasses[index % colorClasses.length];
                return (
                  <div
                    key={index}
                    className={`rounded-xl p-6 shadow-md text-white bg-gradient-to-br ${color} hover:scale-105 transition-transform duration-300`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold">{dept.courseName}</h3>
                    </div>
                    <p className="text-4xl font-extrabold">{dept.inquiryCount}</p>
                    <span className="text-sm opacity-80">Students Inquired</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>


      {/* ============= branch Wise Students============== */}

      <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
        {/* Header Card */}
        <div className="bg-[#d8f4f6] rounded-lg shadow-lg hover:shadow-xl transition p-6 relative">
          <div className="p-3 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 text-white absolute top-4 right-4">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              branch Wise Students
            </h3>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          branch Statistics
        </h2>
        {/* branch Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-gray-500">Loading...</div>
          ) : branches.length === 0 ? (
            <div className="col-span-full text-gray-500">No branch data available</div>
          ) : (
            branches.map((branch, index) => {
              const color = colorClasses[index % colorClasses.length];
              return (
                <div
                  key={index}
                  className={`rounded-xl p-6 shadow-md text-white bg-gradient-to-br ${color} hover:scale-105 transition-transform duration-300`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">
                      {branch.branchName}
                    </h3>
                  </div>
                  <p className="text-4xl font-extrabold">
                    {branch.studentCount}
                  </p>
                  <span className="text-sm opacity-80">Students Enrolled</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  );
};

export default CollegeDashboard;
