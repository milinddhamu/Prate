import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation CreateChat($userIds: [ID!]!) {
    createChat(userIds: $userIds) {
      _id
    }
  }
`