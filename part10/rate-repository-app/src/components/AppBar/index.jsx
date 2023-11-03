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
  console.log(data);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" path="/repositoryList" />
        {!data && <AppBarTab text="Sign In" path="/" />}
        {data && <SignOut text="Sign Out" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
