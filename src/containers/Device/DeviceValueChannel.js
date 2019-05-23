
import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@rmwc/typography';

type Props = {
  magnitude: ?string;
  value: ?boolean;
};

const Container = ({ value, magnitude } : Props) => (
  <div>
    <Typography use="caption">{value}{magnitude}</Typography>
  </div>
);

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
