// src/pages/superAdmin/SuperAdminDashboard.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users as UsersIcon, Store, TrendingUp } from "lucide-react";
import StatCard from "../../components/common/StatCard";
import LineChart from "../../components/common/LineChart";
import BarChart from "../../components/common/BarChart";

const SuperAdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [acceptedRestaurants, setAcceptedRestaurants] = useState([]);
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const [rejectedRestaurants, setRejectedRestaurants] = useState([]);

  const [adminGrowthData, setAdminGrowthData] = useState([]);
  const [newRegistrationsData, setNewRegistrationsData] = useState([]);

  const fetchData = async () => {
    try {
      const [all, accepted, pending] = await Promise.all([
        axios.get("/api/Restaurants"),
        axios.get("/api/Restaurants/accepted"),
        axios.get("/api/Restaurants/pending"),
      ]);

      // Direct array response
      const allData = all.data || [];
      const acceptedData = accepted.data || [];
      const pendingData = pending.data || [];
      const rejectedData =
        allData.length - acceptedData.length - pendingData.length;

      setAllRestaurants(allData);
      setAcceptedRestaurants(acceptedData);
      setPendingRestaurants(pendingData);
      setRejectedRestaurants(rejectedData);

      const registrations = groupByMonth(allData, "createdAt");
      setNewRegistrationsData(registrations);

      const adminGrowth = calculateGrowth(registrations);
      setAdminGrowthData(adminGrowth);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const groupByMonth = (data, key) => {
    const monthMap = new Map();

    data.forEach((item) => {
      if (!item[key]) return; // Skip if createdAt is missing
      const date = new Date(item[key]);
      if (isNaN(date)) return; // Skip invalid date
      const month = date.toLocaleString("default", { month: "short" });
      monthMap.set(month, (monthMap.get(month) || 0) + 1);
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      name: month,
      value: monthMap.get(month) || 0,
    }));
  };

  const calculateGrowth = (registrationData) => {
    const result = [];
    let total = 0;
    for (let i = 0; i < registrationData.length; i++) {
      total += registrationData[i].value;
      result.push({
        name: registrationData[i].name,
        value: total,
      });
    }
    return result;
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage all restaurant partners and monitor system performance.
        </p>
      </div>

      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard
          title="Total Restaurants"
          value={allRestaurants.length.toString()}
          icon={Store}
          color="primary"
        />
        <StatCard
          title="Active Restaurants"
          value={acceptedRestaurants.length.toString()}
          icon={Store}
          color="success"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingRestaurants.length.toString()}
          icon={UsersIcon}
          color="warning"
        />
        <StatCard
          title="Rejected"
          value={rejectedRestaurants}
          icon={UsersIcon}
          color="warning"
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart
          data={adminGrowthData}
          title="Admin Growth"
          icon={<TrendingUp size={20} className="text-orange-600" />}
          color="#FF5722"
        />
        <BarChart
          data={newRegistrationsData}
          title="New Registrations"
          icon={<UsersIcon size={20} className="text-orange-600" />}
          color="#FF5722"
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
