import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "../graphql/queries";
import { TodoStatus } from "../__generated__/graphql";

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleStatusChange = (id: string, status: TodoStatus) => {
    updateTodo({ variables: { id, status } });
  };

  const handleDelete = (id: string) => {
    deleteTodo({ variables: { id }, refetchQueries: [{ query: GET_TODOS }] });
  };

  return (
    <ul className="todo-list">
      {data?.todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${
            todo.status === TodoStatus.Done ? "done" : ""
          }`}
        >
          <div className="todo-content">
            <span>{todo.content}</span>
            {todo.category && (
              <span className="todo-category">({todo.category.name})</span>
            )}
          </div>
          <div className="todo-actions">
            <select
              value={todo.status}
              onChange={(e) =>
                handleStatusChange(todo.id, e.target.value as TodoStatus)
              }
              className="todo-status"
            >
              <option value={TodoStatus.InProgress}>In Progress</option>
              <option value={TodoStatus.Done}>Done</option>
            </select>
            <button
              onClick={() => handleDelete(todo.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
