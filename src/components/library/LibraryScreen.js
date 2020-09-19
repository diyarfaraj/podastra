import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import fireDb from '../../services/firebaseDb';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity} from 'react-native';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [podcastIds, setPodcastIds] = React.useState([]);

  //https://www.youtube.com/watch?v=rSgbYCdc4G0&ab_channel=BaylorBreaksItDown

  React.useEffect(() => {
    /*  fireDb.child('podcasts').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      podcastIds.push(childData);
    });
  }); */
    getPodcasts();
  }, []);

  const getPodcasts = async () => {
    await fireDb
      .database()
      .ref()
      .child('podastra')
      .child('podcasts')
      .on('value', function (snapshot) {
        if (snapshot && snapshot.exists()) {
          //Set values in state which can be extracted in jsx in render.
          setPodcastIds(Object.values(snapshot.val()));
          //podcastIds.map((p) => console.log(p.name));
        }
      });
  };

  return (
    <Box f={1}>
      {podcastIds.map((podcast) => (
        <Box key={podcast.id} bg="white" mb="md" p="sm">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PodcastDetails', {params: podcastIds})
            }>
            <Text>{podcast.name}</Text>
          </TouchableOpacity>
        </Box>
      ))}
    </Box>
  );
};

export default LibraryScreen;
