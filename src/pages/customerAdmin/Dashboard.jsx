import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, Radar, PieChart } from "lucide-react";
import StatCard from "../../components/common/StatCard";
import AreaChart from "../../components/common/AreaChart";
import RadarChart from "../../components/common/RadarChart";
import { useSelector } from "react-redux";
import axios from "axios";
import PieChartComponent from "../../components/common/PieChartComponent";

const CustomerAdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantStats, setRestaurantStats] = useState({
    totalorders: 0,
    totalusers: 0,
  });
  const { user } = useSelector((s) => s.auth);

  const fetchRestaurantStats = async () => {
    try {
      const res = await axios.get(
        `/api/Restaurants/stats/${user?.restaurantId}`
      );
      setRestaurantStats({
        totalorders: res.data.totalorders,
        totalusers: res.data.totalusers,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRestaurantStats();
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const radarData = [
    { subject: "Orders", value: restaurantStats.totalorders, fullMark: 100 },
    { subject: "Users", value: restaurantStats.totalusers, fullMark: 100 },
  ];

  const areaData = [
    { name: "Orders", value: restaurantStats.totalorders },
    { name: "Users", value: restaurantStats.totalusers },
  ];

  const pieChartData = [
    { name: "Orders", value: restaurantStats.totalorders },
    { name: "Users", value: restaurantStats.totalusers },
  ];

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
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back to your restaurant management dashboard.
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
          title="Total Orders"
          value={restaurantStats.totalorders}
          icon={CreditCard}
          color="primary"
        />
        <StatCard
          title="Total Users"
          value={restaurantStats.totalusers}
          icon={Users}
          color="secondary"
        />
      </motion.div>

      {/* Dynamic Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AreaChart
          data={areaData}
          title="Order & User Overview"
          icon={<PieChart size={20} className="text-orange-600" />}
          color="#FF5722"
        />
        <PieChartComponent
          data={pieChartData}
          title="Users vs Orders"
          icon={<PieChart size={20} className="text-orange-600" />}
        />
      </div>
    </div>
  );
};

export default CustomerAdminDashboard;
