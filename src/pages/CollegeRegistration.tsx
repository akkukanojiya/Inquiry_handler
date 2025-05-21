import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../img/ih-logo.png';
import axios from 'axios'; // Import axios
import { toast, ToastContainer } from 'react-toastify'; // Ensure you have react-toastify installed for toast notifications
import 'react-toastify/dist/ReactToastify.css';
interface FormData {
  collegeName: string;
  faculty: string;
  mobile: string;
  branch: string;
  course: string;
  email: string;
  counselor: string;
  address: string;
  question: string;
}

const CollegeRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    collegeName: '',
    faculty: '',
    mobile: '',
    email: '',
    address: '',
    branch: '',
    course: '',
    counselor: '',

    question: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sending data via POST request
      const response = await axios.post('http://localhost:3000/college-request', formData);

      // Resetting form data after successful submission
      setFormData({
        collegeName: '',
        faculty: '',
        mobile: '',
        email: '',
        address: '',
        branch: '',
        course: '',
        counselor: '',
        question: '',
      });

      // Showing success toast notification
      toast.success('Thank you for Registration!', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.log(response.data.data);  // You can also log response data if needed
    } catch (error) {
      console.error('Submission error:', error);
      // Showing error toast notification
      toast.error('Failed to send message. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-1/2 relative flex flex-col justify-start items-center mt-20">
            <div className="absolute inset-0 bg-gradient-to-t from-[#afa4eb] to-transparent"></div>
            <div className="relative flex justify-center items-start">
              <img
                src={Logo}
                alt="Inquiy Handler"
                className="rounded-full w-48 h-48 object-cover shadow-lg"
                style={{
                  animation: "bounceSlow 2.5s infinite ease-in-out",
                }}
              />
              <style>
                {`
                  @keyframes bounceSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }
                `}
              </style>
            </div>

            <h3 className="mt-6 text-lg font-semibold text-black">Welcome!</h3>
            <p className="text-center text-black max-w-md">
              You’re just 30 seconds away from registering your college! Complete
              the form, and we’ll be in touch shortly.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 ">College Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name *</label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">Number of Faculty *</label>
                  <input
                    type="number"
                    id="faculty"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="counselor" className="block text-sm font-medium text-gray-700">Number of counselores *</label>
                  <input
                    type="number"
                    id="counselor"
                    name="counselor"
                    value={formData.counselor}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700">Number of Courses *</label>
                  <input
                    type="number"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="counselor" className="block text-sm font-medium text-gray-700">Number of Branch *</label>
                  <input
                    type="number"
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>

               
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">Any question?</label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                <a
                  href="/landingpage"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#63589F] transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                </a>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#63589F] text-white px-6 py-2 rounded-lg hover:bg-[#7a6ec7] transition-colors duration-200"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeRegistrationForm;
