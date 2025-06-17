import React from "react";
import { ChefHat, Bell, LogOut } from "lucide-react";

export const ChefHeader = () => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-100 p-2 rounded-full">
              <ChefHat className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h2 className="font-bold text-xl">
                <span className="text-orange-500">Restro</span>
                <span className="text-gray-800">Mate</span>
              </h2>
              <p className="text-xs text-gray-500">Chef Portal</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                C
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Chef Alex</p>
                <p className="text-xs text-gray-500">Head Chef</p>
              </div>
            </div>

            <button
              className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors"
              onClick={() => handleLogout()}
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
