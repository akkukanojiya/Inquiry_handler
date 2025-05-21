import axios from "axios";
import React, { useEffect, useState } from "react";
  // Ensure you have installed react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
const BranchesForm = () => {
  const [formData, setFormData] = useState({
    branchName: "",
    course: "",
    seats: "",
    remaining_seats: "",
  });

  const [courses, setCourses] = useState<{ _id: string; courseName: string }[]>([]);
  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/college/course", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(response.data.courses) ? response.data.courses : [];
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        "http://localhost:3000/college/branch",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Branch added successfully!");
      console.log("Response:", response.data);

      setFormData({
        branchName: "",
        course: "",
        seats: "",
        remaining_seats: "",
      });

      setTimeout(() => {
        window.location.href = "/brancheslist";
      }, 1500);
    } catch (error: any) {
      console.error("Error adding Branch:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      branchName: "",
      course: "",
      seats: "",
      remaining_seats: "",
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
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Branch Form</h2>

        {/* Branch Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            placeholder="Enter Branch Name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
            required
          />
        </div>

        {/* Course Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Seats</label>
          <input
            type="text"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Enter Seats"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] focus:border-transparent"
            required
          />
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

export default BranchesForm;
