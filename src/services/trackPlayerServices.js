import TrackPlayer from 'react-native-track-player';

export default async function trackPlayerServices() {
  console.log('HAHAHAH');
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  TrackPlayer.addEventListener('playback-track-changed', () => {
    console.log('track changed');
  });

  TrackPlayer.addEventListener('playback-state', (state) => {
    console.log('playback-state', state);
  });
}