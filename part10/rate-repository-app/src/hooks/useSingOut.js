import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client';

import useAuthStorage from './useAuthStorage';
import { CURRENT_USER } from '../graphql/queries';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    const { data } = useQuery(CURRENT_USER, { fetchPolicy: 'cache-and-network' });
    
    console.log(data);
    if (!data) return true;
  };

  return [signOut];
};

export default useSignOut;
