import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/madsan_logov1.png";
import success from "../assets/images/success.png";

function Modal() {
  return (
    <>
      <nav className="bg-gray-800 border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 w-[90%]">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              width={120}
              height={70}
              alt="Madsan Call & Load Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">
              Call & Load
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:flex md:items-center md:w-auto md:gap-x-8"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block text-sm py-2 px-3 text-white  rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-[#ff9900] hover:text-[#ff9900]"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block text-sm py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#ff9900] md:p-0 dark:text-white md:dark:hover:text-[#ff9900] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="block text-sm py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#ff9900] md:p-0 dark:text-white md:dark:hover:text-[#ff9900] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Pricing
                </Link>
              </li>
              <div className=" flex-col gap-y-4 md:flex-row hidden">
                <Link
                  to={"/login"}
                  type="button"
                  className="text-white bg-[#ff9900] hover:bg-white hover:text-black font-medium rounded-full text-sm px-8 py-2 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  type="button"
                  className="py-2 px-8 text-sm font-medium text-white  rounded-full border border-gray-200 hover:bg-[#ff9900] hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                >
                  Signup
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className=" flex-col w-full mt-6 h-[90vh]">
        <div className="container w-[95%] lg:w-[90%] xl:w-[75%] my-0 mx-auto flex flex-col lg:flex-row gap-x-16 items-center mt-10 lg:mt-0 py-20 justify-center">
          <div className="bg-white max-w-[461px] h-[60vh] rounded-lg flex justify-center items-center flex-col py-4 px-7 shadow-md">
            <img src={success} alt="successful" height={150} width={150} />
            <h2 className="font-bold mt-6 text-2xl mb-3">
              Purchase Successful!
            </h2>
            <p className="text-center">
              An invoice has been generated and sent to your email.
            </p>
            <Link
              className="bg-blue-700 py-3 hover:bg-blue-500   px-8 mt-8 rounded-lg text-white"
              to={"/dashboard"}
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
