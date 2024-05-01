import React from "react";
import { Link } from "react-router-dom";
import success from "../assets/images/success.png";

function Modal2() {
  return (
    <div className=" flex-col w-full mt-6 h-[90vh]">
      <div className="container w-[95%] lg:w-[90%] xl:w-[75%] my-0 mx-auto flex flex-col lg:flex-row gap-x-16 items-center mt-10 lg:mt-0 py-20 justify-center">
        <div className="bg-white max-w-[461px] h-[60vh] rounded-lg flex justify-center items-center flex-col py-4 px-7 shadow-md">
          <img src={success} alt="successful" height={120} width={120} />
          <h2 className="font-bold mt-6 text-2xl mb-3">Purchase Successful!</h2>
          <p className="text-center">
            An invoice has been generated and sent to your email.
          </p>
          <p className="mt-4 text-center text-gray-800">
            Kindly Login to return to your Dashboard
          </p>
          <Link
            className="bg-blue-700 py-3 hover:bg-blue-500   px-8 mt-8 rounded-lg text-white"
            to={"/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal2;
