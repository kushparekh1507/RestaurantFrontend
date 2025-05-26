import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, TrendingUp, Calendar, Star } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import LineChart from '../../components/common/LineChart';
import BarChart from '../../components/common/BarChart';
import AreaChart from '../../components/common/AreaChart';
import RadarChart from '../../components/common/RadarChart';

const customerGrowthData = [
  { name: 'Jan', value: 50 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 120 },
  { name: 'Apr', value: 150 },
  { name: 'May', value: 200 },
];

const ordersPerDayData = [
  { name: 'Mon', value: 20 },
  { name: 'Tue', value: 35 },
  { name: 'Wed', value: 40 },
  { name: 'Thu', value: 25 },
  { name: 'Fri', value: 55 },
];

const revenueData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 22000 },
  { name: 'May', value: 27000 },
];

const feedbackData = [
  { subject: 'Food', value: 2, fullMark: 5 },
  { subject: 'Service', value: 4, fullMark: 5 },
  { subject: 'Ambience', value: 3, fullMark: 5 },
  { subject: 'Cleanliness', value: 5, fullMark: 5 },
  { subject: 'Staff', value: 4, fullMark: 5 },
];

const CustomerAdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (val) => `$${val.toLocaleString()}`;

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
          value="156"
          icon={CreditCard}
          trend={12}
          color="primary"
        />
        <StatCard
          title="Total Customers"
          value="1,248"
          icon={Users}
          trend={8}
          color="secondary"
        />
        <StatCard
          title="This Month Revenue"
          value="$12,475"
          icon={TrendingUp}
          trend={15}
          color="success"
        />
        <StatCard
          title="Today's Bookings"
          value="24"
          icon={Calendar}
          trend={-5}
          color="warning"
        />
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart
          data={customerGrowthData}
          title="Customer Growth"
          icon={<TrendingUp size={20} className="text-orange-600" />}
          color="#FF5722"
        />
        <BarChart
          data={ordersPerDayData}
          title="Orders Per Day"
          icon={<CreditCard size={20} className="text-orange-600" />}
          color="#FF5722"
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AreaChart
          data={revenueData}
          title="Revenue Over Time"
          icon={<TrendingUp size={20} className="text-orange-600" />}
          color="#FF5722"
          tooltipFormatter={formatCurrency}
          yAxisFormatter={formatCurrency}
        />
        <RadarChart
          data={feedbackData}
          title="Feedback Overview"
          icon={<Star size={20} className="text-orange-600" />}
        />
      </div>
    </div>
  );
};

export default CustomerAdminDashboard;
