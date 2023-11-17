import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useGetCurrentUser = (variables) => {
    const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, { 
      variables: { ...variables },
    });
    
    return { user: data?.me, error, loading, refetch };
};

export default useGetCurrentUser;
