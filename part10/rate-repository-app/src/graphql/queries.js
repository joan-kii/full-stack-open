import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          stargazersCount
          reviewCount
          ratingAverage
          id
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
