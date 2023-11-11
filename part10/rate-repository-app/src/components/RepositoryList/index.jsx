import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from '../ItemSeparator';
import Text from '../Elements/Text';
import useRepositories from '../../hooks/useRepositories';

const optionsDefault = {
  orderBy: 'CREATED_AT',
  orderDirection: 'DESC'
};
const optionsAscRating = {
  orderBy: 'RATING_AVERAGE',
  orderDirection: 'ASC'
};
const optionsDescRating = {
  orderBy: 'RATING_AVERAGE',
  orderDirection: 'DESC'
};

const OrderPicker = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <Picker 
      selectedValue={selectedOrder}
      onValueChange={(itemValue) =>
        setSelectedOrder(itemValue)
      }>
      <Picker.Item
        label="Latest repositories"
        value={optionsDefault} />
      <Picker.Item
        label="Highest rated repositories"
        value={optionsDescRating} />
      <Picker.Item
        label="Lowest rated repositories"
        value={optionsAscRating} />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={<OrderPicker
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={ item => item.id }
      renderItem={ ({ item }) => <RepositoryItem item={item} isSingleRepo={false} /> }
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(optionsDefault)
  const { loading, error, data } = useRepositories(selectedOrder);

  if (loading) return <View><Text>Loading</Text></View>;
  if (error) return <View><Text>{error.message}</Text></View>;

  return <RepositoryListContainer
    repositories={data.repositories}
    selectedOrder={selectedOrder}
    setSelectedOrder={setSelectedOrder}
  />;
};

export default RepositoryList;
