import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        avatar
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_USER_AVATAR = gql`
  mutation addUserAvatar($userId: ID!, $avatar: String!) {
    addUserAvatar(userId: $userId, avatar: $avatar) {
      _id
      username
      email
      avatar
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($chatName: String!, $users: [UserInput]!) {
    addChat(chatName: $chatName, users: $users) {
      _id
      chatName
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($content: String!, $chatId: ID!) {
    addMessage(content: $content, chatId: $chatId) {
      _id
      content
      sender {
        _id
        username
      }
    }
  }
`;
