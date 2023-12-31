import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from '../ItemSeparator';
import SearchBar from './SearchBar';
import OrderPicker from './OrderPicker';
import Text from '../Elements/Text';
import useRepositories from '../../hooks/useRepositories';

const optionsDefault = {
  orderBy: 'CREATED_AT',
  orderDirection: 'DESC'
};
const optionsKeyword = {
  searchKeyword: ''
};

export const RepositoryListContainer = ({ 
  error,
  loading,
  repositories,
  onEndReach
}) => {
  if (error) return <View><Text>{error.message}</Text></View>;
  if (loading) return <View><Text>Loading...</Text></View>;

  const repositoryNodes = repositories
  ? repositories.edges.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} isSingleRepo={false} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [options, setOptions] = useState(optionsDefault)
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 500);
  optionsKeyword.searchKeyword = debouncedKeyword;

  const onChangeKeyword = (query) => {
    if (query) {
      setKeyword(query);
      setOptions(optionsKeyword);
    } else {
      setOptions(optionsDefault)
    }
  };

  const { loading, error, repositories, fetchMore } = useRepositories({
    ...options,
    first: 2
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <>
      <SearchBar
        onChangeKeyword={onChangeKeyword}
        keyword={keyword}
      />
      <OrderPicker
        selectedOrder={options}
        setSelectedOrder={setOptions}
        optionsDefault={optionsDefault}
      />
      <RepositoryListContainer
        loading={loading}
        error={error}
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </>
  );
};

export default RepositoryList;
