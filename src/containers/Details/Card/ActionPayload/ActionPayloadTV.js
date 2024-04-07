
import React from 'react';
import SelectTV from './SelectTV';
import SelectTVCommand from './SelectTVCommand';

export default ({ id, project, payload }) => (
  <div className="paper">
    <SelectTV action={id} payload={payload} project={project} />
    <SelectTVCommand action={id} payload={payload} project={project} />
  </div>
);
