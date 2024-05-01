import { Link } from "react-router-dom";
import logo from "../assets/images/madsan_logov1.png";
function Footer() {
  return (
    <footer className="bg-[#1F2025] shadow dark:bg-gray-900 text-white text-center">
      <div className="w-[95%] lg:w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt="Madson Logo" width={120} height={60} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden">
              Madsan
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#termsandconditions" className="hover:underline me-4 md:me-6">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center dark:text-gray-400">
          &copy; 2024{" "}
          <Link to="https://madsan.ng" className="hover:underline">
            Marine Diesel Suppliers Association of Nigeria (MADSAN) Call and
            Load
          </Link>
          .{" "}
        </span>
        <span className="inline-block text-center">All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
