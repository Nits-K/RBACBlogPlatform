import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import BlogCard from "./components/blog/BlogCard";
import BlogDetails from "./components/blog/BlogDetails";
import BlogForm from "./components/admin/AdminCreateBlog";
import MyBlogs from "./components/admin/AdminBlogs";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Blogs from "./components/blog/Blogs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetails />,
  },
  {
    path: "/blogs",
    element: <Blogs/>,
  },
  {
    path: "/admin/create-blog",
    element: (
      <ProtectedRoute role="admin">
        <BlogForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/myBlogs",
    element: (
      <ProtectedRoute role="admin">
        <MyBlogs />
      </ProtectedRoute>
    ),
  },
  
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
