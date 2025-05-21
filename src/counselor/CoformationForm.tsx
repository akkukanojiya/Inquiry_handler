import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useParams } from "react-router-dom";

type PriorityBranch = {
  _id: string;
  branchName: string;
};

type InquiryBranch = {
  priority_one?: PriorityBranch;
  priority_two?: PriorityBranch;
  priority_three?: PriorityBranch;
};

const ConformationForm = () => {
  const { id } = useParams<{ id: string }>(); // get inquiry id from route
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    branchName: "",
    status: "",
  });

  const [branches, setBranches] = useState<InquiryBranch[]>([]);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/counselor/showAppointedInquiries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = Array.isArray(response.data.inquiries)
        ? response.data.inquiries
        : [];

      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Failed to fetch branches.");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }
    fetchBranches();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    if (!id) {
      toast.error("Inquiry ID not found in route.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/counselor/changeStatus/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
        console.log(response);
        
      toast.success("Status updated successfully!");
      setFormData({
        branchName: "",
        status: "",
      });
      
      setTimeout(() => {
        window.location.href = "/inquiryconformation";
      }, 1500);
    } catch (error: any) {
      console.log(error.response);
      console.error("Error updating status:", error);
      if (error.response?.status === 403) {
        toast.error("You are not authorized to perform this action.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      branchName: "",
      status: "",
    });
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000}  />
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-full max-w-lg bg-white p-6 py-12 rounded-lg shadow-lg space-y-6 h-full"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Update Inquiry Status
        </h2>

        {/* Branch Name Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Branch Name
          </label>
          <select
            name="branchName"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
            required
            value={formData.branchName}
            onChange={handleChange}
          >
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <React.Fragment key={index}>
                {branch.priority_one && (
                  <option value={branch.priority_one._id}>
                    {branch.priority_one.branchName}
                  </option>
                )}
                {branch.priority_two && (
                  <option value={branch.priority_two._id}>
                    {branch.priority_two.branchName}
                  </option>
                )}
                {branch.priority_three && (
                  <option value={branch.priority_three._id}>
                    {branch.priority_three.branchName}
                  </option>
                )}
              </React.Fragment>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In-Process">In-Process</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#D1AFE8] transition"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConformationForm;
