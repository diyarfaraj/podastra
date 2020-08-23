import React, {createContext, useContext, useState, useEffect} from 'react';
import RNTrackPlayer, {
  State as TrackPlayerState,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
} from 'react-native-track-player';

export const PlayerContext = createContext(() => {
  isPlaying: false;
  isPaused: false;
  isStopped: false;
  isEmpty: true;
  currentTrack: null;
  play: () => null;
  pause: () => null;
});

export const PlayerContextProvider = (props) => {
  const [playerState, setPlayerState] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  useEffect(() => {
    const listener = RNTrackPlayer.addEventListener(
      'playback-state',
      ({state}) => {
        setPlayerState(state);
      },
    );

    return () => {
      listener.remove();
    };
  }, []);

  const play = async (track) => {
    await RNTrackPlayer.add([track]);
    setCurrentTrack(track);
    await RNTrackPlayer.play();
  };
  const pause = async () => {
    await RNTrackPlayer.pause();
  };
  const value = {
    isPlaying: playerState === STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    isStopped: playerState === STATE_STOPPED,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    play,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
