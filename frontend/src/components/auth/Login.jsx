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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
    } catch (err) {
      toast.error(err?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
            {error.message || "An error occurred"}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

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
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          <div>
            <Label className="text-gray-700">Role</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange} disabled={loading}>
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

          <Button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 hover:text-purple-700">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
