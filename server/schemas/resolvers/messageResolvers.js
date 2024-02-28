const { Message, Chat, User } = require("../../models/index");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
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
      pubsub.publish("ADD_MESSAGE", { messageCreated: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(["ADD_MESSAGE"]),
    },
  },
  /* Subscription: {
    hello: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ["Hello", "Bonjour", "Ciao"]) {
          yield { hello: word };
        }
      },
    },
    postCreated: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    },
  }, */
};

module.exports = messageResolvers;
