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
    signIn(email: String!, password: String!, role: String): String
    updateUserById(email: String, name: String, password: String!): User
    # admin role
    createUser(email: String!, name: String!, password: String!): User
    updateUser(id: String,email: String, name: String, password: String!): User
    deleteUser(id: String): User
  }
`;
