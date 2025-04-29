import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profileImage: "",
    role: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files?.[0],
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);

    if (!formData.profileImage) {
      toast.error("Profile image is required.");
      return;
    }
    form.append("profileImage", formData.profileImage);
    form.append("role", formData.role);

    try {
      const result = await dispatch(registerUser(form)).unwrap();

      if (result.user) {
        dispatch(setUser({ user: result.user, token: result.token }));
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.message || "Registration failed");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Register
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={changeEventHandler}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={changeFileHandler}
              accept="image/*"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Role</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange}>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">User</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:text-purple-800">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
