const express = require("express");
const { ApolloServer } = require("apollo-server-express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

const connectDB = require("./config/db");
connectDB();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Use the Express application as middleware in Apollo server
const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  
  server.applyMiddleware({ app });
  
  app.get("/", (req, res) => res.send("API Running"));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

startServer();

