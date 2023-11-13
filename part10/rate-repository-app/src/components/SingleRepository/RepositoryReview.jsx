import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Elements/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  ratingContainer: {
    width: '25%',
    alignItems: 'center'
  },
  rating: {
    width: 40,
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  username: {
    fontWeight: theme.fontWeights.bold
  },
  textReview: {
    paddingTop: 5,
    width: '85%'
  },
});

const RepositoryReview = ({ review }) => {
  console.log(review);
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.node.rating}</Text>
      </View>
      <View>
        <Text style={styles.username}>{review.node.user.username}</Text>
        <Text>{new Date(review.node.createdAt).toLocaleDateString()}</Text>
        <View style={styles.textReview}>
          <Text>{review.node.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryReview;
