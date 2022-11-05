const express = require("express");
// Apollo server
const { ApolloServer } = require("apollo-server-express");

// Path
const fs = require("fs");
const path = require("path");

// Graphql
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { GraphQLJSON } = require("graphql-type-json")

const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const { ApolloServerPluginInlineTrace } = require("apollo-server-core");

// Types Resolvers
const resolvers = {
  Upload: GraphQLUpload,
  Object: GraphQLJSON,
  Query,
  Mutation,
};

/**
 * Start Apollo Server.
 * @return {Null} Not return.
 */
async function startServer() {
  const server = new ApolloServer({
    typeDefs: [
      fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
      fs.readFileSync(path.join(__dirname, "schemaResponses.graphql"), "utf8"),
    ],
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()],
    context: async ({ req }) => {
      return {
        ...req,
      };
    },
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer()
