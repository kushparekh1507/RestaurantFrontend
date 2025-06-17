import React from "react";
import { X, Clock, Loader2, Check } from "lucide-react";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  const getOrderItemStatus = (status) => {
    switch (status) {
      case 0:
        return {
          label: "Pending",
          color: "bg-yellow-100 text-yellow-800",
          icon: <Clock className="h-4 w-4 mr-1" />,
        };
      case 1:
        return {
          label: "In Progress",
          color: "bg-blue-100 text-blue-800",
          icon: <Loader2 className="h-4 w-4 mr-1 animate-spin" />,
        };
      case 2:
        return {
          label: "Completed",
          color: "bg-green-100 text-green-800",
          icon: <Check className="h-4 w-4 mr-1" />,
        };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Order Basic Info */}
      <div className="p-4 space-y-2">
        <p>
          <span className="font-medium">Order ID:</span> {order.orderId}
        </p>
        <p>
          <span className="font-medium">Table No:</span> {order.tableNumber} (
          {order.typeName})
        </p>
        <p>
          <span className="font-medium">Waiter:</span> {order.waiterName}
        </p>
        <p>
          <span className="font-medium">Order Date:</span>{" "}
          {new Date(order.orderDate).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Total Amount:</span> ₹
          {order.totalAmount}
        </p>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">
          Order Items
        </h4>
        <div className="space-y-3">
          {order.orderItems.map((item) => {
            const itemStatus = getOrderItemStatus(item.status);
            return (
              <div
                key={item.orderItemId}
                className="flex items-center bg-gray-50 p-3 rounded-md"
              >
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="h-14 w-14 rounded-md object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.itemName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} | Price: ₹{item.price} | Total: ₹
                    {item.totalPrice}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-1 mt-1 text-xs font-medium rounded-full ${itemStatus.color}`}
                  >
                    {itemStatus.icon}
                    {itemStatus.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
