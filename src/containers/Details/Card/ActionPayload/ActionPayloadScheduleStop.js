
import React from 'react';
import SelectSchedule from './SelectSchedule';

export default ({ id, project, payload }) => (
  <div className="paper">
    <SelectSchedule action={id} payload={payload} project={project} />
  </div>
);
