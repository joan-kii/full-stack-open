import React from 'react';
import { View, StyleSheet } from 'react-native';

import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemStats from './RepositoryItemStats';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.card} testID="repositoryItem">
      <RepositoryItemHeader item={item} />
      <RepositoryItemStats item={item} />
    </View>
  );
};

export default RepositoryItem;
