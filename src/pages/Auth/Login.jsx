const API_URL = import.meta.env.VITE_API_URL;
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/madsan_logov1.png";
import axios from "axios";
import { sendEmailVerificationOTP } from "../../utils/util";
//import { useAuth } from "../../hooks/useAuth";

const initialValue = {
  email: "",
  password: "",
};

function Login() {
  const [loading, setLoading] = useState(false);
  const [authCredential, setAuthCredentials] = useState(initialValue);
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrMsg("");

    if (
      authCredential.email === "" ||
      authCredential.email.length < 7 ||
      authCredential.password === ""
    ) {
      setErrMsg("Missing required Fields!");
      return toast.error("Missing required Fields!");
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, authCredential, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      const isSeller = data.details.isSeller;
      const isAccountVerified = data.accountVerified;

      if (!isAccountVerified) {
        //Sent Verification OTP to the user Email
        const { success, msg } = await sendEmailVerificationOTP(
          authCredential.email
        );
        toast.info(msg);
        success && navigate(`/verifyemail?email=${authCredential.email}`);
        return;
      }
      toast.success(data.message);
      setErrMsg("");

      localStorage.setItem(
        "callandload::user",
        JSON.stringify({
          id: data.details.id,
          token: data.token,
          name: data.details.companyName,
        })
      );

      isSeller ? navigate(`/seller/dashboard`) : navigate(`/buyer/transactions`);
    } catch (error) {
      console.log(error);
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

  //Handle Input Change
  const handleInput = (e) => {
    setAuthCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <section className="h-screen flex items-center flex-col justify-center">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2 login_bg"></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <Link to="/" className="flex justify-center mx-auto">
            <img src={logo} alt="Madsan Call & Load" width={220} height={300} />
          </Link>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <Link
            to="#"
            className=" items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hidden"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </Link>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline mt-14">
              login with email
            </p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                name="email"
                value={authCredential.email}
                onChange={handleInput}
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  to="/reset_password"
                  className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                id="password"
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                value={authCredential.password}
                onChange={handleInput}
              />
            </div>
            <p className="text-red-600 mt-4 text-sm italic text-center">
              {errMsg}
            </p>

            <div className="mt-6">
              <button
                className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex justify-center items-center ${
                  loading && "hover:bg-gray-800"
                }`}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                    <span> Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              to="/register"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
