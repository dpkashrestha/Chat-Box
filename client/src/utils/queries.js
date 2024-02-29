import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query {
    me {
      _id
      username
      email
      avatar
    }
  }
`;

export const QUERY_USERS = gql`
  query Users($userSearch: String) {
    users(userSearch: $userSearch) {
      _id
      username
      email
      avatar
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
        avatar
      }
      lastMessage {
        _id
        content
        sender {
          _id
          username
          avatar
        }
        createdAt
      }
      groupAdmin {
        _id
      }
    }
  }
`;

export const SINGLE_CHAT = gql`
  query singleChat($chatId: ID!) {
    singleChat(chatId: $chatId) {
      _id
      chatName
      users {
        _id
        username
        avatar
      }
      lastMessage {
        _id
        content
        sender {
          _id
          username
          avatar
        }
        createdAt
      }
      groupAdmin {
        _id
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages($chatId: ID!) {
    messages(chatId: $chatId) {
      _id
      content
      sender {
        _id
        username
        avatar
      }
      createdAt
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessageAdded($user: UserInput!) {
    messageAdded(user: $user) {
      _id
      content
      chat {
        _id
      }
      sender {
        _id
        username
        avatar
      }
      createdAt
    }
  }
`;
