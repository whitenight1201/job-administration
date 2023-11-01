const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    hello: String
    welcome(name: String!): String
  }

  type Mutation {
    signUp(
      email: String!
      name: String!
      password: String!
    ): String
    signIn(
      email: String!
      password: String!
    ): String
  }
`;
