
import React from 'react';
import { connect } from 'react-redux';
import Device from '../Device';
import { DEVICE } from '../../constants';
import DetailSection from './DetailSection';

type Props = {
  id: string,
  device: ?[]
}

const Container = ({ id, device }: Props) => (
  <div>
    <DetailSection title={DEVICE}>
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

export default connect(({ pool }, { id }) => ({
  device: ((pool[id] || {}).device || []).sort((aid, bid) => {
    const a = pool[aid] || {};
    const b = pool[bid] || {};
    const akey = `${a.type.toString(16)}${a.code}${b.title}`;
    const bkey = `${b.type.toString(16)}${b.code}${b.title}`;
    if (akey === bkey) return 0;
    if (akey > bkey) return 1;
    return -1;
  })
}))(Container);
