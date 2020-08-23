import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {Box, Text, UtilityThemeProvider} from 'react-native-design-utility';
import {theme} from './src/constants/theme';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';

import TrackPlayer from 'react-native-track-player';
import trackPlayerServices from './src/services/trackPlayerServices';
import {PlayerContextProvider} from './src/contexts/PlayerContext';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log('player is setup');
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
