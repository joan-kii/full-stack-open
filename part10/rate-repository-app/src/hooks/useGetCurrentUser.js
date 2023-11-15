import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useGetCurrentUser = (includeReviews) => {
  if (includeReviews) {
    const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, { 
      variables: { includeReviews }
    });
    
    return { data, error, loading, refetch };
  } else {
    const { data, error, loading } = useQuery(GET_CURRENT_USER);
    
    return { data, error, loading };
  }
};

export default useGetCurrentUser;
