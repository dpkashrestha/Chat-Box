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
chats {
  _id
  chatName
  users {
    _id
    username
    email
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
  query messages(chatId: $chatId) {
    _id
    content
    sender {
      _id
      username
      email
    }
    chat {
      _id
      chatName
      users {
        _id
        username
        email
      }
    }
  }
`;
