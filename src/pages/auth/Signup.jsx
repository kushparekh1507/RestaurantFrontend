import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      mobileNo: contactRef.current.value,
    };

    console.log(formData);

    setIsLoading(true);
    await axios
      .post("/api/Restaurants", formData)
      .then((res) => {
        console.log(res);
        toast.success("You will be notified via email for further process");
      })
      .catch((e) => {
        console.log(e);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    // toast.success("triggered");
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex justify-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <ChefHat size={36} />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-1">
          <span className="text-orange-600">Restro</span>Mate
        </h1>
        <p className="text-gray-600">Restaurant Management Solution</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="grid gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                ref={emailRef}
                className={`input-field`}
                placeholder="Enter Email"
              />
            </div>
          </div>

          {/* Restaurant Info */}
          <div>
            <label
              htmlFor="restaurantName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              type="text"
              ref={nameRef}
              className={`input-field`}
              placeholder="Enter your restaurant name"
            />
          </div>

          <div>
            <label
              htmlFor="restaurantAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant Address
            </label>
            <input
              id="restaurantAddress"
              type="text"
              ref={addressRef}
              className={`input-field`}
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              ref={contactRef}
              className={`input-field`}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Link to Sign In */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
