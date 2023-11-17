import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import SignOut from './SingOut';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';

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
  const { user } = useGetCurrentUser({ includeReviews: false });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" path="/repositoryList" />
        {user && <AppBarTab text="Create a Review" path="/reviewForm" />}
        {!user && <AppBarTab text="Sign In" path="/" />}
        {!user && <AppBarTab text="Sign Up" path="/signUp" />}
        {user && <AppBarTab text="My Reviews" path="/myReviews" />}
        {user && <SignOut text="Sign Out" />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
