const { Chat, User } = require("../../models/index");

const chatResolvers = {
  Query: {
    allChats: async (parent, args, context) => {
      if (context.user) {
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
  },
  Mutation: {
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
  },
};

module.exports = chatResolvers;
