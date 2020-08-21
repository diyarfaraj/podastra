import React, {useState, useEffect, useRef} from 'react';
import {Box, Text} from 'react-native-design-utility';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const getReadableDate = (date) => {
  let d = new Date(date);
  let realDate =
    d.toLocaleString().substr(0, 10) + d.toLocaleString().substr(-5);
  return realDate;
};

const getHoursAndMins = (d) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + (h == 1 ? 'hr, ' : 'hrs, ') : '';
  let mDisplay = m > 0 ? m + (m == 1 ? 'min ' : 'mins ') : '';

  return hDisplay + mDisplay;
};

const PodcastDetailsScreen = ({route, navigation}) => {
  const currenPodcast = route.params;
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const isMounted = useRef(true);
  const [errorMessage, setErrorMessage] = useState('');

  const api_episodes_url = `https://listen-api.listennotes.com/api/v2/podcasts/${currenPodcast.id}?sort=recent_first`;

  const getEpisodes = async () => {
    setLoading(true);
    const response = await fetch(api_episodes_url, {
      method: 'GET',
      headers: {'X-ListenAPI-Key': `ae87cec695cc4454a601639d06c9274a`},
    }).catch((error) => {
      console.error('opps error in fetching episodes api', error);
      setErrorMessage('something went wrongg in getting episodes');
    });
    const data = await response.json();
    setResults(data.episodes);
    setLoading(false);
  };

  useEffect(() => {
    if (isMounted.current) {
      getEpisodes();
    }
    return () => (isMounted.current = false);
  }, []);

  return (
    <Box f={1}>
      {loading ? (
        <Box f={1} center h={300}>
          <ActivityIndicator size="large" color="#00ff00" />
        </Box>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <Box dir="row" px="sm" mt="sm" mb="md">
                {currenPodcast.thumbnail && (
                  <Box mr={10}>
                    <Image
                      source={{uri: currenPodcast.thumbnail}}
                      style={s.thumbnail}
                    />
                  </Box>
                )}
                <Box style={s.title}>
                  <Text size="lg" bold>
                    {currenPodcast.title_original}
                  </Text>
                  <Text size="sm" color="grey">
                    {currenPodcast.publisher_original}
                  </Text>
                  <Text color="green" size="sm">
                    Subcribed
                  </Text>
                </Box>
              </Box>
              <Box px="sm" mb="md" dir="row" align="center">
                <Box mr={10}>
                  <FeatherIcon size={20} name="play" color="green" />
                </Box>
                <Box f={1}>
                  <Text size="sm">Play</Text>
                  <Text size="sm">Lastest episode </Text>
                </Box>
              </Box>

              <Box mb="md" px="sm">
                <Text bold size="lg">
                  Episodes
                </Text>
              </Box>
            </>
          }
          data={results}
          ItemSeparatorComponent={() => (
            <Box w="100%" px="sm" my="sm">
              <Box
                style={{height: StyleSheet.hairlineWidth}}
                bg="greyLighter"
              />
            </Box>
          )}
          renderItem={({item}) => (
            <Box px="sm">
              <Text size="xs" color="grey">
                {getReadableDate(item.pub_date_ms)}
              </Text>
              <Text bold>{item.title}</Text>
              <Text size="sm" color="grey" numberOfLines={2}>
                {item.description}
              </Text>
              <Text size="sm" color="grey" numberOfLines={2}>
                {getHoursAndMins(item.audio_length_sec)}
              </Text>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  title: {
    flex: 1,
  },
});
export default PodcastDetailsScreen;
