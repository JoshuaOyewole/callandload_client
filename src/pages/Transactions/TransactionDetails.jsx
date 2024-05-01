import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function TransactionDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
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
          loading ? <p>Loading...</p> : <form class="max-w-6xl mx-auto">
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
