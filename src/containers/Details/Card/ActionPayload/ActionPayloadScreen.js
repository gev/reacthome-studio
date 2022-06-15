
import React from 'react';
import SelectScreen from './SelectScreen';
import SelectScreennCommand from './SelectScreenCommand';

export default ({ id, project, payload }) => (
  <div className="paper">
    <SelectScreen action={id} payload={payload} project={project} />
    <SelectScreennCommand action={id} payload={payload} project={project} />
  </div>
);
