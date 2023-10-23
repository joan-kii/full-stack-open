import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  text: {
    paddingLeft: 20,
    color: '#fff'
  }
});

const AppBarTab = ({ text, path }) => {
  return (
    <View>
      <Pressable>
        <Link to={path}>
          <Text
            style={styles.text}
            fontSize="subheading"
            fontWeight="bold"
          >
            { text }
          </Text>
        </Link>  
      </Pressable>
    </View>
  );
};

export default AppBarTab;
