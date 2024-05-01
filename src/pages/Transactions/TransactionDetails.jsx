import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function TransactionDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInvoiceDetails = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/invoice/invoice/?id=${id}`
        );

        const data =await response.data.data;

        if (response.status === 200) {
          setInvoice(data);
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    };

    getInvoiceDetails(id);
  }, []);

  console.log(loading);
  const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  });
  return (
    <>
      <main className=" basis-full relative h-full transition-all duration-200 ease-in-out overflow-y-scroll rounded-xl">
        <nav className="relative flex flex-wrap items-center my-5 justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              <h1 className="mb-0 font-bold text-black text-2xl capitalize">
                Transaction Details
              </h1>
            </nav>
          </div>
        </nav>
        {
          loading ? (
            <div role="status" className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : <form class="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-x-7">
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Buyer Company Name
              </label>
              <input
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.buyerCompanyName}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Buyer Company Email
              </label>
              <input
                type="email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.email}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="buyerPhoneNumber"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Buyer Phone No
              </label>
              <input
                type="number"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.buyerPhoneNumber}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="pickupStateAddress"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pickup Address
              </label>
              <input
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.pickupStateAddress}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="sellerCompanyName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                seller Company Name
              </label>
              <input
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.sellerCompanyName}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="sellerEmail"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                seller Email
              </label>
              <input
                type="email"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.sellerEmail}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="sellerPhoneNumber"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                seller Phone Number
              </label>
              <input
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={invoice.sellerPhoneNumber}
                disabled
              />
            </div>
            <div class="mb-5">
              <label
                for="sellerPhoneNumber"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Total Cost
              </label>
              <input
                type="text"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={nigerianCurrencyFormat.format(invoice.totalCost)}
                disabled
              />
            </div>
            <div class="mb-5 text-gray-900">
              <h2 className="text-gray-900 mt-4 font-semibold underline mb-3">
                Payment Details
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Bank Name:</span>{" "}
                {invoice.bankName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bank Account Name: </span>{" "}
                {invoice.accountName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bank Account Number:</span>{" "}
                {invoice.accountNumber}
              </p>
            </div>
          </div>
        </form>
        }
       
      </main>
    </>
  );
}

export default TransactionDetails;
