import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  headerItem: {
    padding: 15,
    flexDirection: 'row'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5
  },
  textHeaderItem: {
    width: 300
  },
  text: {
    marginBottom: 5
  },
  language: {
    alignSelf: 'flex-start',
    padding: 6,
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 3
  },
});

const RepositoryItemHeader = ({ item }) => {
  return (
    <View style={styles.headerItem}>
      <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.textHeaderItem}>
        <Text
          style={styles.text}
          color="textPrimary"
          fontWeight="bold"
          fontSize="heading"
          >
          { item.fullName }
        </Text>
        <Text
          style={styles.text}
          color="textSecondary"
          fontSize="subheading"
          >
          { item.description }
        </Text>
        <Text
          style={styles.language}
          fontWeight="bold"
          >
          { item.language }
        </Text>
      </View>
    </View>
  );
};

export default RepositoryItemHeader;
