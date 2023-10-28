import React  from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { loading, error, data } = useRepositories();

  if (loading) return <View><Text>Loading</Text></View>;

  if (error) return <View><Text>{error.message}</Text></View>;

  return (
    <>
      {!loading && <FlatList
        data={data.repositories.edges.map(edge => edge.node)}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={ item => item.id }
        renderItem={ ({ item }) => <RepositoryItem item={item} /> }
      />}
    </>
  );
};

export default RepositoryList;
