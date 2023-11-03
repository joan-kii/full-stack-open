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

const handlePress = async () => {
  const navigate = useNavigate();
  const [signOut] = useSignOut();
  console.log('lol');

  try {
    const data = await signOut();
    if (data) navigate('/');
  } catch (e) {
    console.log(e);
  }
};

const SignOut = ({ text }) => {
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