import React from 'react';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-dom';

import RepositoryItem from '../RepositoryList/RepositoryItem';
import useSingleRepository from '../../hooks/useSingleRepository';
import Text from '../Elements/Text';

const SingleRepository = () => {
  const { id } = useParams();
  const { error, data, loading } = useSingleRepository(id);

  const onSubmit = async () => {
    console.log(data.repository.url);
    if (!error) await Linking.openURL(data.repository.url);
  };

  if (loading) return <View><Text>Loading</Text></View>;

  return (
    <>
      {!loading && <RepositoryItem item={data.repository} isSingleRepo={true} onSubmit={onSubmit} />}
    </>
  );
};

export default SingleRepository;
