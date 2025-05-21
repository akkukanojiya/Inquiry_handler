import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUniversity,

  FaSignOutAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaUserTie,
  FaEnvelope,
  FaBuilding,
  FaBook,
  FaUserGraduate,
  FaCheckCircle,
  FaClipboardCheck,
  FaUserPlus,
   
  FaListAlt,
  FaSchool,
  FaRegListAlt,
} from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { UploadCloudIcon,} from 'lucide-react';
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
const Navbar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    console.log(storedRole);
  }, []);

  

  const isActive = (path: string) => location.pathname === path;



  const navItems: { [key: string]: { path: string; label: string; icon: JSX.Element }[] } = {
    master: [
      { path: '/masterdashboard', label: 'Master Dashboard', icon: <FaUniversity /> },
      { path: '/mastercollegelist', label: 'College List', icon: <FaBuilding /> },
      { path: '/masterfacultylist', label: 'Faculty List', icon: <FaChalkboardTeacher /> },
      { path: '/mastercounselorlist', label: 'Counselors List', icon: <FaUserTie /> },
      { path: '/mastercollegerequest', label: 'College Requests', icon: <FaClipboardList /> },
      { path: '/mastercontactdetails', label: 'Contact Details', icon: <FaEnvelope /> },
      { path: '/logout', label: 'Log out', icon: <FaSignOutAlt /> },
    ],
    faculty: [
      { path: '/faculty', label: 'Faculty Dashboard', icon: <FaChalkboardTeacher /> },
      { path: '/inquiryform', label: 'Inquiry Form', icon: <FaClipboardCheck /> },
      { path: '/appointcounselor', label: 'Appoint Counselor', icon: <FaUserPlus /> },
    ],
    college: [
      { path: '/college', label: 'College Dashboard', icon: <FaUniversity /> },
      { path: '/datatable', label: 'Inquiries', icon: <FaRegListAlt /> },
      { path: '/counselorlist', label: 'Counselors', icon: <FaUserTie /> },
      { path: '/facultylist', label: 'Faculties', icon: <FaChalkboardTeacher /> },
      { path: '/brancheslist', label: 'Branches', icon: <FaListAlt /> },
      { path: '/courseslist', label: 'Courses', icon: <FaBook /> },
    ],
    counselor: [
      { path: '/counselor', label: 'Counselor Dashboard', icon: <FaUserGraduate /> },
      { path: '/inquiryconformation', label: 'Inquiry Confirmation', icon: <FaCheckCircle /> },
      // { path: '/demoinquiryconformation', label: 'Demo Inquiry', icon: <FaClipboardCheck /> },
    ],
    student: [
      { path: '/studentprofile', label: 'Student Dashboard', icon: <FaUserGraduate /> },
      { path: '/fileupload', label: 'Upload Document', icon: <UploadCloudIcon /> },
      { path: '/viewdocument', label: 'View Document', icon: <HiOutlineClipboardDocumentList /> },
    ],
  };

  return (
    <>
      {/* Mobile menu toggle button */}

      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-[#63589F] text-white flex items-center gap-2"
        >
          {isSidebarOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          {/* {isSidebarOpen ? "" : ""} */}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-[#63589F] text-white w-72 lg:w-64 min-h-screen z-40 shadow-xl overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white">
            <Link to="/" className="flex items-center space-x-3">
              <FaSchool className="h-8 w-8" />
              <span className="text-xl font-bold">Inquiry Handler</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6 space-y-2 px-4">
            {role && navItems[role]?.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${isActive(path) ? 'bg-white text-[#63589F]' : 'hover:bg-[#a39bd1]'
                  }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          {/* <div className="p-4 border-t border-white">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-md hover:bg-[#a39bd1] transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
