import { gql } from "@apollo/client";

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($senderId: ID!, $receiverId: ID!) {
    sendFriendRequest(senderId: $senderId, receiverId: $receiverId) {
      user {
      _id
      isFriend
      isRequestSent  
      }
      errorMessage
    }
  }
`