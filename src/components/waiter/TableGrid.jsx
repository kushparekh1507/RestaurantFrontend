import React from "react";
import { Users } from "lucide-react";

export const TableGrid = ({ tables, selectedTableId, onSelectTable }) => {
  const getTableStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "reserved":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tables.map((table) => (
        <div
          key={table.tableId}
          onClick={() => onSelectTable(table)}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedTableId === table.tableId
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-gray-700">
              #{table.tableNumber}
            </span>
            <div className="flex items-center mt-1">
              <Users className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">{table.capacity}</span>
            </div>
            <span
              className={`mt-2 text-xs px-2 py-1 rounded-full ${getTableStatusColor(
                table?.status
              )}`}
            >
              {table.tableTypeName}
            </span>
            {table.hasActiveOrder && (
              <span className="mt-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Active Order
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
