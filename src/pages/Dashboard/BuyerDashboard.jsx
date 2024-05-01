import {
  faChartSimple,
  faLocationCrosshairs,
  faRightLeft,
  faTentArrowLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [salesOverview, setSalesOverview] = useState({
    series: [
      {
        name: "Total Trans",
        data: [44, 55, 57, 56, 61, 58, 63],
      },
      {
        name: "Pending Trans",
        data: [76, 85, 101, 98, 87, 105, 91],
      },
      {
        name: "Total Revenue",
        data: [35, 41, 36, 26, 45, 48, 52],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
      },
      fill: {
        opacity: 1,
      },
    },
  });
  const [topLocations, setTopLocations] = useState({});
  const [loading, setLoading] = useState(false);
  const [user] = useLocalStorage("callandload::user", null);
  const [loadingSalesOverview, setLoadingSalesOverview] = useState(false);

  useEffect(() => {
    const dashboardSummaryCard = async (userId) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/adminCards?userId=${userId}`
        );
        const stats = await response.data.data;

        setSummary(stats);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

   user !==null && dashboardSummaryCard(user.id);
    //getTopSalesByLocation("6619400770274e9f7a9a9e46"); //Should be changed to Token
  }, []);

  return (
    <>
      {/* MAIN */}
      <main className=" basis-full relative h-full transition-all duration-200 ease-in-out overflow-y-scroll rounded-xl">
        <nav className="relative flex flex-wrap items-center my-5 justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              <h1 className="mb-0 font-bold text-black text-2xl uppercase">
                Dashboard
              </h1>
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

        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-[30%]">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  {loading ? (
                    <div className="max-w-sm w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row -mx-3">
                        <div className="flex-none basis-[80%] max-w-full px-3">
                          <div>
                            <h3 className="mb-0 font-sans text-sm font-bold leading-normal uppercase dark:text-white dark:opacity-60">
                              TOTAL TRANSACTION
                            </h3>
                            <h5 className="mb-2 text-2xl font-bold dark:text-white">
                              {summary.totalTransactions}
                            </h5>
                          </div>
                        </div>
                        <div className="px-3 text-right basis-[20%]">
                          <div className="flex justify-center rounded-md items-center w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                            <FontAwesomeIcon
                              icon={faTentArrowLeftRight}
                              style={{ color: "white" }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="mb-0 dark:text-white dark:opacity-60">
                        <span className="text-sm font-bold leading-normal text-emerald-500">
                          +55%
                        </span>
                        since yesterday
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-[30%]">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  {loading ? (
                    <div className="max-w-sm w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row -mx-3">
                      <div className="flex-none basis-[80%] max-w-full px-3">
                        <div>
                          <h3 className="mb-0 font-sans text-sm font-bold leading-normal uppercase dark:text-white dark:opacity-60">
                            PENDING TRANSACTIONS
                          </h3>
                          <h5 className="mb-2 text-2xl font-bold dark:text-white">
                            {summary.totalPendingTransactions}
                          </h5>
                          <p className="mb-0 dark:text-white dark:opacity-60">
                            <span className="text-sm font-bold leading-normal text-emerald-500">
                              +3%
                            </span>
                            since last week
                          </p>
                        </div>
                      </div>
                      <div className="px-3 text-right basis-[20%] ">
                        <div className="flex justify-center rounded-md items-center text-white w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-red-600 to-orange-600">
                          <FontAwesomeIcon icon={faRightLeft} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-[30%]">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  {loading ? (
                    <div className="max-w-sm w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row -mx-3">
                      <div className="flex-none basis-[80%] max-w-full px-3">
                        <div>
                          <h3 className="mb-0 font-sans text-sm font-bold leading-normal uppercase dark:text-white dark:opacity-60">
                            TOTAL REVENUES
                          </h3>
                          <h5 className="mb-2 text-2xl font-bold dark:text-white">
                            {summary?.totalRevenue}
                          </h5>
                          <p className="mb-0 dark:text-white dark:opacity-60">
                            <span className="text-sm font-bold leading-normal text-emerald-500">
                              +5%
                            </span>
                            than last month
                          </p>
                        </div>
                      </div>
                      <div className="px-3 text-right basis-[20%]">
                        <div className="flex justify-center items-center text-white rounded-md w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-orange-500 to-yellow-500">
                          <FontAwesomeIcon icon={faChartSimple} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mt-20 -mx-3 gap-y-12 lg:gap-y-0">
            {loadingSalesOverview ? (
              <div className="animate-pulse w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
                <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                  <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                    <h2 className="capitalize font-bold text-base text-gray-700 dark:text-white">
                      Sales overview
                    </h2>
                    <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                      <i className="fa fa-arrow-up text-emerald-500"></i>
                      Last<span className="font-semibold">7 days</span>
                    </p>
                  </div>
                  <div className="flex-auto p-4">
                    <div>
                      <canvas id="chart-line" height="300"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
                <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                  <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
                    <h2 className="capitalize font-bold text-base text-gray-700 dark:text-white">
                      Sales overview
                    </h2>
                    <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                      <i className="fa fa-arrow-up text-emerald-500"></i>
                      Last <span className="font-semibold"> 7 days</span>
                    </p>
                  </div>
                  <div className="flex-auto p-4">
                    <div id="chart">
                      <Chart
                        options={salesOverview.options}
                        series={salesOverview.series}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
              <div className="border-black/12.5 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="p-4 pb-0 rounded-t-4">
                  <h2 className="mb-0 font-bold text-base text-gray-700 dark:text-white">
                    Top Locations (Sales by Location)
                  </h2>
                </div>
                <div className="flex-auto p-4">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative flex py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                      <div className="w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          style={{ color: "white" }}
                        />
                      </div>
                      <div className="flex justify-between items-center basis-full">
                        <h6 className="mb-1 text-base leading-normal text-slate-700 dark:text-white">
                          Marina
                        </h6>
                        <span className="text-sm leading-tight dark:text-white/80">
                          <span className="font-semibold">346+ purchases</span>
                        </span>
                      </div>
                    </li>
                    <li className="relative flex py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                      <div className="w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          style={{ color: "white" }}
                        />
                      </div>
                      <div className="flex justify-between items-center basis-full">
                        <h6 className="mb-1 text-base leading-normal text-slate-700 dark:text-white">
                          Bonny
                        </h6>
                        <span className="text-sm leading-tight dark:text-white/80">
                          <span className="font-semibold">14+ purchases</span>
                        </span>
                      </div>
                    </li>
                    <li className="relative flex py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                      <div className="w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          style={{ color: "white" }}
                        />
                      </div>
                      <div className="flex justify-between items-center basis-full">
                        <h6 className="mb-1 text-base leading-normal text-slate-700 dark:text-white">
                          Onne
                        </h6>
                        <span className="text-sm leading-tight dark:text-white/80">
                          <span className="font-semibold">6+ purchases</span>
                        </span>
                      </div>
                    </li>
                    <li className="relative flex py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                      <div className="w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          style={{ color: "white" }}
                        />
                      </div>
                      <div className="flex justify-between items-center basis-full">
                        <h6 className="mb-1 text-base leading-normal text-slate-700 dark:text-white">
                          Marina
                        </h6>
                        <span className="text-sm leading-tight dark:text-white/80">
                          <span className="font-semibold">346+ purchases</span>
                        </span>
                      </div>
                    </li>
                    <li className="relative flex py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                      <div className="w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          style={{ color: "white" }}
                        />
                      </div>
                      <div className="flex justify-between items-center basis-full">
                        <h6 className="mb-1 text-base leading-normal text-slate-700 dark:text-white">
                          Marina
                        </h6>
                        <span className="text-sm leading-tight dark:text-white/80">
                          <span className="font-semibold">346+ purchases</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
