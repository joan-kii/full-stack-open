import React from 'react';
import { View, FlatList } from 'react-native';

import Text from '../Elements/Text';
import ItemSeparator from '../ItemSeparator';
import RepositoryReview from '../SingleRepository/RepositoryReview';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';

const MyReviews = () => {
  const {
    error,
    user,
    loading,
    refetch
  } = useGetCurrentUser({ includeReviews: true });

  if (error) return <View><Text>{error.message}</Text></View>;
  if (loading) return <View><Text>Loading...</Text></View>;
  
  const reviewNodes = user.reviews
  ? user.reviews.edges.map((review) => {
    return  review;
  })
  : [];

  return (
    <FlatList
      data={reviewNodes}
      extraData={user.reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(review) => review.node.id}
      renderItem={({ item }) => {
        return (
          <RepositoryReview
            review={item} 
            isUserReview={true}
            refetch={refetch}
          />
          )
        }
      }
    />
  );
};

export default MyReviews;
