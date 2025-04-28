import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profileImage: null,
    role: "user", // Default to "user" role
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle role change via RadioGroup
  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/signup`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { token, user } = response.data;

      // Save the JWT token in localStorage
      localStorage.setItem("token", token);

      // Store user details in Redux
      dispatch(setUser(user));

      dispatch(setLoading(false));
      navigate("/"); // Redirect to the home page after successful signup
      toast.success("Signup Successful");
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Signup
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <Label htmlFor="name" className="text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Username Input */}
          <div>
            <Label htmlFor="username" className="text-gray-700">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
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
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
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

          {/* Profile Image Input */}
          <div>
            <Label htmlFor="profileImage" className="text-gray-700">
              Profile Image
            </Label>
            <Input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleChange}
              accept="image/*"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role Selection (Admin or User) */}
          <div>
            <Label className="text-gray-700 mb-3">Role</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
              <div className="flex gap-6 ">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="text-gray-700">
                    User
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="text-gray-700">
                    Admin
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-[#F83002] text-white rounded-lg hover:bg-[#D42E01] transition-colors duration-300"
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
