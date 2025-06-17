import React, { useEffect, useState } from "react";
import { WaiterHeader } from "../../components/waiter/WaiterHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import { Clock, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const WaiterPendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);

  const fetchPendingOrders = async () => {
    try {
      const res = await axios.get(`/api/Orders/waiter/${user.userId}/status/0`);
      console.log(res.data?.orders);
      setOrders(res.data?.orders);
      if (res.data?.orders?.length > 0) {
        setSelectedOrder(res?.data?.orders[0]); // Auto-select first order
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    setLoading(true);
    try {
      const res = await axios.patch(`/api/Orders/UpdateStatus/${orderId}`, 1, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // 1 = Completed
      console.log(res);
      toast.success("Order marked as completed successfully!");
      await fetchPendingOrders(); // refresh after update
      // setSelectedOrder(orders[0]); // clear selection after marking complete
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error(err?.response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <WaiterHeader />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Waiter Dashboard - Pending Orders
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-1 bg-white p-4 rounded shadow border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Pending Orders
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() => setSelectedOrder(order)}
                    className={`cursor-pointer p-3 border rounded-lg transition-all ${
                      selectedOrder?.orderId === order.orderId
                        ? "bg-blue-50 border-blue-400"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-700">
                          Table: {order.tableNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order?.orderItems?.length} items
                        </p>
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
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No pending orders</p>
              )}
            </div>
          </div>

          {/* Selected Order Detail */}
          <div className="lg:col-span-2 bg-white p-4 rounded shadow border">
            {selectedOrder ? (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Details - #{selectedOrder.orderId}
                </h2>
                <p className="text-gray-700 mb-2">
                  Table Number: {selectedOrder.tableNumber}
                </p>
                <p className="text-gray-700 mb-2">
                  Waiter: {selectedOrder.waiterName}
                </p>
                <p className="text-gray-700 mb-4">
                  Order Date:{" "}
                  {new Date(selectedOrder.orderDate).toLocaleString()}
                </p>

                <h3 className="font-semibold mb-2 text-gray-800">Items:</h3>
                <ul className="space-y-2 mb-4">
                  {selectedOrder.orderItems.map((item) => (
                    <li
                      key={item.orderItemId}
                      className="border p-3 rounded bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-700">
                          {item.itemName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        {item.specialInstructions && (
                          <p className="text-sm text-gray-500">
                            Instructions: {item.specialInstructions}
                          </p>
                        )}
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        {item.status === 0
                          ? "Pending"
                          : item.status === 1
                          ? "Ready to Serve"
                          : "Served"}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Complete Order Button */}
                <button
                  onClick={() => handleCompleteOrder(selectedOrder.orderId)}
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  {loading ? "Completing..." : "Mark Order as Completed"}
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-center">
                Select an order to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterPendingOrders;
