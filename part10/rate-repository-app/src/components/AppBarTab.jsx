import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  text: {
    paddingLeft: 10,
    color: '#fff'
  }
});

const AppBarTab = ({ text }) => {
  return (
    <View>
      <Pressable>
        <Text style={styles.text}>{ text }</Text>  
      </Pressable>
    </View>
  );
};

export default AppBarTab;
