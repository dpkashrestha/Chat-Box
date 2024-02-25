const { Chat, User } = require("../../models/index");
const { AuthenticationError } = require("../../utils/auth");

const chatResolvers = {
  Query: {
    allChats: async (parent, { chatName }, context) => {
      if (context.user) {
        if (chatName) {
          const chats = await Chat.find({
            $and: [
              { users: { _id: context.user._id } },
              { chatName: { $regex: chatName, $options: "i" } },
            ],
          })
            .populate({
              path: "lastMessage",
              select: ["content", "sender", "chat"],
              populate: { path: "sender", select: "username" },
            })
            .populate({
              path: "users",
              select: ["username", "email"],
            })
            .sort({ updatedAt: "desc" });
          return chats;
        }

        // find chats which contain a user with the current user's id
        const chats = await Chat.find({
          users: { _id: context.user._id },
        })
          .populate({
            path: "lastMessage",
            select: ["content", "sender", "chat"],
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
    singleChat: async (parent, { chatId }, context) => {
      const { groupAdmin } = await Chat.findById(chatId);

      const chat = await Chat.findById(
        chatId
        //don't include groupAdmin in users
      )
        .populate({
          path: "users",
          match: { _id: { $ne: groupAdmin } },
          select: ["username", "email"],
        })
        .populate({
          path: "groupAdmin",
          select: ["username", "email"],
        });
      return chat;
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
      const chat = (
        await Chat.create({ chatName, users, groupAdmin: me })
      ).populate({
        path: "users",
        select: ["username", "email"],
      });

      return chat;
    },
    editChat: async (parent, { chatId, chatName, users }, context) => {
      // creates a chat with the entered name and user array
      const { groupAdmin } = await Chat.findById(chatId);

      if (groupAdmin.toString() === context.user._id) {
        const me = await User.findById(context.user._id, {
          __v: false,
          createdAt: false,
          updatedAt: false,
          password: false,
        });
        // adds current user to array of users
        users.push(me);
        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          { chatName, users },
          { new: true }
        )
          .populate({
            path: "users",
            select: ["username", "email"],
          })
          .populate({
            path: "groupAdmin",
            select: ["username", "email"],
          });

        console.log(updatedChat.users.length);
        if (updatedChat.users.length >= 1) {
          const deletedChat = await Chat.findByIdAndDelete(chatId);
          console.log("Deleted", deletedChat.chatName);
          return updatedChat;
        }

        return updatedChat;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = chatResolvers;
