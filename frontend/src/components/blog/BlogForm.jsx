import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../redux/blogSlice';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const BlogForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector((state) => state.blogs);
  
  const existingBlog = isEditing ? blogs.find(blog => blog._id === id) : null;

  const [formData, setFormData] = useState({
    title: existingBlog?.title || '',
    content: existingBlog?.content || '',
    description: existingBlog?.description || '',
    category: existingBlog?.category || '',
    featureImage: null
  });

  const categories = [
    'Technology',
    'Travel',
    'Food',
    'Lifestyle',
    'Business',
    'Health',
    'Education'
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await dispatch(updateBlog({ id, blogData: formDataToSend })).unwrap();
        toast.success('Blog updated successfully');
      } else {
        await dispatch(createBlog(formDataToSend)).unwrap();
        toast.success('Blog created successfully');
      }
      navigate('/my-blogs');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? 'Edit Blog' : 'Create New Blog'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full min-h-[200px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="featureImage">Feature Image</Label>
            <Input
              id="featureImage"
              name="featureImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditing ? 'Update Blog' : 'Create Blog'}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BlogForm;