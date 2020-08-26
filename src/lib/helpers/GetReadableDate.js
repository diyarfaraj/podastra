import React from 'react';

const GetReadableDate = (date) => {
  let d = new Date(date);
  let realDate =
    d.toLocaleString().substr(0, 10) + d.toLocaleString().substr(-5);
  return realDate;
};

export default GetReadableDate;
