import React from 'react';
import { View, Text } from 'react-native';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Fullname: { item.fullName }</Text>
      <Text>Description: { item.description }</Text>
      <Text>Language: { item.language }</Text>
      <Text>Stars: { item.stargazesCount }</Text>
      <Text>Forks: { item.forksCount }</Text>
      <Text>Reviews: { item.reviewCount }</Text>
      <Text>Rating: { item.ratingAverage }</Text>
    </View>
  );
};

export default RepositoryItem;
