import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
const Blog = ({blog}) => {
  const navigate = useNavigate();
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{blog?.createdAt===0 ? "Today": `${daysAgoFunction(blog?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="rounded-lg shadow-lg bg-white border border-gray-200 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl p-6">
      {/* Blog Feature Image */}
      {blog?.featureImage && (
        <div className="mb-4">
          <img
            src={blog?.featureImage}
            alt="Feature"
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Blog Title */}
      <h3 className="font-bold text-2xl text-gray-800 my-2">{blog?.title}</h3>

      {/* Blog Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog?.description}</p>

      {/* Category Badge at the bottom-left */}
      {blog?.category && (
        <div className="absolute bottom-4 left-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {blog?.category}
          </Badge>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <Button
          onClick={() => navigate(`/blog/${blog?._id}`)}
          variant="outline"
          className="text-sm font-medium"
        >
          Read More
        </Button>
        <Button className="bg-[#7209b7] text-white text-sm font-medium hover:bg-[#5e0798]">
          Save for Later
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Blog;
