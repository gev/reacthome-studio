
import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'rmwc/Icon';

type Props = {
  value: ?number;
};

const Container = ({ value } : Props) => (
  <Icon use="fiber_manual_record" theme={value ? 'secondary' : 'text-hint-on-background'} />
);

export default connect(({ pool }, { id }) => pool[id] || {})(Container);
