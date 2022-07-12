import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import DashboardLayout from "layout/DashboardLayout";
import Book from "pages/Book";
import NotFound from "pages/NotFound";
import Login from "pages/Login";

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <Dashboard /> },
        { path: "book", element: <Book /> },
      ],
    },
    {
      path: "/",
      // element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "login", element: <Login /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    // {
    //   path: '/dashboard',
    //   element: <DashboardLayout />,
    // children: [
    //   { path: 'app', element: <DashboardApp /> },
    //   { path: 'user', element: <User /> },
    //   { path: 'products', element: <Products /> },
    //   { path: 'blog', element: <Blog /> },
    // ],
    // },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: '/', element: <Navigate to="/dashboard/app" /> },
    //     { path: 'login', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
