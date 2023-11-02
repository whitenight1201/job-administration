const { ApolloError, AuthenticationError } = require("apollo-server-express");
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

      if (user) throw new AuthenticationError("User already exist");

      user = new User({
        email,
        name,
        password: await bcrypt.hash(password, 10),
        role: "isguest",
      });

      await user.save();

      return jsonwebtoken.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" }
      );
    },
    signIn: async (root, args, context, info) => {
      const { email, password, role } = args;
      const user = await User.findOne({ email });

      if (!user) throw new AuthenticationError("No user with that email");

      if (!user.role.includes("isadmin") && user.role !== role)
        throw new AuthenticationError(
          "Nice try,You can't access that role. 😕"
        );

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new AuthenticationError("Incorrect password");

      return jsonwebtoken.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" }
      );
    },
    createUser: async (root, args, context, info) => {
      if (!context.user.role.includes("isadmin"))
        throw new AuthenticationError(
          "Nice try,You can't access that role. 😕"
        );

      const { email, name, password } = args;
      if (await User.findOne({ email }))
        throw new AuthenticationError("User already exist.");

      const newuser = new User({
        email,
        name,
        password: await bcrypt.hash(password, 10),
        role: "isguest",
      });
      await newuser.save();
      return newuser;
    },
    updateUserById: async (root, args, context, info) => {
      const { email, name, password } = args;
      const updateUser = {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      };

      const result = await User.findOneAndUpdate(
        { _id: context.user.id },
        { $set: updateUser },
        { new: true }
      );
      return result;
    },
    updateUser: async (root, args, context, info) => {
      if (!context.user.role.includes("isadmin"))
        throw new AuthenticationError(
          "Nice try,You can't access that role. 😕"
        );

      const { id, email, name, password } = args;
      const updateUser = {
        email,
        name,
        password: await bcrypt.hash(password, 10),
      };

      const result = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateUser },
        { new: true }
      );
      return result;
    },
    deleteUser: async (root, args, context, info) => {
      if (!context.user.role.includes("isadmin"))
        throw new AuthenticationError(
          "Nice try,You can't access that role. 😕"
        );

      const { id } = args;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error(`User with ID ${id} not found`);
      }
      return deletedUser;
    },
  },
};
