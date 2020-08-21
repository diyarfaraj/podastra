import React from 'react';
import {Box, Text} from 'react-native-design-utility';

const SearchEmpty = () => {
  return (
    <Box f={1} center>
      <Text color="grey">No podcasts, please search something above...</Text>
    </Box>
  );
};

export default SearchEmpty;
