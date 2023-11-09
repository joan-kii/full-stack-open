import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, { 
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id }
  });
  console.log(data, error, loading);
  return { data, error, loading };
};

export default useSingleRepository;
