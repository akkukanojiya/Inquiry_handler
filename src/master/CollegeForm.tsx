const MasterCollegeForm = () => {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        alert('Form submitted!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-4"
            >
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">College Form</h2>

                {/* ID Field */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <input
                        type="text"
                        placeholder="Enter ID"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F]focus:border-transparent"
                        required
                    />
                </div> */}

                {/* Counselor Name Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">College Name</label>
                    <input
                        type="text"
                        placeholder="Enter College Name"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F]focus:border-transparent"
                        required
                    />
                </div>

                {/* Mobile No Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile No</label>
                    <input
                        type="tel"
                        placeholder="Enter Mobile No"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F]focus:border-transparent"
                        required
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#63589F]focus:border-transparent"
                        required
                    />
                </div>

                {/* Submit Button */}
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

export default MasterCollegeForm;
