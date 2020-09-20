import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import fireDb from '../../services/firebaseDb';
import {useNavigation} from '@react-navigation/native';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [podcastIds, setPodcastIds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
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
          setPodcastIds(Object.values(snapshot.val()));
        }
      });
  };

  return (
    <Box style={s.podcasts}>
      {loading ? (
        <Box f={1} center h={300}>
          <ActivityIndicator size="large" color="#00ff00" />
        </Box>
      ) : (
        podcastIds.map((podcast) => (
          <Box
            key={podcast.id}
            bg="white"
            /* mb="md" */ p="sm"
            style={s.eachPodcast}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PodcastDetails', {
                  params: podcast,
                })
              }>
              {/* <Text>{podcast.name}</Text> */}
              <Image source={{uri: podcast.thumbnail}} style={s.thumbnail} />
            </TouchableOpacity>
            <Text numberOfLines={1} size="xs" style={s.title}>
              {podcast.name}
            </Text>
          </Box>
        ))
      )}
    </Box>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 110,
    width: 110,
    borderRadius: 10,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
  },
  podcasts: {
    display: 'flex',
    direction: 'ltr',
    flexWrap: 'wrap',
    alignContent: 'stretch',
  },
  eachPodcast: {
    width: 140,
  },
  title: {
    fontSize: 12,
  },
});

export default LibraryScreen;
