import { School2Icon, ShieldQuestion, MonitorDot , UserRoundCheck } from 'lucide-react';

const MasterDashboard = () => {
  const stats = [
    { icon: School2Icon, color: 'from-blue-500 to-blue-400', title: 'Colleges', value: 5 },
    { icon: ShieldQuestion, color: 'from-green-500 to-green-400', title: 'Inquiries', value: 12 },
    { icon: MonitorDot, color: 'from-purple-500 to-purple-400', title: 'Faculty', value: 48 },
    { icon: UserRoundCheck, color: 'from-orange-500 to-orange-400', title: 'Counselors', value: 25 },
  ];

//   const departments = [
//     { name: 'Computer Science', students: 120, faculty: 8 },
//     { name: 'Engineering', students: 90, faculty: 6 },
//     { name: 'Business', students: 150, faculty: 10 },
//   ];



  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-3xl font-bold text-gray-900 text-center">College Dashboard</h1> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, color, title, value }, index) => (
          <div
            key={index}
            className="bg-[#d8f4f6] rounded-lg shadow-lg hover:shadow-xl transition p-6 relative"
          >
            {/* Icon positioned at the top-right */}
            <div className={`p-3 rounded-full bg-gradient-to-br ${color} text-white absolute top-4 right-4`}>
              <Icon className="h-8 w-8" />
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>



      {/* Department Statistics & Recent Applications */}
      <div className="grid lg:grid-cols-12 gap-1">
        {/* Inquiry Statistics - Full Width */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition lg:col-span-12">
          <h2 className="text-xl font-semibold mb-4">Inquiry Statistics</h2>
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                <h3 className="font-medium text-gray-800">{dept.name}</h3>
                <div className="flex space-x-4 text-gray-600">
                  <span>Students: {dept.students}</span>
                  <span>Faculty: {dept.faculty}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default MasterDashboard;
