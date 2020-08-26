import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Box, Text, UtilityThemeProvider} from 'react-native-design-utility';
import {theme} from './src/constants/theme';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';

import TrackPlayer from 'react-native-track-player';
import {PlayerContextProvider} from './src/contexts/PlayerContext';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log('player is setup');

      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
        jumpInterval: 30,
      });

      setIsReady(true);
    });
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      {isReady ? (
        <PlayerContextProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </PlayerContextProvider>
      ) : (
        <Box f={1} center>
          <ActivityIndicator />
        </Box>
      )}
    </UtilityThemeProvider>
  );
};

export default App;
