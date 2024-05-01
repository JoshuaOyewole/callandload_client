import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
//import { addCommasToNumber } from "../../utils/addCommaToNumber";
const API_URL = import.meta.env.VITE_API_URL;

function Transactions() {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useLocalStorage("callandload::user", null);
  const navigate = useNavigate();

  const TransactionHeader = [
    "Invoice ID",
    "Date",
    "Company Name",
    "Status",
    "Destination",
    "Seller Name",
    "Total Amount",
  ];

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
    const fetchTransactions = async (userId) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/invoice?userId=${userId}`);

        const transactions = response.data.data;

        setTransaction(transactions);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    user !== null && fetchTransactions(user.id);
  }, []);

 

  const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  });

  console.log(transactions, user);
  return (
    <>
      {/* MAIN */}
      <main className=" basis-full relative h-full transition-all duration-200 ease-in-out overflow-y-scroll rounded-xl">
        <nav className="relative flex flex-wrap items-center my-5 justify-between py-2 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start w-[93%] mx-auto">
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav className="mb-10">
              <h1 className="mb-0 font-bold text-black text-2xl uppercase">
                Transactions
              </h1>
              <p className="mt-2">
                Your Sales History: Review All Transactions
              </p>
            </nav>

            <div className="hidden items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0  lg:basis-auto">
              <div className="flex items-center md:ml-auto md:pr-4">
                <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                  <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 dark:bg-slate-850 dark:text-white bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:transition-shadow"
                    placeholder="Type here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className=" dark:bg-slate-850 dark:shadow-dark-xl shadow-xl flex flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border mx-auto w-[90%] pb-10">
          {loading ? (
            <div className="animate-pulse flex space-x-4 p-5">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800"></thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 truncate text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-gray-300 h-2" colSpan={12}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : transactions.length === 0 ? (
            <p className="pt-4 pl-5 font-bold">No Transaction Available</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 hidden"
                  >
                    <div className="flex items-center gap-x-3">
                      <button className=" items-center gap-x-2 ">
                        <span className="truncate">Invoice ID</span>

                        <svg
                          className="h-3"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"
                          />
                        </svg>
                      </button>
                    </div>
                  </th>

                  {TransactionHeader.map((td, index) => {
                    return (
                      <th
                        key={index}
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        {td}
                      </th>
                    );
                  })}

                  <th scope="col" className="relative py-3.5 px-4">
                    <span className="text-gray-500 text-sm font-normal  dark:text-gray-400">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {transactions.length > 0 &&
                  transactions.map((transaction) => {
                    return (
                      <tr key={transaction?._id}>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          #{transaction._id.slice(0, 7)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {moment(transaction.createdAt).format("ll")}
                        </td>
                        <td className="px-4 py-4 truncate text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {transaction.buyerCompanyName}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2  ${
                              transaction.status == "Paid"
                                ? "bg-emerald-100/60 text-emerald-500"
                                : "bg-red-100/60 text-red-500"
                            } dark:bg-gray-800`}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <h2 className="text-sm font-normal">
                              {transaction.status}
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {transaction.buyerDestination}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {transaction.sellerCompanyName}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          {nigerianCurrencyFormat.format(transaction.totalCost)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <Link
                              to={`/buyer/transactions/${transaction?._id}`}
                              className=" transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 bg-blue-600 text-white rounded-md py-1 px-3  hover:bg-blue-900 focus:outline-none "
                            >
                              View
                            </Link>

                            <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none hidden">
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}

export default Transactions;
