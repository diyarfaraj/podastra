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
import Icon from 'react-native-vector-icons/Feather';

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
      <Box h={150} backgroundColor="white" w="100%" style={s.header}>
        <Box style={s.headerIconsContiner}>
          <TouchableOpacity>
            <Box backgroundColor="lightgrey" style={s.headerIcons}>
              <Icon name="download" size={25} color="green" />
            </Box>
          </TouchableOpacity>
          <Text style={s.iconsText}>Downloads</Text>
        </Box>
        <Box style={s.headerIconsContiner}>
          <TouchableOpacity>
            <Box backgroundColor="lightgrey" style={s.headerIcons}>
              <Icon name="tv" size={25} color="green" />
            </Box>
          </TouchableOpacity>
          <Text style={s.iconsText}>New Episodes</Text>
        </Box>
        <Box style={s.headerIconsContiner}>
          <TouchableOpacity>
            <Box backgroundColor="lightgrey" style={s.headerIcons}>
              <Icon name="heart" size={25} color="green" />
            </Box>
          </TouchableOpacity>
          <Text style={s.iconsText}>Favorites</Text>
        </Box>
        <Box style={s.headerIconsContiner}>
          <TouchableOpacity>
            <Box backgroundColor="lightgrey" style={s.headerIcons}>
              <Icon name="list" size={25} color="green" />
            </Box>
          </TouchableOpacity>

          <Text style={s.iconsText}>Lists</Text>
        </Box>
      </Box>
      {loading ? (
        <Box f={1} center h={300}>
          <ActivityIndicator size="large" color="#00ff00" />
        </Box>
      ) : (
        podcastIds.map((podcast) => (
          <Box style={s.podcastsContainer}>
            <Box key={podcast.id} p="sm" style={s.eachPodcast}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PodcastDetails', {
                    params: podcast,
                  })
                }>
                <Image source={{uri: podcast.thumbnail}} style={s.thumbnail} />
              </TouchableOpacity>
              <Text numberOfLines={2} size="xxs" style={s.title}>
                {podcast.name}
              </Text>
            </Box>
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
  },
  title: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  header: {
    borderBottomColor: 'grey',
    borderBottomWidth: 5,
    display: 'flex',
    direction: 'ltr',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  headerIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  podcastsContainer: {
    paddingLeft: 5,
  },
  headerIconsContiner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsText: {
    fontSize: 13,
  },
});

export default LibraryScreen;
