import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    User,
    Phone,
    Mail,
    Home,
    GraduationCap,
    Book,
    ClipboardList,
    CheckCircle,
    BabyIcon,
} from "lucide-react";

interface Inquiry {
    _id: string;
    formNo: string;
    fullName: string;
    mobileNo: string;
    parentsMobileNo: string;
    address: string;
    board: string;
    schoolName: string;
    referenceName: string;
    priority_one: { branchName: string };
    priority_two: { branchName: string };
    priority_three: { branchName: string };
    formFillBy: any;
    status: string;
    admissionCategory: string;
    seatNo: string;
    result: string;
    college: any;
    email: string;
    password: string;
    date: string;
    category: string;
    aadharNo: string;
    dateOfBirth: string;
    counselorName: any;
}

const EditInquiryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const inquiry: Inquiry = location.state?.inquiry;

    const [formData, setFormData] = useState({
        fullName: "",
        mobileNo: "",
        email: "",
        status: "",
        aadharNo: "",
        dateOfBirth: "",
        parentsMobileNo: "",
        address: "",
        board: "",
        schoolName: "",
        seatNo: "",
        result: "",
        referenceName: "",
        admissionCategory: "",
        priority_one: { branchName: "" },
        priority_two: { branchName: "" },
        priority_three: { branchName: "" },
        formFillBy: { _id: "", facultyName: "", email: "", mobileNo: "", password: "" },
        college: { _id: "", username: "", collegeName: "", email: "", mobileNo: "", password: "", role: "" },
        counselorName: { _id: "", username: "", counselorName: "", mobileNo: "", email: "", password: "" }
    });

    useEffect(() => {
        if (inquiry) {
            setFormData({
                fullName: inquiry.fullName,
                mobileNo: inquiry.mobileNo,
                email: inquiry.email,
                status: inquiry.status,
                aadharNo: inquiry.aadharNo,
                dateOfBirth: inquiry.dateOfBirth,
                parentsMobileNo: inquiry.parentsMobileNo,
                address: inquiry.address,
                board: inquiry.board,
                schoolName: inquiry.schoolName,
                seatNo: inquiry.seatNo,
                result: inquiry.result,
                referenceName: inquiry.referenceName,
                admissionCategory: inquiry.admissionCategory,
                priority_one: inquiry.priority_one,
                priority_two: inquiry.priority_two,
                priority_three: inquiry.priority_three,
                formFillBy: inquiry.formFillBy,
                college: inquiry.college,
                counselorName: inquiry.counselorName
            });
        }
    }, [inquiry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("priority_one.")) {
            setFormData({ ...formData, priority_one: { ...formData.priority_one, branchName: value } });
        } else if (name.startsWith("priority_two.")) {
            setFormData({ ...formData, priority_two: { ...formData.priority_two, branchName: value } });
        } else if (name.startsWith("priority_three.")) {
            setFormData({ ...formData, priority_three: { ...formData.priority_three, branchName: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/college/inquiry/${id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            toast.success("Inquiry updated successfully!");
            navigate(-1);
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Failed to update inquiry.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200">
            <ToastContainer position="top-right" autoClose={5000} />
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3 text-[#63589F]">
                <ClipboardList size={32} />Edit Inquiry Form
            </h1>
            <form className="space-y-8" onSubmit={handleSubmit}>
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
                        <div className="flex items-center border rounded-lg p-3 shadow-sm">
                            <CheckCircle className="text-[#63589F] mr-3" />
                            <input name="result" value={formData.referenceName} onChange={handleChange} className="w-full outline-none text-sm" placeholder="Result" />
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-[#000000]">
                        <ClipboardList size={24} /> Course Priority
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input name="priority_one.branchName" value={formData.priority_one.branchName} onChange={handleChange} className="border p-3 rounded-lg w-full text-sm" placeholder="1st Priority" />
                        <input name="priority_two.branchName" value={formData.priority_two.branchName} onChange={handleChange} className="border p-3 rounded-lg w-full text-sm" placeholder="2nd Priority" />
                        <input name="priority_three.branchName" value={formData.priority_three.branchName} onChange={handleChange} className="border p-3 rounded-lg w-full text-sm" placeholder="3rd Priority" />
                    </div>
                </section>
                <div className="flex justify-end">
                    <button type="submit" className="bg-[#63589F] text-white px-6 py-2 rounded-lg hover:bg-[#504184] transition duration-300">
                        Update Inquiry
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInquiryForm;
