import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChefHeader } from "../../components/chef/ChefHeader";
import { ChefStats } from "../../components/chef/ChefStats";
import { OrderQueue } from "../../components/chef/OrderQueue";
import { OrderDetail } from "../../components/chef/OrderDetail";
import axios from "axios";

const ChefDashboard = () => {
  const { user } = useSelector((s) => s.auth);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchTablesOfActiveOrders = async () => {
    try {
      const res = await axios.get(
        `/api/Orders/restaurant/${user.restaurantId}/status/0`
      );
      console.log(res.data?.orders);
      setOrders(res.data?.orders);
    } catch (err) {
      console.error("Error fetching tables with active orders:", err);
    }
  };

  const handleItemStatusChange = (orderId, updatedItems) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, orderItems: updatedItems } : order
    );
    setOrders(updatedOrders);

    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, orderItems: updatedItems });
    }
  };

  useEffect(() => {
    fetchTablesOfActiveOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ChefHeader />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Chef Dashboard
        </h1>
        <ChefStats orders={orders} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <OrderQueue
              orders={orders}
              onSelectOrder={setSelectedOrder}
              selectedOrderId={selectedOrder ? selectedOrder.orderId : null}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedOrder && (
              <OrderDetail
                order={selectedOrder}
                onItemStatusChange={(updatedItems) =>
                  handleItemStatusChange(selectedOrder.orderId, updatedItems)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
