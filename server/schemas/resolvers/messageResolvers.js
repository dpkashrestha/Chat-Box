const { Message, Chat, User } = require("../../models/index");

const messageResolvers = {
  Query: {
    messages: async (parent, { chatId }) => {
      const messages = Message.find({ chat: chatId })
        .populate({
          path: "sender",
          select: ["username", "avatar"],
        })
        .populate({
          path: "chat",
          select: "chatName",
        });
      return messages;
    },
  },
  Mutation: {
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

module.exports = messageResolvers;
