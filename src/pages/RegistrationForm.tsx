import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  profilePicture: File | null;
  acceptTerms: boolean;
  role: "college" | "faculty" | "counselor";
}

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    profilePicture: null,
    acceptTerms: false,
    role: "college"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
//   const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // ✅ Validate fields with added checks
  const validateField = (name: string, value: string | boolean) => {
    switch (name) {
      case "fullName":
        return typeof value === "string" && (value.trim().length < 2 || /[^a-zA-Z\s]/.test(value))
          ? "Name must be at least 2 characters and contain only letters"
          : "";
      case "email":
        return typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return typeof value === "string" && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
          : "";
      default:
        return "";
    }
  };

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    // Type guard for checkbox
    const fieldValue = type === "checkbox" && "checked" in e.target 
      ? (e.target as HTMLInputElement).checked 
      : value;
  
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    const error = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  

  // ✅ Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setErrors((prev) => ({
        ...prev,
        profilePicture: "File size should not exceed 5MB"
      }));
    }
  }, []);

  // ✅ Dropzone hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"]
    },
    maxSize: 5 * 1024 * 1024
  });

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "profilePicture") {
        const error = validateField(key, formData[key as keyof FormData] as string | boolean);
        if (error) newErrors[key] = error;
      }
    });
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Please accept the terms and conditions";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-heading font-heading text-foreground">Create Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} className="block w-full py-2 border rounded-md">
              <option value="college">College</option>
              <option value="faculty">Faculty</option>
              <option value="counselor">Counselor</option>
            </select>
          </div>

          {/* ✅ Profile Picture Dropzone */}
          <div {...getRootProps()} className="border p-4 rounded-md cursor-pointer">
            <input {...getInputProps()} />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />
            ) : (
              <p>Drag & drop or click to upload an image (max 5MB)</p>
            )}
          </div>

          <button type="submit" className="w-full py-2 border rounded-md shadow-sm text-sm font-medium">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
