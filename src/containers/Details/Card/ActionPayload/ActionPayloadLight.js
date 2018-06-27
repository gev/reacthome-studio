
import React from 'react';
import SelectLight from './SelectLight';

type Props = {
  id: string;
  site: string;
  payload: ?{}
};

export default ({ id, site, payload }: Props) => (
  <div className="paper">
    <SelectLight root={site} action={id} payload={payload} />
  </div>
);
