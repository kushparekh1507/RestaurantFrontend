import React from "react";
import { Clock, Check, Loader, AlertTriangle } from "lucide-react";

export const ChefStats = ({ orders }) => {
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const inProgressOrders = orders.filter(
    (order) => order.status === "cooking"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "ready"
  ).length;
  const urgentOrders = orders.filter(
    (order) => order.priority === "high"
  ).length;

  const stats = [
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      title: "In Progress",
      value: inProgressOrders,
      icon: <Loader className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: <Check className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Urgent Orders",
      value: urgentOrders,
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-4 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
