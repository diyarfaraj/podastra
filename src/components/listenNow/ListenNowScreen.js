import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import PropTypes from 'prop-types';
import TimedSlideshow from 'react-native-timed-slideshow';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';

const ListenNowScreen = () => {
  const [results, setResults] = React.useState([]);
  const [comedyResults, setComedyResults] = React.useState([]);
  const [finResults, setFinResults] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const isMounted = React.useRef(true);

  const api_toppodcasts_url = `https://listen-api.listennotes.com/api/v2/best_podcasts?page=1&region=se&safe_mode=0`;
  const api_top_comedy_podcasts_url = `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=133&region=se&safe_mode=0`;
  const api_top_fin_podcasts_url = `https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=93&region=se&safe_mode=0`;

  const getTopPodcasts = async () => {
    setLoading(true);
    const response = await fetch(api_toppodcasts_url, {
      method: 'GET',
      headers: {'X-ListenAPI-Key': `ae87cec695cc4454a601639d06c9274a`},
    }).catch((error) => {
      console.error('opps error in fetching episodes api', error);
      setErrorMessage('something went wrongg in getting top podcasts');
    });
    const data = await response.json();
    setResults(data.podcasts);
    setLoading(false);
  };

  const getComedyTopPodcasts = async () => {
    setLoading(true);
    const response = await fetch(api_top_comedy_podcasts_url, {
      method: 'GET',
      headers: {'X-ListenAPI-Key': `ae87cec695cc4454a601639d06c9274a`},
    }).catch((error) => {
      console.error('opps error in fetching episodes api', error);
      setErrorMessage('something went wrongg in getting com podcasts');
    });
    const data = await response.json();
    setComedyResults(data.podcasts);
    setLoading(false);
  };

  const getFinTopPodcasts = async () => {
    setLoading(true);
    const response = await fetch(api_top_fin_podcasts_url, {
      method: 'GET',
      headers: {'X-ListenAPI-Key': `ae87cec695cc4454a601639d06c9274a`},
    }).catch((error) => {
      console.error('opps error in fetching episodes api', error);
      setErrorMessage('something went wrongg in getting fin podcasts');
    });
    const data = await response.json();
    setFinResults(data.podcasts);
    setLoading(false);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      getTopPodcasts();
      getComedyTopPodcasts();
      getFinTopPodcasts();
      console.log('top podcast', topPodcasts);
    }
    return () => (isMounted.current = false);
  }, []);

  const topPodcasts = [];

  results.forEach(function (el) {
    topPodcasts.push({
      uri: el.thumbnail,
      title: el.title,
      text: el.publisher,
    });
  });

  return (
    <ScrollView>
      <Box>
        <Box h={370}>
          <TimedSlideshow
            items={topPodcasts}
            extraSpacing={0}
            showProgressBar={false}
            renderCloseIcon={() => null}
            footerStyle
          />
        </Box>
        <Box h={90} backgroundColor="white" w="100%" style={s.header}>
          <Box style={s.headerIconsContiner}>
            <TouchableOpacity>
              <Box backgroundColor="#eaf9ea" style={s.headerIcons}>
                <Icon name="download" size={17} color="green" />
              </Box>
            </TouchableOpacity>
            <Text style={s.iconsText}>Categories</Text>
          </Box>
          <Box style={s.headerIconsContiner}>
            <TouchableOpacity>
              <Box backgroundColor="#eaf9ea" style={s.headerIcons}>
                <Icon name="tv" size={17} color="green" />
              </Box>
            </TouchableOpacity>
            <Text style={s.iconsText}>Network</Text>
          </Box>
          <Box style={s.headerIconsContiner}>
            <TouchableOpacity>
              <Box backgroundColor="#eaf9ea" style={s.headerIcons}>
                <Icon name="heart" size={17} color="green" />
              </Box>
            </TouchableOpacity>
            <Text style={s.iconsText}>Radio</Text>
          </Box>
          <Box style={s.headerIconsContiner}>
            <TouchableOpacity>
              <Box backgroundColor="#eaf9ea" style={s.headerIcons}>
                <Icon name="list" size={17} color="green" />
              </Box>
            </TouchableOpacity>

            <Text style={s.iconsText}>Audiobooks</Text>
          </Box>
        </Box>
        <Box
          display="flex"
          backgroundColor="white"
          borderBottomWidth={2}
          borderBottomColor="lightgrey">
          <Text pl={18} mt={5}>
            Comedy Podcasts
          </Text>
          {loading ? (
            <Box f={1} center h={300}>
              <ActivityIndicator size="large" color="#00ff00" />
            </Box>
          ) : (
            <FlatList
              data={comedyResults.slice(0, 4)}
              numColumns={4}
              keyExtractor={(res) => res.id}
              renderItem={({item}) => (
                <Box style={s.podcastsContainer}>
                  <Box key={item.id} p="sm" style={s.eachPodcast}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PodcastDetails', {
                          params: podcast,
                        })
                      }>
                      <Image
                        source={{uri: item.thumbnail}}
                        style={s.thumbnail}
                      />
                    </TouchableOpacity>
                    <Text numberOfLines={2} size="s" style={s.title}>
                      {item.title}
                    </Text>
                  </Box>
                </Box>
              )}
            />
          )}
        </Box>
        <Box
          display="flex"
          backgroundColor="white"
          borderBottomWidth={2}
          borderBottomColor="lightgrey">
          <Text pl={18}>Business Podcasts</Text>
          {loading ? (
            <Box f={1} center h={300}>
              <ActivityIndicator size="large" color="#00ff00" />
            </Box>
          ) : (
            <FlatList
              data={finResults.slice(0, 4)}
              numColumns={4}
              keyExtractor={(res) => res.id}
              renderItem={({item}) => (
                <Box style={s.podcastsContainer}>
                  <Box key={item.id} p="sm" style={s.eachPodcast}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PodcastDetails', {
                          params: podcast,
                        })
                      }>
                      <Image
                        source={{uri: item.thumbnail}}
                        style={s.thumbnail}
                      />
                    </TouchableOpacity>
                    <Text numberOfLines={2} size="s" style={s.title}>
                      {item.title}
                    </Text>
                  </Box>
                </Box>
              )}
            />
          )}
        </Box>
      </Box>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    fontSize: 11,
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
    width: 105,
  },

  header: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 3,
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
    width: 37,
    height: 37,
    marginBottom: 5,
  },
  podcastsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
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

export default ListenNowScreen;
