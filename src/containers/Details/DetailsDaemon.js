
import { Button } from '@rmwc/button';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { DEVICE, TERMINAL } from '../../constants';
import Device from '../Device';
import DetailSection from './DetailSection';

const Container = ({ id, device = [], terminal }) => (
  <div>
    <DetailSection
      title={DEVICE}
      action={<Button onClick={terminal}>Terminal</Button>
      }>
      {
        device.map(i => (
          <Device key={i} id={i} daemon={id} />
        ))
      }
    </DetailSection>
  </div>
);

export default connect(
  ({ pool }, { id }) => pool[id] || {},
  (dispatch, { id }) => bindActionCreators({
    terminal: () => push(`/daemon/${id}/${TERMINAL}`),
  }, dispatch)
)(Container);
