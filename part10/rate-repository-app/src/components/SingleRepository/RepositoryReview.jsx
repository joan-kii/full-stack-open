import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Elements/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  rating: {
    color: theme.colors.primary
  }
});

const RepositoryReview = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <Text>{review.node.rating}</Text>
      <View>
        <Text>{review.node.username}</Text>
        <Text>{review.node.createdAt}</Text>
        <Text>{review.node.text}</Text>
      </View>
    </View>
  );
};

export default RepositoryReview;
