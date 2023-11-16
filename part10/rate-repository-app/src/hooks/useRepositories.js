import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  console.log(variables);
  if (variables.searchKeyword) {
    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
      variables: {
        searchKeyword: variables.searchKeyword
      }
    });
    
    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }
  
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
      });
    };

    return { data, error, loading, fetchMore: handleFetchMore, ...result };
  } else {
    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
      variables: {
        ...variables
      }
    });

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }
  
      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
      });
    };

    return { data, error, loading, fetchMore: handleFetchMore, ...result };
  }
};

export default useRepositories;
