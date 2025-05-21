import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  User, Phone, Home, ClipboardList, CheckCircle, Send, GraduationCap,
  Book, ListChecks, Mail, FileSearch, Church,
  BabyIcon,
  KeyRound
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

const InquiryForm = () => {


  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: '',
    aadharNo: '',
    dateOfBirth: '',
    parentsMobileNo: '',
    email: '',
    address: '',

    board: '',
    schoolName: '',
    seatNo: '',
    result: '',

    courseName: '',
    referenceName: '',
    admissionCategory: '',
    category: '',
    password: '',

    priority_one: '',
    priority_two: '',
    priority_three: '',
  });

  const [branches, setBranches] = useState<{ _id: string; branchName: string }[]>([]);
  const [courses, setCourses] = useState<{ _id: string; courseName: string }[]>([]);
  const [courseBranches, setCourseBranches] = useState<{ _id: string; branchName: string }[]>([]);


  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/faculty/branch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBranches(res.data.branches);
      } catch (err) {
        console.error('Error fetching branches:', err);
        toast.error('Failed to load branches');
      }
    };
    fetchBranches();
  }, []);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/faculty/course', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(res.data.courses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);


  useEffect(() => {
    const fetchCourseBranches = async () => {
      if (!formData.courseName) return;

      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/faculty/courseBranch/${formData.courseName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourseBranches(res.data.branches); // Save branches related to selected course
      } catch (err) {
        console.error('Error fetching course branches:', err);
        toast.error('Failed to load course branches');
      }
    };

    fetchCourseBranches();
  }, [formData.courseName]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('User not authenticated!');
        return;
      }

      console.log('Form Data being sent:', formData); // Check what you're sending

      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/faculty/inquiry',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: formData,
      });

      console.log('Server response:', response.data);
      toast.success('Form submitted successfully!');

      // Optional: Reset form or navigate
      // setFormData(initialState);
      navigate("/appointcounselor");

    } catch (err: any) {
      console.error('Submission error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Submission failed!');
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
      <ToastContainer position="top-right" autoClose={5000} />
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
              <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Mobile No" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <User className="text-[#63589F] mr-3" />
              <input name="aadharNo" value={formData.aadharNo} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Aadhar No." />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <BabyIcon className="text-[#63589F] mr-3" />
              <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Date Of Birth" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Phone className="text-[#63589F] mr-3" />
              <input name="parentsMobileNo" value={formData.parentsMobileNo} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Parents Mobile No" />
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
              <input name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full outline-none text-sm" placeholder="School / College Name" />
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ClipboardList className="text-[#63589F] mr-3" />
              <input name="seatNo" value={formData.seatNo} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Seat No / Enrollment No" />
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
            {/* <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <ListChecks className="text-[#63589F] mr-3" />
              <select name="courseName" value={formData.courseName} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Course Name</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Course Name Dropdown */}
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Church className="text-[#63589F] mr-3" />
              <select name="courseName" value={formData.courseName} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>{course.courseName}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <FileSearch className="text-[#63589F] mr-3" />
              <input name="referenceName" value={formData.referenceName} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Reference Name" />
            </div>

            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Church className="text-[#63589F] mr-3" />
              <select name="admissionCategory" value={formData.admissionCategory} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Admission Category</option>
                <option>ACPC</option>
                <option>MQ</option>
                <option>VQ</option>
                <option>TFW</option>
              </select>
            </div>
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <Church className="text-[#63589F] mr-3" />
              <select name="category" value={formData.category} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Category</option>
                <option>Open</option>
                <option>SEBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>PH</option>
                <option>EWS</option>

              </select>
            </div>

          </div>
        </section>

        {/* Branch Priorities */}
        <section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {/* Priority One */}
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
            <ListChecks className="text-[#63589F] mr-3" />
              <select name="priority_one" value={formData.priority_one} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Priority 1</option>
                {courseBranches.map(branch => (
                  <option key={branch._id} value={branch._id}>{branch.branchName}</option>
                ))}
              </select>
            </div>

            {/* Priority Two */}
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
            <ListChecks className="text-[#63589F] mr-3" />
              <select name="priority_two" value={formData.priority_two} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Priority 2</option>
                {courseBranches.map(branch => (
                  <option key={branch._id} value={branch._id}>{branch.branchName}</option>
                ))}
              </select>
            </div>

            {/* Priority Three */}
            <div className="flex items-center border rounded-lg p-3 shadow-sm">
            <ListChecks className="text-[#63589F] mr-3" />
              <select name="priority_three" value={formData.priority_three} onChange={handleChange} className="w-full outline-none text-sm">
                <option value="">Priority 3</option>
                {courseBranches.map(branch => (
                  <option key={branch._id} value={branch._id}>{branch.branchName}</option>
                ))}
              </select>
            </div>


            <div className="flex items-center border rounded-lg p-3 shadow-sm">
              <KeyRound className="text-[#63589F] mr-3" />
              <input name="password" type='password' value={formData.password} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Enter Password" />
            </div>

          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#63589F] text-white px-6 py-3 rounded-lg hover:bg-[#4e4482] transition-all shadow-md"
          >
            <Send size={18} /> Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
