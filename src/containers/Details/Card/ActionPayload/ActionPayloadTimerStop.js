
import React from 'react';
import SelectTimer from './SelectTimer';

type Props = {
  id: string;
  project: string;
  payload: ?{};
};

export default ({ id, project, payload }: Props) => (
  <div className="paper">
    <SelectTimer action={id} payload={payload} project={project} />
  </div>
);
