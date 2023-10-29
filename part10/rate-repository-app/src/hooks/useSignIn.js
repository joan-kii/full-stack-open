import { useMutation } from '@apollo/client';

import { AUTHENTICATE_USER } from '../graphql/mutations';

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE_USER);

  const signIn = async ({ username, password }) => {
    const data = authenticate({ variables: { credentials: { username, password }}});
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
