import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to BlogVillage
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Discover amazing stories, share your thoughts, and connect with
              writers from around the world.
            </p>
            {!user && (
              <div className="flex justify-center gap-4">
                <Link to="/login">
                  <Button variant="secondary" size="lg">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-purple-600"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Blogs */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Blogs</h2>
            <p className="mt-4 text-gray-600">
              Read the latest stories from our community
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
