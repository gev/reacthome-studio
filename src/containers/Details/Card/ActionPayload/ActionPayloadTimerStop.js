
import React from 'react';
import SelectTimer from './SelectTimer';

export default ({ id, project, payload }) => (
  <div className="paper">
    <SelectTimer action={id} payload={payload} project={project} />
  </div>
);
