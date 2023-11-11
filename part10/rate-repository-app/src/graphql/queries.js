import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          createdAt
          ratingAverage
          description
          forksCount
          fullName
          language
          stargazersCount
          reviewCount
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

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      description
      forksCount
      language
      ownerAvatarUrl
      stargazersCount
      reviewCount
      ratingAverage
      reviews {
        edges {
          node {
            id
            rating
            text
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
