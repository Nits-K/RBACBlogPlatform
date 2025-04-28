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
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth); // Get user data from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout functionality for JWT
  const logOutHandler =  () => {
    // Remove the JWT token from localStorage (or sessionStorage if you're using that)
    localStorage.removeItem("token"); // or sessionStorage.removeItem("token");

    // Reset user state in Redux store (clear any user data)
    dispatch(setUser(null));

    // Redirect to home page or login page
    navigate("/");

    // Display a success message
    toast.success("You have logged out successfully!");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 p-4">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Blog<span className="text-yellow-400">Village</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium text-white items-center gap-6">
            {/* Conditional navigation links based on user role */}
            {user && user.role === "admin" ? (
              <>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Manage Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Manage Users
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
                    to="/"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Display login/signup buttons if the user is not logged in */}
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
                {/* Profile Avatar displayed for logged-in user */}
                <Avatar className="cursor-pointer border-2 border-white">
                  <AvatarImage src={user.profileImage} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white text-gray-800 p-4 rounded-lg shadow-lg">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer border-2 border-purple-500">
                      <AvatarImage src={user.profileImage} alt="Profile" />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{user.name}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col my-2">
                    {/* View Profile option only for regular users */}
                    {user && user.role === "user" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        {/* <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button> */}
                      </div>
                    )}

                    {/* Logout functionality */}
                    <div className="flex w-fit items-center gap-2 cursor-pointer text-red-500">
                      <LogOut />
                      <Button onClick={logOutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
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
