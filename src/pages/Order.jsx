const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/madsan_logo.png";
import Footer from "../component/Footer";
import Modal from "../component/Modal";
import Modal2 from "../component/Modal2";
import AuthContainer from "../component/AuthContainer";

function Order() {
  let { orderId } = useParams();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  const navigate = useNavigate();

  const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  });

  useEffect(() => {
    const getOrder = async (orderId) => {
      setIsLoading(true);

      try {
        //Check if the Order has been processed (Not in the state of Initialized)
        const response = await axios.get(
          `${API_URL}/orders/single?id=${orderId}`
        );
        const data = await response.data;
        let order = data.data;

        if (order.status === "initiated") {
          setOrderDetails(order);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          navigate("/"); //Redirect the user back Home to make an Order
          return;
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching orders:", error);
        navigate("/"); //Redirect the user back Home to make an Order
      }
    };
    getOrder(orderId);
  }, []);

  return isLoading && !modal ? (
    <div className="h-screen bg-white w-full">
      <div className="flex justify-center items-center h-full">
        <img
          height={85}
          width={85}
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt="loading image"
        />
      </div>
    </div>
  ) : modal ? (
    <Modal />
  ) : modal2 ? (
    <Modal2 />
  ) : (
    <>
      <nav className="bg-gray-800 border-gray-200 dark:bg-gray-900 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 w-[90%]">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              alt="Madsan Call & Load Logo"
              width={120}
              height={80}
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
              <li className="hidden">
                <Link
                  to="/"
                  className="block text-sm py-2 px-3 text-white  rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-[#ff9900] hover:text-[#ff9900]"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="hidden">
                <Link
                  to="#"
                  className="block text-sm py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#ff9900] md:p-0 dark:text-white md:dark:hover:text-[#ff9900] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>

              <li className="hidden">
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
      {/*  <Modal /> */}
      <div className=" flex-col w-full mt-6">
        <div className="container w-[95%] lg:w-[90%] xl:w-[75%] my-0 mx-auto flex flex-col lg:flex-row gap-x-16 items-center mt-10 lg:mt-0 py-10 md:py-20">
          {isLoading ? (
            <div className="h-screen bg-white w-full">
              <div className="flex justify-center items-center h-full">
                <img
                  height={85}
                  width={85}
                  src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                  alt="loading image"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <section className="mx-auto w-[85%] lg:w-2/5 mb-6 lg:mb-16">
                <ol className="flex items-center">
                  <li className="relative w-full ">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg
                          className="w-2.5 h-2.5 text-blue-100 dark:text-blue-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      </div>
                      <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Step 1
                      </h3>
                    </div>
                  </li>
                  <li className="relative w-full ">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg
                          className="w-2.5 h-2.5 text-blue-100 dark:text-blue-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      </div>
                      <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Step 2
                      </h3>
                    </div>
                  </li>
                  <li className="relative w-full md:w-1/3">
                    <div className="flex items-center">
                      <div className="z-10 flex items-center justify-center w-6 h-6  rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg
                          className="w-2.5 h-2.5 text-blue-900 dark:text-blue-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      </div>
                      <div className=" w-full bg-gray-200 h-0.5 dark:bg-gray-700 hidden"></div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Step 3
                      </h3>
                    </div>
                  </li>
                </ol>
              </section>
              <div className="bg-white py-6 space-y-4 md:space-y-6 sm:p-8 px-6 lg:px-16 lg:py-20 w-[97%] lg:w-[75%] mx-auto rounded-lg">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8 md:text-center lg:text-center">
                  Please Login or Signup to finalize your purchase!
                </h1>

                <section>
                  <h2 className="font-bold mt-16 mb-6 uppercase text-gray-950 underline text-xl">
                    Order Info
                  </h2>

                  <dl className=" text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 flex flex-wrap gap-x-4">
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-gray-500 text-sm md:text-base dark:text-gray-400">
                        Your Company Name
                      </dt>
                      <dd className=" font-semibold text-sm  ">
                        {orderDetails.buyerCompanyName}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-gray-500 text-sm md:text-base dark:text-gray-400">
                        Email Address
                      </dt>
                      <dd className=" font-semibold text-sm  ">
                        {orderDetails.email}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-gray-500 text-sm md:text-base dark:text-gray-400">
                        Seller Company
                      </dt>
                      <dd className=" font-semibold text-sm  ">
                        {orderDetails.sellerCompanyName}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-sm md:text-base  text-gray-500 dark:text-gray-400">
                        State (Location)
                      </dt>
                      <dd className="text-sm  font-semibold">
                        {orderDetails.sellerCompanyState}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                        Pickup Location
                      </dt>
                      <dd className=" font-semibold text-sm ">
                        {orderDetails.pickupStateAddress}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                        Product Delivery Destination
                      </dt>
                      <dd className=" font-semibold text-sm ">
                        {orderDetails.buyerDestination}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                        Quantity
                      </dt>
                      <dd className=" font-semibold text-sm ">
                        {orderDetails.quantity}
                      </dd>
                    </div>

                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                        Price/Litre
                      </dt>
                      <dd className=" font-semibold text-sm ">
                        {nigerianCurrencyFormat.format(
                          orderDetails.productAmount
                        )}
                      </dd>
                    </div>
                    <div className="flex flex-col py-2 basis-full lg:basis-[48%]">
                      <dt className="mb-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
                        Total Cost
                      </dt>
                      <dd className=" font-semibold text-sm ">
                        {nigerianCurrencyFormat.format(orderDetails.totalCost)}
                      </dd>
                    </div>
                  </dl>
                </section>

                <AuthContainer
                  orderDetails={orderDetails}
                  orderId={orderId}
                  setModal={setModal}
                  setModal2={setModal2}
                />
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Order;
