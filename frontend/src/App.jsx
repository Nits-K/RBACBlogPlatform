import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import BlogDetails from "./components/blog/BlogDetails";
import BlogForm from "./components/blog/BlogForm";
import MyBlogs from "./components/pages/MyBlogs";
import AdminDashboard from "./components/pages/AdminDashboard";
import AdminUsers from "./components/pages/AdminUsers";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/blog/:id",
    element: <BlogDetails />,
  },
  {
    path: "/create-blog",
    element: (
      <ProtectedRoute>
        <BlogForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-blogs",
    element: (
      <ProtectedRoute>
        <MyBlogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <AdminUsers />
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
