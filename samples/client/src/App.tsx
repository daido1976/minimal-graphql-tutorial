import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import AddCategory from "./components/AddCategory";
import CategoryList from "./components/CategoryList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // GraphQLサーバーのURLを適切に設定してください
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <h1>Todo App</h1>
        <div className="form-container">
          <AddCategory />
          <AddTodo />
        </div>
        <div className="content-container">
          <CategoryList />
          <TodoList />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
