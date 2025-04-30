import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      toast.success("Login Successful");
      navigate(user.role === 'admin' ? '/admin' : '/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
              {error.message || "Invalid credentials"}
            </div>
          )}
          
          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700">Role</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={handleRoleChange}
              required
            >
              <div className="flex gap-4">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="text-sm text-gray-700">User</Label>
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="text-sm text-gray-700">Admin</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm text-blue-300 hover:text-blue-700"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
