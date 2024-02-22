const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
  }

  input UserInput {
    _id: ID!
    username: String!
    email: String!
  }

  type Chat {
    _id: ID!
    chatName: String!
    users: [User]!
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
    messages(chatId: ID!): [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addChat(chatName: String!, users: [UserInput]!): Chat
    addMessage(content: String!, chatId: ID!): Message
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
