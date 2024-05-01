const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/madsan_logov1.png";
import { sendEmailVerificationOTP } from "../../utils/util";

const initialValue = {
  email: "",
  password: "",
  password2: "",
  states: [],
  state: "",
  phone: "",
  price: "",
  companyName: "",
  bankAccountName: "",
  companyAddress: "",
  lga: "",
  bankName: "",
  bankAccountNo: "",
};
function Register() {
  const [isBuyer, setIsBuyer] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [Istates, setIStates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [registrationCredential, setRegistrationCredential] =
    useState(initialValue);
  let navigate = useNavigate();

  const handleCategory = (value) => {
    setIsBuyer(value);
    setErrMsg("");
  };
  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await axios.get(`${API_URL}/statesinnigeria/all`);
        const states = await response.data.data;
        // Handle data
        setIStates(states);
      } catch (error) {
        if (error.response !== undefined) {
          setLoading(false);
          toast.error(error.response.data.data.message);
          setErrMsg(error.response.data.data.message);
          return;
        } else {
          setLoading(false);
          toast.error("An Error Occurred!");
          setErrMsg("An Error Occurred!");
        }
      }
    };
    getStates();
  }, []);

  const handleCheckbox = (e) => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    //Reset State previously selected
    setRegistrationCredential((prevCredentials) => ({
      ...prevCredentials,
      ["lga"]: "",
    }));
    const locationByState = async (state) => {
      if (!state) {
        return toast.error("Kindly pass a State");
      }
      try {
        const response = await axios.get(
          `${API_URL}/locations/locationByState?name=${state}`
        );
        const locations = await response.data.data;
        setLocations(locations);
      } catch (error) {
        if (error.response !== undefined) {
          setLoading(false);
          toast.error(error.response.data.msg);
          setErrMsg(error.response.data.msg);
          return;
        } else {
          setLoading(false);
          toast.error("An Error Occurred!");
          setErrMsg("An Error Occurred!");
        }
      }
    };

    registrationCredential.states.length !== 0 &&
      locationByState(registrationCredential.states);
  }, [registrationCredential.states]);

  /* Handle Select Fields */
  const handleSelectChange = (event) => {
    if (event.target.value === "DEFAULT") {
      alert("Kindly select an option");
      return;
    }

    setRegistrationCredential((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  //Handle Input Change
  const handleChange = (e) => {
    setRegistrationCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (!isBuyer) {
      if (
        registrationCredential.bankAccountName == "" ||
        registrationCredential.bankAccountNo == "" ||
        registrationCredential.companyName == "" ||
        registrationCredential.phone == "" ||
        registrationCredential.states.length == 0 ||
        registrationCredential.price == "" ||
        registrationCredential.password == "" ||
        registrationCredential.email == ""
      ) {
        setErrMsg("Kindly Fill all Fields required");
        alert("Kindly Fill all Fields required");

        return;
      }
    } else {
      if (
        registrationCredential.companyName == "" ||
        registrationCredential.phone == "" ||
        registrationCredential.companyAddress == "" ||
        registrationCredential.password == "" ||
        registrationCredential.state == "" ||
        registrationCredential.email == ""
      ) {
        setErrMsg("Kindly Fill all Fields required");
        alert("Kindly Fill all Fields required");

        return;
      }
    }
    if (registrationCredential.password !== registrationCredential.password2) {
      alert("Password Mismatch!");
      return;
    }

    if (!isChecked) {
      setErrMsg("Accept our Terms & Conditions");
      toast.error("Accept our Terms & Conditions");
      return;
    }
    try {
      setErrMsg("");
      setLoading(true);
      const registrationDatas = {
        companyName: registrationCredential.companyName,
        email: registrationCredential.email,
        ...(!isBuyer && {
          states: [
            {
              name: registrationCredential.states,
              addresses: [{ name: registrationCredential.lga }],
            },
          ],
        }),
        ...(isBuyer && { state: registrationCredential.state }),
        phoneNumber: registrationCredential.phone,
        ...(!isBuyer && { price: registrationCredential.price }),
        companyAddress: registrationCredential.companyAddress,
        password: registrationCredential.password,
        category: isBuyer ? "buyer" : "seller",
        ...(!isBuyer && {
          accountNumber: registrationCredential.bankAccountNo,
        }),
        ...(!isBuyer && {
          accountName: registrationCredential.bankAccountName,
        }),
        ...(!isBuyer && { bankName: registrationCredential.bankName }),
        ...(isBuyer
          ? {}
          : {
              // Conditionally include branches if isBuyer is false
              branches: [
                {
                  state: {
                    name: registrationCredential.state, // Name of the state
                  },
                  addresses: [
                    { name: registrationCredential.lga },
                    // Add more addresses as needed
                  ],
                },
                // Add more branches as needed
              ],
            }),
      };

      console.log(registrationDatas);

      const res = await axios.post(`${API_URL}/company`, registrationDatas, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const { success, msg } = await sendEmailVerificationOTP(
          registrationCredential.email
        );
        toast.info(msg);

        setLoading(false);
        //toast.info(msg);
        !!success &&
          navigate(`/verifyemail?email=${registrationCredential.email}`);
        return;
      } else {
        toast.error(" An Error Occured, Try Again!");
        setLoading(false);
        return;
      }
    } catch (error) {
      if (error.response !== undefined) {
        setLoading(false);
        toast.error(error.response.data.data.message);
        setErrMsg(error.response.data.data.message);
        return;
      } else {
        setLoading(false);
        toast.error("An Error Occurred!");
        setErrMsg("An Error Occurred!");
      }
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5 register_bg"></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <Link to={"/"}>
              <img
                className="mb-14"
                src={logo}
                width={220}
                height={300}
                alt="Madsan Call & Load"
              />
            </Link>
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
            {/*   <ErrorBoundary fallback={<Error />}>
                  
                </ErrorBoundary> */}
            <>
              <div className="mt-6">
                <h1 className="text-gray-500 dark:text-gray-300">
                  Select type of account
                </h1>

                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button
                    className={`flex justify-center w-full px-6 py-3 ${
                      isBuyer
                        ? "text-white bg-blue-500"
                        : "text-blue-500 border-blue-500  border "
                    } rounded-lg md:w-auto md:mx-2 focus:outline-none`}
                    onClick={() => handleCategory(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="mx-2">Buyer</span>
                  </button>

                  <button
                    onClick={() => handleCategory(false)}
                    className={`flex justify-center w-full px-6 py-3 ${
                      !isBuyer ? "bg-blue-500 text-white" : "text-blue-500"
                    } mt-4  border border-blue-500 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span className="mx-2">Seller</span>
                  </button>
                </div>
              </div>

              {isBuyer ? (
                <>
                  <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Danas Oil & Gas"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="johnsnow@example.com"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Phone number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="XXX-XX-XXXX-XXX"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="hidden">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        State
                      </label>
                      <select
                        name="state"
                        id="purchase_location"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSelectChange}
                        defaultValue={registrationCredential.state}
                      >
                        <option value={"DEFAULT"}>
                          {Istates.length <= 0
                            ? "Loading States"
                            : "Select a State"}
                        </option>
                        {Istates.map((state) => {
                          return (
                            <option value={state.name} key={state._id}>
                              {state?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        placeholder="Company Address"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.companyAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="password2"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.password2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        State
                      </label>
                      <select
                        name="state"
                        id="purchase_location"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSelectChange}
                        defaultValue={registrationCredential.state}
                      >
                        <option value={"DEFAULT"}>
                          {Istates.length <= 0
                            ? "Loading States"
                            : "Select a State"}
                        </option>
                        {Istates.map((state) => {
                          return (
                            <option value={state.name} key={state._id}>
                              {state?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 ">
                    <input
                      type="checkbox"
                      name="termsConditions"
                      id="termsConditions"
                      required
                      onChange={handleCheckbox}
                      checked={isChecked}
                    />
                    <p className="text-sm ml-2">
                      By clicking{" "}
                      <span className="font-bold text-blue-500">Sign up</span>{" "}
                      below, you agree to our{" "}
                      <Link to={"#"} className="underline">
                        Terms and Conditions of Service
                      </Link>
                      .
                    </p>
                  </div>
                  <button
                    className={`flex items-center justify-between w-full lg:w-1/4 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg ${
                      isChecked && "hover:bg-blue-400"
                    } focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-5`}
                    type="submit"
                    onClick={handleSignup}
                    disabled={
                      loading == true || isChecked === false
                        ? true
                        : loading == false && false
                    }
                  >
                    {loading == true
                      ? "Loading..."
                      : loading == false && (
                          <>
                            <span>Sign Up </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 rtl:-scale-x-100"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </>
                        )}
                  </button>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="John"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="johnsnow@example.com"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Phone number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="XXX-XX-XXXX-XXX"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        State
                      </label>
                      <select
                        name="states"
                        id="purchase_location"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSelectChange}
                        defaultValue={registrationCredential.state}
                      >
                        <option value={"DEFAULT"}>
                          {Istates.length <= 0
                            ? "Loading States"
                            : "Select a State"}
                        </option>
                        {Istates.map((state) => {
                          return (
                            <option value={state.name} key={state._id}>
                              {state?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="lga"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                      >
                        Location
                      </label>
                      <select
                        name="lga"
                        id="lga"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSelectChange}
                        defaultValue={registrationCredential.lga}
                      >
                        <option value={"DEFAULT"}>
                          {Istates.length <= 0
                            ? "Loading Locations"
                            : "Select a location"}
                        </option>
                        {locations.map((loc) => {
                          return (
                            <option value={loc.name} key={loc._id}>
                              {loc?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        placeholder="Enter company address"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.companyAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Bank Acc. No.
                      </label>
                      <input
                        type="number"
                        name="bankAccountNo"
                        placeholder="XXX-XX-XXXX-XXX"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.bankAccountNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        placeholder="First Bank"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.bankName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Bank Account Name
                      </label>
                      <input
                        type="text"
                        name="bankAccountName"
                        placeholder="John Doe Oil and Gas"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.bankAccountName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Price (ltr)
                      </label>
                      <input
                        type="text"
                        name="price"
                        placeholder="Price per litre"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="password2"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        value={registrationCredential.password2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 ">
                    <input
                      type="checkbox"
                      name="termsConditions"
                      id="termsConditions"
                      required
                      onChange={handleCheckbox}
                      checked={isChecked}
                    />
                    <p className="text-sm ml-2">
                      By clicking{" "}
                      <span className="font-bold text-blue-500">Sign up</span>{" "}
                      below, you agree to our{" "}
                      <Link to={"#"} className="underline">
                        Terms and Conditions of Service
                      </Link>
                      .
                    </p>
                  </div>

                  <button
                    className="flex items-center justify-between w-full lg:w-1/2 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-8 "
                    type="submit"
                    disabled={
                      loading == true ? true : loading == false && false
                    }
                    onClick={handleSignup}
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                </>
              )}

              {errMsg && (
                <p className="text-red-700 text-sm text-center mt-8">
                  {errMsg}
                </p>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-10">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#df6512] hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
