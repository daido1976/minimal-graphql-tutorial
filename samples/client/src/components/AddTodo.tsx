/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, GET_TODOS, GET_CATEGORIES } from "../graphql/queries";

const AddTodo: React.FC = () => {
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !categoryId) return;
    addTodo({ variables: { content, categoryId } });
    setContent("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="New todo"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select category</option>
        {categoriesData?.categories.map((category: any) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;