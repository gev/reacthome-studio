
import { Typography } from '@rmwc/typography';
import React from 'react';
import { connect } from 'react-redux';

const Container = ({ value, magnitude }) => (
  <div>
    <Typography use="caption">{value}{magnitude}</Typography>
  </div>
);

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
