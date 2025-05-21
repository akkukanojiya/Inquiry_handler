import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  User,
  MapPin,
  Calendar,
   
  BadgeInfo,
  Pencil,
  Save,
  X,
} from "lucide-react";

interface HSCDetails {
  board?: string;
  result?: string;
   
}

interface InquiryId {
  _id?: string;
  formNo?: number;
}

interface Counselor {
  _id?: string;
  counselorName?: string;
}

interface College {
  _id?: string;
  collegeName?: string;
}

interface StudentProfile {
  _id?: string;
  fullName?: string;
  address?: string;
  mobileNo?: string;
  parentsMobileNo?: string;
  dateOfBirth?: string;
  gender?: string;
  category?: string;
  aadharNo?: string;
  email?: string;
  hscDetails?: HSCDetails;
  inquiry_id?: InquiryId;
  counselorName?: Counselor;
  college?: College;
}

const StudentProfile = () => {
  const [profile, setProfile] = useState<StudentProfile>({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<StudentProfile>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/student/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data.data);
        setFormData(res.data.data);
      } catch (error) {
        console.error("Error fetching student profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("hscDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        hscDetails: {
          ...prev.hscDetails,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/student/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile(res.data.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src="https://api.dicebear.com/7.x/thumbs/svg?seed=Mira"
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md border-2 border-blue-500"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {profile.fullName || "N/A"}
            </h2>
            <p className="text-gray-600">{profile.email || "N/A"}</p>
            <p className="text-sm text-gray-500 mt-1">
              Form No: {profile.inquiry_id?.formNo || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-[#63589F] text-white px-4 py-2 rounded-xl shadow hover:bg-[#a39bd1] transition"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-6 text-[#63589F]">
        {/* PERSONAL INFO */}
        <Section title="Personal Information" color="">
          <FieldEdit
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            editable={editMode}
          />
          <FieldEdit
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            editable={editMode}
            icon={<User size={16} />}
          />
          <FieldEdit
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            editable={editMode}
            icon={<Calendar size={16} />}
          />
          <FieldEdit
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            editable={editMode}
            icon={<BadgeInfo size={16} />}
          />
          <FieldEdit
            label="Aadhar No."
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            editable={editMode}
          />
          <FieldEdit
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            editable={editMode}
            icon={<MapPin size={16} />}
          />
        </Section>

        {/* CONTACT INFO */}
        <Section title="Contact Information" color="">
          <FieldEdit
            label="Mobile No"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            editable={editMode}
            icon={<Phone size={16} />}
          />
          <FieldEdit
            label="Parent's Mobile No"
            name="parentsMobileNo"
            value={formData.parentsMobileNo}
            onChange={handleChange}
            editable={editMode}
            icon={<Phone size={16} />}
          />
          <FieldEdit
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            editable={editMode}
            icon={<Mail size={16} />}
          />
        </Section>

        {/* ACADEMIC INFO */}
        <Section title="Academic Information" color="">
          <FieldEdit
            label="HSC Board"
            name="hscDetails.board"
            value={formData.hscDetails?.board}
            onChange={handleChange}
            editable={editMode}
          />
          <FieldEdit
            label="Counselor Name"
            name="counselorName"
            value={formData.counselorName?.counselorName}
            onChange={handleChange}
            editable={editMode}
          />
          <FieldEdit
            label="College Name"
            name="collegeName"
            value={formData.college?.collegeName}
            onChange={handleChange}
            editable={editMode}
          />
          <FieldEdit
            label="HSC Result"
            name="hscDetails.result"
            value={formData.hscDetails?.result}
            onChange={handleChange}
            editable={editMode}
          />
        </Section>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
  color,
}: {
  title: string;
  children: React.ReactNode;
  color: string;
}) => (
  <div>
    <h3 className={`text-xl font-semibold border-b pb-2 text-${color}-600`}>
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">{children}</div>
  </div>
);

interface FieldEditProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable: boolean;
  type?: string;
  icon?: React.ReactNode;
}

const FieldEdit = ({
  label,
  name,
  value,
  onChange,
  editable,
  type = "text",
  icon,
}: FieldEditProps) => (
  <div className="flex items-start space-x-2">
    {icon && <div className="mt-2 text-blue-500">{icon}</div>}
    <div className="w-full">
      <p className="text-sm text-gray-500">{label}</p>
      {editable ? (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full mt-1 p-2 rounded border border-gray-300"
        />
      ) : (
        <p className="text-base font-medium text-gray-800">{value || "N/A"}</p>
      )}
    </div>
  </div>
);

export default StudentProfile;
