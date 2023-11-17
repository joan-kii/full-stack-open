import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, { 
    variables: { ...variables },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  
  return {
    repository: data?.repository,
    error,
    loading,
    fetchMore: handleFetchMore
  };
};

export default useSingleRepository;
