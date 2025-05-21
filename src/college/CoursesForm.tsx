import axios from "axios";
import  { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const CoursesForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/college/course",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Course added successfully!");
      console.log("Response:", response.data);

      setFormData({
        courseName: "",
      });

      setTimeout(() => {
        window.location.href = "/courseslist";
      }, 1500);
    } catch (error: any) {
      console.error("Error adding Course:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      courseName: "",
    });
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000}  />
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Course Form
        </h2>

        {/* Course Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Enter Course Name"
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

export default CoursesForm;
