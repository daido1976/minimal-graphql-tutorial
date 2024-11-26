import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import {
  Resolvers,
  Todo,
  TodoStatus,
} from "./__generated__/resolvers-types.js";

// データベース層の型
type CategoryModel = {
  id: string;
  name: string;
};

type TodoModel = {
  id: string;
  content: string;
  status: TodoStatus;
  categoryId: string;
};

const categories: CategoryModel[] = [
  { id: randomUUID(), name: "Development" },
  { id: randomUUID(), name: "Writing" },
  { id: randomUUID(), name: "Deployment" },
];

// データ格納用の配列
const todos: TodoModel[] = [
  {
    id: randomUUID(),
    content: "Create a sample project",
    status: TodoStatus.InProgress,
    categoryId: categories[0].id,
  },
  {
    id: randomUUID(),
    content: "Write a blog post",
    status: TodoStatus.InProgress,
    categoryId: categories[1].id,
  },
  {
    id: randomUUID(),
    content: "Deploy to the cloud",
    status: TodoStatus.InProgress,
    categoryId: categories[2].id,
  },
];

// `TodoModel`からGraphQLの`Todo`型へ変換するヘルパー関数
const mapTodoModelToGraphQL = (todo: TodoModel): Todo => ({
  ...todo,
  status: todo.status,
  category: categories.find((category) => category.id === todo.categoryId),
});

// GraphQLのリゾルバ
const resolvers: Resolvers = {
  Query: {
    todos: () => todos.map(mapTodoModelToGraphQL),
    todo: (_, args) => {
      const todo = todos.find((todo) => todo.id === args.id);
      return todo ? mapTodoModelToGraphQL(todo) : null;
    },
    categories: () => categories,
  },
  Mutation: {
    addTodo: (_, args) => {
      const newTodo: TodoModel = {
        id: randomUUID(),
        content: args.content,
        status: TodoStatus.InProgress,
        categoryId: args.categoryId,
      };
      todos.push(newTodo);
      return mapTodoModelToGraphQL(newTodo);
    },
    updateTodo: (_, args) => {
      const todo = todos.find((todo) => todo.id === args.id);
      if (!todo) throw new Error("Todo not found");

      if (args.content != null) todo.content = args.content;
      if (args.status != null) todo.status = args.status;
      if (args.categoryId != null) todo.categoryId = args.categoryId;

      return mapTodoModelToGraphQL(todo);
    },
    deleteTodo: (_, args) => {
      const index = todos.findIndex((todo) => todo.id === args.id);
      if (index === -1) throw new Error("Todo not found");

      const [deletedTodo] = todos.splice(index, 1);
      return mapTodoModelToGraphQL(deletedTodo);
    },
    addCategory: (_, args) => {
      const newCategory: CategoryModel = {
        id: randomUUID(),
        name: args.name,
      };
      categories.push(newCategory);
      return newCategory;
    },
    cleanUp: () => {
      todos.splice(0, todos.length);
      categories.splice(0, categories.length);
      return true;
    },
  },
};

// GraphQLのスキーマをファイルから読み込み
const typeDefs = readFileSync("../../schema.graphql", { encoding: "utf-8" });

// Apollo Serverのセットアップ
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
