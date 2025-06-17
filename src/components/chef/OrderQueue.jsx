import React from "react";
import { Clock, AlertTriangle } from "lucide-react";

export const OrderQueue = ({ orders, onSelectOrder, selectedOrderId }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "cooking":
        return "bg-blue-100 text-blue-700";
      case "ready":
        return "bg-green-100 text-green-700";
      case "served":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Queue</h2>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {orders?.map((order) => (
          <div
            key={order.orderId}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedOrderId === order.orderId
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelectOrder(order)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-semibold">
                  Table {order.tableNumber}
                </span>
                <div className="flex items-center mt-1 space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  {order.priority === "high" && (
                    <span className="flex items-center text-xs text-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Urgent
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end bg-gray-50 p-2 rounded-lg shadow-sm">
                <span className="text-[10px] text-blue-600 flex items-center font-medium">
                  <Clock className="h-3 w-3 mr-1 text-blue-600" />
                  {new Date(order.orderDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <span className="text-xs font-semibold mt-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  {order.orderItems?.length} items
                </span>

                <span className="text-xs font-semibold mt-1 text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  {order?.typeName}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-600 line-clamp-1">
              {order.orderItems.map((item) => item.itemName).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
