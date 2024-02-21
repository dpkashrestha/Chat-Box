const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    chats: [Chat]
  }

  type Chat {
    _id: ID!
    chatName: String!
    users: [User]!
    messages: [Message]
  }

  type Query {
    me: User
    users: [User]
    getChats: [Chat]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createChat(chatName: String!, users: [User]!): Chat
    getChats: [Chat]!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
