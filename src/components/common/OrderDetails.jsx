import React from 'react';
import { X, Clock, Check, CheckCheck, Truck } from 'lucide-react';

const OrderDetails = ({ orderId, onClose }) => {
  const orderDetails = {
    id: orderId,
    customer: 'Rahul Verma',
    phone: '+91 9876543210',
    address: '123 Main Street, Mumbai, India',
    items: [
      { id: 'I001', name: 'Margherita Pizza', price: 12.99, quantity: 2 },
      { id: 'I002', name: 'Caesar Salad', price: 8.99, quantity: 1 },
      { id: 'I003', name: 'Garlic Bread', price: 4.99, quantity: 1 },
    ],
    subtotal: 39.96,
    tax: 3.00,
    deliveryFee: 2.99,
    total: 45.95,
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    orderTime: '10:15 AM',
    deliveryTime: '10:45 AM',
  };

  const getStatusStepClass = (step, currentStatus) => {
    const statusOrder = ['pending', 'preparing', 'ready', 'delivered'];
    const currentStep = statusOrder.indexOf(currentStatus);
    
    if (step < currentStep) return 'bg-green-500 text-white';
    if (step === currentStep) return 'bg-burgundy text-white';
    return 'bg-gray-200 text-gray-500';
  };

  const getStepIcon = (step, currentStatus) => {
    const statusOrder = ['pending', 'preparing', 'ready', 'delivered'];
    const currentStep = statusOrder.indexOf(currentStatus);

    if (step < currentStep) return <Check className="h-5 w-5" />;
    if (step === currentStep) {
      const icons = [Clock, Clock, CheckCheck, Truck];
      const StepIcon = icons[step];
      return <StepIcon className="h-5 w-5" />;
    }
    return <span className="text-sm">{step + 1}</span>;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {/* Order Status */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Status</h4>
          <div className="flex justify-between items-center w-full mb-2">
            {['pending', 'preparing', 'ready', 'delivered'].map((status, index) => (
              <div key={status} className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-orange-500 ${getStatusStepClass(index, orderDetails.status)}`}>
                  {getStepIcon(index, orderDetails.status)}
                </div>
                <span className="text-xs text-gray-500 mt-1 capitalize">{status}</span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>
            <div 
              className="absolute top-4 left-0 h-1 bg-orange-500 transition-all duration-300"
              style={{ 
                width: 
                  orderDetails.status === 'pending' ? '0%' :
                  orderDetails.status === 'preparing' ? '33%' :
                  orderDetails.status === 'ready' ? '66%' :
                  '100%'
              }}
            ></div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Customer Information</h4>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium text-gray-800">{orderDetails.customer}</p>
            <p className="text-sm text-gray-600">{orderDetails.phone}</p>
            <p className="text-sm text-gray-600">{orderDetails.address}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Items</h4>
          <div className="space-y-3">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Payment Details</h4>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm font-medium text-gray-800">${orderDetails.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">Tax</p>
              <p className="text-sm font-medium text-gray-800">${orderDetails.tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">Delivery Fee</p>
              <p className="text-sm font-medium text-gray-800">${orderDetails.deliveryFee.toFixed(2)}</p>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-gray-800">Total</p>
                <p className="text-lg font-bold text-burgundy">${orderDetails.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Additional Information</h4>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="text-sm font-medium text-gray-800">{orderDetails.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Status</p>
                <p className="text-sm font-medium">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    orderDetails.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {orderDetails.paymentStatus}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Order Time</p>
                <p className="text-sm font-medium text-gray-800">{orderDetails.orderTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Estimated Delivery</p>
                <p className="text-sm font-medium text-gray-800">{orderDetails.deliveryTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t mt-auto">
        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
          Update Order Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
