import React from 'react';
import HTML from 'react-native-render-html';
import {Linking} from 'react-native';

const HtmlReader = (props) => {
  return (
    <HTML
      html={props.html}
      onLinkPress={(event, href) => {
        Linking.openURL(href);
      }}
      tagsStyles={{
        a: {color: 'green', fontWeight: 'bold'},
      }}
    />
  );
};

export default HtmlReader;
