import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';

import AppBarTab from './AppBarTab';
import { CURRENT_USER } from '../../graphql/queries';

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
  const { user } = useQuery(CURRENT_USER, { fetchPolicy: 'cache-and-network' });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" path="/repositoryList" />
        {!user && <AppBarTab text="Sign In" path="/" />}
        {user && <AppBarTab text="Sign Out" path="/" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
