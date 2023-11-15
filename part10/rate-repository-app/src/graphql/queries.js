import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
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

export const GET_CURRENT_USER = gql`
  query Me($includeReviews: Boolean = false){
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            rating
            text
            id
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
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
