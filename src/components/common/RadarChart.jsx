// src/components/common/RadarChart.jsx

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const RadarChart = ({ data, title, icon }) => {
  // default tick font size
  const tickFontSize = 12;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#6b7280', fontSize: tickFontSize }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#FF5722"
              fill="#FF5722"
              fillOpacity={0.4}
              isAnimationActive={true}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

RadarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default RadarChart;
