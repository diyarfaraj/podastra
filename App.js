import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {Box, Text, UtilityThemeProvider} from 'react-native-design-utility';
import {theme} from './src/constants/theme';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigators/MainStackNavigator';

import TrackPlayer from 'react-native-track-player';
import trackPlayerServices from './src/services/trackPlayerServices';

const track = {
  id: '1',
  url:
    'https://cdn.simplecast.com/audio/05bd32/05bd32de-6cd4-40f6-b3bd-0bdf6750dd58/9b70bc7c-6bcc-48e7-8265-90089d7a1ed3/141_tc.mp3?aid=rss_feed',
  title: '141: Jason Fried - Running the Tailwind Business on Basecamp',
  artist: 'Full Stack Radio',
};

const App = () => {
  React.useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('player is setup');
      });

      TrackPlayer.registerPlaybackService(() => trackPlayerServices);

      await TrackPlayer.add([track]);

      await TrackPlayer.play();

      setTimeout(() => {
        TrackPlayer.stop();
      }, 10000);
    })();
  }, []);

  return (
    <UtilityThemeProvider theme={theme}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </UtilityThemeProvider>
  );
};

export default App;
