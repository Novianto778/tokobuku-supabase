import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "pages/Home/Dashboard";
import Book from "pages/Book/Book";
import NotFound from "pages/NotFound";
import Login from "pages/Login/Login";
import PrivateRoutes from "components/PrivateRoutes";
import SignUp from "pages/Signup/SignUp";
import Detail from "pages/Book/Detail";
import AddEditBook from "pages/Book/AddEditBook";

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <PrivateRoutes />,
      children: [
        { path: "app", element: <Dashboard /> },
        {
          path: "book",
          children: [
            { path: "", element: <Book /> },
            { path: "add", element: <AddEditBook /> },
            { path: "detail/:id", element: <Detail /> },
            { path: "edit/:id", element: <AddEditBook isEdit /> },
          ],
        },
      ],
    },
    {
      path: "/",
      // element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
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
