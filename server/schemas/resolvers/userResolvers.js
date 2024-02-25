const { User } = require("../../models/index");
const { signToken, AuthenticationError } = require("../../utils/auth");

const userResolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        return user;
      }

      throw AuthenticationError;
    },
    users: async (parent, { userSearch }, context) => {
      const users = await User.find(
        userSearch
          ? {
              // if userSearch exists finds users that match the search
              $or: [
                { username: { $regex: userSearch, $options: "i" } },
                { email: { $regex: userSearch, $options: "i" } },
              ],
            }
          : // otherwise find all users
            {},
        // do not return password, createdAt, or updatedAt
        {
          password: false,
          createdAt: false,
          updatedAt: false,
        }
      ).find({
        // finds users that do not have current user id
        _id: { $ne: context.user._id },
      });

      return users;
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
    addUserAvatar: async (parent, { userId, avatar }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw AuthenticationError;
        }
        user.avatar = avatar;
        const savedUser = await user.save();

        return savedUser;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
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
  },
};

module.exports = userResolvers;
