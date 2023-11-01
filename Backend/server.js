const express = require("express");
const { ApolloServer } = require("apollo-server-express");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

const connectDB = require("./config/db");

const typeDefs = require("./graphql/schemas/schemas");
const resolvers = require("./graphql/resolvers/resolver");

// Use the Express application as middleware in Apollo server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  await connectDB();

  server.applyMiddleware({ app, path: "/graphql" });
}
startServer();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`GraphQl Server Running here 👉 http://localhost:${PORT}/graphql`)
);
