import React, { useState } from "react";
import { Search, Salad, Beef, Pizza } from "lucide-react";
import CategoryFilter from "../common/CategoryFilter";

export const MenuItems = ({ menuItems, onAddItem, categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Add "All" and use consistent keys
  const allCategories = [
    { menuCategoryId: "all", categoryName: "All" },
    ...categories,
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" ||
      !activeCategory ||
      item.menuCategoryId === activeCategory;

    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchTerm?.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search menu items..."
            className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <CategoryFilter
        categories={allCategories}
        selectedCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Menu Items */}
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-1">
        {filteredItems.map((item) => (
          <div
            key={item.menuItemId}
            className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{item.itemName}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {item.menuCategoryName}
                </p>
                <p className="text-sm font-semibold text-orange-600 mt-2">
                  ₹{item.price}
                </p>
              </div>
              {item.imageUrl && (
                <div className="h-16 w-16 bg-gray-200 rounded-lg ml-2 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="mt-3">
              <button
                onClick={() => onAddItem(item.menuItemId)}
                className="w-full py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
              >
                Add to Order
              </button>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            <p>No menu items found</p>
          </div>
        )}
      </div>
    </div>
  );
};
