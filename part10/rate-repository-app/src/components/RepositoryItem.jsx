import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import RepositoryItemHeader from './RepositoryItemHeader';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <RepositoryItemHeader item={item} />
      <Text>Stars: { item.stargazersCount }</Text>
      <Text>Forks: { item.forksCount }</Text>
      <Text>Reviews: { item.reviewCount }</Text>
      <Text>Rating: { item.ratingAverage }</Text>
    </View>
  );
};

export default RepositoryItem;
