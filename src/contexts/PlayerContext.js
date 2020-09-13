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

  //play
  const play = async (track) => {
    if (!track) {
      if (currentTrack) {
        await RNTrackPlayer.play();
      }
      return;
    }

    if (currentTrack && track.id !== currentTrack.id) {
      await RNTrackPlayer.reset();
    }

    await RNTrackPlayer.add([track]);
    setCurrentTrack(track);
    await RNTrackPlayer.play();
  };

  //pause
  const pause = async () => {
    await RNTrackPlayer.pause();
  };

  const seekTo = async (amount = 30) => {
    const position = await RNTrackPlayer.getPosition();
    await RNTrackPlayer.seekTo(position + amount);
  };

  const goTo = async (amount) => {
    await RNTrackPlayer.seekTo(amount);
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
    goTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
