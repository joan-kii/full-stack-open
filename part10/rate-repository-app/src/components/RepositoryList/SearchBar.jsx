import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';

const styles = {
  searchBar: {
    backgroundColor: 'white',
    marginHorizontal: '8%'
  },
  searchComponent: {
    marginTop: 10,
  }
};

const SearchBar = ({ onChangeKeyword, keyword }) => {
  return (
    <View style={styles.searchComponent}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeKeyword}
        value={keyword}
        style={styles.searchBar}
      />
    </View>
  );
};

export default SearchBar;
