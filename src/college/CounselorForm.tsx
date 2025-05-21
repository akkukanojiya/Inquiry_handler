import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const CounselorForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    counselorName: "",
    email: "",
    mobileNo: "",
    password: "",
  });

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
      const response = await axios.post(
        "http://localhost:3000/college/counselor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Counsellor added successfully!");
      console.log("Response:", response.data);

      setFormData({
        username: "",
        counselorName: "",
        email: "",
        mobileNo: "",
        password: "",
      });

      setTimeout(() => {
        window.location.href = "/counselorlist";
      }, 1500);
    } catch (error: any) {
      console.error("Error adding Counsellor:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      counselorName: "",
      email: "",
      mobileNo: "",
      password: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <ToastContainer position="top-right" autoClose={5000}  />
      <h2 className="text-2xl font-semibold text-center text-[#63589F] mb-6">
        Add New Counsellor
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
          placeholder="Counsellor Name"
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
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CounselorForm;
