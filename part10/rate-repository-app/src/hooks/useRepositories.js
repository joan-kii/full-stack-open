import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (options) => {

  if (options.searchKeyword) {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      variables: {
        searchKeyword: options.searchKeyword
      }
    })
    return { data, error, loading };
  } else {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      variables: {
        orderDirection: options.orderDirection,
        orderBy: options.orderBy
      }
    })
    return { data, error, loading };
  }
};

export default useRepositories;
