import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Home";
import NotFound from "./pages/ErrorPages/NotFound";
import Order from "./pages/Order";
import Login from "./pages/Auth/Login";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerDashboard from "./pages/Dashboard/BuyerDashboard";
import BuyerDashboard from "./pages/Dashboard/SellerDashboard";
import SellerDashboardLayout from "./layout/SellerDashboardLayout";
import BuyerDashboardLayout from "./layout/BuyerDashboardLayout";
import Transactions from "./pages/Transactions/Transactions";
import TransactionDetails from "./pages/Transactions/TransactionDetails";
import Settings from "./pages/Settings/Settings";
import BuyerSettings from "./pages/Settings/BuyerSetting";
//import ProtectedRoute from "./hooks/ProtectedRoute";
//import { AuthProvider } from "./hooks/useAuth";

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
        path: "/seller/transactions/:id",
        element: <TransactionDetails />,
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
        path: "/buyer/transactions",
        element: <Transactions />,
      },
      {
        path: "/buyer/transactions/:id",
        element: <TransactionDetails />,
      },
      {
        path: "/buyer/profile",
        element: <BuyerSettings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
