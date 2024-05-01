// routes.js

import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Home";
import NotFound from "../pages/ErrorPages/NotFound";
import Order from "../pages/Order";
import Login from "../pages/Auth/Login";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import Register from "../pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerDashboard from "../pages/Dashboard/AdminDashboard";
import BuyerDashboard from "../pages/Dashboard/SellerDashboard";
import SellerDashboardLayout from "../layout/SellerDashboardLayout";
import BuyerDashboardLayout from "../layout/BuyerDashboardLayout";
import Transactions from "../pages/Transactions/Transactions";
import Settings from "../pages/Settings/Settings";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/order/:orderId",
    element: <Order />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verifyemail",
    element: <VerifyEmail />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <SellerDashboardLayout />,
    children: [
      {
        path: "/seller/dashboard",
        element: <SellerDashboard />,
      },
      {
        path: "/seller/transactions",
        element: <Transactions />,
      },
      {
        path: "/seller/settings",
        element: <Settings />,
      },
    ],
  },
  {
    element: <BuyerDashboardLayout />,
    children: [
      {
        path: "/buyer/dashboard",
        element: <BuyerDashboard />,
      },
      {
        path: "/buyer/transactions",
        element: <Transactions />,
      },
      {
        path: "/buyer/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
