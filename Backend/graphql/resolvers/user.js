const { ApolloError } = require("apollo-server-express");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  Query: {
    hello: () => "hi",
    users: async (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      return await User.find();
    },
    user: async (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      return await User.findOne({ _id: user.id });
    },
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      const { email, name, password } = args;
      let user = await User.findOne({ email });

      if (user)
        throw new ApolloError("User already exist.", "USER_ALREADY_EXIST");

      user = new User({
        email,
        name,
        password: await bcrypt.hash(password, 10),
      });

      await user.save();

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" }
      );
    },
    signIn: async (root, args, context, info) => {
      const { email, password } = args;
      const user = await User.findOne({ email });

      if (!user)
        throw new ApolloError("No user with that email", "USER_NOT_EXIST");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        throw new ApolloError("Incorrect password", "PASSWORD_INCORRECT");

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" }
      );
    },
  },
};
