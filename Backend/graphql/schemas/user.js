const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: String!
    name: String!
    email: String!
  }

  type Query {
    hello: String
    users: [User]
    user: User
  }

  type Mutation {
    signUp(email: String!, name: String!, password: String!): String
    signIn(email: String!, password: String!): String
  }
`;
