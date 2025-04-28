import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();

  // Function to display the time difference in days
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60)); // Returns difference in days
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {blog?.createdAt === 0
            ? "Today"
            : `${daysAgoFunction(blog?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={blog?.owner?.profileImage} alt="Profile" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{blog?.owner?.name}</h1>
          <p className="text-sm text-gray-500">Blog Owner</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl my-2">{blog?.title}</h1>
        <p className="text-sm text-gray-600">{blog?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {blog?.category}
        </Badge>
      </div>

      <div className="my-4">
        <img
          src={blog?.featureImage}
          alt="Feature"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/blog/${blog?._id}`)} // Navigate to the full blog post
          variant="outline"
        >
          Read Full Blog
        </Button>
        <Button className="bg-[#7209b7]">Save for Later</Button>
      </div>
    </div>
  );
};

export default Blog;
