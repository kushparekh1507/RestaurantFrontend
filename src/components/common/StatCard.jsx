// src/components/common/StatCard.jsx

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel, 
  color = 'primary' 
}) => {
  const colorClasses = {
    primary: 'bg-orange-100 text-orange-700',
    secondary: 'bg-amber-100 text-amber-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-md ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>

        {trend !== undefined && (
          <div className={`flex items-center text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
            <span className="ml-1 text-gray-500">
              {trendLabel || 'vs last period'}
            </span>
          </div>
        )}
      </div>

      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  trend: PropTypes.number,
  trendLabel: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'info']),
};

export default StatCard;
