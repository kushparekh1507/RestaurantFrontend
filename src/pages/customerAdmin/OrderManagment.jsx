import React, { useState } from 'react';

import { Filter } from 'lucide-react';
import TabGroup from '../../components/common/TagGroup';
import SearchBar from '../../components/common/SearchBar';
import OrderTable from '../../components/common/OrderTable';
import OrderDetails from '../../components/common/OrderDetails';

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready' },
    { id: 'delivered', label: 'Delivered' },
  ];

  // Sample order data
  const orders = [
    { id: 'O001', customer: 'Rahul Verma', items: 3, total: 42.97, status: 'pending', time: '10:15 AM' },
    { id: 'O002', customer: 'Priya Sharma', items: 2, total: 27.98, status: 'preparing', time: '10:05 AM' },
    { id: 'O003', customer: 'Amit Kumar', items: 5, total: 68.95, status: 'ready', time: '9:50 AM' },
    { id: 'O004', customer: 'Sneha Patel', items: 1, total: 12.99, status: 'delivered', time: '9:30 AM' },
    { id: 'O005', customer: 'Raj Malhotra', items: 4, total: 53.96, status: 'pending', time: '10:25 AM' },
  ];

  const filteredOrders = orders.filter(
    order => 
      (activeTab === 'all' || order.status === activeTab) &&
      (searchQuery === '' || 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <div className="flex space-x-2">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <TabGroup tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            
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
            onSelectOrder={setSelectedOrder}
            selectedOrderId={selectedOrder}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedOrder ? (
            <OrderDetails orderId={selectedOrder} onClose={() => setSelectedOrder(null)} />
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
