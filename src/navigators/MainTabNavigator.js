import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import ListenNowScreen from '../components/listenNow/ListenNowScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';
import PodcastDetailsScreen from '../components/podcastDetails/PodcastDetailsScreen';
import MiniPlayer from '../components/miniPlayer/MiniPlayer';
import EpisodeDetailsScreen from '../components/episodeDetails/EpisodeDetailsScreen';

const MainTab = createBottomTabNavigator();
const ICON_SIZE = 24;
const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{title: 'Listen Now'}}
        name="ListenNoow"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />

      <SearchStack.Screen
        name="PodcastDetails"
        component={PodcastDetailsScreen}
        options={{headerTitle: ''}}
      />
      <SearchStack.Screen
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
        options={{headerTitle: ''}}
      />
    </SearchStack.Navigator>
  );
};

const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
      <LibraryStack.Screen
        name="PodcastDetails"
        component={PodcastDetailsScreen}
        options={{headerTitle: ''}}
      />
      <LibraryStack.Screen
        name="EpisodeDetails"
        component={EpisodeDetailsScreen}
        options={{headerTitle: ''}}
      />
    </LibraryStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={(tabsProps) => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}
      tabBarOptions={{activeTintColor: 'green'}}>
      <MainTab.Screen
        options={{title: 'Explore'}}
        name="Explore"
        component={ListenNowStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="compass" />
          ),
        }}
      />

      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="inbox" />
          ),
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <FeatherIcon color={props.color} size={ICON_SIZE} name="search" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
