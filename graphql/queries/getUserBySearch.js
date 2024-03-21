import { gql } from '@apollo/client';

export const GET_USER_BY_SEARCH = gql`
query GetUserBySearch($searchString: String!, $limit: Int!, $currentUserId: String!) {
  getUserBySearch(searchString: $searchString, limit: $limit, currentUserId: $currentUserId) {
    _id
    name
    email
    image
    isFriend
    isRequestSent
    hasIncomingRequest
  }
}
`