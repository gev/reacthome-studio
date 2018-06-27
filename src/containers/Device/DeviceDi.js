
import React from 'react';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { DI } from '../../constants';
import connect from './connect';

type Props = {
  index: number;
  value: ?boolean;
};

export default connect(DI)(({ index, value } : Props) => (
  <div>
    <div><Typography use="caption">{index}</Typography></div>
    <div><Icon use="fiber_manual_record" theme={value ? 'secondary' : 'text-hint-on-background'} /></div>
  </div>
));
