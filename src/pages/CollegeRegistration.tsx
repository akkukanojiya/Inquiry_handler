import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../img/ih-logo.png'
interface FormData {
  collegeName: string;
  facultyCount: string;
  mobileNo: string;
  branchCount: string;
  email: string;
  courseCount: string;
  address: string;
  questions: string;
}

const CollegeRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    collegeName: '',
    facultyCount: '',
    mobileNo: '',
    branchCount: '',
    email: '',
    courseCount: '',
    address: '',
    questions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
          <div className="md:w-1/2 p-8 ">
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
                  <label htmlFor="facultyCount" className="block text-sm font-medium text-gray-700">Number of Faculty *</label>
                  <input
                    type="number"
                    id="facultyCount"
                    name="facultyCount"
                    value={formData.facultyCount}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="branchCount" className="block text-sm font-medium text-gray-700">Number of Branches *</label>
                  <input
                    type="number"
                    id="branchCount"
                    name="branchCount"
                    value={formData.branchCount}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#63589F] focus:ring focus:ring-[#63589F] focus:ring-opacity-50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="courseCount" className="block text-sm font-medium text-gray-700">Number of Courses *</label>
                  <input
                    type="number"
                    id="courseCount"
                    name="courseCount"
                    value={formData.courseCount}
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
                <label htmlFor="questions" className="block text-sm font-medium text-gray-700">Any Questions?</label>
                <textarea
                  id="questions"
                  name="questions"
                  value={formData.questions}
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