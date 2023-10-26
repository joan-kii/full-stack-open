import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ ...props }) => {

  return <NativeTextInput {...props} />;
};

export default TextInput;
