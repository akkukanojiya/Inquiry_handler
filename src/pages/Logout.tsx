
import { useNavigate } from "react-router-dom";
import { LogOut, School2 } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (clear storage, reset state, etc.)
    localStorage.removeItem('authToken');
    document.cookie = 'authToken=; expires=365; path=/;';
    navigate('/login'); 
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-6">
          <School2 className="h-12 w-12 text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">See You Again!</h2>
          <p className="text-gray-600">You are about to sign out.</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
// 