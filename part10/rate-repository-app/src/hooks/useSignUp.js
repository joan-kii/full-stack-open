import { useMutation, useApolloClient } from '@apollo/client';

import { CREATE_USER, AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [createUser] = useMutation(CREATE_USER);
  const [authenticate, result] = useMutation(AUTHENTICATE_USER);

  const signUp = async (values) => {
    await createUser({ variables: { user: { username: values.username, password: values.password }}});
    const { data } = await authenticate({ variables: { credentials: { username: values.username, password: values.password } }});
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    
    return data;
  };

  return [signUp, result];
};

export default useSignUp;
