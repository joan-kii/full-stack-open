import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [authenticate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (values) => {
    const { data } = await authenticate({ variables: { review: values }});
    
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
