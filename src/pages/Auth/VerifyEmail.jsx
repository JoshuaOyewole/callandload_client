import React, { useEffect, useState } from "react";
import logo from "../../assets/images/madsan_logo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

function VerifyEmail() {
  const location = useLocation();
  const [email, setEmail] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    setEmail(email);
  }, [location.search]);


  const goBack = () =>{
    
  }
  const verifyOTP = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    const credential = {
      email: email,
      otp: otp,
    };

    try {
      const response = await axios.post(
        `${API_URL}/auth/confirmverificationotp`,
        credential,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const msg = await response.data.message;
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Madsan call and load"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify Email Address!
          </h2>
          <p className="text-center text-gray-700 mt-2">
            Kindly enter the OTP sent to your Email to verify your account
          </p>
        </div>

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={verifyOTP}
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                OTP
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  name="otp"
                  type="number"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  autoComplete="otp"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
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
                    <span> Verifying...</span>
                  </>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>

          {errMsg !== "" && (
            <p className="mt-10 text-center text-sm text-red-500 italic">
              {errMsg}
            </p>
          )}
          <div className="flex justify-center items-center">
            <button
              className="bg-gray-500 mt-6 px-3 py-2 rounded-md text-white"
              onClick={goBack}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
