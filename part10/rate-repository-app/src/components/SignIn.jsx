import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import FormikTextInput from './Form';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';


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
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      const { data } = await signIn(values);
      console.log(data);
      if (data) navigate('/repositoryList');
    } catch (e) {
      console.log(e);
    }
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
