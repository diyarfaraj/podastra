import React from 'react';
import {ProgressComponent} from 'react-native-track-player';
import {Slider} from 'react-native';
import {Box, Text} from 'react-native-design-utility';

import {theme} from '../../constants/theme';
import {PlayerContext} from '../../contexts/PlayerContext';

function buildTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutesStr}:${secondsStr}`;
  }

  return `${minutesStr}:${secondsStr}`;
}

class ProgressSlider extends ProgressComponent {
  static contextType = PlayerContext;

  get totalTime() {
    return buildTime(this.state.duration - this.state.position);
  }

  get currentTime() {
    return buildTime(this.state.position);
  }

  render() {
    return (
      <>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={this.state.duration}
          value={this.state.position}
          onSlidingComplete={(value) => {
            this.context.goTo(value);
          }}
          minimumTrackTintColor="green"
          maximumTrackTintColor="#3EBE39"
        />
        <Box mr={10} ml={10} dir="row" align="center" justify="between">
          <Text>{this.currentTime}</Text>
          <Text>-{this.totalTime}</Text>
        </Box>
      </>
    );
  }
}

export default ProgressSlider;
