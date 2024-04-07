
import React from 'react';
import SelectRing from './SelectRing';

export default ({ id, site, payload }) => (
  <div className="paper">
    <SelectRing root={site} action={id} payload={payload} />
  </div>
);
