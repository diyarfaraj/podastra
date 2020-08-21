import React, {useState} from 'react';
import {Box} from 'react-native-design-utility';
import {StyleSheet, TextInput, FlatList, ActivityIndicator} from 'react-native';
import {theme} from '../../constants/theme.js';
import SearchResults from './SearchResults.js';
import SearchEmpty from './SearchEmpty.js';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const api_url = `https://listen-api.listennotes.com/api/v2/search?q=${term}&sort_by_date=0&type=podcast&offset=0&language=English&safe_mode=0"`;
  const searchPodcasts = async () => {
    setLoading(true);
    const response = await fetch(api_url, {
      method: 'GET',
      headers: {'X-ListenAPI-Key': `ae87cec695cc4454a601639d06c9274a`},
    }).catch((error) => {
      console.error('opps error in fetching api', error);
      setErrorMessage('something went wrongg');
    });
    const data = await response.json();

    setResults(data.results);
    setLoading(false);
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" mt="sm" px="sm" my="sm">
        <Box
          dir="row"
          align="center"
          height={40}
          bg="greyLightest"
          radius={10}
          px="sm">
          <Box mr={10}>
            <FeatherIcon name="search" size={20} color="grey" />
          </Box>
          <TextInput
            term={term}
            onChangeText={setTerm}
            style={s.input}
            placeholder="Search podcasts"
            selectionColor={theme.color.purpleDarkest}
            onSubmitEditing={searchPodcasts}
          />
        </Box>
      </Box>

      {loading ? (
        <Box f={1} center h={300}>
          <ActivityIndicator size="large" color="#00ff00" />
        </Box>
      ) : (
        <FlatList
          data={results}
          ListEmptyComponent={<SearchEmpty />}
          contentContainerStyle={s.listContentContainer}
          keyExtractor={(res) => res.title_original}
          renderItem={({item}) => <SearchResults item={item} />}
        />
      )}
    </Box>
  );
};

const s = StyleSheet.create({
  input: {
    flex: 1,

    fontSize: theme.text.size.md,
  },
  listContentContainer: {
    minHeight: '100%',
    paddingBottom: 90,
  },

  list: {
    minHeight: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  eachResult: {
    height: 90,
    direction: 'ltr',
    alignItems: 'center',
  },
});

export default SearchScreen;
