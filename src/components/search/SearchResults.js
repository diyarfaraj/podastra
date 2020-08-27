import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SearchResults = ({item}) => {
  const navigation = useNavigation();

  return (
    <Box h={110} dir="row" align="center" px="sm">
      <Image source={{uri: item.image}} style={s.image} />
      <Box f={1}>
        <Text numberOfLines={1} bold>
          {item.title_original}
        </Text>
        <Text numberOfLines={1} style={s.publisher} size="xs" color="grey">
          {item.publisher_original}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PodcastDetails', {params: item})}>
          <Text style={s.episodesStyle} size="xs" color="green">
            Episodes: {item.total_episodes}
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const s = StyleSheet.create({
  publisher: {
    fontSize: 12,
  },
  episodesStyle: {
    fontSize: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default SearchResults;
