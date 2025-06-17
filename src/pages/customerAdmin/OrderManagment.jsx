import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import TabGroup from "../../components/common/TagGroup";
import SearchBar from "../../components/common/SearchBar";
import OrderTable from "../../components/common/OrderTable";
import OrderDetails from "../../components/common/OrderDetails";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: 0, label: "Pending" },
    { id: 1, label: "Completed" },
  ];

  const fetchRestaurantOrders = async () => {
    try {
      const res = await axios.get(
        `/api/Orders/restaurant/${user?.restaurantId}`
      );
      console.log(res);
      setOrders(res.data?.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      (activeTab === "all" || order?.status === activeTab) &&
      (searchQuery === "" ||
        order.waiterName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderId == searchQuery)
  );

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        {/* <div className="flex space-x-2">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <TabGroup
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="flex gap-2">
              <SearchBar
                placeholder="Search orders..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <button className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <OrderTable
            orders={filteredOrders}
            onSelectOrder={(order) => setSelectedOrder(order)} // Pass full order object
            selectedOrderId={selectedOrder?.orderId}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedOrder ? (
            <OrderDetails // Must pass full order here
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
