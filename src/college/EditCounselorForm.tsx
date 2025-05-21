import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import { useParams, useNavigate } from "react-router-dom";

const EditCounselorForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    counselorName: "",
    email: "",
    mobileNo: "",
    password: "",
  });

 useEffect(() => {
  const fetchCounselor = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/college/counselor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData(response.data.Data); // Make sure 'Data' exists and has required fields
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("Counselor not found. Please check the ID.");
      } else {
        toast.error("Failed to fetch counselor data.");
      }
      console.error("Error fetching data:", error);
    }
  };

  if (id) fetchCounselor();
}, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/college/counselor/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Counselor updated successfully!");
      console.log("Response:", response.data.Data);

      setTimeout(() => {
        navigate("/counselorlist");
      }, 1500);
    } catch (error: any) {
      console.error("Error updating counselor:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <ToastContainer position="top-right" autoClose={5000}  />
      <h2 className="text-2xl font-semibold text-center text-[#63589F] mb-6">
        Edit Counselor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          name="counselorName"
          placeholder="Counselor Name"
          value={formData.counselorName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile No."
          value={formData.mobileNo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] transition-colors"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCounselorForm;
