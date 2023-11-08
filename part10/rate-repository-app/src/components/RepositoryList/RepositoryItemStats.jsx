import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Elements/Text';

const styles = StyleSheet.create({
  statsGroup: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statsItem: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const RepositoryItemStats = ({ item }) => {
  return (
    <View style={styles.statsGroup}>
      <View style={styles.statsItem}>
        <Text
          style={styles.text}
          color="textPrimary"
          fontWeight="bold"
          fontSize="heading"
          >
          { item.stargazersCount >= 1000 ? `${(item.stargazersCount / 1000).toFixed(1)}k` : item.stargazersCount }
        </Text>
        <Text
          style={styles.text}
          color="textSecondary"
          >
          Stars
        </Text>
      </View>
      <View style={styles.statsItem}>
        <Text
          style={styles.text}
          color="textPrimary"
          fontWeight="bold"
          fontSize="heading"
          >
          { item.forksCount >= 1000 ? `${(item.forksCount / 1000).toFixed(1)}k` : item.forksCount }
        </Text>
        <Text
          style={styles.text}
          color="textSecondary"
          >
          Forks
        </Text>
      </View>
      <View style={styles.statsItem}>
        <Text
          style={styles.text}
          color="textPrimary"
          fontWeight="bold"
          fontSize="heading"
          >
          { item.reviewCount >= 1000 ? `${(item.reviewCount / 1000).toFixed(1)}k` : item.reviewCount }
        </Text>
        <Text
          style={styles.text}
          color="textSecondary"
          >
          Reviews
        </Text>
      </View>
      <View style={styles.statsItem}>
        <Text
          style={styles.text}
          color="textPrimary"
          fontWeight="bold"
          fontSize="heading"
          >
          { item.ratingAverage >= 1000 ? `${(item.ratingAverage / 1000).toFixed(1)}k` : item.ratingAverage }
        </Text>
        <Text
          style={styles.text}
          color="textSecondary"
          >
          Rating
        </Text>
      </View>
    </View>
  );
};

export default RepositoryItemStats;