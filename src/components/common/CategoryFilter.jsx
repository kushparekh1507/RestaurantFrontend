import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.menuCategoryId}
          onClick={() => onChange(category.menuCategoryId)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.menuCategoryId
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
