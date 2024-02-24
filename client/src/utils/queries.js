import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_CHATS = gql`
  query allChats($chatName: String) {
    #chatName is optional
    allChats(chatName: $chatName) {
      _id
      chatName
      users {
        _id
        username
      }
      lastMessage {
        _id
        content
        sender {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      content
      sender {
        username
      }
      createdAt
    }
  }
`;
