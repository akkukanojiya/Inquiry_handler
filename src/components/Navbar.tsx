import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  School2,
  Users,
  HeartHandshake,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState(false);
  const [isCollegeDropdownOpen, setIsCollegeDropdownOpen] = useState(false);
  const [isFacultyDropdownOpen, setIsFacultyDropdownOpen] = useState(false);
  const [isCounselorDropdownOpen, setIsCounselorDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-[#63589F] text-white"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-[#63589F] text-white w-72 lg:w-64 min-h-screen z-40 shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white">
            <Link to="/" className="flex items-center space-x-3">
              <School2 className="h-8 w-8" />
              <span className="text-xl font-bold">Inquiry Handler</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6 space-y-2 px-4">
            {/* Master Dashboard */}
            <Dropdown
              title="Master"
              icon={<School2 className="h-5 w-5" />}
              isOpen={isMasterDropdownOpen}
              setIsOpen={setIsMasterDropdownOpen}
              paths={[
                { path: '/masterdashboard', label: 'Dashboard' },
                { path: '/mastercollegelist', label: 'College List' },
                { path: '/masterfacultylist', label: 'Faculty List' },
                { path: '/mastercounselorlist', label: 'Counselors List' },
                { path: '/mastercollegerequest', label: 'College Requests' },
                { path: '/mastercontactdetails', label: 'Contact Details' },
                { path: '/masterlogout', label: 'Master Logout' },
              ]}
              isActive={isActive}
            />

            {/* Faculty Dashboard */}
            <Dropdown
              title="Faculty"
              icon={<Users className="h-5 w-5" />}
              isOpen={isFacultyDropdownOpen}
              setIsOpen={setIsFacultyDropdownOpen}
              paths={[
                { path: '/faculty', label: 'Dashboard' },
                { path: '/inquiryform', label: 'Inquiry Form' },
                { path: '/appointcounselor', label: 'Appoint Counselor' },
              ]}
              isActive={isActive}
            />

            {/* College Dashboard */}
            <Dropdown
              title="College"
              icon={<School2 className="h-5 w-5" />}
              isOpen={isCollegeDropdownOpen}
              setIsOpen={setIsCollegeDropdownOpen}
              paths={[
                { path: '/college', label: 'Dashboard' },
                { path: '/datatable', label: 'Inquiries' },
                { path: '/counselorlist', label: 'Counselors' },
                { path: '/facultylist', label: 'Faculties' },
                { path: '/brancheslist', label: 'Branches' },
                { path: '/courseslist', label: 'Courses' },
              ]}
              isActive={isActive}
            />

            {/* Counselor Dashboard */}
            <Dropdown
              title="Counselor"
              icon={<HeartHandshake className="h-5 w-5" />}
              isOpen={isCounselorDropdownOpen}
              setIsOpen={setIsCounselorDropdownOpen}
              paths={[
                { path: '/counselor', label: 'Dashboard' },
                { path: '/inquiryconformation', label: 'Inquiry Conformation' },
                { path: '/demoinquiryconformation', label: 'Demo Inquiry' },
              ]}
              isActive={isActive}
            />
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-white">
            <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-md hover:bg-[#a39bd1] transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

type DropdownProps = {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paths: { path: string; label: string }[];
  isActive: (path: string) => boolean;
};

const Dropdown = ({ title, icon, isOpen, setIsOpen, paths, isActive }: DropdownProps) => (
  <div className="space-y-2">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${
        isOpen || paths.some((p) => isActive(p.path))
          ? 'bg-[#63589F] text-white'
          : 'hover:bg-[#a39bd1]'
      }`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{title}</span>
      </div>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
    {isOpen && (
      <div className="pl-8 space-y-2">
        {paths.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`block px-4 py-2 rounded-md transition-colors ${
              isActive(path) ? 'bg-[#63589F] text-white' : 'hover:bg-[#a39bd1]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default Navbar;
