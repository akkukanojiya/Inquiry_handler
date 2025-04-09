import { useNavigate } from "react-router-dom";

const MasterLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Clear authentication token or user session here
    console.log("User logged out");
    
    // Redirect to login page
    navigate("/masterlogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900">Are you sure?</h2>
        <p className="text-gray-600">You will be logged out of your account.</p>

        <div className="mt-6 flex space-x-4 justify-center">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={() => navigate(-1)} // Go back to previous page
            className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md shadow hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterLogout;
