// src/components/common/AreaChart.jsx

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Custom tooltip without TS types
function CustomTooltip({ active, payload, label, formatter }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-gray-600">{label}</p>
        <p className="font-bold text-orange-600">
          {formatter ? formatter(value) : value}
        </p>
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  formatter: PropTypes.func,
};

const AreaChart = ({
  data,
  title,
  dataKey = 'value',
  color = '#FF5722',
  icon,
  tooltipFormatter,
  xAxisFormatter = (v) => v,
  yAxisFormatter = (v) => v.toString(),
}) => {
  // default margins & fontSize for ticks
  const margin = { top: 10, right: 0, left: 0, bottom: 0 };
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
          <RechartsAreaChart data={data} margin={margin}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: tickFontSize }}
              tickFormatter={xAxisFormatter}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: tickFontSize }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip
              content={
                <CustomTooltip formatter={tooltipFormatter} />
              }
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#areaGradient)"
              isAnimationActive={true}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
  tooltipFormatter: PropTypes.func,
  xAxisFormatter: PropTypes.func,
  yAxisFormatter: PropTypes.func,
};

export default AreaChart;
