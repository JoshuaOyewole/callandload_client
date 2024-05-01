import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestOTP, setRequestOTP] = useState(true);
  const navigate = useNavigate();

  
  const resetPwd = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    const credential = {
      email: email,
    };

    try {
      const response = await axios.post(
        `${API_URL}/auth/forgetpwd`,
        credential,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const msg = await response.data.msg;
      setLoading(false);
      toast.success(msg);
      setRequestOTP(false);
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
  const verifyOTP = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    const credential = {
      email,
      otp: otp,
      newPassword: newPassword,
    };

    try {
      const response = await axios.post(
        `${API_URL}/auth/resetpwd`,
        credential,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const msg = await response.data.msg;
      setLoading(false);
      toast.success(msg);
      navigate("/login");
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

  const goBack = () => {
    setOTP("");
    setNewPassword("");
    setRequestOTP(true);
  };

  return requestOTP ? (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" onSubmit={resetPwd}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 px-4"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#DF6512] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d3814e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DF6512]"
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
                  "Reset"
                )}
              </button>
            </form>
            {errMsg !== "" && (
              <p className="mt-10 text-center text-sm text-red-500 italic">
                {errMsg}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Password
            </h2>
            <p className="italic text-gray-900 font-bold">
              Kindly enter the OTP sent to your Email address
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" onSubmit={verifyOTP}>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  OTP
                </label>
                <div>
                  <input
                    id="otp"
                    name="otp"
                    type="number"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    autoComplete="otp"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:leading-6 px-4"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div>
                  <input
                    name="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:leading-6 px-4"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#DF6512] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#d3814e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DF6512]"
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
                  "Submit"
                )}
              </button>
            </form>
            {errMsg !== "" && (
              <p className="mt-10 text-center text-sm text-red-500 italic">
                {errMsg}
              </p>
            )}
            <div className="w-full flex justify-center items-center mt-5">
              <button
                className="bg-gray-600 px-2 py-1 rounded-md text-white hover:bg-gray-900 transition-all duration-75"
                onClick={goBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
