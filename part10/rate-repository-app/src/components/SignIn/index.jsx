import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import FormikTextInput from '../Form';
import Text from '../Elements/Text';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';


const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white'
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
      <Pressable style={theme.button} onPress={onSubmit}>
        <Text style={theme.text}>Sing In</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: ''
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

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  
  const onSubmit = async (values) => {
    try {
      const data = await signIn(values);
      if (data) navigate('/repositoryList');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} /> ;
};

export default SignIn;
