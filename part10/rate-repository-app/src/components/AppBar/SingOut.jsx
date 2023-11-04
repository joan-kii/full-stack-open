import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';

import Text from '../Text';
import useSignOut from '../../hooks/useSingOut';

const styles = StyleSheet.create({
  tab: {
    marginLeft: 20,
  },
  text: {
    color: '#fff'
  }
});

const SignOut = ({ text }) => {
  const navigate = useNavigate();
  const [signOut] = useSignOut();
  
  const handlePress = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.tab}>
      <Pressable onPress={handlePress}>
        <Text
          style={styles.text}
          fontSize="subheading"
          fontWeight="bold"
        >
          { text }
        </Text>
      </Pressable>
    </View>
  );
};

export default SignOut;