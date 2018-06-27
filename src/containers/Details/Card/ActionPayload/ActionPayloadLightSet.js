
import React from 'react';
import SelectLight from './SelectLight';
import Dimmer from './Dimmer';

type Props = {
  id: string;
  site: string;
  payload: ?{}
};

export default ({ id, site, payload }: Props) => [
  <div key="id" className="paper">
    <SelectLight root={site} action={id} payload={payload} />
  </div>,
  <div key="value" className="paper">
    <Dimmer action={id} payload={payload} />
  </div>
];

