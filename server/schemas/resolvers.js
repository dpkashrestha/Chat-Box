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
    users: async (parent, { userSearch }, context) => {
      //find all users
      console.log(userSearch);
      const users = await User.find(
        userSearch
          ? {
              $or: [
                { username: { $regex: userSearch, $options: "i" } },
                { email: { $regex: userSearch, $options: "i" } },
              ],
            }
          : {},
        {
          password: false,
          createdAt: false,
          updatedAt: false,
        }
      ).find({ _id: { $ne: context.user._id } });

      return users;
    },
    chats: async (parent, args, context) => {
      if (context.user) {
        /* const user = await User.findById(context.user._id); */

        // find chats which contain a user with the current user's id
        const chats = await Chat.find({
          users: { _id: context.user._id },
        })
          .populate({
            path: "lastMessage",
            select: ["content", "sender"],
            populate: { path: "sender", select: "username" },
          })
          .populate({
            path: "users",
            select: ["username", "email"],
          })
          .sort({ updatedAt: "desc" });
        return chats;
      }

      throw AuthenticationError;
    },
    messages: async (parent, { chatId }) => {
      const messages = Message.find({ chat: chatId })
        .populate({
          path: "sender",
          select: "username",
        })
        .populate({
          path: "chat",
          select: "chatName",
        });
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
      const chat = (await Chat.create({ chatName, users })).populate({
        path: "users",
        select: ["username", "email"],
      });

      return chat;
    },
    addMessage: async (parent, { content, chatId }, context) => {
      const chat = await Chat.findById(chatId);
      const sender = await User.findById(context.user._id, {
        password: false,
        createdAt: false,
        updatedAt: false,
      });
      // adds current user and chat to message
      const newMessage = {
        sender,
        content,
        chat,
      };

      const message = await Message.create(newMessage);
      await Chat.findByIdAndUpdate(chatId, {
        lastMessage: message,
      });

      return message;
    },
  },
};

module.exports = resolvers;
