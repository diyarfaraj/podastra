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
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <Box style={s.podcasts}>
      {loading ? (
        <Box f={1} center h={300}>
          <ActivityIndicator size="large" color="#00ff00" />
        </Box>
      ) : (
        podcastIds.map((podcast) => (
          <Box key={podcast.id} bg="white" p="sm" style={s.eachPodcast}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PodcastDetails', {
                  params: podcast,
                })
              }>
              <Image source={{uri: podcast.thumbnail}} style={s.thumbnail} />
            </TouchableOpacity>
            <Text numberOfLines={1} size="xxs" style={s.title}>
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
    height: 75,
    width: 75,
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
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignContent: 'stretch',
  },
  eachPodcast: {
    width: 100,
    marginBottom: 5,
    marginLeft: 5,
  },
  title: {
    fontSize: 9,
  },
});

export default LibraryScreen;
