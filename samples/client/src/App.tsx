import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import AddCategory from "./components/AddCategory";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // GraphQLサーバーのURLを適切に設定してください
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Todo App</h1>
        <AddCategory />
        <AddTodo />
        <TodoList />
      </div>
    </ApolloProvider>
  );
};

export default App;
