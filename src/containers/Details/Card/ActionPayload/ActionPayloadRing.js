
import React from 'react';
import SelectRing from './SelectRing';

type Props = {
  id: string;
  site: string;
  payload: ?{}
};

export default ({ id, site, payload }: Props) => (
  <div className="paper">
    <SelectRing root={site} action={id} payload={payload} />
  </div>
);
