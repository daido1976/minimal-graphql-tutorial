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
    if (!content.trim()) {
      alert("todo content is empty");
      return;
    }
    addTodo({ variables: { content, categoryId } });
    setContent("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="New todo"
        className="todo-input"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="category-select"
      >
        <option value="">Select category</option>
        {categoriesData?.categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
