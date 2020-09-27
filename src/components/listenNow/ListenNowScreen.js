import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import PropTypes from 'prop-types';
import TimedSlideshow from 'react-native-timed-slideshow';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ListenNowScreen = () => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const isMounted = React.useRef(true);

  const api_toppodcasts_url = `https://listen-api.listennotes.com/api/v2/best_podcasts?page=1&region=se&safe_mode=0`;

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

  React.useEffect(() => {
    getTopPodcasts();
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
    <Box>
      <Box h={250}>
        <TimedSlideshow
          items={topPodcasts}
          extraSpacing={0}
          showProgressBar={false}
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
      <Text size="lg" color="red">
        LISTEN NOW{' '}
      </Text>
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

export default ListenNowScreen;
