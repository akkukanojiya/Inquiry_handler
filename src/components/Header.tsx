import { useState } from 'react';
import { User } from 'lucide-react';

function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-[#63589F] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or left-side content */}
          {/* <div className="text-xl font-bold text-[#63589F]">YourApp</div> */}

          {/* Spacer pushes right content to end */}
          <div className="flex-1"></div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg   transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">Sky</p>
                  <p className="text-xs text-white ">Admin</p>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  
                 
                  <div className="border-t border-gray-200 my-1"></div>
                  <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Log out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
