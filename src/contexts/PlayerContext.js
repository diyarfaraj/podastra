import React, {createContext, useContext, useState, useEffect} from 'react';
import RNTrackPlayer, {
  State as TrackPlayerState,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
  seekTo,
} from 'react-native-track-player';

export const PlayerContext = createContext(() => {
  isPlaying: false;
  isPaused: false;
  isStopped: false;
  isEmpty: true;
  currentTrack: null;
  play: () => null;
  pause: () => null;
  seekTo: () => null;
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
    if (!track) {
      if (currentTrack) {
        await RNTrackPlayer.play();
      }
      return;
    }

    await RNTrackPlayer.add([track]);
    setCurrentTrack(track);
    await RNTrackPlayer.play();
  };
  const pause = async () => {
    await RNTrackPlayer.pause();
  };

  const seekTo = async (amount = 30) => {
    const position = await RNTrackPlayer.getPosition();
    await RNTrackPlayer.seekTo(position + amount);
  };

  const value = {
    isPlaying: playerState === STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    isStopped: playerState === STATE_STOPPED,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    play,
    seekTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
