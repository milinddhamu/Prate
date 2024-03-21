import { gql } from "@apollo/client"

export const GET_FRIENDS = gql`
  query GetFriends($userId: ID!) {
    getFriends(userId: $userId) {
      _id
      email
      name
      image
    }
  }
`