import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Banner */}
      <motion.div
        className="w-full md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-8 flex flex-col justify-center items-center text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md text-center">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-4 rounded-full text-orange-500">
              <ChefHat size={48} />
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome to RestroMate
          </motion.h1>

          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            The complete restaurant management solution to streamline your operations and boost your business.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-orange-400/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Easy Management</h3>
              <p>Manage all aspects of your restaurant with an intuitive interface</p>
            </div>

            <div className="bg-orange-400/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Real-time Analytics</h3>
              <p>Get insights into your business with powerful analytics</p>
            </div>

            <div className="bg-orange-400/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Order Tracking</h3>
              <p>Track and manage orders seamlessly</p>
            </div>

            <div className="bg-orange-400/30 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-2">Inventory Control</h3>
              <p>Keep track of your inventory and get alerts</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Auth Forms */}
      <motion.div
        className="w-full md:w-1/2 p-8 flex items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
