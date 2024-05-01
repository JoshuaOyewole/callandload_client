import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;  
  
  //Send Email Verification OTP
  export const sendEmailVerificationOTP = async (email) => {
    const credential = {
      email,
    };
    try {
      const response = await axios.post(
        `${API_URL}/auth/sendaccountverificationotp`,
        credential,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const status = response.status;
      const msg = await response.data.message;

      if (status == 200) {
        return { success: true, msg };
      }
      else{
        return { success: false, msg };
      }
    } catch (error) {
      console.error(error);
      return { success: false, msg: error.response.data.msg };
    }
  };