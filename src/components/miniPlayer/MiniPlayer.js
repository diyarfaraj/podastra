import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import {Image, TouchableOpacity} from 'react-native';

import {usePlayerContext} from '../../contexts/PlayerContext';
import {theme} from '../../constants/theme';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }

  return (
    <Box
      h={75}
      bg="#c9df8a"
      px="sm"
      style={{borderTopWidth: 1, borderTopColor: theme.color.greyLightest}}>
      <Box f={1} dir="row" align="center" justify="between">
        <Box
          h={50}
          w={50}
          bg="blueLight"
          radius={10}
          mr={10}
          style={{overflow: 'hidden'}}>
          <Image
            source={{uri: playerContext.currentTrack.artwork}}
            style={{flex: 1}}
          />
        </Box>
        <Box f={1} mr={20}>
          <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
        </Box>
        <Box>
          {playerContext.isPaused && (
            <TouchableOpacity onPress={() => playerContext.play()}>
              <Icon name="play" size={25} color="white" />
            </TouchableOpacity>
          )}

          {playerContext.isPlaying && (
            <TouchableOpacity onPress={playerContext.pause}>
              <Icon name="pause" size={25} color="white" />
            </TouchableOpacity>
          )}

          {playerContext.isStopped && (
            <TouchableOpacity onPress={() => null}>
              <Icon name="square" size={25} color="white" />
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MiniPlayer;
