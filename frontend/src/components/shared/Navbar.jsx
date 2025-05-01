import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-pink-700 "> {/* Added shadow-lg */}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 p-4">
        <div>
          <Link to="/admin">
            <h1 className="text-3xl font-semibold text-white">
              Blog<span className="text-yellow-400">Village</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium text-white items-center gap-6">
            {user?.role === "admin" ? (
              <>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/myBlogs"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    My Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Blogs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Blogs
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-gray-800 transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer border-2 border-white">
                  <AvatarImage
                    src={user.profileImage || `/default-avatar.png`}
                    alt={user.name}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer border-2 border-purple-500">
                      <AvatarImage
                        src={user.profileImage || `/default-avatar.png`}
                        alt={user.name}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    {user.role === "user" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
                      >
                        <User2 size={18} />
                        <span>View Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
