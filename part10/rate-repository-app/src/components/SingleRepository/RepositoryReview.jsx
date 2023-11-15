import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-dom';

import Text from '../Elements/Text';
import theme from '../../theme';
import useDeleteReview from '../../hooks/useDeleteReview';


const styles = StyleSheet.create({
  reviewBlock: {
    backgroundColor: 'white'
  },
  reviewContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  ratingContainer: {
    width: '25%',
    alignItems: 'center'
  },
  rating: {
    width: 40,
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    fontWeight: theme.fontWeights.bold
  },
  textReview: {
    paddingTop: 5,
    width: '85%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  openRepository: {
    ...theme.button,
    paddingHorizontal: 20
  },
  deleteReview: {
    ...theme.button,
    backgroundColor: 'red',
    paddingHorizontal: 20
  }
});

const RepositoryReview = ({ review, isUserReview }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const handleDeleteReview = () => 
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel pressed'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => console.log('delete pressed')
      }
    ])
  ;

  return (
    <View style={styles.reviewBlock}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.node.rating}</Text>
        </View>
        <View>
          {!isUserReview && <Text style={styles.title}>{review.node.user.username}</Text>}
          {isUserReview && <Text style={styles.title}>{review.node.repository.fullName}</Text>}
          <Text>{new Date(review.node.createdAt).toLocaleDateString()}</Text>
          <View style={styles.textReview}>
            <Text>{review.node.text}</Text>
          </View>
        </View>
      </View>
      {isUserReview &&
        <View style={styles.buttons}>
          <Pressable style={styles.openRepository} onPress={() => navigate(`/${review.node.repositoryId}`)} >
            <Text style={theme.text}>View Repository</Text>
          </Pressable>
          <Pressable style={styles.deleteReview} onPress={handleDeleteReview} >
            <Text style={theme.text}>Delete Review</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

export default RepositoryReview;
