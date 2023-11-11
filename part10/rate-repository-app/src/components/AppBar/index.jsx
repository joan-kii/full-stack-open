import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';

import AppBarTab from './AppBarTab';
import SignOut from './SingOut';
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
  const { data } = useQuery(CURRENT_USER, { fetchPolicy: 'cache-and-network' });
  const user = data ? data.me : undefined;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" path="/repositoryList" />
        {user && <AppBarTab text="Create a Review" path="/reviewForm" />}
        {!user && <AppBarTab text="Sign In" path="/" />}
        {user && <SignOut text="Sign Out" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
