import { gql } from "@apollo/client";

export const DELETE_FRIEND_REQUEST = gql`
  mutation DeleteFriendRequest($requestId: ID!, $userId: ID!) {
    deleteFriendRequest(requestId: $requestId, userId: $userId) {
      message
      success
    }
  }
`