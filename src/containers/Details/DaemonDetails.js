
import React, { Component } from 'react';
import Device from '../Device';
import { DEVICE } from '../../constants';
import DetailSection from './DetailSection';

type Props = {
  id: string,
  device: ?[]
}

export default class extends Component<Props> {
  render() {
    const { id, device } = this.props;
    return (
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
  }
}
