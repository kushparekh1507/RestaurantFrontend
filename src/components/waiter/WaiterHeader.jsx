import React from "react";
import { Bell, LogOut, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const WaiterHeader = () => {
  const { user } = useSelector((s) => s.auth);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between space-x-4 w-full">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              {/* Logo and Title */}
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 p-2 rounded-full">
                  <UserCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">
                    <span className="text-orange-500">Restro</span>
                    <span className="text-gray-800">Mate</span>
                  </h2>
                  <p className="text-xs text-gray-500">Waiter Portal</p>
                </div>
              </div>

              {/* Links (placed next to logo, not to the extreme right) */}
              <Link
                to="/waiter"
                className="text-sm text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Take Order
              </Link>
              <Link
                to="/waiter/pending-orders"
                className="text-sm text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Pending Orders
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                W
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-gray-500">Waiter</p>
              </div>
            </div>

            <button
              className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
