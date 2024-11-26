import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY, GET_CATEGORIES } from "../graphql/queries";

const AddCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory({ variables: { name } });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category"
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
