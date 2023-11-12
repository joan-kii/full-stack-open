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

export class RepositoryListContainer extends React.Component {
  renderHeader(props) {
    return (
      <>
        <SearchBar
          onChangeKeyword={props.onChangeKeyword}
          debouncedKeyword={props.debouncedKeyword}
        />
        <OrderPicker
          selectedOrder={props.selectedOrder}
          setSelectedOrder={props.setSelectedOrder}
          optionsDefault={optionsDefault}
        />
      </>
    );
  }

  render() {
    const repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader(this.props)}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RepositoryItem item={item} isSingleRepo={false} />}
      />
    );
  }
}

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

  if (error) return <View><Text>{error.message}</Text></View>;
  if (loading) return <View><Text>Loading...</Text></View>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      selectedOrder={options}
      setSelectedOrder={setOptions}
      debouncedKeyword={debouncedKeyword}
      onChangeKeyword={onChangeKeyword}
    />
  );
};

export default RepositoryList;
