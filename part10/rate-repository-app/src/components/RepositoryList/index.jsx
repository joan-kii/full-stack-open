import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

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
const optionsKeyword = {
  searchKeyword: ''
};

const searchStyle = {
  backgroundColor: 'white',
  width: '85%',
  marginTop: 10,
  marginLeft: 30,
  alignItems: 'center'
};

const OrderPicker = ({
  selectedOrder,
  setSelectedOrder,
  debouncedKeyword,
  onChangeKeyword
}) => {
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeKeyword}
        value={debouncedKeyword}
        style={searchStyle}
      />
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
    </>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  debouncedKeyword,
  onChangeKeyword
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
        debouncedKeyword={debouncedKeyword}
        onChangeKeyword={onChangeKeyword}
        />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={ item => item.id }
      renderItem={ ({ item }) => <RepositoryItem item={item} isSingleRepo={false} /> }
    />
  );
};

const RepositoryList = () => {
  const [options, setOptions] = useState(optionsDefault)
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 500);
  const onChangeKeyword = (query) => {
    setKeyword(query);
    optionsKeyword.searchKeyword = debouncedKeyword;
    setOptions(optionsKeyword);
  };
  const { loading, error, data } = useRepositories(options);

  if (loading) return <View><Text>Loading</Text></View>;
  if (error) return <View><Text>{error.message}</Text></View>;

  return <RepositoryListContainer
    repositories={data.repositories}
    selectedOrder={options}
    setSelectedOrder={setOptions}
    debouncedKeyword={debouncedKeyword}
    onChangeKeyword={onChangeKeyword}
  />;
};

export default RepositoryList;
