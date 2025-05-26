import { motion } from "framer-motion";

const LoadingSpinner = ({ message = "" }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm pointer-events-auto">
      <motion.div
        className="w-16 h-16 border-4 border-primary-light border-t-orange-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && <p className="mt-4 text-lg text-gray-800">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
