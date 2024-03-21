import { gql } from "@apollo/client";

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($requestId: ID!, $userId: ID!) {
    acceptFriendRequest(requestId: $requestId, userId: $userId) {
      message
      success
    }
  }
`