import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { readFileSync } from "fs";
import { Book } from "./__generated__/resolvers-types";
import { Resolvers } from "./__generated__/resolvers-types";

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
};

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  dataSources: {
    books: Book[];
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    dataSources: {
      books,
    },
  }),
});

console.log(`🚀  Server ready at: ${url}`);

// 以下のコマンドでクエリを送信できる
// curl -X POST http://localhost:4000/ \
//   -H "Content-Type: application/json" \
//   -d '{ "query": "query ExampleQuery { books { author title } }" }'
