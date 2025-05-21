import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"; // 👈 import this

const AppointCounselorForm = () => {
    const { id } = useParams(); // 👈 extract ID from URL
    const [formData, setFormData] = useState({
        counselorId: "",
    });

    const [counselors, setCounselors] = useState<
        { _id: string; counselorName: string }[]
    >([]);

    useEffect(() => {
        const fetchCounselor = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/faculty/counselor", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCounselors(res.data.counselors);
            } catch (err) {
                console.error("Error fetching Counselor:", err);
                toast.error("Failed to load Counselor");
            }
        };
        fetchCounselor();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
                `http://localhost:3000/faculty/appointInquiry/${id}`, // 👈 use id here
                formData, // this sends { counselorId }
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Counselor appointed successfully!");
            setFormData({ counselorId: "" });

            setTimeout(() => {
                window.location.href = "/appointcounselor";
            }, 1500);

        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center text-[#63589F] mb-6">
                Appoint Counselor
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="counselorId"
                    value={formData.counselorId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="">Select Counselor</option>
                    {counselors.map((counselor) => (
                        <option key={counselor._id} value={counselor._id}>
                            {counselor.counselorName}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-[#63589F] text-white px-4 py-2 rounded-md hover:bg-[#7468B7] transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AppointCounselorForm;
