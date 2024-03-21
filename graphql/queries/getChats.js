import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query GetChats($userId: ID!) {
    getChats(userId: $userId) {
      _id
      users {
        _id
        image
        email
        name
      }
      messages {
        _id
        text
        owner
        timestamp
      }
    }
  }
`