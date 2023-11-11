import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import FormikTextInput from '../Form';
import Text from '../Elements/Text';
import theme from '../../theme';
import useCreateReview from '../../hooks/useCreateReview';


const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white'
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(2, 'Too short!')
    .max(15, 'Too long!')
    .required('Username is required!'),
  repositoryName: yup
    .string()
    .min(2, 'Too short!')
    .max(15, 'Too long!')
    .required('Repository name is required!'),
  rating: yup
    .number()
    .min(0, 'Negative rating are invalid!')
    .max(100, '100 is the top rating!')
    .required('Rating is required!'),
  text: yup
    .string()
});

const CreateReview = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable style={theme.button} onPress={onSubmit}>
        <Text style={theme.text}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: 0,
    text: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReview onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  
  const onSubmit = async (values) => {
    const ratingAsNumber = values.rating;
    const newValues = { ...values, rating: Number(ratingAsNumber) };

    try {
      const data = await createReview(newValues);
      const id = data.createReview.repositoryId;
      if (data) navigate(`/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} /> ;
};

export default ReviewForm;
