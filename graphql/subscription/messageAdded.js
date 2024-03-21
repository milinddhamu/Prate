import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($chatId: ID!, $userId: ID!) {
    messageAdded(chatId: $chatId, userId: $userId) {
      _id
      owner
      text
      timestamp
    }
  }
`