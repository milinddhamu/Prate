import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { offsetLimitPagination } from "@apollo/client/utilities";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJwbm9vaDZyOTY0bCIsImFub255bW91cyI6dHJ1ZSwiaWF0IjoxNzEwOTk0NDUyLCJleHAiOjE3MTEwODA4NTJ9.-rJXr7qiV51agiyP0yLL0kD2Y4ZzsjaBBw6xSQncLdk";

const httpLink = new HttpLink({
  uri:process.env.NEXT_PUBLIC_HTTP_LINK 
});

const wsLink = new GraphQLWsLink(createClient({
  url:process.env.NEXT_PUBLIC_WSS_LINK,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
        getChat:{
          fields: {
            messages:{
              merge(existing = [], incoming) {
                return [...existing, ...incoming];  
              }
            }
          },
        },
      },
    },
  });

export const client = new ApolloClient({
  link: splitLink, // replace with your GraphQL server URI
  cache: cache,
  headers:{
    authorization: `Bearer ${token}`,
  }
});
