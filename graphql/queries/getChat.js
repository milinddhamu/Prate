import { gql } from "@apollo/client";

export const GET_CHAT = gql`
  query GetChat($input: GetChatInput!, $limit: Int, $offset: Int) {
    getChat(input: $input, limit: $limit, offset: $offset) {
      _id
      users {
        _id
        email
        image
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
`;