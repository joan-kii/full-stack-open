import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white'
  },
  button: {
    margin: 10,
    height: 50,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Too short!')
    .max(15, 'Too long!')
    .required('Username is required!'),
  password: yup
    .string()
    .min(6, 'Too short!')
    .max(15, 'Too long!')
    .matches(/^[a-z]+$/, 'Just lowercase letters!')
    .required('Password is required!')
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Sing In</Text>
      </Pressable>
    </View>
  );
};

const initialValues = {
  username: '',
  password: ''
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
