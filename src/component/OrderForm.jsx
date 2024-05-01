import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCommasToNumber } from "../utils/addCommaToNumber";

const API_URL = import.meta.env.VITE_API_URL;
const initialValue = {
  buyerCompanyName: "",
  email: "",
  sellerCompanyState: "",
  sellerCompanyName: "",
  pickupStateAddress: "",
  buyerDestination: "",
  sellerCompanyId: "",
  productAmount: "",
  quantity: "",
  totalCost: "",
};

export default function OrderForm() {
  const [Istates, setIStates] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [sellingPrice, setSellingPrice] = useState("0");
  const [branches, setBranches] = useState([]);
  const [companiesInLocation, setCompaniesInLocation] = useState([]);
  const [orderData, setOrderData] = useState(initialValue);

  const navigate = useNavigate();
  const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    style: "currency",
  });

  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await axios.get(`${API_URL}/company/sellersstate`);
        const data = await res.data;
        const status = res.status;

        if (status === 404) {
          setIStates([]);
          toast.error("No state currently available");
          return;
        }
        setIStates(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getStates();
  }, []);

  useEffect(() => {
    setOrderData((prev) => ({
      ...prev,
      productAmount: "0",
    }));
    setCompaniesInLocation([]);
    setSellingPrice("0");

    const branchesBystate = async (state) => {
      try {
        const res = await axios.get(
          `${API_URL}/company/getBranchesBystate?state=${state}`
        );

        const data = await res.data;
        setBranches(data.data);
      } catch (error) {
        if (error.response.status === 404) {
          setBranches([]);
          toast.error("No location available for the selected state");
          return;
        }
        setBranches([]);
        toast.error("An Error Occured!");
      }
    };

    orderData.sellerCompanyState !== "" &&
      branchesBystate(orderData.sellerCompanyState);
  }, [orderData.sellerCompanyState]);

  useEffect(() => {
    const sellingPrice = () => {
      const selectedCompany = companiesInLocation.filter((location) => {
        return location.companyName === orderData.sellerCompanyName;
      });
      setSellingPrice(selectedCompany[0].price);
    };
    companiesInLocation.length > 0 && sellingPrice();
  }, [orderData.sellerCompanyName]);

  useEffect(() => {
    const companiesByLocation = async (addressName) => {
      try {
        const res = await axios.get(
          `${API_URL}/company/companiesByLocation?name=${addressName}`
        );
        const status = res.status;
        const data = await res.data;
        if (status === 404) {
          setCompaniesInLocation([]);
          toast.error("No company available for the selected location");
          return;
        }

        let companies = data.data;
        setCompaniesInLocation(companies);
        setOrderData((prev) => ({
          ...prev,
          productAmount: companies[0].price,
        }));
        setOrderData((prev) => ({
          ...prev,
          sellerCompanyId: companies[0]._id,
        }));
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };
    orderData.pickupStateAddress !== "" &&
      companiesByLocation(orderData.pickupStateAddress);
  }, [orderData.pickupStateAddress]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const productAmount =
        orderData.productAmount == "" ? "0" : orderData.productAmount;

      const qty = orderData.quantity == "" ? "0" : orderData.quantity;

      let totalAmount = parseInt(productAmount) * parseInt(qty);

      setOrderData((prev) => ({
        ...prev,
        totalCost: totalAmount.toString(),
      }));
    };
    orderData.quantity !== "0" && calculateTotalAmount();
  }, [orderData.quantity]);

  /* Handle Select Fields */
  const handleSelectChange = (event) => {
    if (event.target.value === "DEFAULT") {
      toast.error("Kindly select an option");
      return;
    }

    setOrderData((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  //Handle Input Change
  const handleChange = (e) => {
    
    setOrderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !orderData.buyerCompanyName ||
      !orderData.buyerDestination ||
      !orderData.email ||
      !orderData.sellerCompanyId ||
      !orderData.totalCost
    ) {
      toast.error("Data missing");
      setErrMsg("Kindly fill all fields");
      return;
    }
    setIsSubmit(true);
    // Options for the fetch request
    try {
      const res = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = res.status;
      const data = await res.data;

      if (status == 200) {
        navigate(`/order/${data.data.id}`);
      } else if (status == 400) {
        toast.error("Data missing");
        setErrMsg("Kindy Fill all Fields");
        setIsSubmit(false);
        return;
      } else {
        toast.error("An Error Occured!");
        setIsSubmit(false);
        return;
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
      setIsSubmit(false);
    }
  };

  return (
    <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Fill Out Your Details Below!
      </h1>
      <div className="flex items-center gap-x-4 mb-4 lg:mb-0 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Company Name
          </label>
          <input
            type="text"
            name="buyerCompanyName"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Company Name"
            onChange={handleChange}
            required
            value={orderData.buyerCompanyName}
          />
        </div>

        <div className="w-full md:w-1/2 mt-5 md:mt-0">
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
            placeholder="abc@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
            value={orderData.email}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4 mb-4 lg:mb-0 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="sellerCompanyState"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            State
          </label>
          <select
            name="sellerCompanyState"
            id="purchase_location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSelectChange}
            defaultValue={orderData.sellerCompanyState}
          >
            <option value={"DEFAULT"}>
              {Istates?.length <= 0 ? "Loading States" : "Select a State"}
            </option>
            {Istates?.map((state) => {
              return (
                <option value={state} key={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full md:w-1/2 mt-5 md:mt-0">
          <label
            htmlFor="purchase_location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pickup Location{" "}
          </label>
          <select
            name="pickupStateAddress"
            id="purchase_location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSelectChange}
            defaultValue={orderData.pickupStateAddress}
          >
            <option value={"DEFAULT"}>
              {branches.length <= 0 ? "Loading locations" : "Choose a location"}
            </option>
            {branches.map((branch) => {
              return (
                <option value={`${branch.address}`} key={branch.address}>
                  {branch?.address}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-x-4 mb-4 lg:mb-0 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="sellerCompanyName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Companies (Sellers){" "}
          </label>
          <select
            name="sellerCompanyName"
            id="purchase_location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSelectChange}
            defaultValue={orderData?.sellerCompanyName}
          >
            <option value={"DEFAULT"}>
              {companiesInLocation.length <= 0 ? "Loading companies" : "Select"}
            </option>
            {companiesInLocation.map((company) => {
              return (
                <option value={`${company.companyName}`} key={company._id}>
                  {company?.companyName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full md:w-1/2 mt-5 md:mt-0">
          <label
            htmlFor="buyerDestination"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Destination
          </label>
          <input
            type="text"
            name="buyerDestination"
            id="buyerDestination"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fill Purchase Destination"
            onChange={handleChange}
            required
            value={orderData.buyerDestination}
          />
        </div>
      </div>

      <div className="flex items-center gap-x-4 mb-4 lg:mb-0 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="Quantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity (Litres)
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
            value={orderData.quantity}
          />
        </div>
        {/* <div className="w-full md:w-1/2 hidden">
                    <label htmlFor="Cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost</label>
                    <input type="number" name="totalCost" id="cost" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} required value={orderData.totalCost} disabled />
                </div> */}
        <div className="w-full md:w-1/2 mt-5 md:mt-0">
          <label
            htmlFor="totalCost"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total Amount
          </label>
          <input
            type="text"
            name="cost"
            id="cost"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled
            required
            value={nigerianCurrencyFormat.format(orderData.totalCost)}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-4 flex-wrap md:flex-nowrap">
        {sellingPrice !== "0" && (
          <div className="w-full">
            <label
              htmlFor="sellingPrice"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Selling Price
            </label>
            <input
              type="text"
              disabled
              name="sellingPrice"
              id="sellingPrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              required
              value={nigerianCurrencyFormat.format(sellingPrice)}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full text-white bg-[#DF6512] hover:bg-[#df6412ce]  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase mt-10 block"
        onClick={handleSubmit}
        disabled={isSubmit}
      >
        {isSubmit ? "Loading..." : "Purchase Now"}
      </button>

      <p className="text-red-600 text-sm italic text-center">{errMsg}</p>
    </div>
  );
}
