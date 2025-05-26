// src/pages/superAdmin/SuperAdminDashboard.jsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Store, CreditCard, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import LineChart from '../../components/common/LineChart';
import BarChart from '../../components/common/BarChart';
import AreaChart from '../../components/common/AreaChart';

const adminGrowthData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 65 },
  { name: 'May', value: 80 },
];

const newRegistrationsData = [
  { name: 'Jan', value: 5 },
  { name: 'Feb', value: 10 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 20 },
  { name: 'May', value: 25 },
];

const revenueData = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 21000 },
  { name: 'May', value: 24000 },
];

const activities = [
  { id: 1, action: 'New restaurant registration', restaurant: 'Spice Garden', time: '2 hours ago' },
  { id: 2, action: 'Restaurant approved', restaurant: 'Pizza Palace', time: '5 hours ago' },
  { id: 3, action: 'Customer admin updated profile', restaurant: 'Burger Junction', time: '8 hours ago' },
  { id: 4, action: 'New restaurant registration', restaurant: 'Chai Point', time: '1 day ago' },
  { id: 5, action: 'Restaurant subscription renewed', restaurant: 'Tandoor Delight', time: '1 day ago' },
];

const SuperAdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = value => `$${value.toLocaleString()}`;

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
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Super Admin Dashboard</h1>
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
          value="53"
          icon={Store}
          trend={15}
          color="primary"
        />
        <StatCard
          title="Active Restaurants"
          value="42"
          icon={Store}
          trend={8}
          color="success"
        />
        <StatCard
          title="Pending Approvals"
          value="11"
          icon={UsersIcon}
          trend={20}
          color="warning"
        />
        <StatCard
          title="Platform Revenue"
          value="$25,475"
          icon={TrendingUp}
          trend={12}
          color="secondary"
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

      <div className="grid grid-cols-1 gap-6">
        <AreaChart
          data={revenueData}
          title="Platform Revenue"
          icon={<CreditCard size={20} className="text-orange-600" />}
          color="#FF5722"
          tooltipFormatter={formatCurrency}
          yAxisFormatter={formatCurrency}
        />
      </div>

      {/* Recent Activities */}
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map(act => {
            let bgClass = 'bg-orange-100 text-orange-600';
            let Icon = TrendingUp;
            if (act.action.includes('registration')) {
              bgClass = 'bg-blue-100 text-blue-600';
              Icon = Store;
            } else if (act.action.includes('approved')) {
              bgClass = 'bg-green-100 text-green-600';
              Icon = UsersIcon;
            }
            return (
              <motion.div
                key={act.id}
                className={`flex items-center gap-4 p-3 border-b border-gray-100 last:border-0`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: act.id * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgClass}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{act.action}</p>
                  <p className="text-gray-500 text-sm">{act.restaurant}</p>
                </div>
                <div className="text-sm text-gray-500">{act.time}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminDashboard;
