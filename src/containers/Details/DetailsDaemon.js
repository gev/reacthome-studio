
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@rmwc/button';
import Device from '../Device';
import { DEVICE, TERMINAL } from '../../constants';
import DetailSection from './DetailSection';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

type Props = {
  id: string,
  device: ?[]
}

const Container = ({ id, device, terminal }: Props) => (
  <div>
    <DetailSection
      title={DEVICE}
      action={<Button onClick={terminal}>Terminal</Button>
    }>
      {
        device && (
          device.map(i => (
            <Device key={i} id={i} daemon={id} />
          ))
        )
      }
    </DetailSection>
  </div>
);

export default connect(
  ({ pool }, { id }) => ({
    device: ((pool[id] || {}).device || []).sort((aid, bid) => {
      const a = pool[aid] || {};
      const b = pool[bid] || {};
      const akey = `${a.type}${a.code}${b.title}`;
      const bkey = `${b.type}${b.code}${b.title}`;
      if (akey === bkey) return 0;
      if (akey > bkey) return 1;
      return -1;
    })
  }),
  (dispatch, { id }) => bindActionCreators({
    terminal: () => push(`/daemon/${id}/${TERMINAL}`),
  }, dispatch)
)(Container);

