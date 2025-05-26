import React from 'react';
import { Users } from 'lucide-react';

const TableLayout = ({ tables, onSelectTable, selectedTableId }) => {
  const sections = [...new Set(tables.map(table => table.section))];

  const getStatusClass = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'occupied':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
            {section} Section
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tables
              .filter(table => table.section === section)
              .map((table) => (
                <div
                  key={table.id}
                  onClick={() => onSelectTable(table.id)}
                  className={`
                    relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                    ${getStatusClass(table.status)}
                    ${selectedTableId === table.id ? 'ring-2 ring-burgundy ring-offset-2' : ''}
                  `}
                >
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-xl">Table {table.number}</p>
                    <div className="flex items-center mt-2">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{table.capacity}</span>
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase">{table.status}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableLayout;
