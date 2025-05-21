// import React from 'react';
import {  Clock,   Airplay, CheckCheck, ShieldClose } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CounselorDashboard = () => {


  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/masterlogin");
    }
  }, [navigate]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Counselor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <Airplay className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Appointed Inquiries

              </h3>
              <p className="text-2xl font-bold text-blue-600">28</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <CheckCheck className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Admitted Inquiries</h3>
              <p className="text-2xl font-bold text-green-600">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pending Inquiries</h3>
              <p className="text-2xl font-bold text-purple-600">42</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <ShieldClose className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900"> Cancel Inquiries</h3>
              <p className="text-2xl font-bold text-orange-600">56</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Student Counseling {i}</h3>
                    <p className="text-sm text-gray-600">Academic Guidance</p>
                  </div>
                  <span className="text-sm text-gray-500">10:00 AM</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Cases</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Case #{i}</h3>
                    <p className="text-sm text-gray-600">Career Counseling</p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${i === 1 ? 'bg-green-100 text-green-800' :
                      i === 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                    {i === 1 ? 'Completed' : i === 2 ? 'In Progress' : 'New'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CounselorDashboard;