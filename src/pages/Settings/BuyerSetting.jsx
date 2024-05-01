import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

function BuyerSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [user] = useLocalStorage("callandload::user", null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfileDetails = async (userId) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/company/single?id=${user?.id}`);

        const status = res.status;
        const data = await res.data.data;

        if (status === 200) {
          setUserInfo(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (user === null) {
      navigate("/login", { replace: true });
    }

    getProfileDetails(user.id);
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleProfiileEdit = (e) => {
    e.preventDefault();
    setDisabledInputs(!disabledInputs);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await axios.put(
        `${API_URL}/company/update/${user?.id}`,
        userInfo
      );

      const status = res.status;
      const data = await res.data;

      if (status === 200) {
        toast.success(data.msg);

        setDisabledInputs(!disabledInputs);
        setUpdateLoading(false);
      }
    } catch (error) {
      setUpdateLoading(false);
    }
  };


  return (
    <>
      {/* MAIN */}
      <main className=" basis-full relative h-full transition-all duration-200 ease-in-out overflow-y-scroll rounded-xl">
        <nav className="relative flex flex-wrap items-center my-5 justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              <h1 className="mb-0 font-bold text-black text-2xl capitalize">
                Settings
              </h1>
              <p className="mt-2">
                Manage your account settings and preferences
              </p>
            </nav>

            <div className="hidden items-center grow sm:mt-0 sm:mr-6 md:mr-0  lg:basis-auto">
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
          <section className={`${!isLoading && "bg-white"} dark:bg-gray-900`}>
            {isLoading ? (
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
            ) : (
              <div className="max-w-6xl px-4 py-8 mx-auto lg:py-16">
                <form >
                  <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  
                    
                    <div className="w-full">
                      <label
                        htmlFor="brand"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        disabled={disabledInputs}
                      />
                    </div>
                 

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="companyAdress"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company Address
                      </label>
                      <textarea
                        id="companyAdress"
                        rows="8"
                        disabled={disabledInputs}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write a product description here..."
                      >
                        {userInfo.companyAddress}
                      </textarea>
                    </div>
                 
                  
                  </div>
                  <div className="flex items-center space-x-4 mt-8">
                    {disabledInputs &&
                      (!!updateLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <button
                          onClick={handleProfiileEdit}
                          className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Edit
                        </button>
                      ))}
                    {!disabledInputs && (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleProfiileEdit}
                          className="text-white bg-gray-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            )}
          </section>
          {/*   <div className="flex flex-wrap -mx-3 gap-y-12 lg:gap-y-0">
            <div className="w-full max-w-full px-3 mt-0 lg:w-full lg:flex-none">
              <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 py-4">
                  <h2 className="capitalize font-bold text-base text-gray-700 dark:text-white">
                    Selling Price
                  </h2>
                  <p className="mt-1">Update your Selling Price</p>
                  <hr className="flex-grow border-t border-gray-300" /> 

                </div>
              </div>
            </div>

       
          </div> */}
        </div>
      </main>
    </>
  );
}

export default BuyerSettings;
