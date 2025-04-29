import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteBlog } from '../../redux/blogSlice';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = blogs.find(b => b._id === id);
    setBlog(foundBlog);
  }, [blogs, id]);

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Blog not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const isOwner = user?._id === blog.owner._id;

  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(id)).unwrap();
      toast.success('Blog deleted successfully');
      navigate('/my-blogs');
    } catch (error) {
      toast.error(error.message || 'Failed to delete blog');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
            {isOwner && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/edit-blog/${blog._id}`)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your blog.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => {}}>Cancel</Button>
                      <Button variant="destructive" onClick={handleDelete}>
                        Delete
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <img
                src={blog.owner.profileImage || '/default-avatar.png'}
                alt={blog.owner.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{blog.owner.name}</span>
            </div>
            <span>•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Feature Image */}
        {blog.featureImage && (
          <div className="mb-8">
            <img
              src={blog.featureImage}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">{blog.description}</p>
          <div className="whitespace-pre-wrap text-gray-800">{blog.content}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;