import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { SERVICEPROVIDER } from "../../Utils/routes";
import { Sign_In } from "../../Utils/restEndPoints";
import { ISignInForm } from "../../Utils/types/form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { validateEmail } from "../../Utils/validation/loginformvalidation";
import Input from "../../Components/atoms/Input/Input";
import ButtonLoader from "../../Components/atoms/ButtonLoader/ButtonLoader";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<ISignInForm>({
    email: "",
    password: "",
  });
  const [isButtonLoader, setIsButtonLoader] = useState<boolean>(false); // State to track button loader state [btnLoader]

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({ ...prevFormData, email: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: e.target.value,
    }));
  };

  const handleSignInClick = async () => {
    setIsButtonLoader(true);
    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      setIsButtonLoader(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Invalid Email");
      setIsButtonLoader(false);
      return;
    }

    try {
      const { email, password } = formData;
      const response = await axiosInstance.post(Sign_In, { email, password });

      console.log("response data", response.data);

      // Handle successful sign-in
      toast.success("Sign-in successful");
      // toast.success(response.data.message);

      Cookies.set("token", response.data.token);

      setFormData({ email: "", password: "" });

      navigate(SERVICEPROVIDER);
      
      setIsButtonLoader(false);
    } catch (error: any) {
      setIsButtonLoader(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl mx-auto">
        <div className="-z-10 transition-all duration-500 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-[#50B500] sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Sign in
          </h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>

        <Input
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          name="email"
          label="Email Your Email"
          outerBoxclassName="relative mt-2 w-full"
          inputBoxclassName="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#50B500] focus:outline-none focus:ring-0"
          labelBoxclassName="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#50B500] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
        />
        <Input
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
          name="password"
          label="Enter Your Password"
          outerBoxclassName="relative mt-2 w-full"
          inputBoxclassName="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#50B500] focus:outline-none focus:ring-0"
          labelBoxclassName="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#50B500] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
        />

        <div className="flex w-full justify-center items-center">
          {!isButtonLoader ?<button
            onClick={handleSignInClick}
            className="mx-auto w-36 rounded-lg bg-[#50B500] py-3 font-bold text-white"
          >
            Login
          </button>:<ButtonLoader />}
        </div>

        {/* Forgot Password is optional */}
        <p className="text-center text-gray-600">
          <a
            className="w-full text-center text-sm font-medium text-gray-600 hover:underline"
            href="#"
          >
            Forgot your password?
          </a>
        </p>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
