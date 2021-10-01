import { ApolloServer, ApolloServerExpressConfig, makeExecutableSchema } from "apollo-server-express";
import express from "express";
import { applyMiddleware } from "graphql-middleware";
import { createServer } from "http";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import resolvers from "./graphql/resolvers";

import { getUserId } from "./utils/token.utils";

const app = express();


const schemaArray = fileLoader(path.join(__dirname, "./graphql/schema/"));
const typeDefs = mergeTypes(schemaArray);

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
    // schemaDirectives: {}
  })
);

const httpServer = createServer(app);
const config: ApolloServerExpressConfig = {
  schema,
  context: async ctx => {
    const acessToken = ctx.req.headers.authorization;
    if (acessToken) {
      const { userId } = getUserId(acessToken);
      return { ...ctx, userId };
    }
    return { ...ctx };
  }
  // subscriptions: { path: "/subscriptions" }
};

const server = new ApolloServer(config);
server.installSubscriptionHandlers(httpServer);

createConnection()
  .then(async () => {
    console.info("Postgres Connected!!");
    app.use("/graphql", express.json(), );
    server.applyMiddleware({ app, path: server.graphqlPath });

    httpServer.listen({ port: 5000 }, async () => {
      console.info({ filename: "index.ts" }, `Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  })
  .catch(error => console.error(error));
