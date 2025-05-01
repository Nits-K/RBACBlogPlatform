import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false); // ⬅️ Loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.profileImage) {
      toast.error("Profile image is required.");
      return;
    }
  
    setLoading(true);
  
    // Create a FormData object
    const data = new FormData();
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("profileImage", formData.profileImage); // Profile image file
  
    dispatch(registerUser(data))  // Send FormData to the backend
      .then(() => {
        toast.success("Account created successfully");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Registration failed.");
      })
      .finally(() => setLoading(false));
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <Label>Username</Label>
            <Input name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <Label>Profile Image</Label>
            <Input type="file" onChange={handleFileChange} accept="image/*" required />
          </div>

          <div className="mb-6">
            <Label>Role</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
              <div className="flex gap-4 mt-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-400 hover:text-blue-700">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
