const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
const initialValue = {
  email: "",
  password: "",
  state: "",
  phone: "",
  companyAddress: "",
  companyName: "",
};

function AuthContainer(props) {
  const [errMsg, setErrMsg] = useState("");
  const [token, setToken] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showAuthBtns, setShowAuthBtns] = useState(true);
  const [authCredential, setAuthCredentials] = useState(initialValue);
  const [registrationCredential, setRegistrationCredential] =
    useState(initialValue);
  const [Istates, setIStates] = useState([]);

  const { orderDetails, orderId, setModal, setModal2 } = props;

  //const navigate = useNavigate();

  useEffect(() => {
    const getStates = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${API_URL}/statesinnigeria/all`);
        const status = res.status;
        const states = await res.data.data;

        if (status !== 200) {
          setIStates([]);
          setLoading(false);
          toast.error("No state currently available");
          return;
        }
        setLoading(false);
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

  const handleshowLoginBtn = () => {
    setLoading(false);
    setShowAuthBtns(false);
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setErrMsg("");
  };
  const handleshowSignupBtn = () => {
    setLoading(false);
    setShowAuthBtns(false);
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setErrMsg("");
  };

  //Handle Input Change
  const handleChange = (e) => {
    setAuthCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //Registration Input change
  const handleRegChange = (e) => {
    setRegistrationCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //Login
  const handleLogin = async () => {
    setErrMsg("");
    setLoading(true);

    try {
      const loginResponse = await axios.post(
        `${API_URL}/login`,
        authCredential,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const status = loginResponse.status;
      const loginData = await loginResponse.data;

      if (status !== 200) {
        toast.error(loginData.msg);
        return;
      }
      setToken(loginData?.token);
      const loginDetails = loginData.details;

      let isSeller = loginDetails.isSeller;
      let buyerCompanyId = loginDetails?.id;
      let buyerPhoneNumber = loginDetails?.phoneNo;
      await makeOrder(isSeller, buyerCompanyId, true, buyerPhoneNumber);
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
  //Signup
  const handleSignup = async () => {
    setErrMsg("");
    setLoading(true);
    //Validate if all the required fields are filled
    if (
      registrationCredential.email == "" ||
      registrationCredential.companyAddress == "" ||
      registrationCredential.companyName == "" ||
      registrationCredential.password == "" ||
      registrationCredential.state == "" ||
      registrationCredential.phone == ""
    ) {
      setLoading(false);
      toast.error("Kindly fill all Fields");
      return;
    }
    const registrationDatas = {
      companyName: registrationCredential.companyName,
      email: registrationCredential.email,
      state: registrationCredential.state,
      phoneNumber: registrationCredential.phone,
      password: registrationCredential.password,
      category: "buyer",
      companyAddress: registrationCredential.companyAddress,
    };

    try {
      const res = await axios.post(`${API_URL}/company`, registrationDatas, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resdata = await res.data;
      let buyerCompanyId = resdata?.data?.id;
      setLoading(false);
      makeOrder(false, buyerCompanyId, false);
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

  //Send Invoice Email
  const sendInvoiceEmail = async (id) => {
    try {
      const res = await axios.post(
        `${API_URL}/generateinvoice`,
        { invoiceId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //Create Order
  const createInvoice = async (buyerCompanyId, isSeller) => {
    try {
      const res = await axios.post(
        `${API_URL}/invoice`,
        { orderId: orderId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const status = res.status;
      const data = await res.data;

      if (status === 200) {
        const successful = await sendInvoiceEmail(data.data.id);
        if (!!successful) {
          setLoading(false);
          setModal2(true);
          token !== null &&
            localStorage.setItem(
              "callandload::user",
              JSON.stringify({
                id: buyerCompanyId,
                token: token,
                name: orderDetails.buyerCompanyName,
                isSeller: isSeller,
              })
            );
        } else {
          setLoading(false);
          setModal2(true);
          token !== null &&
            localStorage.setItem(
              "callandload::user",
              JSON.stringify({
                id: buyerCompanyId,
                token: token,
                name: orderDetails.buyerCompanyName,
                isSeller: isSeller,
              })
            );
          toast.error(`Error occured sending Invoice`);
        }
      } else {
        setLoading(false);
        toast.error(data.message);
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
  //Make an Order
  const makeOrder = async (isSeller, buyerCompanyId, fromLogin, phoneNo) => {
    const orderDatas = {
      buyerCompanyName: orderDetails.buyerCompanyName,
      buyerCompanyId: buyerCompanyId,
      email: fromLogin ? authCredential.email : registrationCredential.email,
      sellerCompanyState: orderDetails.sellerCompanyState,
      sellerCompanyName: orderDetails.sellerCompanyName,
      pickupStateAddress: orderDetails.pickupStateAddress,
      buyerDestination: orderDetails.buyerDestination,
      quantity: orderDetails.quantity,
      productAmount: orderDetails.productAmount,
      buyerPhoneNumber: fromLogin ? phoneNo : registrationCredential.phone,
      sellerCompanyId: orderDetails.sellerCompanyId,
      totalCost: orderDetails.totalCost,
      id: orderId,
    };

    console.log(loading);
    try {
      if (token !== undefined || null) {
        const response = await axios.put(`${API_URL}/orders`, orderDatas, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const status = response.status;
        const data = await response.data;

        if (status !== 200) {
          toast.error(data.message);
          setErrMsg(data.message);
          return;
        }

        //const id = data.data._id;
        createInvoice(buyerCompanyId, isSeller); // If Create an Invoice immediately the Order updating is Successful
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
  /* Handle Select Fields */
  const handleRegSelectChange = (event) => {
    if (event.target.value === "DEFAULT") {
      toast.error("Kindly select an option");
      return;
    }

    setRegistrationCredential((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {showAuthBtns && (
        <section className="auth-section flex justify-center items-center flex-col">
          <h2 className="text-gray-500 text-center">Already Registered?</h2>
          <div className="btn-container flex mt-5 items-center">
            <button
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={handleshowLoginBtn}
            >
              Login
            </button>
            <span className="text-base mr-5">or</span>
            <button
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={handleshowSignupBtn}
            >
              Signup
            </button>
          </div>
        </section>
      )}

      {showRegisterForm && (
        <section className="signup-section">
          <h3 className="text-xl font-bold mb-8 underline">Signup</h3>
          <div className="mt-4">
            <div className="flex items-center gap-x-4 gap-y-4 flex-wrap md:justify-between">
              <div className="w-full md:basis-[48%]">
                <label
                  htmlFor="companyName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleRegChange}
                  value={registrationCredential.companyName}
                />
              </div>
              <div className="w-full md:basis-[48%]">
                <label
                  htmlFor="companyAddress"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  id="companyAddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleRegChange}
                  value={registrationCredential.companyAddress}
                />
              </div>
            </div>
            <div className="flex items-center gap-y-4 mt-4 flex-wrap md:justify-between">
              <div className="w-full md:basis-[48%]">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={"DEFAULT"}
                  onChange={handleRegSelectChange}
                >
                  <option value={"DEFAULT"}>
                    {Istates.length <= 0 ? "Loading States" : "Select a State"}
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
              <div className="w-full md:w-[48%]">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleRegChange}
                  value={registrationCredential.phone}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-y-4 mt-4 flex-wrap md:justify-between">
              <div className="w-full md:w-[48%]">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleRegChange}
                  value={registrationCredential.email}
                  required
                />
              </div>
              <div className="w-full md:w-[48%] ">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleRegChange}
                  value={registrationCredential.password}
                />
              </div>
            </div>

            <p className="text-sm mt-4" onClick={handleshowLoginBtn}>
              Already Registered?{" "}
              <button className="text-blue-600">Login</button>{" "}
            </p>
            <button
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-6"
              data-ripple-light="true"
              onClick={handleSignup}
              disabled={loading}
            >
              {!!loading ? (
                <>
                  <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                  <span> Loading...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </section>
      )}

      {showLoginForm && (
        <section className="login-section">
          <h3 className="text-xl font-bold mb-8">Login</h3>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              className="block w-full lg:w-3/5 px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              value={authCredential.email}
              name="email"
              onChange={handleChange}
              autoComplete="disabled"
            />
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="block w-full lg:w-3/5 px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              value={authCredential.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <p className="text-red-800 text-sm mt-3 italic">{errMsg}</p>

          <button
            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-6 flex items-center"
            data-ripple-light="true"
            onClick={handleLogin}
            disabled={loading}
          >
            {!!loading ? (
              <>
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
                <span> Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-sm mt-4" onClick={handleshowSignupBtn}>
            Not Registered? <button className="text-blue-600">Signup</button>{" "}
          </p>
        </section>
      )}
    </>
  );
}

export default AuthContainer;
