import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import RadioGroup components
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Initialize a single state object for the form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dynamically handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle role selection change
  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formData
      );
      const { token, user } = response.data;

      // Save the JWT token in localStorage
      localStorage.setItem("token", token);

      // Store user details in Redux
      dispatch(setUser(user));

      dispatch(setLoading(false));
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-gray-700">Role</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="text-gray-700">User</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="text-gray-700">Admin</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-[#F83002] text-white rounded-lg hover:bg-[#D42E01] transition-colors duration-300"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
