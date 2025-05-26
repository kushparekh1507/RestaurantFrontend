import React from "react";
import { Edit, Trash2 } from "lucide-react";

const ItemGrid = ({ items, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.menuItemId}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 bg-gray-200">
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              <button
                className="p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                onClick={() => onEdit(item)}
              >
                <Edit size={16} className="text-gray-600" />
              </button>
              <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors">
                <Trash2 size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-gray-900 font-semibold mb-1">
              {item.itemName}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-burgundy font-bold">
                {item.price.toFixed(2)}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {item.menuCategory.categoryName.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="col-span-full py-8 text-center text-gray-500">
          No items found
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
