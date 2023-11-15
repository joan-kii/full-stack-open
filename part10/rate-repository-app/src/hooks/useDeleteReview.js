import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = ({ deleteReviewId }) => {
  const [handleDelete, result] = useMutation(DELETE_REVIEW);

  const deleteReview = (deleteReviewId) => {
    const { data } = handleDelete({ variables: deleteReviewId});
    
    return data;
  };

  return [deleteReview, result];

  return deleted;
};

export default useDeleteReview;
