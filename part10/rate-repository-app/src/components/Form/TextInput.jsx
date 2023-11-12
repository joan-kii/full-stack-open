import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 10,
    paddingLeft: 10,
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3
  }
});

const TextInput = ({ ...props }) => {
  return <NativeTextInput style={styles.input} {...props} />;
};

export default TextInput;
