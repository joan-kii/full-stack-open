import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        cursor
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
      pageInfo {
        endCursor
        hasNextPage
        startCursor
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
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        edges {
          cursor
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
        pageInfo {
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
