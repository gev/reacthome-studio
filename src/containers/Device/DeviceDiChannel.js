
import React from 'react';
import { Typography } from '@rmwc/typography';
import { Icon } from '@rmwc/icon';
import { DI } from '../../constants';
import connect from './connect';

type Props = {
  index: number;
  value: ?boolean;
};

export default connect(DI)(({ index, value, title }: Props) => (
  <div>
    <div><Typography use="caption">{title || index}</Typography></div>
    <div><Icon icon="fiber_manual_record" theme={value ? 'secondary' : 'text-hint-on-background'} /></div>
  </div>
));
