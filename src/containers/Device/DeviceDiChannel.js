
import { Icon } from '@rmwc/icon';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { DI } from '../../constants';
import connect from './connect';

export default connect(DI)(({ index, value, title }) => (
  <div>
    <div><Typography use="caption">{title || index}</Typography></div>
    <div><Icon icon="fiber_manual_record" theme={value ? 'secondary' : 'text-hint-on-background'} /></div>
  </div>
));
