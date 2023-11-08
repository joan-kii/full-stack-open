import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigate } from 'react-router-dom';

import theme from '../../theme';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryItemStats from './RepositoryItemStats';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const RepositoryItem = ({ item, isSingleRepo, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.card} testID="repositoryItem">
      <Pressable onPress={() => navigate(`/${item.id}`)}>
        <RepositoryItemHeader item={item} />
        <RepositoryItemStats item={item} />
        {isSingleRepo && 
          <Pressable style={theme.button} onPress={onSubmit}>
            <Text style={theme.text}>Open in GitHub</Text>
          </Pressable> 
        }
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
