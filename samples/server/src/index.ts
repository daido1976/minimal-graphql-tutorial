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
  status: string;
  categoryId: string;
};

// データ格納用の配列
const todos: TodoModel[] = [];
const categories: CategoryModel[] = [];

// `TodoModel`からGraphQLの`Todo`型へ変換するヘルパー関数
const mapTodoModelToGraphQL = (todo: TodoModel): Todo => ({
  ...todo,
  status: todo.status as TodoStatus,
  category: categories.find((category) => category.id === todo.categoryId),
});

// `CategoryModel`からGraphQLの`Category`型への変換（必要に応じて使用）
const mapCategoryModelToGraphQL = (category: CategoryModel): Category => ({
  ...category,
});

// GraphQLのリゾルバ
const resolvers: Resolvers = {
  Query: {
    todos: () => todos.map(mapTodoModelToGraphQL),
    todo: (_, args) => {
      const todo = todos.find((todo) => todo.id === args.id);
      return todo ? mapTodoModelToGraphQL(todo) : null;
    },
    categories: () => categories.map(mapCategoryModelToGraphQL),
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
      if (args.status != null) todo.status = args.status as string;
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
      return mapCategoryModelToGraphQL(newCategory);
    },
  },
  Todo: {
    category: (todo) =>
      categories.find(
        (category) => category.id === (todo as TodoModel).categoryId
      ) || null,
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
