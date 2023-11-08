import React from 'react';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-dom';

import RepositoryItem from '../RepositoryList/RepositoryItem';
import useSingleRepository from '../../hooks/useSingleRepository';

const SingleRepository = () => {
  const { id } = useParams();
  const { error, data } = useSingleRepository(id);

  const onSubmit = async () => {
    if (!error) await Linking.openURL(data.url);
  };

  return <RepositoryItem item={item} isSingleRepo={true} onSubmit={onSubmit} />;
};

export default SingleRepository;
