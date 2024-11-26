/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql/queries";

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = (id: string, status: string) => {
    updateTodo({ variables: { id, status } });
  };

  const handleDelete = (id: string) => {
    deleteTodo({ variables: { id }, refetchQueries: [{ query: GET_TODOS }] });
  };

  return (
    <ul>
      {data.todos.map((todo: any) => (
        <li key={todo.id}>
          {todo.content} - {todo.status}
          {todo.category && ` (${todo.category.name})`}
          <select
            value={todo.status}
            onChange={(e) => handleStatusChange(todo.id, e.target.value)}
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
