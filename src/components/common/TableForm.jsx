import React, { useState } from 'react';
import { X , Plus } from 'lucide-react';
import toast from 'react-hot-toast';


const TableForm = ({ onClose, isReservation = false, tables = [] }) => {
  const [formData, setFormData] = useState(
    isReservation 
      ? {
          customerName: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          people: '2',
          tableId: '',
          notes: ''
        }
      : {
          number: '',
          capacity: '2',
          section: 'main',
          status: 'available'
        }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would submit the form data to your API
    setTimeout(() => {
      toast.success(`${isReservation ? 'Reservation' : 'Table'} created successfully`);
      onClose();
    }, 500);
  };

  const sections = ['main', 'outdoor', 'private'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-slideDown">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {isReservation ? 'Add New Reservation' : 'Add New Table'}
        </h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {isReservation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                placeholder="Enter customer name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div>
              <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">
                Number of People
              </label>
              <select
                id="people"
                name="people"
                value={formData.people}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label htmlFor="tableId" className="block text-sm font-medium text-gray-700 mb-1">
                Table
              </label>
              <select
                id="tableId"
                name="tableId"
                value={formData.tableId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              >
                <option value="">Select a table</option>
                {tables
                  .filter(table => table.status === 'available')
                  .map((table) => (
                    <option key={table.id} value={table.id}>
                      Table {table.number} ({table.capacity} people) - {table.section} section
                    </option>
                  ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests / Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                placeholder="Enter any special requests or notes"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                Table Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                placeholder="Enter table number"
                required
              />
            </div>
            
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <select
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              >
                {[2, 4, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} people
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              >
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-burgundy-light focus:border-burgundy outline-none transition-colors"
                required
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-burgundy-light transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-burgundy-light focus:ring-opacity-50 transition-colors"
          >
            {isReservation ? 'Create Reservation' : 'Add Table'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
