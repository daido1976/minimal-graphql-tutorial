import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../graphql/queries";

const CategoryList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <ul>
        {data?.categories.map((category) => (
          <li key={category.id} className="category-item">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
