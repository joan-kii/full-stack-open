import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, { 
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network'
  });
  return { data, error, loading };
};

export default useSingleRepository;
