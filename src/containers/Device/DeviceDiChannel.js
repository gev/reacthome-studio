
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { DI } from '../../constants';
import connect from './connect';

export default connect(DI)(({ index, value, title, timestamp }) => {
  const date = new Date(timestamp);
  return (
    <div>
      <div><Typography use="caption">{title || index}</Typography></div>
      <div><Icon icon="fiber_manual_record" theme={value ? 'secondary' : 'text-hint-on-background'} /></div>
      {timestamp && (
        <div>
          <div><Typography use="caption">{(new Date(timestamp)).toLocaleDateString()}</Typography></div>
          <div><Typography use="caption">{(new Date(timestamp)).toLocaleTimeString()}</Typography></div>
        </div>
      )}
    </div>
  )
})
