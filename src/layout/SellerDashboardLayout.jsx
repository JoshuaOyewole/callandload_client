import React, { useEffect } from "react";
import logo from "../assets/images/madsan_logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faGear,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../hooks/useLocalStorage";

function DashboardLayout() {
  const navigate = useNavigate();
  const [user] = useLocalStorage("callandload::user", null);

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("callandload::user");
    navigate("/");
  };
  return (
    <section className=" flex m-0 h-screen font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default dashboard-bg text-slate-500">
      {/* <div className="absolute w-full bg-blue-500 dark:hidden min-h-75"></div> */}
      {/* ASIDE */}
      <aside
        className=" hidden lg:block lg:basis-1/5 inset-y-0 flex-wrap items-center justify-between w-full p-0  overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 rounded-2xl xl:left-0 xl:translate-x-0"
        aria-expanded="false"
      >
        <div className="h-19">
          <i
            className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden"
          
          ></i>
          <Link
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
            to="/seller/dashboard"
          >
            <img
              src={logo}
              width={150}
              height={"auto"}
              className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8"
              alt="main_logo"
            />
          </Link>
        </div>

        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

        <div className=" flex justify-between h-[80%] flex-col w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
          <ul className="flex flex-col pl-0 mb-0 gap-y-2 mt-6">
            <li className="mt-0.5 w-full py-2 ">
              <Link
                className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-base ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors hover:text-gray-500"
                to="/seller/dashboard"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  {/* HOME ICON */}
                  <FontAwesomeIcon icon={faHouse} />
                </div>
                <span className=" duration-300 opacity-100 pointer-events-none ease">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full  py-2">
              <Link
                className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-base ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors hover:text-gray-500"
                to="/seller/transactions"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <FontAwesomeIcon icon={faFileInvoice} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                  Transactions
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full  py-2">
              <Link
                className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-base ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors hover:text-gray-500"
                to="/seller/settings"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                  Settings
                </span>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col pl-0 mb-0 gap-y-3 mt-10">
            <li className="mt-0.5 w-full  py-2">
              <button
                className="py-2.7 bg-blue-500/13 dark:text-white dark:opacity-80 text-base ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors"
                onClick={handleLogout}
              >
                {/* ICON */}
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
                {/* BUTTON TEXT */}
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <Outlet />
    </section>
  );
}

export default DashboardLayout;
