import React from "react";

const Categories = ({ categories }) => (
  <div className="mb-2 flex flex-wrap gap-2">
    {categories?.map(category => (
      <span
        className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
        key={category.id}
      >
        {category.name}
      </span>
    ))}
  </div>
);

export default Categories;
