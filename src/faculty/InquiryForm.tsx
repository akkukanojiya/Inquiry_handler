import { useState } from 'react';
import axios from 'axios';
import {
  User, Phone, Home, ClipboardList, CheckCircle, Send, GraduationCap,
  Book, ListChecks, Mail, FileSearch, Church, PlusCircleIcon
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    parentsMobile: '',
    email: '',
    address: '',

    board: '',
    instituteName: '',
    enrollmentNo: '',
    result: '',

    courseName: '',
    referenceName: '',
    admissionCategory: '',
    udiseNumber: '',
    priority1: '',
    priority2: '',
    priority3: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/inquiry', formData);
      toast.success('Form submitted successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Submission failed!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
       <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold flex items-center justify-center gap-3 text-[#63589F]">
        <ClipboardList size={32} /> Inquiry Form
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Personal Details */}
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#000000]">
            <User size={24} /> Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <User className="text-[#63589F] mr-3" />
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Full Name" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Phone className="text-[#63589F] mr-3" />
              <input name="mobile" value={formData.mobile} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Mobile No" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Phone className="text-[#63589F] mr-3" />
              <input name="parentsMobile" value={formData.parentsMobile} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Parents Mobile No" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Mail className="text-[#63589F] mr-3" />
              <input name="email" value={formData.email} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Email" />
            </div>
            <div className="flex items-start border rounded-lg p-3 shadow-sm md:col-span-2">
              <Home className="text-[#63589F] mr-3 mt-1" />
              <textarea name="address" value={formData.address} onChange={handleChange} className="w-full outline-none text-sm resize-none" placeholder="Address"></textarea>
            </div>
          </div>
        </section>

        {/* Education Details */}
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#000000]">
            <GraduationCap size={24} /> Education Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Book className="text-[#63589F] mr-3" />
              <select name="board" value={formData.board} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
              </select>
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <GraduationCap className="text-[#63589F] mr-3" />
              <input name="instituteName" value={formData.instituteName} onChange={handleChange} className="w-full outline-none text-sm" placeholder="School / College Name" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ClipboardList className="text-[#63589F] mr-3" />
              <input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Seat No / Enrollment No" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <CheckCircle className="text-[#63589F] mr-3" />
              <input name="result" value={formData.result} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Result" />
            </div>
          </div>
        </section>

        {/* Course Priority */}
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#000000]">
            <CheckCircle size={24} /> Course Priority
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ListChecks className="text-[#63589F] mr-3" />
              <select name="courseName" value={formData.courseName} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Course Name</option>
                <option>MCA</option>
                <option>BE/B.Tech</option>
                <option>D2D</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <FileSearch className="text-[#63589F] mr-3" />
              <select name="referenceName" value={formData.referenceName} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Reference Name</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>WhatsApp</option>
                <option>Others</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Church className="text-[#63589F] mr-3" />
              <select name="admissionCategory" value={formData.admissionCategory} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Admission Category</option>
                <option>ACPC</option>
                <option>MQ</option>
                <option>VQ</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <PlusCircleIcon className="text-[#63589F] mr-3" />
              <input name="udiseNumber" value={formData.udiseNumber} onChange={handleChange} className="w-full outline-none text-sm" placeholder="UDISE number" />
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ListChecks className="text-[#63589F] mr-3" />
              <select name="priority1" value={formData.priority1} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Priority 1</option>
                <option>Computer Science & Engineering</option>
                <option>Civil Engineering</option>
                <option>Information Technology</option>
                <option>Mechanical Engineering</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ListChecks className="text-[#63589F] mr-3" />
              <select name="priority2" value={formData.priority2} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Priority 2</option>
                <option>Computer Science & Engineering</option>
                <option>Civil Engineering</option>
                <option>Information Technology</option>
                <option>Mechanical Engineering</option>
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ListChecks className="text-[#63589F] mr-3" />
              <select name="priority3" value={formData.priority3} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Priority 3</option>
                <option>Computer Science & Engineering</option>
                <option>Civil Engineering</option>
                <option>Information Technology</option>
                <option>Mechanical Engineering</option>
              </select>
            </div>
          </div>
        </section>

        {/* Submit/Reset Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="w-1/2 md:w-1/4 p-3 bg-[#63589F] text-white rounded-lg hover:bg-[#a39bd1] flex items-center justify-center gap-2 text-lg shadow-md">
            <Send size={20} /> Submit
          </button>
          <button type="reset" className="w-1/2 md:w-1/4 p-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center justify-center gap-2 text-lg shadow-md"
            onClick={() => setFormData({
              fullName: '', mobile: '', parentsMobile: '', email: '', address: '',
              board: '', instituteName: '', enrollmentNo: '', result: '',
              courseName: '', referenceName: '', admissionCategory: '', udiseNumber: '',
              priority1: '', priority2: '', priority3: '',
            })}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
