import React from 'react';
import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-dom';

import RepositoryInfo from './RepositoryInfo';
import RepositoryReview from './RepositoryReview';
import ItemSeparator from '../ItemSeparator';
import useSingleRepository from '../../hooks/useSingleRepository';
import Text from '../Elements/Text';

const SingleRepository = () => {
  const { id } = useParams();
  const { error, data, loading } = useSingleRepository(id);

  if (loading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Something went wrong...</Text></View>;

  const { reviews, ...repo } = data.repository;

  return (
    <FlatList
      data={reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryReview review={item} isUserReview={false} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repo={repo} />}
    />
  );
};

export default SingleRepository;
