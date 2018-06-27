
import React from 'react';
import SelectSite from './SelectSite';

type Props = {
  id: string;
  site: string;
  payload: ?{}
};

export default ({ id, site, payload }: Props) => (
  <div className="paper">
    <SelectSite root={site} action={id} payload={payload} />
  </div>
);
