import { useMutation, useApolloClient } from '@apollo/client';

import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [authenticate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async (values) => {
    const { data } = await authenticate({ variables: { credentials: values }});
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
