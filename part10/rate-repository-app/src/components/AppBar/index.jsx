import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 60,
    backgroundColor: '#24292e'
  },
  scrollView: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" path="/repositoryList" />
        <AppBarTab text="Sign In" path="/" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
