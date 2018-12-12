

import React from 'react';
import RGB from './RGB';
import SelectSensor from './SelectSensor';

type Props = {
  id: string;
  site: string;
  payload: ?{}
};

export default ({ id, site, payload }: Props) => [
  <div key="id" className="paper">
    <SelectSensor root={site} action={id} payload={payload} />
  </div>,
  <div key="value" className="paper">
    <RGB action={id} payload={payload} />
  </div>
];

