
import {  Clock, HelpCircle, CheckCheck, ShieldClose } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {

  const navigate = useNavigate();
  const inquiries = [
    { icon: HelpCircle, color: "blue", title: "Total Inquiries", count: 150 },
    { icon: Clock, color: "green", title: "Pending Inquiries", count: 24 },
    { icon: CheckCheck, color: "purple", title: "Admitted Inquiries", count: 8 },
    { icon: ShieldClose, color: "orange", title: "Cancel Inquiries", count: 32 },
  ];



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
      
      {/* Inquiries Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inquiries.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <item.icon className={`h-10 w-10 text-${item.color}-500`} />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className={`text-3xl font-bold text-${item.color}-600`}>{item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Student Name {i}</h3>
                    <p className="text-sm text-gray-600">Course inquiry</p>
                  </div>
                  <span className="text-sm text-gray-500">2h ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
{/* <div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border-b pb-4 last:border-b-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Meeting {i}</h3>
            <p className="text-sm text-gray-600">Student Consultation</p>
          </div>
          <span className="text-sm text-gray-500">Tomorrow, 10:00 AM</span>
        </div>
      </div>
    ))}
  </div>
</div> */}