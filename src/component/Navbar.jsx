import { useState } from "react";
import logo from "../assets/images/madsan_logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`w-[95%] lg:w-[90%] xl:w-[90%] my-0 mx-auto bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-10 lg:bg-transparent ${
        isOpen ? "h-screen" : "h-0"
      } lg:h-[15vh]`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} width={120} height={70} alt="Madsan Logo" />
          <span className="hidden self-center text-2xl font-semibold whitespace-nowrap dark:text-white lg:inline lg:text-white">
            Call & load
          </span>
        </Link>
        <button
          onClick={handleHamburger}
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
            isOpen
              ? "text-gray-600"
              : "text-white hover:bg-transparent focus:ring-0"
          }`}
          aria-controls="navbar-multi-level"
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
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:bg-transparent">
            <li className="hidden">
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded hover:text-gray-300 md:bg-transparent md:text-white md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="mt-6 lg:mt-0">
              <Link
                to={"/login"}
                type="button"
                className="text-white bg-[#ff9900] hover:bg-white hover:text-black font-medium rounded-full text-sm px-8 py-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block"
              >
                Login
              </Link>
            </li>
            <li className="mt-6 lg:mt-0">
              <Link
                to={"/register"}
                type="button"
                className="py-2 px-8 text-sm font-medium md:text-white  rounded-full border lg:border-gray-200 lg:hover:bg-[#ff9900] lg:hover:text-white hover:border-gray-600  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-block w-full text-gray-950 text-center"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
