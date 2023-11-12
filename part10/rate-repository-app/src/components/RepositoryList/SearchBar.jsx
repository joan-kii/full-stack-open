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

const SearchBar = ({ onChangeKeyword, debouncedKeyword }) => {
  return (
    <View style={styles.searchComponent}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeKeyword}
        value={debouncedKeyword}
        style={styles.searchBar}
      />
    </View>
  );
};

export default SearchBar;
