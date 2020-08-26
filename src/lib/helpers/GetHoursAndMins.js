import React from 'react';

const GetHoursAndMins = (d) => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + (h == 1 ? 'hr, ' : 'hrs, ') : '';
  let mDisplay = m > 0 ? m + (m == 1 ? 'min ' : 'mins ') : '';

  return hDisplay + mDisplay;
};

export default GetHoursAndMins;
