import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ChefHat, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { loadUserFromToken, setToken } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(formData);

    await axios
      .post("/api/Auth/login", formData)
      .then(async (res) => {
        console.log(res.data);
        dispatch(setToken(res.data.token));
        toast.success("Login successful!");
        const u = await dispatch(loadUserFromToken()).unwrap();
        console.log(u);
      })
      .catch((e) => {
        console.log(e.response?.data);
        toast.error(e.response?.data);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      console.log("User: " + user);
      if (user?.role == "SuperAdmin") {
        navigate("/superadmin");
      } else if (user?.role == "CustomerAdmin") {
        navigate("/customeradmin");
      } else if (user?.role == "CustomerUser") {
        console.log("Customer User");
        console.log(user);
        if (user?.userType == "Waiter") {
          console.log("Customer User Waiter");
          navigate("/waiter");
        } else if (user?.userType == "Chef") {
          console.log("Customer User Chef");
          navigate("/chef");
        }
      }
    }
  }, [user]);

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
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        {/* {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )} */}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
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
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                className={`input-field`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full mb-4"
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
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Link to Signup */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
