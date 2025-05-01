import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import BlogDetails from "./components/blog/BlogDetails";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Blogs from "./components/blog/Blogs";
import AdminBlogs from "./components/admin/AdminBlogs";
import AdminEditBlog from "./components/admin/AdminEditBlog";
import AdminCreateBlog from "./components/admin/AdminCreateBlog";

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
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/myBlogs",
    element: (
      <ProtectedRoute role="admin">
        <AdminBlogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/create-blog",
    element: (
      <ProtectedRoute role="admin">
        <AdminCreateBlog />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/edit-blog/:id",
    element: (
      <ProtectedRoute role="admin">
        <AdminEditBlog />
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
