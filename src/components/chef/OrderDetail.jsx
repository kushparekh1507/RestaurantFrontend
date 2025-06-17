import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlarmClock, User, MapPin } from "lucide-react";

export const OrderDetail = ({ order, onItemStatusChange }) => {
  const [orderItems, setOrderItems] = useState(order?.orderItems || []);

  useEffect(() => {
    setOrderItems(order?.orderItems || []);
  }, [order]);

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 0:
        return 1;
      case 1:
        return 2;
      default:
        return 2;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Ready to Serve";
      case 2:
        return "Served";
      default:
        return "Unknown";
    }
  };

  const getActionButtonText = (status) => {
    switch (status) {
      case 0:
        return "Mark as Ready";
      case 1:
        return "Mark as Served";
      case 2:
        return "Completed";
      default:
        return "Update Status";
    }
  };

  const getActionButtonColor = (status) => {
    switch (status) {
      case 0:
        return "bg-blue-500 hover:bg-blue-600";
      case 1:
        return "bg-green-500 hover:bg-green-600";
      case 2:
        return "bg-gray-400 cursor-not-allowed";
      default:
        return "bg-orange-500";
    }
  };

  const handleItemStatusChange = async (
    orderId,
    itemId,
    currentStatus,
    index
  ) => {
    if (currentStatus === 2) return;

    try {
      await axios.patch(`/api/OrderItems/status/${orderId}/${itemId}`);
      const updatedItems = [...orderItems];
      updatedItems[index].status = getNextStatus(currentStatus);
      setOrderItems(updatedItems);

      if (onItemStatusChange) onItemStatusChange(updatedItems);
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Order #{order.orderId}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-500 mr-1" />
            Waiter
          </div>
          <p className="font-medium mt-1">{order.waiterName}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <p className="font-medium mt-1">Table {order.tableNumber}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <AlarmClock className="h-4 w-4 text-gray-500 mr-1" />
          <p className="font-medium mt-1">
            {new Date(order.orderDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
      <div className="space-y-3 mb-6">
        {orderItems.map((item, index) => (
          <div
            key={item.orderItemId}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-start">
                <span className="bg-orange-100 text-orange-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-1">
                  {item.quantity}
                </span>
                <div>
                  <h4 className="font-medium text-gray-800">{item.itemName}</h4>
                  {item?.specialInstructions && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Instructions:</span>{" "}
                      {item.specialInstructions}
                    </p>
                  )}
                  <p className="text-sm mt-1">
                    <span className="font-medium">Status:</span>{" "}
                    {getStatusText(item.status)}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleItemStatusChange(
                    order.orderId,
                    item.orderItemId,
                    item.status,
                    index
                  )
                }
                disabled={item.status === 2}
                className={`px-3 py-1 rounded text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${getActionButtonColor(
                  item.status
                )}`}
              >
                {getActionButtonText(item.status)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
