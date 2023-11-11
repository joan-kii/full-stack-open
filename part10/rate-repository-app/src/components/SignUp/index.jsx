import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import FormikTextInput from '../Form';
import Text from '../Elements/Text';
import theme from '../../theme';
import useSignUp from '../../hooks/useSignUp';


const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white'
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Too short!')
    .max(30, 'Too long!')
    .required('Username is required!'),
  password: yup
    .string()
    .min(6, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^[a-z]+$/, 'Just lowercase letters!')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .min(6, 'Too short!')
    .max(50, 'Too long!')
    .matches(/^[a-z]+$/, 'Just lowercase letters!')
    .oneOf([yup.ref('password'), null], 'Passwords do not match!')
    .required('Password confirm is required!')
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="confirmPassword" placeholder="Confirm Password" secureTextEntry />
      <Pressable style={theme.button} onPress={onSubmit}>
        <Text style={theme.text}>Sing Up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  
  const onSubmit = async (values) => {
    try {
      const data = await signUp(values);
      if (data) navigate('/repositoryList');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} /> ;
};

export default SignUp;
