import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import fireDb from '../../services/firebaseDb';

const podcastIds = [];

const LibraryScreen = () => {
  fireDb.child('podcasts').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      podcastIds.push(childData);
    });
  });

  return (
    <Box f={1} center>
      {podcastIds.forEach((element) => {
        <Text size="lg" color="red">
          {element.name}
        </Text>;
      })}
    </Box>
  );
};

export default LibraryScreen;
