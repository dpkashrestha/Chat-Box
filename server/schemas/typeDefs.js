const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    chats: [Chat]!
  }

  type Chat {
    _id: ID!
    chatName: String!
    users: [User]!
    messages: [Message]
  }

  type Message {
    _id: ID!
    content: String!
    sender: User!
    chat: Chat!
  }

  type Query {
    me: User
    users: [User]
    chats: [Chat]
    messages: [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addChat(chatName: String!, users: [User]!): Chat
    addMessage(content: String!): Message
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
