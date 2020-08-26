import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  console.log('HAHAHAH FROM TRACKPLAYER SERVICE');
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  TrackPlayer.addEventListener('remote-jump-forward', async (interval) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + interval);
  });
  TrackPlayer.addEventListener('remote-jump-backward', async (interval) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - interval);
  });
};
