import React from 'react';
import * as Linking from 'expo-linking';

import RepositoryItem from '../RepositoryList/RepositoryItem';
import ItemSeparator from '../ItemSeparator';

const RepositoryInfo = ({ repo }) => {
  const onSubmit = async () => {
    await Linking.openURL(repo.url);
  };

  return (
    <>
      <RepositoryItem item={repo} isSingleRepo={true} onSubmit={onSubmit} />
      <ItemSeparator />
    </>
  );
};

export default RepositoryInfo;
