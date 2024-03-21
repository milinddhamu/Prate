import { gql } from '@apollo/client';

export const UPSERT_USER = gql`
  mutation upsertUser($input: UserInput!) {
    upsertUser(input: $input) {
      _id
      email
      name
    }
  }
`