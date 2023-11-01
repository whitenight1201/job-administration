const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    hello: String
    welcome(name: String!): String
  }

  extend type Mutation {
    signUp(
      email: String!
      name: String!
      password: String!
    ): String
  }
`;
