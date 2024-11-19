import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import {
  Category,
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
  title: string;
  description?: string;
  status: TodoStatus;
  categoryId: string;
};

// データ格納用の配列
const todos: TodoModel[] = [
  {
    id: "1",
    title: "Create a sample project",
    description: "Create a sample project using Apollo Server",
    status: TodoStatus.Pending,
    categoryId: "1",
  },
  {
    id: "2",
    title: "Write a blog post",
    description: "Write a blog post about Apollo Server",
    status: TodoStatus.Pending,
    categoryId: "2",
  },
  {
    id: "3",
    title: "Deploy to the cloud",
    description: "Deploy the project to the cloud",
    status: TodoStatus.Pending,
    categoryId: "3",
  },
];
const categories: CategoryModel[] = [
  { id: "1", name: "Development" },
  { id: "2", name: "Writing" },
  { id: "3", name: "Deployment" },
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
        id: (todos.length + 1).toString(),
        title: args.title,
        description: args.description ?? undefined,
        status: TodoStatus.Pending,
        categoryId: args.categoryId,
      };
      todos.push(newTodo);
      return mapTodoModelToGraphQL(newTodo);
    },
    updateTodo: (_, args) => {
      const todo = todos.find((todo) => todo.id === args.id);
      if (!todo) throw new Error("Todo not found");

      if (args.title != null) todo.title = args.title;
      if (args.description != null)
        todo.description = args.description ?? undefined;
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
        id: (categories.length + 1).toString(),
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
