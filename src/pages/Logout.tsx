import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const  Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully!");

    // Add small delay to let toast show before navigating
    setTimeout(() => {
      navigate("/login");

      // After navigating, force a reload to update header/navbar
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }, 500);
  }, [navigate]);

  return null;
};

export default  Logout;
