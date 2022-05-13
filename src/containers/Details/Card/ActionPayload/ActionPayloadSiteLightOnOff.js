
import React from 'react';
import SelectSite from './SelectSite';

export default ({ id, site, payload }) => (
  <div className="paper">
    <SelectSite root={site} action={id} payload={payload} />
  </div>
);
