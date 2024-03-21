import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query GetRequests($userId: ID!) {
    getRequests(userId: $userId) {
      _id
      name
      email
      image
    }
  }
`