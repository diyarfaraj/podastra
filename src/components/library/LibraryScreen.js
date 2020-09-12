import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import fireDb from '../../services/firebaseDb';

const podcastIds = [];

const LibraryScreen = () => {
  fireDb
    .database()
    .ref()
    .child('podastra')
    .child('podcasts')
    .on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        podcastIds.push(childData);
      });
    });

  /*  fireDb.child('podcasts').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      podcastIds.push(childData);
    });
  }); */

  return (
    <Box f={1}>
      {podcastIds.map((podcast) => (
        <Box key={podcast.id} bg="white" mb="md" p="sm">
          <Text>{podcast.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default LibraryScreen;
