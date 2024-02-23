const { User, Chat, Message } = require("../models/index");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      }

      throw AuthenticationError;
    },
    users: async (parent, args) => {
      //find all users
      const users = await User.find({});

      return users;
    },
    chats: async (parent, args, context) => {
      if (context.user) {
        /* const user = await User.findById(context.user._id); */

        // find chats which contain a user with the current user's id
        const chats = await Chat.find({ "users._id": context.user._id });
        return chats;
      }

      throw AuthenticationError;
    },
    messages: async (parent, { chatId }) => {
      const messages = Message.find({ chat: chatId });
      return messages;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addChat: async (parent, { chatName, users }, context) => {
      // find current user by id
      const me = await User.findById(context.user._id, {
        __v: false,
        createdAt: false,
        updatedAt: false,
        password: false,
      });
      // adds current user to array of users
      users.push(me);
      // creates a chat with the entered name and user array
      console.log(users);
      const chat = (await Chat.create({ chatName, users })).populate("users");

      return chat;
    },
    addMessage: async (parent, { content, chatId }) => {
      const chat = await Chat.findById(chatId);

      // adds current user and chat to message
      const newMessage = {
        sender: context.user._id,
        content,
        chat,
      };

      const message = await Message.create(newMessage);

      return message;
    },
  },
};

module.exports = resolvers;
